"use client";
import { useI18n } from "./i18n-provider";
import { HeaderMark } from "./header-mark";
import { pagePath } from "@/lib/pages";
const copyrightYear = new Date().getFullYear();

export function Footer() {
  const {
    locale,
    t,
    content: { studio },
  } = useI18n();
  return (
    <footer className="border-t border-border">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-10 gap-y-5 py-8">
        <div>
          <a
            href={`/${locale}`}
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-lead font-medium"
          >
            <HeaderMark className="h-5 w-5" />
            {studio.name}
          </a>
          <p className="text-small text-muted-foreground">
            © {copyrightYear} · {studio.location}
          </p>
        </div>
        <nav aria-label={t.navigation} className="flex flex-wrap gap-x-6 gap-y-1 text-small">
          <a
            href={pagePath(locale, { kind: "work-index" })}
            className="link focus-ring inline-flex min-h-11 items-center"
          >
            {t.allProjects}
          </a>
          <a
            href={`/${locale}#about`}
            className="link focus-ring inline-flex min-h-11 items-center"
          >
            {t.team}
          </a>
          <a
            href={`/${locale}#contact`}
            className="link focus-ring inline-flex min-h-11 items-center"
          >
            {t.contact}
          </a>
        </nav>
        <p className="text-small text-muted-foreground">{t.footerCredit}</p>
      </div>
    </footer>
  );
}
