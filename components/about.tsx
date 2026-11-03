"use client";
import { useI18n } from "./i18n-provider";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const {
    t,
    content: { founders },
  } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".founder-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80 + i * 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 55%", scrub: 1 },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 sm:px-12 lg:px-24 2xl:max-w-450 3xl:max-w-550">
        <h2
          ref={headingRef}
          className="mx-auto max-w-4xl text-center text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.15] tracking-tight text-foreground"
        >
          {t.aboutBefore}{" "}
          <span className="font-serif font-normal italic text-accent">{t.aboutEmphasis}</span>
          {t.aboutAfter}
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-24 lg:gap-8">
          {founders.map((f) => (
            <article
              key={f.name}
              className="founder-card flex flex-col overflow-hidden rounded-[2rem] bg-muted/60 sm:flex-row md:flex-col xl:flex-row"
            >
              <div className="relative aspect-4/5 w-full shrink-0 sm:w-2/5 md:w-full xl:w-2/5">
                <img
                  src={f.photo}
                  alt={`${t.portrait} ${f.name}`}
                  loading="lazy"
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 45vw, (min-width: 640px) 40vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-9">
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  {f.role}
                </p>
                <h3 className="mt-3 text-3xl font-medium tracking-tight text-foreground lg:text-4xl">
                  {f.name}
                </h3>
                <p className="mt-5 leading-relaxed text-foreground/80">{f.bio}</p>
                <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
                  {f.facts.map((fact) => (
                    <li key={fact} className="flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {fact}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  {f.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
