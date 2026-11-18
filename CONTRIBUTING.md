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

Set `BASE_URL` for the integration check, for example `BASE_URL=http://localhost:3000 npm run test:i18n`. Set `ENQUIRY_WEBHOOK_URL` in Dokploy to deliver contact-form enquiries (see below). Test the production container with `docker build -t twofold .` and `docker run --rm -p 3000:3000 twofold`.

## Source

- `src/app.tsx`: the home page sections, Work index or a case study; `lib/pages.ts`: page paths.
- `src/styles.css`: colours, the type scale (`text-display`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`), buttons (`btn btn-primary`, `btn btn-secondary`, `btn-sm`) and section spacing (`container-site`, `section`).
- `lib/content.ts`: English project, team and FAQ copy; `lib/i18n/content.ts`: Bulgarian copy.
- `lib/i18n/dictionaries.ts`: interface text in both languages.
- `components/case-study.tsx`: a project's own page; `components/enquiry-form.tsx` and `server/enquiry.mjs`: the contact form.
- `server/locales.mjs`: shared browser-language and cookie negotiation.

Vite's build hook runs `scripts/prerender.mjs`, which writes `/en/index.html`, `/bg/index.html`, `/{en,bg}/work/index.html` and `/{en,bg}/work/<project>/index.html`, plus `sitemap.xml` and `robots.txt` (there is no copy in `public/`). Each page includes translated content, its own title, description, share image and language alternatives before JavaScript runs. The small production server serves these pages and static assets, redirects `/` according to the saved preference or browser language, and returns 404 for unsupported paths.

## Contact form

The form posts to `/api/enquiry`, which checks the fields, ignores bots that fill a hidden field, allows 5 enquiries per address every 10 minutes (the address the proxy adds last to `X-Forwarded-For`) and forwards the enquiry as JSON (`text`, `content`, `enquiry`) to `ENQUIRY_WEBHOOK_URL`. Slack and Discord incoming webhooks and automation tools such as n8n, Make or Zapier can receive it; send one test enquiry after setting it up. Without `ENQUIRY_WEBHOOK_URL` the endpoint answers 503 and the form opens the visitor's email app with the message filled in.

## Images

Project screenshots in `public/work/` are 3200 px wide. After adding or replacing one, run `node scripts/image-sizes.mjs` (needs `cwebp`) to make the 800, 1600 and 2400 px copies the pages load on smaller screens. Link-preview images (1200×630) live in `public/og/`: one per project, cropped from its cover, and `twofold-en.jpg` / `twofold-bg.jpg` for the home pages.

## Deployment

Gitadel repository: `fractal-tess/twofold`. Pushes to `main` trigger Dokploy. The multi-stage Dockerfile builds with Vite+, then serves only `dist/` and the dependency-free HTTP server on `0.0.0.0:3000`. The image supports ARM64. Check deployment with `gtd deploy status fractal-tess/twofold --wait`.

## README images

The cover is composed from `assets/screenshots/source/hero.html`. Recapture the real home page and an open case study at 1600×1000, 2× scale, into the ignored `source/shots/` directory. Open the composition at the same dimensions and export a 3200×2000 WebP. The original mark is in `public/icon.svg`; the README copy is `assets/logo.svg`.
