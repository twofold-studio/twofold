"use client";
import { useI18n } from "./i18n-provider";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

/** Page background per theme, for the browser bar on phones (meta theme-color). */
const BROWSER_BAR = { dark: "#0b0d0c", light: "#f3f0e8" } as const;

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const button =
  "focus-ring flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground";

/**
 * The light/dark switch in the header. Its label says what a press will do,
 * so it is a plain button rather than an on/off toggle.
 */
export function ThemeSwitch(): ReactNode {
  const { t } = useI18n();
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    if (!mounted) return;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", BROWSER_BAR[isDark ? "dark" : "light"]);
  }, [mounted, isDark]);

  // The theme is only known in the browser; until then, a placeholder of the same size.
  if (!mounted) {
    return <span aria-hidden="true" className="h-10 w-10" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={button}
      aria-label={isDark ? t.lightTheme : t.darkTheme}
      title={isDark ? t.lightTheme : t.darkTheme}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
