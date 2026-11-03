import assert from "node:assert/strict";

const base = process.env.BASE_URL ?? "http://localhost:3117";
async function expectRedirect(headers, path) {
  const response = await fetch(`${base}/`, { headers, redirect: "manual" });
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location"), base).pathname, path);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.match(response.headers.get("vary"), /Accept-Language/);
}
await expectRedirect({ "Accept-Language": "bg-BG,bg;q=0.9,en;q=0.8" }, "/bg");
await expectRedirect({ "Accept-Language": "en-US,en;q=0.9,bg;q=0.8" }, "/en");
await expectRedirect({ "Accept-Language": "en;q=0.3,bg;q=0.9" }, "/bg");
await expectRedirect({ "Accept-Language": "bg;q=0,en;q=0.5" }, "/en");
await expectRedirect({ "Accept-Language": "de-DE" }, "/en");
await expectRedirect({ "Accept-Language": "bg-BG", Cookie: "lang=en" }, "/en");
await expectRedirect({ "Accept-Language": "en-US", Cookie: "lang=bg" }, "/bg");
await expectRedirect(
  { "Accept-Language": "bg-BG", Cookie: "lang=invalid" },
  "/bg"
);
for (const [locale, heading, caseTitle] of [
  ["bg", "Двама инженери.", "Букинистика"],
  ["en", "Two engineers.", "Bukinistika"],
]) {
  const response = await fetch(`${base}/${locale}`, {
    headers: { "Accept-Language": locale === "bg" ? "en-US" : "bg-BG" },
    redirect: "manual",
  });
  assert.equal(
    response.status,
    200,
    "Explicit locale must override browser preference"
  );
  const html = await response.text();
  assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
  assert.ok(html.includes(heading));
  assert.ok(html.includes(caseTitle));
  assert.ok(
    html.includes(
      `rel="canonical" href="https://twofold.fractal-tess.xyz/${locale}"`
    )
  );
  assert.ok(html.includes('hrefLang="bg"') || html.includes('hreflang="bg"'));
  assert.ok(html.includes('hrefLang="en"') || html.includes('hreflang="en"'));
}
assert.equal((await fetch(`${base}/de`)).status, 404);
for (const path of [
  "/icon.svg",
  "/apple-icon.png",
  "/site.webmanifest",
  "/robots.txt",
]) {
  assert.equal((await fetch(`${base}${path}`)).status, 200, path);
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.ok(sitemap.includes("https://twofold.fractal-tess.xyz/bg"));
assert.ok(sitemap.includes("https://twofold.fractal-tess.xyz/en"));
console.log(
  "Language negotiation, preference cookies, explicit routes, server-rendered translations, SEO and static assets passed."
);
