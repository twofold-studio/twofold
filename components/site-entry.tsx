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
  const [fontsReady, setFontsReady] = useState(false);
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [deadlineExpired, setDeadlineExpired] = useState(false);
  const completing = minimumElapsed && ((heroReady && fontsReady) || deadlineExpired);
  const reportHeroReady = useCallback(() => setHeroReady(true), []);
  const value = useMemo(() => ({ entered, reportHeroReady }), [entered, reportHeroReady]);

  useEffect(() => {
    let cancelled = false;
    // Give the mark and ring time to register even on an instant cache hit.
    // Reduced-motion visitors get the page immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(frame);
    }
    const minimum = window.setTimeout(() => setMinimumElapsed(true), 950);
    const deadline = window.setTimeout(() => setDeadlineExpired(true), 2400);
    void document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => {
      cancelled = true;
      clearTimeout(minimum);
      clearTimeout(deadline);
    };
  }, []);

  useEffect(() => {
    if (!completing) return;
    // Let the ring finish its stroke before fading into the hero.
    const finish = window.setTimeout(() => setEntered(true), 340);
    return () => clearTimeout(finish);
  }, [completing]);

  // Readiness milestones, not a claimed percentage of network bytes.
  const progress = completing
    ? 100
    : heroReady && fontsReady
      ? 88
      : heroReady || fontsReady
        ? 60
        : 8;

  return (
    <EntryContext.Provider value={value}>
      <div data-site-entered={entered}>
        <div className="site-entry" aria-hidden="true">
          <div className="site-entry-brand">
            <div className="site-entry-emblem">
              <svg viewBox="0 0 120 120" className="site-entry-ring">
                <circle className="site-entry-ring-track" cx="60" cy="60" r="54" />
                <circle
                  className="site-entry-ring-progress"
                  cx="60"
                  cy="60"
                  r="54"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                />
              </svg>
              <svg viewBox={MARK_VIEWBOX} className="site-entry-mark">
                <path className="site-entry-upper" fill="currentColor" d={MARK_UPPER_FOLD} />
                <path className="site-entry-lower" fill="currentColor" d={MARK_LOWER_FOLD} />
              </svg>
            </div>
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
