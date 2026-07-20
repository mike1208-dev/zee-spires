# ZeeSpires — Corporate Website

A fast, refined, static corporate website for **ZeeSpires US LLC**, built with
[Astro](https://astro.build), TypeScript, and Tailwind CSS, and deployed to
[Cloudflare Pages](https://pages.cloudflare.com).

It presents the four core services — **AI Agent Development, Data Engineering,
Full-Stack Development, and IT Consulting & IT Staffing** — foregrounds the
senior engineering team, and drives B2B inquiries.

---

## Tech stack

| Area          | Technology                                             |
| ------------- | ------------------------------------------------------ |
| Framework     | Astro 5 (static site generation)                       |
| Language      | TypeScript                                             |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`)                   |
| Fonts         | Space Grotesk (display), Inter (body), JetBrains Mono (labels), Newsreader (italic accent) — self-hosted via Fontsource |
| SEO           | JSON-LD (Organization / ProfessionalService), OGP, sitemap |
| Forms         | Cloudflare Pages Function → Resend                     |
| Hosting       | Cloudflare Pages (static + Functions, edge CDN)        |
| CI/CD         | Cloudflare Pages Git integration (or GitHub Actions)   |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
```

### Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the dev server                     |
| `npm run build`     | Build the static site to `dist/`         |
| `npm run preview`   | Preview the production build             |
| `npm run check`     | Type-check with `astro check`            |

> To test the contact **form** end to end (Pages Function), run it through
> Cloudflare's local runtime after building:
> `npx wrangler pages dev dist` (create a `.dev.vars` first — see below).

---

## Project structure

```
├── functions/
│   └── api/contact.ts     # Pages Function: POST /api/contact (sends email)
├── public/                # Static assets (favicon, og-image, robots, _headers)
├── src/
│   ├── components/         # Header, Footer, Button, Icon, cards, SEO head…
│   ├── data/              # site config + content (services, engineers, copy)
│   ├── layouts/Layout.astro
│   ├── pages/             # index, services, team, process, why-us, contact, 404
│   └── styles/global.css  # Tailwind + design tokens (light/dark)
├── astro.config.mjs
└── wrangler.toml
```

## Editing content

All copy lives in [`src/data/`](src/data/) — no need to touch markup:

- **Company details** (name, address, email, phone, social): `site.ts`
- **Services**: `services.ts`
- **Team / engineers**: `engineers.ts`
- **Process, differentiators, tech stack, stats**: `content.ts`

> ⚠️ **Placeholder content.** Marketing copy and engineer profiles are
> polished placeholders. Company facts (name, address, email, phone) come from
> the current zeespires.com and should be confirmed. Engineer profiles in
> `engineers.ts` are **fictional** — replace with real people (with consent)
> before launch.

## Theming

Light/dark is driven by CSS custom properties in
[`src/styles/global.css`](src/styles/global.css). The user's choice is stored in
`localStorage` and applied before paint (no flash). Edit the `:root` and
`:root[data-theme="dark"]` blocks to adjust the palette.

---

## Deployment (Cloudflare Pages)

### Option A — Git integration (recommended)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add environment variables (below). Every push to `main` deploys; PRs get
   preview URLs. The `functions/` directory is deployed automatically.

### Option B — GitHub Actions

Use [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) with
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.

### Contact form environment variables

Set these in **Pages → Settings → Environment variables** (and in `.dev.vars`
locally — see [`.dev.vars.example`](.dev.vars.example)):

| Variable         | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key                   |
| `CONTACT_TO`     | Destination inbox, e.g. `admin@zeespires.com`          |
| `CONTACT_FROM`   | Verified sender, e.g. `ZeeSpires <website@zeespires.com>` |

Without `RESEND_API_KEY`, the form still works but only logs the submission
(no email sent) — useful for previews. Swap Resend for any provider by editing
[`functions/api/contact.ts`](functions/api/contact.ts).

---

## Pre-launch checklist

- [ ] Confirm company details in `src/data/site.ts`.
- [ ] Replace placeholder engineer profiles with real, consented people.
- [ ] Review/replace marketing copy in `src/data/`.
- [ ] Set the production domain in `astro.config.mjs` (`SITE`) and `robots.txt`.
- [ ] Add real logo (SVG) and OG image if brand assets are provided.
- [ ] Set `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
- [ ] Set the real booking URL in `site.ts` (`contact.bookingUrl`).
