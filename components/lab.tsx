"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { lab } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const whoLabel = { Plamen: "Plamen", Vilian: "Vilian", Both: "Plamen & Vilian" } as const;

export function Lab() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".lab-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%", end: "top 72%", scrub: 1 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lab" className="lab bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 sm:px-12 lg:px-24 2xl:max-w-450 3xl:max-w-550">
        <div className="mb-12 grid gap-6 lg:mb-20 lg:grid-cols-2 lg:items-end">
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-tight text-foreground">
            From the <span className="font-serif font-normal italic text-accent">bench</span>
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
            Smaller builds, coursework and experiments. Not client work, but the same habits:
            sign-in done properly, data that stays consistent, and code you can read.
          </p>
        </div>

        <ul className="border-b border-border">
          {lab.map((item) => (
            <li key={item.name} className="lab-row border-t border-border">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group grid gap-3 py-8 transition-colors md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_auto] md:items-baseline md:gap-10 md:py-10"
              >
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{whoLabel[item.who]}</p>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-foreground/80 md:text-lg">{item.line}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.stack}
                  </p>
                </div>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background md:flex">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
                <span className="sr-only">(opens GitHub in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
