import { renderToString } from "react-dom/server";
import { App } from "./app";
import { getContent } from "@/lib/i18n/content";
import { en, bg } from "@/lib/i18n/dictionaries";
import { studio, work } from "@/lib/content";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { pagePath, type Page } from "@/lib/pages";

const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

/** Every page the build writes: each locale's home page and its case studies. */
export const pages: Page[] = [
  { kind: "home" },
  ...work.map((project): Page => ({ kind: "work", slug: project.slug })),
];

/** Returns null for a page that doesn't exist (an unknown project slug). */
export function render(locale: Locale, page: Page = { kind: "home" }) {
  const t = locale === "bg" ? bg : en;
  const content = getContent(locale);
  const project =
    page.kind === "work" ? content.work.find((item) => item.slug === page.slug) : undefined;
  if (page.kind === "work" && !project) return null;

  const title = escape(
    project ? `${project.name} · ${studio.name}` : `${studio.name} — ${t.metaTitle}`,
  );
  const description = escape(project ? project.solution : content.studio.description);
  const share = escape(project ? project.solution : content.studio.shareDescription);
  const url = `${studio.url}${pagePath(locale, page)}`;
  const alternates = LOCALES.map(
    (other) =>
      `<link rel="alternate" hreflang="${other}" href="${studio.url}${pagePath(other, page)}">`,
  ).join("");
  const xDefault =
    page.kind === "home" ? `<link rel="alternate" hreflang="x-default" href="${studio.url}/">` : "";
  const head = `<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${url}">${alternates}${xDefault}<meta property="og:type" content="website"><meta property="og:site_name" content="${studio.name}"><meta property="og:title" content="${title}"><meta property="og:description" content="${share}"><meta property="og:url" content="${url}"><meta property="og:locale" content="${locale === "bg" ? "bg_BG" : "en_US"}"><meta property="og:image" content="${studio.url}/work/arkada/hero.webp"><meta name="twitter:card" content="summary_large_image">`;
  return { head, html: renderToString(<App locale={locale} page={page} />) };
}
