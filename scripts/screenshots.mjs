/**
 * Screenshots of the built site, for design reviews and the README.
 *
 *   npm run build
 *   node scripts/screenshots.mjs                 # every page type, desktop/tablet/phone, both themes
 *   node scripts/screenshots.mjs /bg /en/work/arkada   # just these pages, desktop and phone
 *
 * Serves dist/ on port 4399, drives a headless Google Chrome over its debugging
 * port (9333), scrolls each page once so the scroll animations have run, and
 * saves PNGs in .screenshots/ (ignored by git). Needs Google Chrome installed.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, openSync, readdirSync, rmSync } from "node:fs";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = "http://127.0.0.1:4399";
const DEBUG = 9333;
const out = join(REPO, ".screenshots");

if (!existsSync(join(REPO, "dist/en/index.html"))) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

mkdirSync(out, { recursive: true });
// Start clean, so no screenshots from an earlier, longer page are left behind.
for (const file of readdirSync(out)) {
  if (file.endsWith(".png")) rmSync(join(out, file));
}

const desk = { width: 1440, height: 900, scale: 0.7 };
const mob = { width: 390, height: 844, mobile: true };
const slug = (path) => path.replace(/^\//, "").replaceAll("/", "-") || "root";

const requested = process.argv.slice(2);
const jobs = requested.length
  ? requested.flatMap((path) => [
      { name: `${slug(path)}-desk-dark`, url: path, ...desk, full: true },
      { name: `${slug(path)}-mob-dark`, url: path, ...mob, full: true },
    ])
  : [
      { name: "bg-desk-dark", url: "/bg", ...desk, full: true },
      { name: "bg-desk-light", url: "/bg", ...desk, theme: "light", full: true },
      { name: "bg-mob-dark", url: "/bg", ...mob, full: true },
      { name: "bg-mob-light", url: "/bg", ...mob, theme: "light", full: true },
      { name: "bg-tablet-dark", url: "/bg", width: 1024, height: 768, scale: 0.8, full: true },
      { name: "en-desk-dark-top", url: "/en", ...desk },
      { name: "bg-desk-dark-pointer", url: "/bg", ...desk, pointer: [1150, 420] },
      {
        name: "bg-mob-dark-menu",
        url: "/bg",
        ...mob,
        click: 'button[aria-controls="mobile-menu"]',
      },
      { name: "bg-case-desk-dark", url: "/bg/work/helios", ...desk, full: true },
      { name: "bg-case-mob-dark", url: "/bg/work/helios", ...mob, full: true },
    ];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const children = [];
const stop = () => children.forEach((child) => child.kill());
process.on("exit", stop);

children.push(
  spawn(process.execPath, ["server/server.mjs"], {
    cwd: REPO,
    env: { ...process.env, PORT: "4399", HOST: "127.0.0.1" },
    stdio: "ignore",
  }),
  spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--hide-scrollbars",
      `--user-data-dir=${await mkdtemp(join(tmpdir(), "twofold-chrome-"))}`,
      `--remote-debugging-port=${DEBUG}`,
      "--remote-allow-origins=*",
      "about:blank",
    ],
    // Chrome's own messages, for when it does not start.
    { stdio: ["ignore", "ignore", openSync(join(out, "chrome.log"), "w")] },
  ),
);

async function waitFor(url) {
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Not up yet.
    }
    await sleep(250);
  }
  throw new Error(`Not reachable: ${url}`);
}

/** A Chrome tab and a minimal DevTools Protocol client for it. */
async function open() {
  const target = await (
    await fetch(`http://127.0.0.1:${DEBUG}/json/new?about:blank`, { method: "PUT" })
  ).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  let next = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    } else if (message.method) {
      for (const listener of listeners) listener(message);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++next;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const once = (method) =>
    new Promise((resolve) => listeners.push((m) => m.method === method && resolve(m.params)));
  const close = async () => {
    ws.close();
    await fetch(`http://127.0.0.1:${DEBUG}/json/close/${target.id}`);
  };
  return { send, once, close };
}

try {
  await mkdir(out, { recursive: true });
  await waitFor(`${SITE}/en`);
  await waitFor(`http://127.0.0.1:${DEBUG}/json/version`);

  for (const job of jobs) {
    const page = await open();
    const { send } = page;
    const evaluate = async (expression) =>
      (await send("Runtime.evaluate", { expression, returnByValue: true })).result.value;

    await send("Page.enable");
    await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: job.width,
      height: job.height,
      deviceScaleFactor: 1,
      mobile: Boolean(job.mobile),
    });
    if (job.mobile) {
      await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    }
    await send("Page.addScriptToEvaluateOnNewDocument", {
      source: `try { localStorage.setItem("theme", ${JSON.stringify(job.theme ?? "dark")}); } catch {}`,
    });
    const loaded = page.once("Page.loadEventFired");
    await send("Page.navigate", { url: SITE + job.url });
    await loaded;
    await sleep(3000);

    if (job.pointer) {
      const [x, y] = job.pointer;
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
      await sleep(1800);
    }
    if (job.click) {
      await evaluate(`document.querySelector(${JSON.stringify(job.click)})?.click()`);
      await sleep(800);
    }

    const capture = async (file, y, height) => {
      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        clip: { x: 0, y, width: job.width, height, scale: job.scale ?? 1 },
        captureBeyondViewport: true,
      });
      await writeFile(join(out, file), Buffer.from(data, "base64"));
      console.log(file);
    };

    if (!job.full) {
      await capture(`${job.name}.png`, 0, job.height);
    } else {
      // Scroll through once so every scroll reveal has run, then back to the top.
      const total = await evaluate("document.documentElement.scrollHeight");
      for (let y = 0; y < total; y += Math.floor(job.height * 0.5)) {
        await evaluate(`window.scrollTo({ top: ${y}, behavior: "instant" })`);
        await sleep(180);
      }
      await sleep(1500);
      await evaluate(`window.scrollTo({ top: 0, behavior: "instant" })`);
      await sleep(1200);
      const height = await evaluate("document.documentElement.scrollHeight");
      let index = 1;
      for (let y = 0; y < height; y += job.height) {
        const name = `${job.name}-${String(index++).padStart(2, "0")}.png`;
        await capture(name, y, Math.min(job.height, height - y));
      }
    }
    await page.close();
  }
  console.log(`\nDone. Screenshots are in ${out}`);
} finally {
  stop();
}
