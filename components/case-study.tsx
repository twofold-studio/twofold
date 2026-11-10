"use client";
import { useI18n } from "./i18n-provider";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { WorkImage } from "@/lib/content";
import { pagePath } from "@/lib/pages";
import { ResponsiveImage } from "./responsive-image";

/**
 * One project on its own page, at /{locale}/work/{slug}: the title and the
 * link to the live site, the cover image straight away (the work is the point),
 * then the story with what it includes, then the other screenshots.
 */
export function CaseStudy({ slug }: { slug: string }) {
  const {
    locale,
    t,
    content: { work },
  } = useI18n();
  const index = work.findIndex((project) => project.slug === slug);
  const project = work[index];
  const next = work[(index + 1) % work.length];
  if (!project || !next) return null;
  const [cover, ...rest] = project.images;

  // The caption is shown under the image, so the image itself gets a short description.
  const shot = (image: WorkImage, eager = false) => (
    <figure key={image.src}>
      <ResponsiveImage
        src={image.src}
        alt={`${t.screenshot}: ${project.name}`}
        sizes="(min-width: 1216px) 1120px, 92vw"
        eager={eager}
        className="h-auto w-full rounded-2xl border border-border"
      />
      <figcaption className="mt-4 max-w-2xl text-small text-muted-foreground">
        {image.caption}
      </figcaption>
    </figure>
  );

  return (
    <article aria-labelledby="case-title" className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-site">
        <a
          href={`/${locale}#projects`}
          className="focus-ring inline-flex items-center gap-2 text-small text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.allProjects}
        </a>

        <header className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className="eyebrow">{project.kind}</p>
            <h1 id="case-title" className="mt-4 text-display font-medium text-foreground">
              {project.name}
            </h1>
            <p className="mt-2 text-h3 text-accent">{project.kicker}</p>
          </div>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {project.link.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </header>

        {cover && <div className="mt-10 md:mt-12">{shot(cover, true)}</div>}

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <dl className="flex flex-col gap-6 border-t border-border pt-6 text-small lg:self-start">
            <div>
              <dt className="mb-2 text-muted-foreground">{t.includes}</dt>
              <dd className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-border px-3 py-1 text-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-muted-foreground">{t.year}</dt>
              <dd className="text-foreground">{project.year}</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-6">
            {project.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lead text-foreground/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {rest.length > 0 && (
          <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-16">
            {rest.map((image) => shot(image))}
          </div>
        )}

        <nav aria-label={t.nextProject} className="mt-24 border-t border-border pt-10">
          <a
            href={pagePath(locale, { kind: "work", slug: next.slug })}
            className="focus-ring group inline-flex flex-col gap-2"
          >
            <span className="text-small text-muted-foreground">{t.nextProject}</span>
            <span className="inline-flex items-center gap-3 text-h2 font-medium text-foreground">
              {next.name}
              <ArrowRight
                size={28}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </a>
        </nav>
      </div>
    </article>
  );
}
