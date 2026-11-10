import type { Locale } from "./i18n/config";

/** The two kinds of page: the studio home page and one case study per project. */
export type Page = { kind: "home" } | { kind: "work"; slug: string };

const WORK_PATH = /^\/(?:en|bg)\/work\/([a-z0-9-]+)\/?$/;

export function pageFromPath(pathname: string): Page {
  const slug = WORK_PATH.exec(pathname)?.[1];
  return slug ? { kind: "work", slug } : { kind: "home" };
}

export function pagePath(locale: Locale, page: Page): string {
  return page.kind === "work" ? `/${locale}/work/${page.slug}` : `/${locale}`;
}
