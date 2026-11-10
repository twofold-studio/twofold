"use client";

import { useEffect, type RefObject } from "react";

type Gsap = typeof import("gsap").gsap;

let loading: Promise<Gsap> | undefined;

/** GSAP and ScrollTrigger, fetched once, the first time an element needs them. */
function loadGsap(): Promise<Gsap> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    },
  );
  return loading;
}

/**
 * The earlier site's scroll motion (main branch): `target` rises by `y` pixels
 * and fades in while `trigger` moves from `start` to `end` (ScrollTrigger
 * positions such as "top 90%"), following the scroll smoothed by one second,
 * and reverses when scrolled back. GSAP loads only once the trigger is about
 * a screen away, so it stays out of the first download. Off with reduced
 * motion; without JavaScript the content simply shows.
 */
export function useScrubIn(
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void loadGsap().then((gsap) => {
          if (cancelled) return;
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
        });
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(anchor);
    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, [target, trigger, y, duration, start, end]);
}
