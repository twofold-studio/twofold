"use client";
import { ArrowLeft } from "lucide-react";
import { featuredWork, featuredSlugs } from "@/lib/content";
import { pagePath } from "@/lib/pages";
import { useI18n } from "./i18n-provider";
import { ProjectList } from "./projects";

export function WorkIndex() {
  const {
    locale,
    t,
    content: { work },
  } = useI18n();
  const items = [
    ...featuredWork(work),
    ...work.filter((project) => !featuredSlugs.some((slug) => slug === project.slug)),
  ];
  return (
    <section aria-labelledby="work-heading" className="pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="container-site">
        <a
          href={pagePath(locale, { kind: "home" })}
          className="link focus-ring inline-flex min-h-11 items-center gap-2 text-small text-muted-foreground"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.backHome}
        </a>
        <header className="mb-10 mt-6 max-w-3xl">
          <p className="eyebrow">{t.work}</p>
          <h1 id="work-heading" className="mt-4 text-h2 font-medium">
            {t.workIndexHeading}
          </h1>
          <p className="mt-5 text-lead text-muted-foreground">{t.workIndexCopy}</p>
        </header>
        <ProjectList items={items} />
      </div>
    </section>
  );
}
