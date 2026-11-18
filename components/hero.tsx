"use client";
import { ArrowRight } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { HeroMark } from "./hero-mark";

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-grid container-site">
        <p className="hero-studio eyebrow">{t.heroStudio}</p>
        <h1 id="hero-heading" className="hero-title font-medium text-foreground">
          {[t.heroOne, t.heroTwo].map((line, index) => (
            <span key={line} className="hero-mask">
              <span className="hero-line" style={{ animationDelay: `${index * 90}ms` }}>
                {line}
              </span>{" "}
            </span>
          ))}
        </h1>
        <div className="hero-text hero-rise">
          <p className="text-body text-muted-foreground">{t.heroCopy}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#contact" className="btn btn-primary group">
              {t.heroPrimary}
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
