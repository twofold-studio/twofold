"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MARK_LOWER_FOLD, MARK_UPPER_FOLD, MARK_VIEWBOX } from "@/lib/brand";

const EntryContext = createContext({
  entered: false,
  reportHeroReady: () => {},
});
export const useSiteEntry = () => useContext(EntryContext);

export function SiteEntry({ children }: { children: ReactNode }) {
  const [heroReady, setHeroReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const reportHeroReady = useCallback(() => setHeroReady(true), []);
  const value = useMemo(
    () => ({ entered, reportHeroReady }),
    [entered, reportHeroReady]
  );

  useEffect(() => {
    const deadline = window.setTimeout(() => setEntered(true), 2400);
    return () => clearTimeout(deadline);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    // The page always opens even if fonts or WebGL fail to become ready.

    if (
      heroReady ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (!cancelled) setEntered(true);
          });
        });
      });
    }
    return () => {
      cancelled = true;

      cancelAnimationFrame(frame);
    };
  }, [heroReady]);

  return (
    <EntryContext.Provider value={value}>
      <div data-site-entered={entered}>
        <div className="site-entry" aria-hidden="true">
          <div className="site-entry-brand">
            <svg viewBox={MARK_VIEWBOX} className="site-entry-mark">
              <path
                className="site-entry-upper"
                fill="currentColor"
                d={MARK_UPPER_FOLD}
              />
              <path
                className="site-entry-lower"
                fill="currentColor"
                d={MARK_LOWER_FOLD}
              />
            </svg>
            <span>Twofold</span>
          </div>
        </div>
        {children}
      </div>
      <noscript>
        <style>{`.site-entry { display: none !important; } .hero-mark-part { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
    </EntryContext.Provider>
  );
}
