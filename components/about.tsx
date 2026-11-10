"use client";
import { useI18n } from "./i18n-provider";

import { ArrowUpRight } from "lucide-react";
import type { Founder } from "@/lib/content";
import { useReveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * The original site's founder card: soft filled card, grayscale portrait on the
 * left, role in capitals, a large name, the bio, facts with gold dots and
 * pill links. The cards sit side by side, which is narrower than on the
 * original, so the facts and links run under the photo instead of beside it.
 * That keeps the text beside the photo short enough for the photo to show in
 * full: its frame is always 4:5, the photos' own shape, and never stretches.
 */
function FounderCard({ founder }: { founder: Founder }) {
  const { t } = useI18n();
  const ref = useReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      className="grid overflow-hidden rounded-[2rem] bg-muted/60 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <div className="relative aspect-4/5 w-full self-start bg-muted">
        <img
          src={founder.photo}
          alt={`${t.portrait} ${founder.name}`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, (min-width: 640px) 40vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
      </div>

      <div className="p-7 pb-0 lg:p-8 lg:pb-0">
        <p className="text-small font-medium uppercase tracking-widest text-muted-foreground">
          {founder.role}
        </p>
        <h3 className="mt-3 text-3xl font-medium tracking-tight text-foreground">{founder.name}</h3>
        <p className="mt-5 text-body text-foreground/80">{founder.bio}</p>
      </div>

      <div className="px-7 pb-7 pt-6 sm:col-span-2 md:col-span-1 lg:col-span-2 lg:px-8 lg:pb-8">
        <ul className="flex flex-col gap-2 border-t border-border pt-5 text-small text-muted-foreground">
          {founder.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {founder.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-2 text-small font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
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
