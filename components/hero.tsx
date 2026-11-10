"use client";
import { useI18n } from "./i18n-provider";

import { ArrowRight } from "lucide-react";
import { HeroMark } from "./hero-mark";

/**
 * The headline rises line by line, and the Twofold mark sits large beside its
 * short last line: two folds for two engineers. Below the headline, what we do
 * and how to reach us. Layout and motion: .hero-* in styles.css.
 */
export function Hero() {
  const {
    t,
    content: { studio },
  } = useI18n();
  const lines = [t.heroOne, t.heroTwo, t.heroThree];

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-grid container-site pb-20 pt-32 md:pt-40 lg:pb-24">
        <h1 id="hero-heading" className="hero-title text-display font-medium text-foreground">
          {lines.map((line, index) => (
            <span key={line} className="hero-mask">
              <span className="hero-line" style={{ animationDelay: `${index * 90}ms` }}>
                {line}
              </span>{" "}
            </span>
          ))}
        </h1>

        <div className="hero-text">
          <p className="hero-rise max-w-xl text-lead text-muted-foreground">{t.heroCopy}</p>
          <div className="hero-rise hero-rise-late mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#contact" className="btn btn-primary group">
              {t.startProject}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <p className="text-small text-muted-foreground">
              {t.heroOr}{" "}
              <a
                href={`mailto:${studio.email}?subject=${encodeURIComponent(t.emailSubject)}`}
                className="link focus-ring text-foreground"
              >
                {studio.email}
              </a>
            </p>
          </div>
        </div>

        <HeroMark className="hero-mark-slot" />
      </div>
    </section>
  );
}
