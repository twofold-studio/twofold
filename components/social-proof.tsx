"use client";

import { ArrowUpRight, Check, MessageCircle, MousePointer2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { useI18n } from "./i18n-provider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// The Agency template's bento, adapted from results to our delivery process.
export function SocialProof() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-process-reveal]",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      aria-labelledby="process-heading"
      className="social-proof bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-360 px-6 sm:px-12 lg:px-24 2xl:max-w-450 3xl:max-w-550">
        <div
          data-process-reveal
          className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16"
        >
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {t.results}
            </p>
            <h2
              id="process-heading"
              className="max-w-3xl text-[clamp(2.25rem,4.5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-foreground"
            >
              {t.processBefore}{" "}
              <span className="font-serif font-normal italic text-accent">{t.processEmphasis}</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="focus-ring inline-flex items-center gap-3 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            {t.startProject}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(220px,auto)_minmax(220px,auto)_minmax(220px,auto)]">
          <div
            data-process-reveal
            className="group relative hidden overflow-hidden rounded-2xl bg-muted/60 md:row-span-2 md:block"
          >
            <div className="absolute inset-0 grid grid-rows-2 gap-3 p-3 pb-18">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/work/helios/phones.webp"
                  alt={t.heliosAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/work/arkada/phones.webp"
                  alt={t.arkadaAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <p className="absolute inset-x-0 bottom-0 px-6 py-5 text-sm font-medium text-foreground">
              {t.processScreens}
            </p>
          </div>

          <div
            data-process-reveal
            className="flex flex-col rounded-2xl bg-muted/60 p-7 md:row-span-2 lg:col-span-2 sm:p-9"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {t.processFirstVersion}
            </p>
            <p className="mt-6 max-w-lg text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              {t.processProgress}
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t.processSpeedCopy}
            </p>
          </div>

          <article data-process-reveal className="flex flex-col rounded-2xl bg-muted/60 p-7">
            <div className="mb-7 flex items-center justify-between text-accent">
              <span className="text-sm font-medium">01</span>
              <MessageCircle size={23} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {t.processIdeaTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.processIdeaCopy}
            </p>
          </article>

          <article data-process-reveal className="flex flex-col rounded-2xl bg-muted/60 p-7">
            <div className="mb-7 flex items-center justify-between text-accent">
              <span className="text-sm font-medium">02</span>
              <MousePointer2 size={23} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {t.processTryTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.processTryCopy}</p>
          </article>

          <article
            data-process-reveal
            className="flex flex-col rounded-2xl bg-muted/60 p-7 md:col-span-2 lg:col-span-1"
          >
            <div className="mb-7 flex items-center justify-between text-accent">
              <span className="text-sm font-medium">03</span>
              <Sparkles size={23} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {t.processRefineTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.processRefineCopy}
            </p>
          </article>

          <article
            data-process-reveal
            className="flex flex-col rounded-2xl bg-accent p-7 text-background md:col-span-2 lg:col-span-3 sm:p-9"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium">04</span>
              <Check size={25} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
              {t.processLaunchTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed opacity-85">
              {t.processLaunchCopy}
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              {[
                t.processCheckMobile,
                t.processCheckSpeed,
                t.processCheckFlows,
                t.processCheckDetails,
              ].map((label) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Check size={15} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
