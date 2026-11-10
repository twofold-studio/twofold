"use client";
import { useI18n } from "./i18n-provider";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeaderMark } from "./header-mark";
import { LanguageToggle } from "./language-toggle";
import { ThemeSwitch } from "./theme-switch";
import { pauseSmoothScroll } from "./smooth-scroll";

type Dictionary = ReturnType<typeof useI18n>["t"];

/** The sections visitors look for most, in page order. */
const primaryLinks = (t: Dictionary) => [
  { id: "projects", label: t.work },
  { id: "services", label: t.services },
  { id: "about", label: t.team },
  { id: "process", label: t.results },
];

/** The phone menu adds the questions; contact is its button. */
const menuLinks = (t: Dictionary) => [...primaryLinks(t), { id: "faq", label: t.questions }];

/** The home-page section in view, for the underline under its link. */
function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const ids = ["projects", "services", "about", "process", "faq", "contact"];
    const update = () => {
      const line = window.scrollY + window.innerHeight / 3;
      const current = ids
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element))
        .reverse()
        .find((element) => element.offsetTop <= line);
      setActive(current?.id ?? null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [enabled]);
  return active;
}

/** Solid once the page has scrolled; out of the way while reading down, back on the way up. */
function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return { scrolled, hidden };
}

export function Header({ home }: { home: boolean }) {
  const {
    locale,
    t,
    content: { studio },
  } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  const active = useActiveSection(home);
  const { scrolled, hidden } = useScrollState();
  const href = (id: string) => `/${locale}#${id}`;
  const isCurrent = (id: string) => home && active === id;

  // The phone menu covers the page: lock scrolling, focus its first link,
  // close it with Escape or when the screen becomes wide enough for the bar.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const wide = window.matchMedia("(min-width: 1024px)");
    const close = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      menuButton.current?.focus();
    };
    root.style.overflow = "hidden";
    pauseSmoothScroll(true);
    firstMenuLink.current?.focus();
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    return () => {
      root.style.overflow = "";
      pauseSmoothScroll(false);
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
    };
  }, [menuOpen]);

  // No backdrop blur while the menu is open: it would trap the full-screen panel inside the bar.
  const surface = menuOpen
    ? "border-border bg-background"
    : scrolled
      ? "border-border bg-background/85 backdrop-blur-md"
      : "border-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${surface} ${
        hidden && !menuOpen ? "-translate-y-full focus-within:translate-y-0" : ""
      }`}
    >
      <div className="container-site flex h-16 items-center lg:h-[4.5rem]">
        <a
          href={`/${locale}`}
          className="focus-ring flex shrink-0 items-center gap-2.5 rounded-md text-body font-medium text-foreground"
        >
          <HeaderMark className="h-5 w-5" />
          {studio.name}
        </a>

        <nav aria-label={t.mainNavigation} className="ml-12 hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryLinks(t).map((link) => (
              <li key={link.id}>
                <a
                  href={href(link.id)}
                  aria-current={isCurrent(link.id) ? "location" : undefined}
                  className={`focus-ring relative rounded-sm py-2 text-small font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                    isCurrent(link.id)
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <LanguageToggle />
          <ThemeSwitch />
          <a href={href("contact")} className="btn btn-primary btn-sm hidden md:inline-flex">
            {t.contactUs}
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            className="focus-ring -mr-2 flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          data-lenis-prevent
          aria-label={t.mainNavigation}
          className="menu-enter fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-background lg:hidden"
        >
          <div className="container-site flex flex-col pb-10 pt-6">
            <ul className="border-t border-border">
              {menuLinks(t).map((link, index) => (
                <li key={link.id} className="border-b border-border">
                  <a
                    ref={index === 0 ? firstMenuLink : undefined}
                    href={href(link.id)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isCurrent(link.id) ? "location" : undefined}
                    className="focus-ring flex items-center justify-between py-4 text-h3 font-medium text-foreground"
                  >
                    {link.label}
                    <ArrowRight size={20} aria-hidden="true" className="text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={href("contact")}
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary mt-10"
            >
              {t.contactUs}
            </a>
            <a
              href={`mailto:${studio.email}`}
              className="link focus-ring mt-6 self-start text-small text-muted-foreground"
            >
              {studio.email}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
