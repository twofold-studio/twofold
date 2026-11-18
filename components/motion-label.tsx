/** Two visual copies share one accessible label; the second rolls in on hover/focus. */
export function MotionLabel({ children }: { children: string }) {
  return (
    <span className="motion-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
