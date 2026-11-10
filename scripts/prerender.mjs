import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite-plus";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const origin = "https://twofold.fractal-tess.xyz";
const locales = ["en", "bg"];
const pathFor = (locale, page) =>
  page.kind === "work" ? `/${locale}/work/${page.slug}` : `/${locale}`;

export async function prerender() {
  await build({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ".server",
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });
  const { render, pages } = await import(pathToFileURL(resolve(".server/entry-server.js")).href);
  const template = await readFile("dist/index.html", "utf8");
  for (const locale of locales) {
    for (const page of pages) {
      const { head, html } = render(locale, page);
      const dir = `dist${pathFor(locale, page)}`;
      await mkdir(dir, { recursive: true });
      await writeFile(
        `${dir}/index.html`,
        template
          .replace('<html lang="en">', `<html lang="${locale}">`)
          .replace("<!--head-->", head)
          .replace("<!--app-->", html),
      );
    }
  }
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  const urls = pages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${origin}${pathFor(locale, page)}</loc>${locales
          .map(
            (other) =>
              `<xhtml:link rel="alternate" hreflang="${other}" href="${origin}${pathFor(other, page)}"/>`,
          )
          .join("")}</url>`,
    ),
  );
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`,
  );
  console.log(`Prerendered ${pages.length * locales.length} pages in English and Bulgarian.`);
}
