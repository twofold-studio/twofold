import type { ReactNode } from "react";
export const metadata = { robots: { index: false, follow: true } };
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
