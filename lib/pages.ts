import type { Locale } from "./i18n/config";

/** Localized home, complete Work index and existing project detail routes. */
export type Page = { kind: "home" } | { kind: "work-index" } | { kind: "work"; slug: string };

const WORK_PATH = /^\/(?:en|bg)\/work\/([a-z0-9-]+)\/?$/;

export function pageFromPath(pathname: string): Page {
  if (/^\/(?:en|bg)\/work\/?$/.test(pathname)) return { kind: "work-index" };
  const slug = WORK_PATH.exec(pathname)?.[1];
  return slug ? { kind: "work", slug } : { kind: "home" };
}

export function pagePath(locale: Locale, page: Page): string {
  if (page.kind === "work") return `/${locale}/work/${page.slug}`;
  return page.kind === "work-index" ? `/${locale}/work` : `/${locale}`;
}
