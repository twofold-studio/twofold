"use client";

import { useEffect, useId, useRef } from "react";
import { MARK_LOWER_FOLD, MARK_UPPER_FOLD, MARK_VIEWBOX } from "@/lib/brand";

const clamp = (value: number, min = -1, max = 1) => Math.min(max, Math.max(min, value));

/**
 * The Twofold mark at hero size, as two folds that move on their own.
 *
 * - On load the folds arrive from opposite corners and meet (CSS).
 * - With a mouse, the mark tilts toward the pointer, the upper fold floats a
 *   little above the lower one, and a gold light follows the pointer across both.
 * - Scrolling past the hero parts the folds along their diagonal.
 *
 * JavaScript only writes three numbers (--mx, --my, --unfold) and the light's
 * position; the movement itself is in styles.css (.hero-mark*). Nothing moves
 * with reduced motion, and the mark is fully drawn without JavaScript.
 */
export function HeroMark({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const lights = useRef<SVGRadialGradientElement[]>([]);
  const id = useId();
  const shadeId = `${id}-shade`;
  const lightId = (fold: string) => `${id}-light-${fold}`;

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Where things are heading, and where they are now; each frame moves a
    // tenth of the way, so the mark follows the pointer softly.
    const target = { x: 0, y: 0, lightX: 84, lightY: 64 };
    const current = { ...target };
    let frame = 0;

    const draw = () => {
      frame = 0;
      let moving = false;
      for (const key of ["x", "y", "lightX", "lightY"] as const) {
        const step = (target[key] - current[key]) * 0.1;
        current[key] += step;
        if (Math.abs(step) > 0.0005) moving = true;
      }
      const unfold = clamp(window.scrollY / (window.innerHeight * 0.9), 0, 1);
      element.style.setProperty("--mx", current.x.toFixed(4));
      element.style.setProperty("--my", current.y.toFixed(4));
      element.style.setProperty("--unfold", unfold.toFixed(4));
      for (const light of lights.current) {
        light.setAttribute("cx", current.lightX.toFixed(1));
        light.setAttribute("cy", current.lightY.toFixed(1));
      }
      if (moving) frame = requestAnimationFrame(draw);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      target.x = clamp((event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2));
      target.y = clamp((event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2));
      // The light, in the mark's own 256-unit coordinates, held near the mark.
      target.lightX = clamp(((event.clientX - box.left) / box.width) * 256, -40, 296);
      target.lightY = clamp(((event.clientY - box.top) / box.height) * 256, -40, 296);
      request();
    };

    if (pointer) window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", request, { passive: true });
    request();
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", request);
      cancelAnimationFrame(frame);
    };
  }, []);

  const light = (fold: string) => (
    <radialGradient
      id={lightId(fold)}
      ref={(node) => {
        if (node && !lights.current.includes(node)) lights.current.push(node);
      }}
      gradientUnits="userSpaceOnUse"
      cx="84"
      cy="64"
      r="120"
    >
      <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.85 }} />
      <stop offset="0.55" style={{ stopColor: "var(--accent)", stopOpacity: 0.25 }} />
      <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
    </radialGradient>
  );

  return (
    <div ref={root} aria-hidden="true" className={`hero-mark ${className}`}>
      <div className="hero-mark-body">
        <div className="hero-fold hero-fold-lower">
          <svg viewBox={MARK_VIEWBOX} width="100%" height="100%">
            <defs>
              {/* Shade where the lower fold tucks under the upper one. */}
              <linearGradient
                id={shadeId}
                x1="150"
                y1="70"
                x2="205"
                y2="175"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
                <stop offset="1" stopColor="currentColor" stopOpacity="1" />
              </linearGradient>
              {light("lower")}
            </defs>
            <path fill={`url(#${shadeId})`} d={MARK_LOWER_FOLD} />
            <path fill={`url(#${lightId("lower")})`} d={MARK_LOWER_FOLD} />
          </svg>
        </div>
        <div className="hero-fold hero-fold-upper">
          <svg viewBox={MARK_VIEWBOX} width="100%" height="100%">
            <defs>{light("upper")}</defs>
            <path fill="currentColor" d={MARK_UPPER_FOLD} />
            <path fill={`url(#${lightId("upper")})`} d={MARK_UPPER_FOLD} />
          </svg>
        </div>
      </div>
    </div>
  );
}
