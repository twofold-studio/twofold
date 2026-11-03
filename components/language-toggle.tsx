"use client";
import { useI18n } from "./i18n-provider";
import { switchLocale } from "@/lib/i18n/navigation";
import { LOCALES, LOCALE_INFO } from "@/lib/i18n/config";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  return (
    <fieldset
      aria-label={t.language}
      className={`flex gap-1 rounded-xl bg-neutral-900/70 p-1.5 text-white backdrop-blur-lg ${className}`}
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
          className={`focus-ring rounded-lg px-3 py-2 text-xs font-medium tracking-widest transition-colors ${language === locale ? "bg-white text-neutral-950" : "hover:bg-white/10"}`}
        >
          {LOCALE_INFO[language].short}
        </button>
      ))}
    </fieldset>
  );
}
