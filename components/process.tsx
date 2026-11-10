"use client";
import { useI18n } from "./i18n-provider";

import { useReveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Process() {
  const { t } = useI18n();
  const noteRef = useReveal<HTMLDivElement>();
  const stepsRef = useReveal<HTMLOListElement>();
  const steps = [
    { title: t.processIdeaTitle, copy: t.processIdeaCopy },
    { title: t.processTryTitle, copy: t.processTryCopy },
    { title: t.processRefineTitle, copy: t.processRefineCopy },
    {
      title: t.processLaunchTitle,
      copy: t.processLaunchCopy,
      checks: [
        t.processCheckMobile,
        t.processCheckSpeed,
        t.processCheckFlows,
        t.processCheckDetails,
      ],
    },
  ];

  return (
    <section id="process" aria-labelledby="process-heading" className="section band">
      <div className="container-site">
        <SectionHeading
          id="process-heading"
          label={t.results}
          action={
            <a href="#contact" className="btn btn-secondary">
              {t.startProject}
            </a>
          }
        >
          {t.processBefore} <span className="text-accent">{t.processEmphasis}</span>
        </SectionHeading>

        <div
          ref={noteRef}
          className="grid gap-4 border-y border-border py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
        >
          <div>
            <p className="text-small font-medium text-accent">{t.processFirstVersion}</p>
            <p className="mt-2 text-h3 font-medium text-foreground">{t.processProgress}</p>
          </div>
          <p className="text-body text-muted-foreground md:pt-8">{t.processSpeedCopy}</p>
        </div>

        <ol
          ref={stepsRef}
          className="reveal-group mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal-item"
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <p className="text-small font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lead font-medium text-foreground">{step.title}</h3>
              <p className="mt-2 text-body text-muted-foreground">{step.copy}</p>
              {step.checks && (
                <ul className="mt-4 flex flex-col gap-1.5 text-small text-foreground/80">
                  {step.checks.map((check) => (
                    <li key={check} className="flex items-center gap-2.5">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {check}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
