"use client";
import { useI18n } from "./i18n-provider";

import { EnquiryForm } from "./enquiry-form";
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
      className="section relative border-t border-border"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          <SectionHeading id="contact-heading" label={t.contact} className="mb-6">
            {t.footerIntro}
          </SectionHeading>
          <p className="max-w-md text-body text-muted-foreground">{t.footerLocation}</p>
          <p className="mt-10 text-small text-muted-foreground">{t.preferEmail}</p>
          <a
            href={mailto}
            className="link focus-ring mt-2 inline-block text-h3 font-medium text-foreground [overflow-wrap:anywhere]"
          >
            {studio.email}
          </a>
        </div>
        <div className="lg:pt-10">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
