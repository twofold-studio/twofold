import { I18nProvider } from "@/components/i18n-provider";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Process } from "@/components/process";
import { Faq } from "@/components/faq";
import { CaseStudy } from "@/components/case-study";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ThemeSwitch } from "@/components/theme-switch";
import { SkipToContent } from "@/components/skip-to-content";
import { en, bg } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { Page } from "@/lib/pages";

export function App({ locale, page }: { locale: Locale; page: Page }) {
  const t = locale === "bg" ? bg : en;
  return (
    <I18nProvider locale={locale}>
      <Providers>
        <SkipToContent label={t.skip} />
        <Header home={page.kind === "home"} />
        <ThemeSwitch />
        <main id="main-content">
          {page.kind === "home" ? (
            <>
              <Hero />
              <Projects />
              <Services />
              <About />
              <Process />
              <Faq />
            </>
          ) : (
            <CaseStudy slug={page.slug} />
          )}
          <Contact />
        </main>
        <Footer />
      </Providers>
    </I18nProvider>
  );
}
