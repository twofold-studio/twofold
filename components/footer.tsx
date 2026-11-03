import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { HeaderMark } from "./header-mark";
const year = new Date().getFullYear();
export function Footer() {
  const {
    t,
    content: { studio },
  } = useI18n();
  return (
    <footer id="contact" className="section-shell contact-section">
      <div className="contact-main">
        <div>
          <p className="eyebrow">{t.contact}</p>
          <a
            className="contact-email"
            href={`mailto:${studio.email}?subject=${encodeURIComponent(t.emailSubject)}`}
          >
            {studio.email}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p>{t.footerLocation}</p>
      </div>
      <div className="footer-bottom">
        <span className="brand">
          <HeaderMark className="h-5 w-5" />
          {studio.name}
        </span>
        <span>© {year}</span>
        <span>{t.footerCredit}</span>
      </div>
    </footer>
  );
}
