import { ArrowUpRight } from "lucide-react";
import { useI18n } from "./i18n-provider";
export function About() {
  const {
    t,
    content: { founders },
  } = useI18n();
  return (
    <section id="about" className="section-shell team-section">
      <div className="section-heading">
        <h2>{t.team}</h2>
        <p>{t.teamIntro}</p>
      </div>
      <div className="team-grid">
        {founders.map((founder) => (
          <article key={founder.photo} className="team-card">
            <img
              src={founder.photo}
              alt={`${t.portrait} ${founder.name}`}
              loading="lazy"
              width="320"
              height="400"
            />
            <div>
              <h3>{founder.name}</h3>
              <p className="eyebrow">{founder.role}</p>
              <p className="team-bio">{founder.bio}</p>
              <div className="team-links">
                {founder.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
