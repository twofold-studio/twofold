export const LOCALES = ["en", "bg"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Remembers an explicit choice from the switcher. The root proxy reads it before
 * Accept-Language when it redirects `/`.
 */
export const LOCALE_COOKIE = "lang";

export const LOCALE_INFO: Record<
  Locale,
  { short: string; name: string; openGraph: string }
> = {
  en: { short: "EN", name: "English", openGraph: "en_US" },
  bg: { short: "BG", name: "Български", openGraph: "bg_BG" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The locale for a browser preference such as `bg-BG`, if we have it. */
export function matchLocale(tag: string | undefined): Locale | undefined {
  const base = tag?.toLowerCase().split("-")[0] ?? "";
  return isLocale(base) ? base : undefined;
}
