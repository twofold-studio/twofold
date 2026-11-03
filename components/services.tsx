import { Globe2, Smartphone, Laptop, Server, Plug, Wrench } from "lucide-react";
import { useI18n } from "./i18n-provider";
const icons = [Globe2, Smartphone, Laptop, Server, Plug, Wrench];
export function Services() {
  const { t } = useI18n();
  const items = [
    [t.webApps, t.webAppsNote],
    [t.mobileApps, t.mobileAppsNote],
    [t.desktopApps, t.desktopAppsNote],
    [t.backendServices, t.backendServicesNote],
    [t.integrations, t.integrationsNote],
    [t.upkeep, t.upkeepNote],
  ];
  return (
    <section id="services" className="section-shell capabilities" aria-labelledby="services-title">
      <div className="section-heading">
        <h2 id="services-title">{t.servicesHeading}</h2>
      </div>
      <div className="capability-grid">
        {items.map(([title, note], index) => {
          const Icon = icons[index]!;
          return (
            <article key={title}>
              <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{note}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
