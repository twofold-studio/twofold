"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet fade-in for content further down the page. Elements are visible in
 * the server HTML; only those still below the fold after hydration are hidden
 * and then revealed as they scroll in. Nothing happens with reduced motion.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const show = () => {
      element.dataset.reveal = "shown";
      observer.disconnect();
    };
    const onMotionChange = () => {
      if (reduced.matches) show();
    };
    // A keyboard user should never have to wait for focused content to appear.
    element.addEventListener("focusin", show);
    reduced.addEventListener("change", onMotionChange);
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.removeEventListener("focusin", show);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);
  return ref;
}
