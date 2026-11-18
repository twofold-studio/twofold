import { ResponsiveImage } from "./responsive-image";

/** The image repeats the title link, so only the title is in the keyboard order. */
export function ProjectPreview({ href, src }: { href: string; src: string }) {
  return (
    <a
      href={href}
      tabIndex={-1}
      aria-hidden="true"
      className="project-image reveal-image block overflow-hidden rounded-xl border border-foreground/15 bg-muted"
    >
      <ResponsiveImage
        src={src}
        alt=""
        sizes="(min-width: 1216px) 360px, (min-width: 900px) 30vw, (min-width: 600px) 45vw, 92vw"
        className="aspect-16/11 w-full object-cover"
      />
    </a>
  );
}
