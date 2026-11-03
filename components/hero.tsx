import { useEffect } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { useSiteEntry } from "./site-entry";
import { useProject } from "./project-provider";

export function Hero() {
  const {
    t,
    content: { work, studio },
  } = useI18n();
  const { reportHeroReady } = useSiteEntry();
  const { openProject } = useProject();
  useEffect(() => {
    const images = work.slice(0, 2).map((project) => {
      const image = new Image();
      image.src = project.cover;
      return image.decode().catch(() => {});
    });
    let active = true;
    void Promise.all(images).then(() => {
      if (active) reportHeroReady();
    });
    return () => {
      active = false;
    };
  }, [reportHeroReady, work]);
  return (
    <section id="hero" className="hero section-shell">
      <div className="hero-intro">
        <p className="eyebrow hero-copy">{t.heroEyebrow}</p>
        <h1>
          <span className="hero-line">{t.heroOne}</span>
          <span className="hero-line font-serif italic font-normal">{t.heroTwo}</span>
        </h1>
        <p className="hero-copy hero-description">{t.heroCopy}</p>
        <div className="hero-copy hero-actions">
          <a className="button-primary" href="#projects">
            {t.selectedWorkLabel}
            <ArrowDownRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href={`mailto:${studio.email}`}>
            {t.contact}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero-previews hero-copy" aria-label={t.selectedWorkLabel}>
        {work.slice(0, 2).map((project, index) => (
          <button
            key={project.slug}
            className={`preview-window preview-window-${index + 1}`}
            onClick={() => openProject(project.slug)}
            aria-label={`${t.readCase}: ${project.name}`}
          >
            <span className="preview-toolbar">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{project.name}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
            <img
              src={project.cover}
              width="960"
              height="600"
              fetchPriority={index === 0 ? "high" : "auto"}
              alt={project.images[0]?.caption ?? project.name}
            />
            <span className="preview-caption">{project.kicker}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
