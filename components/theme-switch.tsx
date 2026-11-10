"use client";
import { useI18n } from "./i18n-provider";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type ReactNode } from "react";

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const button =
  "focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-opacity duration-300";

export function ThemeSwitch(): ReactNode {
  const { t } = useI18n();
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          className={`${button} opacity-40`}
          aria-label={t.toggleTheme}
          disabled
        />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`${button} opacity-60 hover:opacity-100`}
        aria-label={isDark ? t.lightTheme : t.darkTheme}
        aria-pressed={isDark}
      >
        {isDark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
