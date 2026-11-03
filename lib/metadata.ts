import { getContent } from "./i18n/content";
import { en, bg } from "./i18n/dictionaries";
import type { Locale } from "./i18n/config";
import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const siteConfig = {
  name: studio.name,
  description: studio.description,
  url: studio.url,
  ogImage: "/work/arkada/hero.webp",
  creator: "@FractalTess",
  authors: [
    { name: "Vilian Gerdzhikov", url: "https://fractal-tess.xyz" },
    { name: "Plamen Ermenkov", url: "https://github.com/PlamenErmenkov" },
  ],
  keywords: [
    "software studio",
    "web development",
    "Sofia",
    "Bulgaria",
    "Next.js",
    "CMS websites",
    "online shops",
    "Vilian Gerdzhikov",
    "Plamen Ermenkov",
  ],
} as const;

export function baseMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  const t = locale === "bg" ? bg : en;
  const title = `${studio.name} · ${t.metaTitle}`;
  const url = `${siteConfig.url}/${locale}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: content.studio.description,
    authors: [...siteConfig.authors],
    creator: siteConfig.creator,
    manifest: "/site.webmanifest",
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en`,
        bg: `${siteConfig.url}/bg`,
        "x-default": siteConfig.url,
      },
    },
    openGraph: {
      type: "website",
      title,
      description: content.studio.description,
      url,
      locale: locale === "bg" ? "bg_BG" : "en_US",
      alternateLocale: locale === "bg" ? "en_US" : "bg_BG",
      siteName: studio.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 3200,
          height: 2000,
          alt: studio.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.studio.description,
      images: [siteConfig.ogImage],
    },
  };
}
