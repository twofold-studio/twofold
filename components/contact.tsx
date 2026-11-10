"use client";
import { useI18n } from "./i18n-provider";

import { SectionHeading } from "./section-heading";

export function Contact() {
  const {
    t,
    content: { studio },
  } = useI18n();
  const mailto = `mailto:${studio.email}?subject=${encodeURIComponent(t.emailSubject)}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section border-t border-border"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          <SectionHeading id="contact-heading" label={t.contact} className="mb-6">
            {t.footerIntro}
          </SectionHeading>
          <p className="max-w-md text-body text-muted-foreground">{t.footerLocation}</p>
        </div>
        <div className="lg:pt-10">
          <a
            href={mailto}
            className="link focus-ring inline-block text-h3 font-medium text-foreground [overflow-wrap:anywhere]"
          >
            {studio.email}
          </a>
          <div className="mt-8">
            <a href={mailto} className="btn btn-primary">
              {t.startProject}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
