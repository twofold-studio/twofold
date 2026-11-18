"use client";
import { ArrowUpRight } from "lucide-react";
import type { Founder } from "@/lib/content";
import { useI18n } from "./i18n-provider";

function FounderCard({ founder }: { founder: Founder }) {
  const { t } = useI18n();
  return (
    <article className="founder-profile grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-x-5 gap-y-4 border-t border-border pt-6 sm:grid-cols-[6rem_minmax(0,1fr)]">
      <img
        src={founder.photo}
        alt={`${t.portrait} ${founder.name}`}
        width={800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="aspect-4/5 w-full rounded-lg object-cover grayscale"
      />
      <div className="min-w-0 self-center">
        <h3 className="text-lead font-medium">{founder.name}</h3>
        <p className="mt-1 text-small text-accent">{founder.role}</p>
        <div className="mt-2 flex flex-wrap gap-x-4">
          {founder.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link focus-ring inline-flex min-h-11 items-center gap-1 text-small"
            >
              {link.label}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <p className="col-span-2 text-body text-muted-foreground">{founder.bio}</p>
      <details className="col-span-2 text-small">
        <summary className="focus-ring w-fit cursor-pointer py-2 text-muted-foreground">
          {t.background}
        </summary>
        <ul className="flex flex-col gap-2 pb-2 pt-3 text-muted-foreground">
          {founder.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </details>
    </article>
  );
}
export function About() {
  const {
    t,
    content: { founders },
  } = useI18n();
  return (
    <section id="about" aria-labelledby="team-heading" className="section band">
      <div className="container-site">
        <div className="mb-8 grid gap-5 md:grid-cols-2 md:gap-12">
          <h2 id="team-heading" className="text-h2 font-medium">
            {t.aboutBefore}
            <br />
            <span className="text-accent">{t.aboutEmphasis}</span>
          </h2>
          <p className="max-w-lg self-end text-body text-muted-foreground">{t.aboutCopy}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  );
}
