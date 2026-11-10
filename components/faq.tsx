"use client";
import { useI18n } from "./i18n-provider";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { SectionHeading } from "./section-heading";

/**
 * The FAQ's motion is taken from the earlier site (main branch): GSAP scrubs
 * each card and the heading into place with the scroll (smoothed by one
 * second), and answers open with a CSS grid transition. GSAP is loaded only
 * here and only when needed, so it stays out of the main download. Nothing
 * moves with reduced motion.
 */
function useScrubIn(
  target: RefObject<HTMLElement | null>,
  trigger: RefObject<HTMLElement | null>,
  options: { y: number; duration: number; start: string; end: string },
) {
  const { y, duration, start, end } = options;
  useEffect(() => {
    const element = target.current;
    const anchor = trigger.current;
    if (!element || !anchor || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let cancelled = false;
    let revert: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.fromTo(
            element,
            { y, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration,
              ease: "power3.out",
              scrollTrigger: { trigger: anchor, start, end, scrub: 1 },
            },
          );
        });
        revert = () => context.revert();
      },
    );
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [target, trigger, y, duration, start, end]);
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  useScrubIn(itemRef, itemRef, { y: 40, duration: 0.6, start: "top 90%", end: "top 70%" });

  return (
    <div
      ref={itemRef}
      data-open={isOpen || undefined}
      className="faq-item rounded-2xl border border-border hover:border-foreground/25"
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="focus-ring flex w-full cursor-pointer items-center justify-between gap-5 rounded-2xl p-5 text-left text-lead font-medium text-foreground md:gap-6 md:p-6 md:px-7"
        >
          <span>{question}</span>
          <span
            aria-hidden="true"
            className="faq-icon relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <span className="absolute h-3.5 w-[1.5px] bg-current" />
            <span className="absolute h-[1.5px] w-3.5 bg-current" />
          </span>
        </button>
      </h3>
      {/* The answer slides open as its grid row grows from 0fr to 1fr. While
          closed it is out of the tab order and hidden from screen readers. */}
      <div
        id={panelId}
        inert={!isOpen}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl px-5 pb-5 text-body text-muted-foreground md:px-7 md:pb-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const {
    t,
    content: { faqs },
  } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  useScrubIn(titleRef, sectionRef, { y: 60, duration: 1, start: "top 75%", end: "top 50%" });

  return (
    <section ref={sectionRef} id="faq" aria-labelledby="faq-heading" className="section">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <div ref={titleRef}>
            <SectionHeading id="faq-heading" label={t.questions} align="center" reveal={false}>
              {t.faqBefore} <span className="text-accent">{t.faqEmphasis}</span>
            </SectionHeading>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <p className="mt-10 text-center text-body text-muted-foreground">
            {t.faqMore}{" "}
            <a href="#contact" className="link focus-ring text-foreground">
              {t.faqAsk}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
