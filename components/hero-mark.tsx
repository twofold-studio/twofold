"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { MARK_LOWER_FOLD, MARK_UPPER_FOLD, MARK_VIEWBOX } from "@/lib/brand";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroMark({ className = "" }: { className?: string }) {
  const shadeId = `${useId()}-shade`;

  return (
    <div
      aria-hidden="true"
      className={`text-foreground relative aspect-square ${className}`}
    >
      {/* Background-coloured mask that dims the shader behind the mark so the
          mark keeps its contrast where the bright band passes. It stays put
          while the mark drifts. */}
      <motion.div
        className="hero-mark-part hero-mark-scrim absolute -inset-[40%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
      />

      <div className="hero-mark absolute inset-0">
        {/* Lower fold arrives from the lower left... */}
        <motion.div
          className="hero-mark-part absolute inset-0"
          initial={{ opacity: 0, x: "-7%", y: "7%" }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.75 }}
        >
          <svg
            viewBox={MARK_VIEWBOX}
            className="h-full w-full overflow-visible"
          >
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
                <stop offset="0" stopColor="currentColor" stopOpacity="0.62" />
                <stop offset="1" stopColor="currentColor" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path fill={`url(#${shadeId})`} d={MARK_LOWER_FOLD} />
          </svg>
        </motion.div>

        {/* ...and the upper fold from the upper right, so the two meet. */}
        <motion.div
          className="hero-mark-part absolute inset-0"
          initial={{ opacity: 0, x: "7%", y: "-7%" }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
        >
          <svg
            viewBox={MARK_VIEWBOX}
            className="h-full w-full overflow-visible"
          >
            <path fill="currentColor" d={MARK_UPPER_FOLD} />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
