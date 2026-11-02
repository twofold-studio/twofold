import { studio } from "@/lib/content";

export const siteConfig = {
  name: studio.name,
  tagline: "Two engineers. One studio.",
  description: studio.description,
  url: studio.url,
} as const;

export const features = {
  smoothScroll: true,
  darkMode: true,
} as const;

export const themeConfig = {
  defaultTheme: "dark" as const,
  enableSystem: true,
} as const;
