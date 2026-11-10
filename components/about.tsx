"use client";
import { useI18n } from "./i18n-provider";

import { ArrowUpRight } from "lucide-react";
import type { Founder } from "@/lib/content";
import { useReveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function FounderCard({ founder }: { founder: Founder }) {
  const { t } = useI18n();
  const ref = useReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      className="flex flex-col overflow-hidden rounded-2xl border border-border sm:flex-row md:flex-col xl:flex-row"
    >
      <div className="relative aspect-4/5 w-full shrink-0 bg-muted sm:w-2/5 md:w-full xl:w-2/5">
        <img
          src={founder.photo}
          alt={`${t.portrait} ${founder.name}`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 45vw, (min-width: 640px) 40vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <p className="text-small text-muted-foreground">{founder.role}</p>
        <h3 className="mt-2 text-h3 font-medium text-foreground">{founder.name}</h3>
        <p className="mt-4 text-body text-foreground/85">{founder.bio}</p>
        <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-5 text-small text-muted-foreground">
          {founder.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          {founder.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function About() {
  const {
    t,
    content: { founders },
  } = useI18n();

  return (
    <section id="about" aria-labelledby="team-heading" className="section">
      <div className="container-site">
        <SectionHeading id="team-heading" label={t.team}>
          {t.aboutBefore} <span className="text-accent">{t.aboutEmphasis}</span>
          {t.aboutAfter}
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  );
}
