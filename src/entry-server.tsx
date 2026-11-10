import { renderToString } from "react-dom/server";
import { App } from "./app";
import { getContent } from "@/lib/i18n/content";
import { en, bg } from "@/lib/i18n/dictionaries";
import { studio, work } from "@/lib/content";
import { LOCALES, LOCALE_INFO, type Locale } from "@/lib/i18n/config";
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

/** Who we are, for search engines (schema.org). */
function organization(locale: Locale) {
  const content = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: studio.name,
    url: `${studio.url}/${locale}`,
    logo: `${studio.url}/icon-512.png`,
    email: studio.email,
    description: content.studio.description,
    address: { "@type": "PostalAddress", addressLocality: "Sofia", addressCountry: "BG" },
    founder: content.founders.map((founder) => ({ "@type": "Person", name: founder.name })),
  };
}

/** Returns null for a page that doesn't exist (an unknown project slug). */
export function render(locale: Locale, page: Page = { kind: "home" }) {
  const t = locale === "bg" ? bg : en;
  const content = getContent(locale);
  const project =
    page.kind === "work" ? content.work.find((item) => item.slug === page.slug) : undefined;
  if (page.kind === "work" && !project) return null;

  const title = escape(
    project ? `${project.seoTitle} · ${studio.name}` : `${studio.name} — ${t.metaTitle}`,
  );
  const description = escape(project ? project.solution : content.studio.description);
  const share = escape(project ? project.solution : content.studio.shareDescription);
  const image = `${studio.url}/og/${project?.slug ?? `twofold-${locale}`}.jpg`;
  const imageAlt = escape(project ? project.seoTitle : `${studio.name} — ${t.metaTitle}`);
  const url = `${studio.url}${pagePath(locale, page)}`;
  const alternates = LOCALES.map(
    (other) =>
      `<link rel="alternate" hreflang="${other}" href="${studio.url}${pagePath(other, page)}">`,
  ).join("");
  const otherLocales = LOCALES.filter((other) => other !== locale)
    .map(
      (other) => `<meta property="og:locale:alternate" content="${LOCALE_INFO[other].openGraph}">`,
    )
    .join("");
  const structuredData =
    page.kind === "home"
      ? `<script type="application/ld+json">${JSON.stringify(organization(locale)).replaceAll("<", "\\u003c")}</script>`
      : "";

  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${url}">`,
    alternates,
    page.kind === "home" ? `<link rel="alternate" hreflang="x-default" href="${studio.url}/">` : "",
    `<meta property="og:type" content="${project ? "article" : "website"}">`,
    `<meta property="og:site_name" content="${studio.name}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${share}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="${LOCALE_INFO[locale].openGraph}">`,
    otherLocales,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${imageAlt}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    structuredData,
  ].join("");

  return { head, html: renderToString(<App locale={locale} page={page} />) };
}
