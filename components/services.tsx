"use client";
import { ArrowUpRight } from "lucide-react";
import { pagePath } from "@/lib/pages";
import { useI18n } from "./i18n-provider";

export function Services() {
  const { locale, t } = useI18n();
  // A service links to a case study only when one shows that kind of work.
  const services: { title: string; copy: string; example?: string }[] = [
    { title: t.websitesShops, copy: t.websitesShopsCopy, example: "bukinistika" },
    { title: t.appsIntegrations, copy: t.appsIntegrationsCopy, example: "chunkyard" },
    { title: t.mobileDesktopApps, copy: t.mobileDesktopAppsCopy },
    { title: t.upkeep, copy: t.supportShort },
  ];
  return (
    <section id="services" aria-labelledby="services-heading" className="container-site">
      <h2 id="services-heading" className="sr-only">
        {t.servicesHeading}
      </h2>
      <ul className="service-intro grid gap-x-8 border-b border-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.title} className="min-w-0 py-4 sm:py-5">
            <h3 className="flex min-h-11 items-center text-body font-medium">
              {service.example ? (
                <a
                  href={pagePath(locale, { kind: "work", slug: service.example })}
                  className="focus-ring group inline-flex min-h-11 items-center gap-2"
                >
                  {service.title}
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                service.title
              )}
            </h3>
            <p className="max-w-xs text-small text-muted-foreground">{service.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
