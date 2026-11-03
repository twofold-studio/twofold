import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { SocialProof } from "@/components/social-proof";
import { ThemeSwitch } from "@/components/theme-switch";
import type { ReactNode } from "react";

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <main
        id="main-content"
        className="bg-background flex-1 lg:relative lg:z-10"
      >
        <Hero />
        <Projects />
        <Services />
        <About />
        <SocialProof />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
