"use client";
import { useI18n } from "./i18n-provider";

export function Process() {
  const { t } = useI18n();
  const steps = [
    { title: t.processIdeaTitle, copy: t.processIdeaCopy },
    { title: t.processTryTitle, copy: t.processTryCopy },
    { title: t.processRefineTitle, copy: t.processRefineCopy },
    { title: t.processLaunchTitle, copy: t.processLaunchCopy },
    { title: t.processHandoverTitle, copy: t.processHandoverCopy },
  ];
  return (
    <section id="process" aria-labelledby="process-heading" className="section">
      <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          <p className="eyebrow">{t.results}</p>
          <h2 id="process-heading" className="mt-4 max-w-sm text-h2 font-medium">
            {t.processBefore} <span className="text-accent">{t.processEmphasis}</span>
          </h2>
        </div>
        <ol>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t border-border py-4 sm:grid-cols-[2rem_minmax(0,2fr)_minmax(0,3fr)] sm:gap-x-4"
            >
              <span className="pt-1 text-small text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-body font-medium">{step.title}</h3>
              <p className="col-start-2 mt-1 text-small text-muted-foreground sm:col-start-auto sm:mt-0">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
