import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite-plus";
import { readFile, writeFile, mkdir } from "node:fs/promises";

export async function prerender() {
  await build({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ".server",
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });
  const { render } = await import(pathToFileURL(resolve(".server/entry-server.js")).href);
  const template = await readFile("dist/index.html", "utf8");
  for (const locale of ["en", "bg"]) {
    const { head, html } = render(locale);
    await mkdir(`dist/${locale}`, { recursive: true });
    await writeFile(
      `dist/${locale}/index.html`,
      template
        .replace('<html lang="en">', `<html lang="${locale}">`)
        .replace("<!--head-->", head)
        .replace("<!--app-->", html),
    );
  }
  const origin = "https://twofold.fractal-tess.xyz";
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${["en", "bg"].map((locale) => `<url><loc>${origin}/${locale}</loc><xhtml:link rel="alternate" hreflang="en" href="${origin}/en"/><xhtml:link rel="alternate" hreflang="bg" href="${origin}/bg"/></url>`).join("")}</urlset>`,
  );
  console.log("Prerendered English and Bulgarian pages.");
}
