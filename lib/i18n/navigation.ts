import { LOCALE_COOKIE, type Locale } from "./config";

/**
 * Goes to the same place on the page in another language, and remembers the
 * choice for the next visit to `/`.
 */
export function switchLocale(to: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
  window.location.assign(`/${to}${window.location.hash}`);
}
