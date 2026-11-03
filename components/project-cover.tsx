"use client";

import { lazy, Suspense } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSiteEntry } from "./site-entry";
import { EffectBoundary } from "./effect-boundary";

const WaterRipple = lazy(() => import("./water-ripple").then((m) => ({ default: m.WaterRipple })));

export function ProjectCover({ src, maskRadius }: { src: string; maskRadius: number }) {
  const container = useRef<HTMLDivElement>(null);
  const { entered } = useSiteEntry();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const reportReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nearView = Boolean(entry?.isIntersecting);
        setVisible(nearView);
        if (!nearView) setReady(false);
      },
      { rootMargin: "150px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [entered]);

  return (
    <div ref={container} className="absolute inset-0">
      {/* A real image stays available while the optional GPU effect loads. */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      {visible && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <EffectBoundary>
            <Suspense fallback={null}>
              <WaterRipple src={src} maskRadius={maskRadius} onReady={reportReady} />
            </Suspense>
          </EffectBoundary>
        </div>
      )}
    </div>
  );
}
