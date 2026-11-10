/**
 * POST /api/enquiry: checks a contact-form enquiry and forwards it to the
 * webhook in ENQUIRY_WEBHOOK_URL (a Slack or Discord incoming webhook, or an
 * automation tool such as n8n, Make or Zapier).
 *
 * Without ENQUIRY_WEBHOOK_URL the endpoint answers 503, and the form opens
 * the visitor's email app with the message filled in instead.
 */
const LIMITS = { name: 120, email: 200, company: 160, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map();

/** Returns the cleaned enquiry, `{ spam: true }` for the hidden trap field, or null. */
export function validateEnquiry(input) {
  if (!input || typeof input !== "object") return null;
  const text = (key) => (typeof input[key] === "string" ? input[key].trim() : "");
  if (text("website")) return { spam: true };
  const enquiry = {
    name: text("name"),
    email: text("email"),
    company: text("company"),
    message: text("message"),
    locale: input.locale === "bg" ? "bg" : "en",
  };
  const fits = Object.entries(LIMITS).every(([key, max]) => enquiry[key].length <= max);
  return fits && enquiry.name && enquiry.message && EMAIL.test(enquiry.email) ? enquiry : null;
}

export function formatEnquiry({ name, email, company, message, locale }) {
  return [
    `New enquiry from ${name} <${email}>`,
    ...(company ? [`Company: ${company}`] : []),
    `Site language: ${locale}`,
    "",
    message,
  ].join("\n");
}

/**
 * The visitor's address, for the rate limit. A proxy adds the address it sees
 * to the end of X-Forwarded-For; anything before that came from the request
 * itself and can be made up. So the last entry is the one to trust (Dokploy's
 * Traefik replaces the header from unknown senders, leaving a single entry).
 */
export function clientAddress(req) {
  const forwarded = String(req.headers["x-forwarded-for"] ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  return forwarded.at(-1) || req.socket?.remoteAddress || "unknown";
}

function isRateLimited(client, now = Date.now()) {
  const hits = (recent.get(client) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  if (recent.size > 5000) recent.clear();
  recent.set(client, hits);
  return hits.length > MAX_PER_WINDOW;
}

async function readJson(req, limit = 16 * 1024) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error("Body too large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function handleEnquiry(req, res, webhook = process.env.ENQUIRY_WEBHOOK_URL) {
  const send = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify(body));
  };
  if (req.method !== "POST") {
    res.writeHead(405, { Allow: "POST" });
    res.end();
    return;
  }
  if (!webhook) return send(503, { error: "unavailable" });
  if (isRateLimited(clientAddress(req))) return send(429, { error: "rate-limited" });

  let enquiry;
  try {
    enquiry = validateEnquiry(await readJson(req));
  } catch {
    return send(400, { error: "invalid" });
  }
  // Bots that fill the hidden field get a normal answer and nothing is sent.
  if (enquiry?.spam) return send(200, { ok: true });
  if (!enquiry) return send(400, { error: "invalid" });

  const text = formatEnquiry(enquiry);
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // `text` for Slack, `content` for Discord, `enquiry` for automation tools.
      body: JSON.stringify({ text, content: text.slice(0, 2000), enquiry }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook answered ${response.status}`);
  } catch (error) {
    console.error("Enquiry delivery failed:", error);
    return send(502, { error: "delivery" });
  }
  send(200, { ok: true });
}
