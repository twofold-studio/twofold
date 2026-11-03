import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  matchLocale,
  LOCALE_COOKIE,
  DEFAULT_LOCALE,
} from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const languages = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      const q = quality ? Number(quality.trim().slice(2)) : 1;
      return { locale: matchLocale(tag), q, index };
    })
    .filter((item) => item.locale && item.q > 0 && item.q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const locale =
    saved && isLocale(saved) ? saved : (languages[0]?.locale ?? DEFAULT_LOCALE);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: "/" };
