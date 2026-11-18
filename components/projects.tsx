"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredWork, type Work } from "@/lib/content";
import { pagePath } from "@/lib/pages";
import { useI18n } from "./i18n-provider";
import { ResponsiveImage } from "./responsive-image";
import { useReveal } from "./reveal";

function ProjectCard({ project }: { project: Work }) {
  const { locale, t } = useI18n();
  const ref = useReveal<HTMLLIElement>();
  const href = pagePath(locale, { kind: "work", slug: project.slug });
  return (
    <li ref={ref} className="reveal-group min-w-0">
      <a
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="project-image reveal-image group block overflow-hidden rounded-xl border border-foreground/15 bg-muted"
      >
        <ResponsiveImage
          src={project.cover}
          alt=""
          sizes="(min-width: 1216px) 360px, (min-width: 900px) 30vw, (min-width: 600px) 45vw, 92vw"
          className="aspect-16/11 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </a>
      <div className="reveal-item pt-4">
        <p className="text-small text-muted-foreground">{project.kind}</p>
        <h3 className="mt-2 text-h3 font-medium">
          <a
            href={href}
            className="focus-ring group flex min-h-11 items-center justify-between gap-3"
          >
            {project.name}
            <ArrowUpRight
              size={22}
              aria-hidden="true"
              className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only"> — {t.readCase}</span>
          </a>
        </h3>
        <p className="mt-1 text-small text-accent">{project.kicker}</p>
        <p className="mt-3 text-body text-muted-foreground">{project.summary}</p>
      </div>
    </li>
  );
}
export function ProjectList({ items }: { items: Work[] }) {
  return (
    <ol className="project-grid grid gap-x-6 gap-y-10">
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </ol>
  );
}
export function Projects() {
  const {
    locale,
    t,
    content: { work },
  } = useI18n();
  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-site">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="projects-heading" className="text-h3 font-medium">
            {t.workHeading}
            <span className="ml-3 align-top text-small text-accent">03</span>
          </h2>
          <a
            href={pagePath(locale, { kind: "work-index" })}
            className="link focus-ring inline-flex min-h-11 items-center gap-2 text-small"
          >
            {t.allProjects}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <ProjectList items={featuredWork(work)} />
      </div>
    </section>
  );
}
