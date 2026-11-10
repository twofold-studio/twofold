"use client";
import { useI18n } from "./i18n-provider";

import { lazy, Suspense, useEffect, useState } from "react";
import { EffectBoundary } from "./effect-boundary";
import { HeroMark } from "./hero-mark";
import { useSiteEntry } from "./site-entry";

const HeroBackground = lazy(() =>
  import("./hero-background").then((m) => ({ default: m.HeroBackground })),
);

/** The WebGL waves are a desktop extra: loaded after the page is idle, never on phones. */
function useDesktopEffect(): boolean {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wide || calm) return;
    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 800);
    return () => clearTimeout(id);
  }, []);
  return enabled;
}

export function Hero() {
  const { t } = useI18n();
  // Until the loading screen is removed, tell it the hero is ready.
  const { reportHeroReady } = useSiteEntry();
  useEffect(() => reportHeroReady(), [reportHeroReady]);
  const showBackground = useDesktopEffect();
  const [backgroundReady, setBackgroundReady] = useState(false);

  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero relative overflow-hidden">
      <div className="hero-backdrop absolute inset-0" aria-hidden="true">
        {showBackground && (
          <div
            className="h-full w-full saturate-125 transition-opacity duration-1000"
            style={{ opacity: backgroundReady ? 0.8 : 0 }}
          >
            <EffectBoundary>
              <Suspense fallback={null}>
                <HeroBackground onReady={() => setBackgroundReady(true)} />
              </Suspense>
            </EffectBoundary>
          </div>
        )}
      </div>

      <div className="container-site relative z-10 grid min-h-[100svh] content-center gap-12 pb-20 pt-36 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16 md:pt-40">
        <div>
          <h1 id="hero-heading" className="text-display font-medium text-foreground">
            <span className="hero-enter block">{t.heroOne}</span>
            <span className="hero-enter hero-enter-2 block">
              {t.heroTwo} <span className="text-accent">{t.heroThree}</span>
            </span>
          </h1>
          <p className="hero-enter hero-enter-3 mt-8 max-w-xl text-lead text-foreground/80">
            {t.heroCopy}
          </p>
          <div className="hero-enter hero-enter-4 mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              {t.startProject}
            </a>
            <a href="#projects" className="btn btn-secondary">
              {t.seeWork}
            </a>
          </div>
        </div>
        <HeroMark className="w-28 md:w-[clamp(10rem,22vw,19rem)]" />
      </div>
    </section>
  );
}
