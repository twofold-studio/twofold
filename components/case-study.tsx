"use client";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { WorkImage } from "@/lib/content";
import { pagePath } from "@/lib/pages";
import { useI18n } from "./i18n-provider";
import { ResponsiveImage } from "./responsive-image";

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
  const sections = [
    { title: t.challenge, copy: project.challenge },
    { title: t.solution, copy: project.solution },
    { title: t.result, copy: project.result },
  ];
  const shot = (image: WorkImage, eager = false) => (
    <figure key={image.src} className="min-w-0">
      <ResponsiveImage
        src={image.src}
        alt={image.caption}
        sizes={
          eager
            ? "(min-width: 1216px) 1120px, 92vw"
            : "(min-width: 1216px) 544px, (min-width: 768px) 45vw, 92vw"
        }
        eager={eager}
        className="h-auto w-full rounded-2xl border border-foreground/20"
      />
      <figcaption className="mt-3 max-w-3xl text-small text-muted-foreground">
        {image.caption}
      </figcaption>
    </figure>
  );
  return (
    <article aria-labelledby="case-title" className="pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="container-site">
        <a
          href={pagePath(locale, { kind: "work-index" })}
          className="link focus-ring inline-flex min-h-11 items-center gap-2 text-small text-muted-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.allProjects}
        </a>
        <header className="mt-6">
          <p className="eyebrow">{project.kind}</p>
          <h1 id="case-title" className="mt-4 text-display font-medium">
            {project.name}
          </h1>
          <p className="mt-3 text-h3 text-accent">{project.kicker}</p>
          {/* The kicker already introduces the summary; the heading is for screen readers. */}
          <section aria-labelledby="summary-heading" className="mt-6 max-w-3xl">
            <h2 id="summary-heading" className="sr-only">
              {t.projectSummary}
            </h2>
            <p className="text-lead text-muted-foreground">{project.summary}</p>
          </section>
          <div className="mt-6 flex flex-wrap gap-3">
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
            <a href="#contact" className="btn btn-secondary">
              {t.heroPrimary}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </header>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5 text-small">
          <div>
            <dt className="text-muted-foreground">{t.includes}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span key={feature} className="rounded-full border border-border px-3 py-1">
                  {feature}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t.year}</dt>
            <dd className="mt-2 py-1">{project.year}</dd>
          </div>
        </dl>
        <div className="my-10 grid gap-7 md:grid-cols-3 md:gap-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lead font-medium">{section.title}</h2>
              <p className="mt-3 text-body text-muted-foreground">{section.copy}</p>
            </section>
          ))}
        </div>
        <section aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className="sr-only">
            {t.projectScreenshots}
          </h2>
          {cover && shot(cover, true)}
          <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
            {rest.map((image) => shot(image))}
          </div>
        </section>
        <nav aria-label={t.nextProject} className="mt-12 border-t border-border pt-8">
          <a
            href={pagePath(locale, { kind: "work", slug: next.slug })}
            className="focus-ring group inline-flex flex-col gap-2"
          >
            <span className="text-small text-muted-foreground">{t.nextProject}</span>
            <span className="inline-flex items-center gap-3 text-h2 font-medium">
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
