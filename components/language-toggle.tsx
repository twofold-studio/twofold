"use client";
import { useI18n } from "./i18n-provider";
import { Fragment } from "react";
import { switchLocale } from "@/lib/i18n/navigation";
import { LOCALES, LOCALE_INFO } from "@/lib/i18n/config";

/** "BG / EN" as plain text; the current language is the brighter one. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  return (
    <fieldset aria-label={t.language} className={`flex items-center text-small ${className}`}>
      {LOCALES.map((language, index) => (
        <Fragment key={language}>
          {index > 0 && (
            <span aria-hidden="true" className="text-muted-foreground/60">
              /
            </span>
          )}
          <button
            type="button"
            lang={language}
            aria-pressed={language === locale}
            title={`${t.switchLanguage} ${LOCALE_INFO[language].name}`}
            onClick={() => {
              if (language !== locale) switchLocale(language);
            }}
            className={`focus-ring inline-flex h-10 items-center rounded-md px-1.5 font-medium transition-colors ${
              language === locale
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {LOCALE_INFO[language].short}
          </button>
        </Fragment>
      ))}
    </fieldset>
  );
}
