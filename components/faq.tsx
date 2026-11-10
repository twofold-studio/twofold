"use client";
import { useI18n } from "./i18n-provider";

import { SectionHeading } from "./section-heading";

/** Native <details> elements: keyboard and screen-reader support without JavaScript. */
export function Faq() {
  const {
    t,
    content: { faqs },
  } = useI18n();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <SectionHeading id="faq-heading" label={t.questions} className="self-start">
          {t.faqBefore} <span className="text-accent">{t.faqEmphasis}</span>
        </SectionHeading>
        <div className="border-t border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-border">
              <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lead font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="relative mt-2 h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
                >
                  <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-current" />
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-body text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
