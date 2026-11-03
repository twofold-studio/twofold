import { studio, work } from "@/lib/content";

const socialLinks = [
  { label: "Vilian on GitHub", href: "https://github.com/Fractal-Tess" },
  { label: "Plamen on GitHub", href: "https://github.com/PlamenErmenkov" },
  { label: "fractal-tess.xyz", href: "https://fractal-tess.xyz" },
];

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#about" },
  { label: "Questions", href: "#faq" },
];

const subject = encodeURIComponent(`Project enquiry for ${studio.name}`);

export function Footer() {
  return (
    <footer id="contact" className="lg:sticky lg:bottom-0 lg:z-0 bg-foreground text-background">
      <div className="px-6 sm:px-12 lg:px-24 pt-24 lg:pt-32 pb-16 lg:pb-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-background/50">
          Tell us what customers see today
        </p>
        <a
          href={`mailto:${studio.email}?subject=${subject}`}
          className="block text-[clamp(1.75rem,6.5vw,6rem)] font-medium leading-none tracking-tight transition-opacity hover:opacity-80 break-all sm:break-normal"
        >
          {studio.email}
        </a>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${studio.email}?subject=${subject}`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-background text-foreground hover:bg-background/90 transition-colors"
          >
            Start a project
          </a>
          <p className="text-background/60 sm:ml-4">Based in {studio.location}. We work in Bulgarian and English.</p>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="border-t border-background/10" />
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-16 lg:py-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          <div>
            <span className="text-4xl font-medium tracking-tight">{studio.name}</span>
            <p className="mt-4 text-background/60 text-3xl lg:text-4xl">
              Two engineers. <span className="font-serif italic">One studio.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:flex sm:gap-16 lg:gap-24">
            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">Studio</h4>
              <p className="font-medium mb-1">{studio.location}</p>
              <p className="text-background/60 text-sm">
                Vilian Gerdzhikov
                <br />
                Plamen Ermenkov
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">Work</h4>
              <ul className="space-y-3">
                {work.map((w) => (
                  <li key={w.slug}>{w.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">Navigation</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-background/60 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-background/60 mb-6">Elsewhere</h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-6 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-background/10 pt-6">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} {studio.name}
          </p>
          <p className="text-sm text-background/40">Designed and built by the two of us.</p>
        </div>
      </div>
    </footer>
  );
}
