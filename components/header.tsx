"use client";
import { useI18n } from "./i18n-provider";

import { useEffect, useRef, useState } from "react";
import { HeaderMark } from "@/components/header-mark";
import { LanguageToggle } from "./language-toggle";

type Dictionary = ReturnType<typeof useI18n>["t"];

const sections = (t: Dictionary) => [
  { id: "hero", label: t.home },
  { id: "projects", label: t.work },
  { id: "services", label: t.services },
  { id: "about", label: t.team },
  { id: "process", label: t.results },
  { id: "faq", label: t.questions },
  { id: "contact", label: t.contact },
];

/** Tracks which home-page section is in view, for the menu button's label. */
function useActiveSection(enabled: boolean, t: Dictionary): string {
  const [active, setActive] = useState(enabled ? "hero" : "projects");
  useEffect(() => {
    if (!enabled) return;
    const update = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
      if (nearBottom) return setActive("contact");
      const line = window.scrollY + window.innerHeight / 3;
      const current = sections(t)
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element))
        .reverse()
        .find((element) => element.offsetTop <= line);
      setActive(current?.id ?? "hero");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [enabled, t]);
  return active;
}

export function Header({ home }: { home: boolean }) {
  const {
    locale,
    t,
    content: { studio },
  } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(home, t);
  const activeLabel = sections(t).find((section) => section.id === active)?.label ?? t.home;

  useEffect(() => {
    if (!isMenuOpen) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (
        event instanceof KeyboardEvent
          ? event.key === "Escape"
          : !menuRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [isMenuOpen]);

  const pill = "rounded-2xl bg-neutral-900/75 text-white shadow-lg backdrop-blur-lg";

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4 sm:py-6">
      <div className="container-site flex items-center gap-2 sm:gap-3">
        <a
          href={`/${locale}`}
          className={`focus-ring flex h-12 shrink-0 items-center gap-2 px-4 text-body font-medium ${pill}`}
        >
          <HeaderMark className="h-5 w-5" />
          <span className="max-[400px]:sr-only">{studio.name}</span>
        </a>

        <LanguageToggle className="ml-auto" />
        <a
          href={`/${locale}#contact`}
          className="focus-ring hidden h-12 shrink-0 items-center rounded-2xl bg-white px-5 text-small font-medium text-neutral-950 shadow-lg transition-colors hover:bg-white/90 md:inline-flex"
        >
          {t.contactUs}
        </a>

        <div ref={menuRef} className="relative h-12 w-24 shrink-0 sm:w-52">
          <div
            className={`absolute right-0 top-0 w-44 overflow-hidden sm:w-52 ${isMenuOpen ? "" : "max-sm:w-24"} ${pill}`}
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              aria-label={`${t.menu} ${activeLabel}`}
              className="focus-ring flex h-12 w-full items-center justify-between gap-3 px-4"
            >
              <span className="text-body font-medium">
                <span className="sm:hidden">{t.menuShort}</span>
                <span className="hidden sm:inline">{activeLabel}</span>
              </span>
              <span
                aria-hidden="true"
                className={`relative h-4 w-4 transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
              >
                <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
              </span>
            </button>

            {isMenuOpen && (
              <nav id="site-menu" aria-label={t.navigation} className="menu-enter px-4 pb-4">
                <ul className="flex flex-col">
                  {sections(t).map((section) => (
                    <li key={section.id}>
                      <a
                        href={section.id === "hero" ? `/${locale}` : `/${locale}#${section.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={home && section.id === active ? "true" : undefined}
                        className={`block py-1.5 text-body font-medium transition-colors hover:text-white ${
                          home && section.id === active
                            ? "text-white underline underline-offset-4"
                            : "text-white/70"
                        }`}
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
