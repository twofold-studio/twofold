"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSiteEntry } from "./site-entry";
import { EffectBoundary } from "./effect-boundary";

const WaterRipple = dynamic(
  () => import("./water-ripple").then((m) => m.WaterRipple),
  { ssr: false }
);

export function ProjectCover({
  src,
  maskRadius,
  active,
}: {
  src: string;
  maskRadius: number;
  active: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { entered } = useSiteEntry();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const reportReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (
      !entered ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nearView = Boolean(entry?.isIntersecting);
        setVisible(nearView);
        if (!nearView) setReady(false);
      },
      { rootMargin: "150px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [entered]);

  return (
    <div ref={container} className="absolute inset-0">
      {/* A real image stays available while the optional GPU effect loads. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ filter: active ? undefined : "sepia(0.4) saturate(0.65)" }}
      />
      {visible && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <EffectBoundary>
            <WaterRipple
              src={src}
              maskRadius={maskRadius}
              active={active}
              onReady={reportReady}
            />
          </EffectBoundary>
        </div>
      )}
    </div>
  );
}
