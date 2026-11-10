"use client";
import { useI18n } from "./i18n-provider";

import { HeaderMark } from "./header-mark";
import { pagePath } from "@/lib/pages";

const copyrightYear = new Date().getFullYear();

export function Footer() {
  const {
    locale,
    t,
    content: { studio, work },
  } = useI18n();

  const sections = [
    { label: t.services, href: `/${locale}#services` },
    { label: t.team, href: `/${locale}#about` },
    { label: t.results, href: `/${locale}#process` },
    { label: t.questions, href: `/${locale}#faq` },
    { label: t.contact, href: `/${locale}#contact` },
  ];
  const elsewhere = [
    { label: t.vilianGithub, href: "https://github.com/Fractal-Tess" },
    { label: t.plamenGithub, href: "https://github.com/PlamenErmenkov" },
    { label: "fractal-tess.xyz", href: "https://fractal-tess.xyz" },
    { label: "plamen.codes", href: "https://www.plamen.codes" },
  ];
  const column = "flex flex-col gap-3 text-body";
  const heading = "mb-5 text-small font-medium text-muted-foreground";

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <a
            href={`/${locale}`}
            className="focus-ring inline-flex items-center gap-2.5 text-h3 font-medium text-foreground"
          >
            <HeaderMark className="h-6 w-6" />
            {studio.name}
          </a>
          <p className="mt-4 max-w-xs text-body text-muted-foreground">{t.footerTagline}</p>
          <p className="mt-6 text-small text-muted-foreground">
            {studio.location}
            <br />
            {t.vilian} · {t.plamen}
          </p>
        </div>

        <nav aria-labelledby="footer-work">
          <h2 id="footer-work" className={heading}>
            {t.work}
          </h2>
          <ul className={column}>
            {work.map((project) => (
              <li key={project.slug}>
                <a
                  href={pagePath(locale, { kind: "work", slug: project.slug })}
                  className="link focus-ring text-foreground"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-navigation">
          <h2 id="footer-navigation" className={heading}>
            {t.navigation}
          </h2>
          <ul className={column}>
            {sections.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link focus-ring text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{t.elsewhere}</h2>
          <ul className={column}>
            {elsewhere.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link focus-ring text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-2 border-t border-border py-6 text-small text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {copyrightYear} {studio.name}
          </p>
          <p>{t.footerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
