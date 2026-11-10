"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** The earlier site's settings: wheel scrolling glides for 1.6 s; touch stays native. */
const OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

let current: Lenis | null = null;

/** Holds the page still while something covers it (the phone menu). */
export function pauseSmoothScroll(paused: boolean) {
  if (paused) current?.stop();
  else current?.start();
}

const samePage = (path: string) => path.replace(/\/$/, "") === location.pathname.replace(/\/$/, "");

/**
 * Smooth scrolling for the whole site, as on the earlier version (main
 * branch), with Lenis. Links to a section of the page you are on glide there
 * too, stopping below the fixed header (the html scroll-padding-top). Off with
 * reduced motion, where the browser scrolls as usual.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis(OPTIONS);
    current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || !samePage(url.pathname) || !url.hash) return;
      const section =
        url.hash === "#" ? null : document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (url.hash !== "#" && !section) return;

      event.preventDefault();
      const header = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      // force: the phone menu closes on the same click, while scrolling is still paused.
      lenis.scrollTo(section ?? 0, { offset: section ? -header : 0, force: true });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      current = null;
    };
  }, []);

  return null;
}
