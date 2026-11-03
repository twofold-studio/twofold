"use client";
import { useI18n } from "./i18n-provider";

import { useEffect, useState } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "motion/react";
import { useOverlay } from "@/lib/overlay-context";
import { HeaderMark } from "@/components/header-mark";
import { LanguageToggle } from "./language-toggle";

const sections = (t: ReturnType<typeof useI18n>["t"]) => [
  { id: "hero", label: t.home },
  { id: "projects", label: t.work },
  { id: "services", label: t.services },
  { id: "about", label: t.team },
  { id: "social-proof", label: t.results },
  { id: "faq", label: t.questions },
  { id: "contact", label: t.contact },
];

const menuItems = (t: ReturnType<typeof useI18n>["t"]) => [
  { label: t.home, href: "#" },
  { label: t.work, href: "#projects" },
  { label: t.services, href: "#services-menu" },
  { label: t.team, href: "#about" },
  { label: t.results, href: "#social-proof" },
  { label: t.questions, href: "#faq" },
  { label: t.contact, href: "#contact" },
];

export function Header() {
  const {
    locale,
    t,
    content: { studio },
  } = useI18n();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOverlayOpen } = useOverlay();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const isNearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
      if (isNearBottom) {
        setActiveSection("contact");
        return;
      }

      for (let i = sections(t).length - 1; i >= 0; i--) {
        const section = sections(t)[i];
        if (!section) continue;
        if (section.id === "contact") continue;
        const element =
          document.querySelector(`.${section.id}`) || document.getElementById(section.id);
        if (element) {
          const { offsetTop } = element as HTMLElement;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {!isOverlayOpen && (
          <m.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 left-0 z-50 px-4 py-6 sm:px-12 sm:py-12 lg:px-24"
          >
            <div className="3xl:max-w-550 mx-auto flex max-w-360 items-center justify-between gap-4 2xl:max-w-450">
              <m.a
                href={`/${locale}`}
                className="flex h-12 shrink-0 items-center justify-center rounded-xl bg-neutral-900/70 px-4 text-base font-medium tracking-tight text-white shadow-lg backdrop-blur-lg sm:h-16 sm:rounded-2xl sm:px-5 sm:text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HeaderMark className="mr-2 h-5 w-5 sm:mr-2.5 sm:h-6 sm:w-6" />
                {studio.name}
              </m.a>

              <LanguageToggle className="ml-auto hidden sm:flex" />
              <div className="relative h-12 w-32 shrink-0 sm:h-16 sm:w-60">
                <m.div
                  className="absolute top-0 right-0 w-32 overflow-hidden rounded-xl bg-neutral-900/70 shadow-lg backdrop-blur-lg sm:w-60 sm:rounded-2xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label={`${t.menu} ${sections(t).find((section) => section.id === activeSection)?.label ?? t.home}`}
                    className="focus-ring flex h-12 w-full items-center justify-between gap-4 px-4 text-white sm:h-16 sm:px-5"
                  >
                    <span className="text-base font-medium sm:text-lg">
                      <span className="sm:hidden">{t.menuShort}</span>
                      <span className="hidden sm:inline">
                        {sections(t).find((section) => section.id === activeSection)?.label ??
                          t.home}
                      </span>
                    </span>
                    <m.div
                      className="relative h-5 w-5 sm:h-6 sm:w-6"
                      animate={{ rotate: isMenuOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="absolute top-0 left-1/2 h-5 w-[1.5px] -translate-x-1/2 bg-current sm:h-6" />
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-5 -translate-y-1/2 bg-current sm:w-6" />
                    </m.div>
                  </button>

                  <AnimatePresence>
                    {isMenuOpen && (
                      <m.nav
                        className="px-3 pb-5 sm:px-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <LanguageToggle className="mb-4 sm:hidden" />
                        <ul className="flex flex-col gap-1">
                          {menuItems(t).map((item, index) => (
                            <m.li
                              key={item.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.05 * index,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <a
                                href={item.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveSection(
                                    item.href === "#"
                                      ? "hero"
                                      : item.href === "#services-menu"
                                        ? "services"
                                        : item.href.slice(1),
                                  );
                                }}
                                className={`block py-1.5 text-lg font-medium transition-colors hover:text-white ${
                                  sections(t).find((section) => section.id === activeSection)
                                    ?.label === item.label
                                    ? "text-white underline underline-offset-4"
                                    : "text-white/60"
                                }`}
                              >
                                {item.label}
                              </a>
                            </m.li>
                          ))}
                        </ul>
                      </m.nav>
                    )}
                  </AnimatePresence>
                </m.div>
              </div>
            </div>
          </m.header>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
