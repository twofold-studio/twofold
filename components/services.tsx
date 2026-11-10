"use client";
import { useI18n } from "./i18n-provider";

import { useRef } from "react";
import { SectionHeading } from "./section-heading";
import { useScrubIn } from "./scrub-in";

/** Each row rises into place with the scroll, like the FAQ cards. */
function ServiceRow({ title, note }: { title: string; note: string }) {
  const ref = useRef<HTMLLIElement>(null);
  useScrubIn(ref, ref, { y: 40, duration: 0.6, start: "top 92%", end: "top 72%" });
  return (
    <li
      ref={ref}
      className="grid gap-2 border-b border-border py-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 md:py-8"
    >
      <h3 className="text-h3 font-medium text-foreground">{title}</h3>
      <p className="text-body text-muted-foreground md:pt-0.5">{note}</p>
    </li>
  );
}

export function Services() {
  const { t } = useI18n();
  const services = [
    { title: t.webApps, note: t.webAppsNote },
    { title: t.mobileApps, note: t.mobileAppsNote },
    { title: t.desktopApps, note: t.desktopAppsNote },
    { title: t.backendServices, note: t.backendServicesNote },
    { title: t.integrations, note: t.integrationsNote },
    { title: t.upkeep, note: t.upkeepNote },
  ];

  return (
    <section id="services" aria-labelledby="services-heading" className="section band">
      <div className="container-site">
        <SectionHeading id="services-heading" label={t.services}>
          {t.servicesHeading}
        </SectionHeading>
        <ul className="border-t border-border">
          {services.map((service) => (
            <ServiceRow key={service.title} title={service.title} note={service.note} />
          ))}
        </ul>
        <a href="#contact" className="btn btn-secondary mt-10">
          {t.startProject}
        </a>
      </div>
    </section>
  );
}
