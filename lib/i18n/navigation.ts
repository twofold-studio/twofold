import { LOCALE_COOKIE, type Locale } from "./config";

/**
 * Opens the same page, at the same place, in another language, and remembers
 * the choice for the next visit to `/`.
 */
export function switchLocale(to: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
  const path = window.location.pathname.replace(/^\/(en|bg)(?=\/|$)/, `/${to}`);
  window.location.assign(`${path}${window.location.hash}`);
}
