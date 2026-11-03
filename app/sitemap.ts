import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return (["en", "bg"] as const).map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: { en: `${baseUrl}/en`, bg: `${baseUrl}/bg` } },
  }));
}
