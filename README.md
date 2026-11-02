# Twofold

The site of Twofold, a two-person software studio in Sofia: Vilian Gerdzhikov and Plamen Ermenkov.

Built on the React Bits Pro **Agency** template (Next.js 16, Tailwind 4, GSAP, Motion, Three.js). The template is licensed, so keep this repository private.

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing

All copy lives in `lib/content.ts`: the studio name and email, the case studies, the bench list, services, founders and FAQ. The studio name ("Twofold") is a working name; change `studio.name` and it updates everywhere.

Images are in `public/work/<project>/` and `public/team/`. Case-study screenshots are 16:10.

## Sources

- Arkada, Helios and Bukinistika copy and screenshots: Vilian's portfolio, `fractal-tess/portfolio-v2` on Gitadel.
- Plamen's projects: READMEs at github.com/PlamenErmenkov. The 3-D Secure screenshot was captured from that repository's demo page.
- Portraits: `portfolio-v2/public/portrait.webp` and Plamen's GitHub avatar.
