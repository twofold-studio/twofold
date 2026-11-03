# Development

Use Vite+ 1.4.0 and a supported Node.js version (the Docker build uses Node 24).

```sh
vp install
vp dev                         # local development
vp check                       # format, lint and type checking
vp test run                    # language and content tests
vp build                       # client build and localized HTML
vp run start                   # production server on port 3000
npm run test:i18n               # routing/HTML checks against the running server
```

Set `BASE_URL` for the integration check, for example `BASE_URL=http://localhost:3000 npm run test:i18n`. Test the production container with `docker build -t twofold .` and `docker run --rm -p 3000:3000 twofold`.

## Source

- `src/app.tsx`: page sections; `src/styles.css`: styling.
- `lib/content.ts`: English project and team copy; `lib/i18n/content.ts`: Bulgarian copy.
- `lib/i18n/dictionaries.ts`: UI labels and capabilities in both languages.
- `components/site-entry.tsx`: loading/reveal coordination; `components/project-provider.tsx`: dialog history.
- `server/locales.mjs`: shared browser-language and cookie negotiation.

Vite's build hook creates `/en/index.html` and `/bg/index.html` through `scripts/prerender.mjs`. Each includes translated content, metadata and language alternatives before JavaScript runs. The small production server serves these pages and static assets, redirects `/` according to the saved preference or browser language, and returns 404 for unsupported paths.

## Deployment

Gitadel repository: `fractal-tess/twofold`. Pushes to `main` trigger Dokploy. The multi-stage Dockerfile builds with Vite+, then serves only `dist/` and the dependency-free HTTP server on `0.0.0.0:3000`. The image supports ARM64. Check deployment with `gtd deploy status fractal-tess/twofold --wait`.

## README images

The cover is composed from `assets/screenshots/source/hero.html`. Recapture the real home page and an open case study at 1600×1000, 2× scale, into the ignored `source/shots/` directory. Open the composition at the same dimensions and export a 3200×2000 WebP. The original mark is in `public/icon.svg`; the README copy is `assets/logo.svg`.
