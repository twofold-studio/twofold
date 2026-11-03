import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { useProject } from "./project-provider";
import { ProjectCover } from "./project-cover";
import type { Work } from "@/lib/content";

function ProjectOverlay({ project, onClose }: { project: Work; onClose: () => void }) {
  const { t } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const element = dialog.current;
    element?.showModal();
    close.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const controls = [
        ...(dialog.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]') ?? []),
      ];
      const first = controls[0],
        last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", keydown);
      previous?.focus({ preventScroll: true });
    };
  }, [onClose]);
  return (
    <dialog
      ref={dialog}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      aria-labelledby="case-title"
      className="case-overlay"
      data-lenis-prevent
    >
      <button ref={close} className="case-close" onClick={onClose} aria-label={t.closeProject}>
        <X size={22} />
      </button>
      <div className="section-shell case-content">
        <p className="eyebrow">{project.kind}</p>
        <h2 id="case-title">
          {project.name}
          <span className="font-serif italic font-normal">{project.kicker}</span>
        </h2>
        <div className="case-intro">
          <div>
            {project.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside>
            <h3>{t.includes}</h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <h3>{t.builtBy}</h3>
            <p>{project.builtBy}</p>
            {project.link && (
              <a
                className="button-primary"
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.link.label}
                <ArrowUpRight size={16} />
              </a>
            )}
          </aside>
        </div>
        <div className="case-gallery">
          {project.images.map((image, index) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.caption} loading={index ? "lazy" : "eager"} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </dialog>
  );
}
export function Projects() {
  const {
    t,
    content: { work },
  } = useI18n();
  const { selected, openProject, closeProject } = useProject();
  const project = work.find((item) => item.slug === selected);
  return (
    <section id="projects" className="section-shell work-section" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">{t.selectedWorkLabel}</h2>
        <span className="eyebrow">01 — 04</span>
      </div>
      <div className="work-grid">
        {work.map((item, index) => (
          <article key={item.slug} className="work-card">
            <button
              className="project-image"
              onClick={() => openProject(item.slug)}
              aria-label={`${t.readCase}: ${item.name}`}
            >
              <ProjectCover src={item.cover} maskRadius={1600} />
            </button>
            <div className="project-caption">
              <div>
                <p className="eyebrow">
                  0{index + 1} / {item.kind}
                </p>
                <h3>
                  <button onClick={() => openProject(item.slug)}>
                    {item.name}
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </button>
                </h3>
                <p className="project-summary">{item.summary}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      {project && <ProjectOverlay key={project.slug} project={project} onClose={closeProject} />}
    </section>
  );
}
