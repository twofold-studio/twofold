import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chooseLocale } from "./locales.mjs";
import { handleEnquiry } from "./enquiry.mjs";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
/** A localized home page or case study; unknown case studies have no file and get a 404. */
const PAGE_PATH = /^\/(en|bg)(\/work\/[a-z0-9-]+)?\/?$/;

export function createAppServer(root = resolve("dist")) {
  return createServer(async (req, res) => {
    if ((req.url ?? "").split("?")[0] === "/api/enquiry") {
      await handleEnquiry(req, res);
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end();
      return;
    }
    try {
      const url = new URL(req.url ?? "/", "http://localhost");
      if (url.pathname === "/") {
        const locale = chooseLocale(req.headers["accept-language"], req.headers.cookie);
        res.writeHead(307, {
          Location: `/${locale}${url.search}`,
          Vary: "Accept-Language, Cookie",
          "Cache-Control": "private, no-store",
        });
        res.end();
        return;
      }
      const pathname = decodeURIComponent(url.pathname);
      const file = resolve(
        root,
        `.${PAGE_PATH.test(pathname) ? `${pathname.replace(/\/$/, "")}/index.html` : pathname}`,
      );
      if (!file.startsWith(`${root}${sep}`)) {
        res.writeHead(404);
        res.end();
        return;
      }
      const info = await stat(file);
      if (!info.isFile()) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[extname(file)] ?? "application/octet-stream",
        "Content-Length": info.size,
        "Cache-Control": pathname.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
        "X-Content-Type-Options": "nosniff",
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      createReadStream(file)
        .on("error", () => res.destroy())
        .pipe(res);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  createAppServer().listen(port, process.env.HOST ?? "0.0.0.0", () =>
    console.log(`Twofold listening on ${port}`),
  );
}
