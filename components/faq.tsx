"use client";
import { Plus } from "lucide-react";
import { useI18n } from "./i18n-provider";

export function Faq() {
  const {
    t,
    content: { faqs },
  } = useI18n();
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section border-t border-border">
      <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <h2 id="faq-heading" className="text-h3 font-medium">
          {t.faqBefore} {t.faqEmphasis}
        </h2>
        <div>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-detail group border-b border-border">
              <summary className="focus-ring flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-body font-medium">
                <h3>{faq.question}</h3>
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-accent transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-5 text-body text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
