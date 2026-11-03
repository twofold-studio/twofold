# Twofold

The site of Twofold, a two-person software studio in Sofia: Vilian Gerdzhikov and Plamen Ermenkov.

Built on the React Bits Pro **Agency** template (Next.js 16, Tailwind 4, GSAP, Motion, Three.js). The template is licensed, so keep this repository private.

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing

All copy lives in `lib/content.ts`: the studio name and email, the case studies, services, founders and FAQ. The studio name ("Twofold") is a working name; change `studio.name` and it updates everywhere.

Images are in `public/work/<project>/` and `public/team/`. Case-study screenshots are 16:10.

## Sources

- Arkada, Helios and Bukinistika copy and screenshots: Vilian's portfolio, `fractal-tess/portfolio-v2` on Gitadel.
- Plamen's projects: READMEs at github.com/PlamenErmenkov.
- Portraits: `portfolio-v2/public/portrait.webp` and Plamen's GitHub avatar.

## Languages

`/en` and `/bg` serve complete English and Bulgarian pages. Visiting `/` uses
the saved `lang` cookie first, then the browser's `Accept-Language` preferences,
and falls back to English. Explicit locale URLs always keep their language.
The header's EN/BG switch remembers a choice for a year and preserves the URL
anchor. On phones the switch is inside the menu, as in the personal portfolio.

UI translations live in `lib/i18n/dictionaries.ts`. Bulgarian project and team
copy is in `lib/i18n/content.ts`; English copy remains in `lib/content.ts`.

With the production server running locally, `npm run test:i18n` checks routing,
preferences, translated HTML, metadata and static assets. Set `BASE_URL` to
check another deployment.
