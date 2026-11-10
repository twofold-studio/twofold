import { MARK_LOWER_FOLD, MARK_UPPER_FOLD, MARK_VIEWBOX } from "@/lib/brand";

/**
 * Small Twofold mark for the header and footer. Animated in CSS (see
 * src/styles.css): the folds come together on load, then every few seconds
 * they part a little and close again. The 1em size only applies until the
 * stylesheet's own size classes load, so the mark can never fill the screen.
 */
export function HeaderMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox={MARK_VIEWBOX}
      className={`header-mark overflow-visible ${className}`}
    >
      <path className="header-mark-lower" fill="currentColor" d={MARK_LOWER_FOLD} />
      <path className="header-mark-upper" fill="currentColor" d={MARK_UPPER_FOLD} />
    </svg>
  );
}
