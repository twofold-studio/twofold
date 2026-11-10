import { useId } from "react";
import { MARK_LOWER_FOLD, MARK_UPPER_FOLD, MARK_VIEWBOX } from "@/lib/brand";

/**
 * The large Twofold mark beside the hero heading. The two folds meet and then
 * drift slowly; all of it is CSS (src/styles.css), so it runs without JavaScript
 * and stops for visitors who prefer reduced motion.
 */
export function HeroMark({ className = "" }: { className?: string }) {
  const shadeId = `${useId()}-shade`;

  return (
    <div aria-hidden="true" className={`relative aspect-square text-foreground ${className}`}>
      {/* Background-coloured mask that dims the shader behind the mark so the
          mark keeps its contrast where the bright band passes. */}
      <div className="hero-mark-scrim absolute -inset-[40%]" />

      <div className="hero-mark absolute inset-0">
        <div className="hero-mark-lower absolute inset-0">
          <svg
            width="1em"
            height="1em"
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
        </div>
        <div className="hero-mark-upper absolute inset-0">
          <svg
            width="1em"
            height="1em"
            viewBox={MARK_VIEWBOX}
            className="h-full w-full overflow-visible"
          >
            <path fill="currentColor" d={MARK_UPPER_FOLD} />
          </svg>
        </div>
      </div>
    </div>
  );
}
