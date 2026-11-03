import { I18nProvider } from "@/components/i18n-provider";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { ThemeSwitch } from "@/components/theme-switch";
import { SkipToContent } from "@/components/skip-to-content";
import { Faq } from "@/components/faq";
import { SocialProof } from "@/components/social-proof";
import { en, bg } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function App({ locale }: { locale: Locale }) {
  const t = locale === "bg" ? bg : en;
  return (
    <I18nProvider locale={locale}>
      <Providers>
        <>
          <SkipToContent label={t.skip} />
          <Header />
          <ThemeSwitch />
          <main id="main-content" className="bg-background flex-1 lg:relative lg:z-10">
            <Hero />
            <Projects />
            <Services />
            <About />
            <SocialProof />
            <Faq />
          </main>
          <Footer />
        </>
      </Providers>
    </I18nProvider>
  );
}
