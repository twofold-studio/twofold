import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Lab } from "@/components/lab";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { SocialProof } from "@/components/social-proof";
import { ThemeSwitch } from "@/components/theme-switch";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} · Software studio in Sofia`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <main id="main-content" className="lg:relative lg:z-10 flex-1 bg-background">
        <Hero />
        <Projects />
        <Services />
        <Lab />
        <About />
        <SocialProof />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
