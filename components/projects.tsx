"use client";
import { useI18n } from "./i18n-provider";

import { ArrowRight } from "lucide-react";
import type { Work } from "@/lib/content";
import { pagePath } from "@/lib/pages";
import { ResponsiveImage } from "./responsive-image";
import { useReveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function ProjectCard({ project, index }: { project: Work; index: number }) {
  const { locale, t } = useI18n();
  const ref = useReveal<HTMLLIElement>();
  const href = pagePath(locale, { kind: "work", slug: project.slug });
  const lines = [
    [project.own ? t.idea : t.challenge, project.challenge],
    [t.solution, project.solution],
    [t.result, project.result],
  ] as const;

  return (
    <li
      ref={ref}
      className="grid items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12 lg:gap-16"
    >
      {/* The image repeats the button's link for pointer users only. */}
      <a
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="group block overflow-hidden rounded-2xl border border-border bg-muted"
      >
        <ResponsiveImage
          src={project.cover}
          alt=""
          sizes="(min-width: 1216px) 680px, (min-width: 768px) 56vw, 100vw"
          className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </a>
      <div>
        <p className="text-small text-muted-foreground">
          {String(index + 1).padStart(2, "0")} · {project.kind}
        </p>
        <h3 className="mt-3 text-h2 font-medium text-foreground">{project.name}</h3>
        <p className="mt-1 text-lead text-accent">{project.kicker}</p>
        <dl className="mt-6 flex flex-col gap-4">
          {lines.map(([label, text]) => (
            <div key={label}>
              <dt className="text-small font-medium text-foreground">{label}</dt>
              <dd className="mt-1 text-body text-muted-foreground">{text}</dd>
            </div>
          ))}
        </dl>
        <a href={href} className="btn btn-secondary btn-sm mt-8">
          {t.readCase}
          <span className="sr-only">: {project.name}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

export function Projects() {
  const {
    t,
    content: { work },
  } = useI18n();

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-site">
        <SectionHeading id="projects-heading" label={t.work}>
          {t.selectedWorkLabel}
        </SectionHeading>
        <ol className="flex flex-col gap-20 md:gap-28">
          {work.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
