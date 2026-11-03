"use client";

import { motion } from "motion/react";
import { useId } from "react";

/**
 * The Twofold mark from public/brand/twofold-mark.svg, inlined so the two
 * folds can move separately and take the theme's foreground colour.
 */
const VIEWBOX = "0 0 256 256";
const UPPER_FOLD =
  "M38 148V95c0-22 15-40 36-45L190 26l-9 31c-3 11-11 20-22 25L69 121c-22 10-31 19-31 27Z";
const LOWER_FOLD =
  "m181 57 39 25c12 8 18 19 18 33v30c0 22-15 40-36 45L79 218l9-30c3-11 11-20 22-25l48-21c14-6 23-17 23-31V57Z";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroMark({ className = "" }: { className?: string }) {
  const shadeId = `${useId()}-shade`;

  return (
    <div
      aria-hidden="true"
      className={`hero-mark text-foreground relative aspect-square ${className}`}
    >
      {/* Soft halo, dark theme only, like the concept render. */}
      <motion.div
        className="hero-mark-part absolute -inset-[18%] hidden rounded-full dark:block"
        style={{
          background:
            "radial-gradient(closest-side, rgb(233 228 213 / 0.14), rgb(233 228 213 / 0.05) 55%, transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeOut", delay: 1.1 }}
      />

      {/* Lower fold arrives from the lower left... */}
      <motion.div
        className="hero-mark-part absolute inset-0"
        initial={{ opacity: 0, x: "-7%", y: "7%" }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.75 }}
      >
        <svg viewBox={VIEWBOX} className="h-full w-full overflow-visible">
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
          <path fill={`url(#${shadeId})`} d={LOWER_FOLD} />
        </svg>
      </motion.div>

      {/* ...and the upper fold from the upper right, so the two meet. */}
      <motion.div
        className="hero-mark-part absolute inset-0"
        initial={{ opacity: 0, x: "7%", y: "-7%" }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
      >
        <svg viewBox={VIEWBOX} className="h-full w-full overflow-visible">
          <path fill="currentColor" d={UPPER_FOLD} />
        </svg>
      </motion.div>
    </div>
  );
}
