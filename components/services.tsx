"use client";
import { ArrowUpRight } from "lucide-react";
import { pagePath } from "@/lib/pages";
import { useI18n } from "./i18n-provider";

export function Services() {
  const { locale, t } = useI18n();
  const services = [
    {
      title: t.websitesShops,
      copy: t.websitesShopsCopy,
      href: pagePath(locale, { kind: "work", slug: "bukinistika" }),
    },
    {
      title: t.appsIntegrations,
      copy: t.appsIntegrationsCopy,
      href: pagePath(locale, { kind: "work", slug: "chunkyard" }),
    },
    { title: t.upkeep, copy: t.supportShort, href: "#process" },
  ];
  return (
    <section id="services" aria-labelledby="services-heading" className="container-site">
      <h2 id="services-heading" className="sr-only">
        {t.servicesHeading}
      </h2>
      <ul className="service-intro grid gap-x-8 sm:grid-cols-3">
        {services.map((service) => (
          <li key={service.title} className="min-w-0 py-4 sm:py-5">
            <h3>
              <a
                href={service.href}
                className="focus-ring group inline-flex min-h-11 items-center gap-2 text-body font-medium"
              >
                {service.title}
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </h3>
            <p className="max-w-xs text-small text-muted-foreground">{service.copy}</p>
          </li>
        ))}
      </ul>
      <details className="service-more border-b border-border pb-3 text-small text-muted-foreground">
        <summary className="focus-ring w-fit cursor-pointer py-2">
          {t.backgroundCapabilities}
        </summary>
        <p className="max-w-2xl pb-2 pt-2">{t.otherCapabilities}</p>
      </details>
    </section>
  );
}
