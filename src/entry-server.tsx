import { renderToString } from "react-dom/server";
import { App } from "./app";
import { getContent } from "@/lib/i18n/content";
import { en, bg } from "@/lib/i18n/dictionaries";
import { studio } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";

const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
export function render(locale: Locale) {
  const t = locale === "bg" ? bg : en;
  const { description: metaDescription, shareDescription } = getContent(locale).studio;
  const description = escape(metaDescription);
  const share = escape(shareDescription);
  const title = escape(`${studio.name} — ${t.metaTitle}`);
  const url = `${studio.url}/${locale}`;
  const head = `<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${studio.url}/en"><link rel="alternate" hreflang="bg" href="${studio.url}/bg"><link rel="alternate" hreflang="x-default" href="${studio.url}/"><meta property="og:type" content="website"><meta property="og:site_name" content="${studio.name}"><meta property="og:title" content="${title}"><meta property="og:description" content="${share}"><meta property="og:url" content="${url}"><meta property="og:locale" content="${locale === "bg" ? "bg_BG" : "en_US"}"><meta property="og:image" content="${studio.url}/work/arkada/hero.webp"><meta name="twitter:card" content="summary_large_image">`;
  return { head, html: renderToString(<App locale={locale} />) };
}
