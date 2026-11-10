"use client";
import { useI18n } from "./i18n-provider";
import { switchLocale } from "@/lib/i18n/navigation";
import { LOCALES, LOCALE_INFO } from "@/lib/i18n/config";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  return (
    <fieldset
      aria-label={t.language}
      className={`flex h-12 shrink-0 items-center gap-1 rounded-2xl bg-neutral-900/75 p-1.5 text-white shadow-lg backdrop-blur-lg ${className}`}
    >
      {LOCALES.map((language) => (
        <button
          key={language}
          type="button"
          lang={language}
          aria-pressed={language === locale}
          title={`${t.switchLanguage} ${LOCALE_INFO[language].name}`}
          onClick={() => {
            if (language !== locale) switchLocale(language);
          }}
          className={`focus-ring h-full rounded-xl px-2.5 text-small sm:px-3 font-medium transition-colors ${language === locale ? "bg-white text-neutral-950" : "text-white/80 hover:bg-white/10"}`}
        >
          {LOCALE_INFO[language].short}
        </button>
      ))}
    </fieldset>
  );
}
