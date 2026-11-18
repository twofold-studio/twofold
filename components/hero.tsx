"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { MotionLabel } from "./motion-label";
import { useI18n } from "./i18n-provider";
import { HeroMark } from "./hero-mark";

export function Hero() {
  const { t } = useI18n();
  const words = [t.heroWebsite, t.heroShop, t.heroPortal, t.heroPhoneApp, t.heroDashboard];
  const wordCount = words.length;
  const hero = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState<{ current: number; previous: number | null }>({
    current: 0,
    previous: null,
  });

  useEffect(() => {
    const element = hero.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let inView = true;
    let focused = false;
    const sync = () => {
      clearInterval(timer);
      if (reduced.matches) {
        setRotation({ current: 0, previous: null });
      } else if (inView && !focused && document.visibilityState === "visible") {
        // One state update per phrase; CSS handles every letter between ticks.
        timer = setInterval(
          () =>
            setRotation((old) => ({
              current: (old.current + 1) % wordCount,
              previous: old.current,
            })),
          3600,
        );
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      sync();
    });
    const focus = () => {
      focused = true;
      sync();
    };
    const blur = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
      focused = false;
      sync();
    };
    observer.observe(element);
    sync();
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    element.addEventListener("focusin", focus);
    element.addEventListener("focusout", blur);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.removeEventListener("focusin", focus);
      element.removeEventListener("focusout", blur);
    };
  }, [wordCount]);

  return (
    <section ref={hero} id="hero" aria-labelledby="hero-heading">
      <div className="hero-grid container-site">
        <p className="hero-studio eyebrow">{t.heroStudio}</p>
        <h1
          id="hero-heading"
          aria-label={t.heroAccessible}
          className="hero-title font-medium text-foreground"
        >
          <span className="hero-copy-line" aria-hidden="true">
            {t.heroOne.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>
                {index > 0 && " "}
                <span className="hero-word-mask">
                  <span
                    className="hero-word"
                    style={{ "--word-delay": `${index * 45}ms` } as CSSProperties}
                  >
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </span>
          <span className="hero-rotating-words" aria-hidden="true">
            {words.map((word, index) => (
              <span
                key={word}
                className="hero-rotating-word"
                data-active={index === rotation.current || undefined}
                data-previous={index === rotation.previous || undefined}
              >
                {Array.from(word).map((letter, letterIndex) => (
                  <span
                    key={`${letter}-${letterIndex}`}
                    className="hero-rotating-letter"
                    style={{ "--letter-index": letterIndex } as CSSProperties}
                  >
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>
        <div className="hero-text hero-rise">
          <p className="text-body text-muted-foreground">{t.heroCopy}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#contact" className="motion-link btn btn-primary group">
              <MotionLabel>{t.heroPrimary}</MotionLabel>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#projects"
              className="link focus-ring inline-flex min-h-11 items-center gap-2 text-small"
            >
              {t.heroSecondary}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <HeroMark className="hero-mark-slot" />
      </div>
    </section>
  );
}
