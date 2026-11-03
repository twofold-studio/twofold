"use client";

import { type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/content";
import { en, bg, type Dictionary } from "@/lib/i18n/dictionaries";
import { createContext, useContext, useMemo, type ReactNode } from "react";

interface I18n {
  locale: Locale;
  t: Dictionary;
  content: ReturnType<typeof getContent>;
}

const I18nContext = createContext<I18n | null>(null);

/** Both server and client render the dictionary for the explicit locale route. */
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}): ReactNode {
  const value = useMemo(
    () => ({
      locale,
      t: locale === "bg" ? bg : en,
      content: getContent(locale),
    }),
    [locale]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n needs an <I18nProvider> above it");
  return value;
}
