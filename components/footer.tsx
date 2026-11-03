"use client";
import { useI18n } from "./i18n-provider";

const copyrightYear = new Date().getFullYear();

const socialLinks = (t: ReturnType<typeof useI18n>["t"]) => [
  { label: t.vilianGithub, href: "https://github.com/Fractal-Tess" },
  { label: t.plamenGithub, href: "https://github.com/PlamenErmenkov" },
  { label: "fractal-tess.xyz", href: "https://fractal-tess.xyz" },
];

const navLinks = (t: ReturnType<typeof useI18n>["t"]) => [
  { label: t.work, href: "#projects" },
  { label: t.services, href: "#services" },
  { label: t.team, href: "#about" },
  { label: t.questions, href: "#faq" },
];

export function Footer() {
  const {
    t,
    content: { studio, work },
  } = useI18n();
  const subject = encodeURIComponent(t.emailSubject);
  return (
    <footer id="contact" className="lg:sticky lg:bottom-0 lg:z-0 bg-foreground text-background">
      <div className="px-6 sm:px-12 lg:px-24 pt-24 lg:pt-32 pb-16 lg:pb-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-background/50">
          {t.footerIntro}
        </p>
        <a
          href={`mailto:${studio.email}?subject=${subject}`}
          className="block text-[clamp(1.75rem,6.5vw,6rem)] font-medium leading-none tracking-tight transition-opacity hover:opacity-80 break-all sm:break-normal"
        >
          {studio.email}
        </a>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${studio.email}?subject=${subject}`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-background text-foreground hover:bg-background/90 transition-colors"
          >
            {t.startProject}
          </a>
          <p className="text-background/60 sm:ml-4">{t.footerLocation}</p>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="border-t border-background/10" />
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-16 lg:py-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          <div>
            <span className="text-4xl font-medium tracking-tight">{studio.name}</span>
            <p className="mt-4 text-background/60 text-3xl lg:text-4xl">
              {t.footerOne} <span className="font-serif italic">{t.footerTwo}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:flex sm:gap-16 lg:gap-24">
            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">{t.studio}</h4>
              <p className="font-medium mb-1">{studio.location}</p>
              <p className="text-background/60 text-sm">
                {t.vilian}
                <br />
                {t.plamen}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">{t.work}</h4>
              <ul className="space-y-3">
                {work.map((w) => (
                  <li key={w.slug}>{w.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">{t.navigation}</h4>
              <ul className="space-y-3">
                {navLinks(t).map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-background/60 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">{t.elsewhere}</h4>
              <ul className="space-y-3">
                {socialLinks(t).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-6 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-background/10 pt-6">
          <p className="text-sm text-background/40">
            © {copyrightYear} {studio.name}
          </p>
          <p className="text-sm text-background/40">{t.footerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
