"use client";
import { useI18n } from "./i18n-provider";

import { lazy, Suspense, useEffect, useState } from "react";
import { useSiteEntry } from "./site-entry";
import { EffectBoundary } from "./effect-boundary";
import { HeroMark } from "@/components/hero-mark";

const HeroBackground = lazy(() =>
  import("./hero-background").then((m) => ({ default: m.HeroBackground })),
);

export interface HeroProps {
  startColors?: { color1?: string; color2?: string; color3?: string };
  endColors?: { color1?: string; color2?: string; color3?: string };
}

export function Hero({ startColors, endColors }: HeroProps = {}) {
  const { t } = useI18n();
  const { reportHeroReady } = useSiteEntry();
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [enableBackground, setEnableBackground] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reportHeroReady();
      return;
    }
    const frame = requestAnimationFrame(() => setEnableBackground(true));
    return () => cancelAnimationFrame(frame);
  }, [reportHeroReady]);
  const handleBackgroundReady = () => {
    setBackgroundReady(true);
    reportHeroReady();
  };

  return (
    <section
      id="hero"
      className="hero bg-background relative h-auto min-h-screen w-full overflow-hidden md:min-h-[max(100svh,48rem)]"
    >
      <div className="hero-backdrop absolute inset-0 z-0" aria-hidden="true">
        <div className="h-full w-full opacity-50 saturate-125 md:opacity-85">
          <div
            className="h-full w-full transition-opacity duration-700"
            style={{ opacity: backgroundReady ? 1 : 0 }}
          >
            {enableBackground && (
              <EffectBoundary onFailure={reportHeroReady}>
                <Suspense fallback={null}>
                  <HeroBackground
                    startColors={startColors ?? {}}
                    endColors={endColors ?? {}}
                    onReady={handleBackgroundReady}
                  />
                </Suspense>
              </EffectBoundary>
            )}
          </div>
        </div>
      </div>

      <div
        className="3xl:max-w-550 relative z-10 mx-auto flex min-h-screen max-w-360 flex-col justify-start px-6 pb-32 pt-44 md:pb-20 text-left sm:px-12 sm:pt-48 md:justify-center md:pt-40 md:min-h-[max(100svh,48rem)] lg:px-24 2xl:max-w-450"
        style={{ perspective: "1200px" }}
      >
        <div className="relative">
          <h1 className="text-foreground text-[clamp(3rem,8vw,12rem)] leading-[1.05] tracking-tight">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line block">{t.heroOne}</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line block">{t.heroTwo}</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line block">
                <em className="font-serif font-normal">{t.heroThree}</em>
              </span>
            </span>
          </h1>

          <p className="hero-copy text-foreground/80 mt-8 max-w-md text-[clamp(1.125rem,1.5vw,1.75rem)] leading-relaxed lg:max-w-lg 2xl:max-w-xl">
            {t.heroCopy}
          </p>

          {/* Below the copy on small screens; on md+ it sits beside the last
              heading line (each line is 1.15em tall, so line 3 starts at 2.3em). */}
          <HeroMark className="mt-10 w-[clamp(6.5rem,30vw,9rem)] md:absolute md:top-[calc(2.3*clamp(3rem,8vw,12rem))] md:right-0 md:mt-0 md:w-[min(22vw,36vh,28rem)]" />
        </div>
      </div>
    </section>
  );
}
