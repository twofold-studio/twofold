"use client";
import { useI18n } from "./i18n-provider";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { pagePath } from "@/lib/pages";
import { ResponsiveImage } from "./responsive-image";

/** One project on its own page, at /{locale}/work/{slug}. */
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
          <header>
            <p className="eyebrow">{project.kind}</p>
            <h1 id="case-title" className="mt-4 text-display font-medium text-foreground">
              {project.name}
            </h1>
            <p className="mt-2 text-h3 text-accent">{project.kicker}</p>
          </header>

          <div className="flex flex-col gap-6 lg:pt-3">
            {project.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lead text-foreground/85">
                {paragraph}
              </p>
            ))}
            <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-8 border-t border-border pt-6 text-small">
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
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-fit"
              >
                {project.link.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-16">
          {project.images.map((image, i) => (
            <figure key={image.src}>
              <ResponsiveImage
                src={image.src}
                alt={image.caption}
                sizes="(min-width: 1216px) 1120px, 92vw"
                eager={i === 0}
                className="h-auto w-full rounded-2xl border border-border"
              />
              <figcaption className="mt-4 max-w-2xl text-small text-muted-foreground">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>

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
