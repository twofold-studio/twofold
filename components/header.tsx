import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { HeaderMark } from "./header-mark";
import { LanguageToggle } from "./language-toggle";
import { useOverlay } from "@/lib/overlay-context";
export function Header() {
  const {
    locale,
    t,
    content: { studio },
  } = useI18n();
  const [open, setOpen] = useState(false);
  const { isOverlayOpen } = useOverlay();
  const links = [
    ["projects", t.work],
    ["services", t.services],
    ["about", t.team],
    ["contact", t.contact],
  ];
  return (
    <header className="site-header" hidden={isOverlayOpen}>
      <div className="section-shell header-inner">
        <a className="brand" href={`/${locale}`}>
          <HeaderMark className="h-7 w-7" />
          <span>{studio.name}</span>
        </a>
        <nav className="desktop-nav" aria-label={t.navigation}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-settings">
          <LanguageToggle />
          <button
            className="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={t.menuShort}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={t.navigation}>
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
