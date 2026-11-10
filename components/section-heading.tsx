"use client";

import type { ReactNode } from "react";
import { useReveal } from "./reveal";

/**
 * The small label, heading and optional action that open every section. When
 * it scrolls into view, the label fades up and the heading rises out of a mask,
 * the same way the hero headline enters (.reveal-* in styles.css).
 */
export function SectionHeading({
  id,
  label,
  children,
  action,
  align = "start",
  reveal = true,
  className = "mb-12 md:mb-16",
}: {
  id: string;
  label: string;
  children: ReactNode;
  action?: ReactNode;
  /** "center" stacks the label and heading in the middle (used by the FAQ). */
  align?: "start" | "center";
  /** false when the section animates the heading itself (the FAQ). */
  reveal?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={reveal ? ref : undefined}
      className={`reveal-group flex flex-wrap gap-6 ${
        centered ? "flex-col items-center text-center" : "items-end justify-between"
      } ${className}`}
    >
      <div className="max-w-3xl">
        <p className={`eyebrow reveal-item ${centered ? "justify-center" : ""}`}>{label}</p>
        <h2 id={id} className="mt-4 text-h2 font-medium text-foreground">
          <span className="reveal-mask">
            <span className="reveal-line">{children}</span>
          </span>
        </h2>
      </div>
      {action && (
        <div className="reveal-item" style={{ transitionDelay: "200ms" }}>
          {action}
        </div>
      )}
    </div>
  );
}
