import { MARK_LOWER_FOLD, MARK_UPPER_FOLD, MARK_VIEWBOX } from "@/lib/brand";

/**
 * Small Twofold mark for the header. Animated in CSS (see globals.css): the
 * folds come together on load, then every few seconds they part a little
 * and close again.
 */
export function HeaderMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={MARK_VIEWBOX}
      className={`header-mark overflow-visible ${className}`}
    >
      <path className="header-mark-lower" fill="currentColor" d={MARK_LOWER_FOLD} />
      <path className="header-mark-upper" fill="currentColor" d={MARK_UPPER_FOLD} />
    </svg>
  );
}
