"use client";
import { useI18n } from "./i18n-provider";
import { switchLocale } from "@/lib/i18n/navigation";
import { LOCALES, LOCALE_INFO } from "@/lib/i18n/config";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  return (
    <fieldset aria-label={t.language} className={`language-toggle ${className}`}>
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
          className=""
        >
          {LOCALE_INFO[language].short}
        </button>
      ))}
    </fieldset>
  );
}
