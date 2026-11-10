"use client";
import { useI18n } from "./i18n-provider";

import { useReveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function ServiceRow({ title, note }: { title: string; note: string }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className="reveal-group reveal-rule grid gap-2 py-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10 md:py-8"
    >
      <h3 className="reveal-item text-h3 font-medium text-foreground">{title}</h3>
      <p
        className="reveal-item text-body text-muted-foreground md:pt-0.5"
        style={{ transitionDelay: "100ms" }}
      >
        {note}
      </p>
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
    <section id="services" aria-labelledby="services-heading" className="section">
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
