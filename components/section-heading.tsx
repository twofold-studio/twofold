import type { ReactNode } from "react";

/** The small label, heading and optional action that open every section. */
export function SectionHeading({
  id,
  label,
  children,
  action,
  className = "mb-12 md:mb-16",
}: {
  id: string;
  label: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="max-w-3xl">
        <p className="eyebrow">{label}</p>
        <h2 id={id} className="mt-4 text-h2 font-medium text-foreground">
          {children}
        </h2>
      </div>
      {action}
    </div>
  );
}
