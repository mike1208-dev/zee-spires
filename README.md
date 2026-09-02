# ZeeSpires — Corporate Website

A fast, refined, static corporate website for **ZeeSpires US LLC**, built with
[Astro](https://astro.build), TypeScript, and Tailwind CSS, and deployed to
[Cloudflare Pages](https://pages.cloudflare.com). Available in **English**
(default, unprefixed) and **Japanese** (`/ja/`).

It presents the four core services — **AI Agent Development, Data Engineering,
Full-Stack Development, and IT Consulting & IT Staffing** — foregrounds the
senior engineering team, and drives B2B inquiries.

---

## Tech stack

| Area          | Technology                                             |
| ------------- | ------------------------------------------------------ |
| Framework     | Astro 7 (static site generation)                       |
| Language      | TypeScript                                             |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`)                   |
| i18n          | Astro's built-in i18n routing — English at `/`, Japanese at `/ja/` |
| Fonts         | Inter (body), Space Grotesk (display), Noto Sans JP (Japanese text) — self-hosted via Fontsource |
| SEO           | JSON-LD (Organization / ProfessionalService), OGP, hreflang, sitemap |
| Forms         | Cloudflare Pages Function → Resend                     |
| Hosting       | Cloudflare Pages (static + Functions, edge CDN)        |
| CI/CD         | Cloudflare Pages Git integration (or GitHub Actions)   |

---

## Getting started

Requires **Node.js ≥22.12** (Astro 7's minimum).

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
│   └── api/contact.ts       # Pages Function: POST /api/contact (sends email)
├── public/
│   ├── _headers             # Cloudflare Pages security/caching headers
│   └── _redirects           # Serves the Japanese 404 for unmatched /ja/* paths
├── src/
│   ├── components/          # Header, Footer, Button, cards, SEO head…
│   │   └── *Content.astro   # Page bodies shared between the en and ja routes
│   ├── data/                 # English copy: site config, services, engineers, content
│   ├── i18n/                 # Translation dictionary, locale config, helpers
│   ├── layouts/Layout.astro
│   ├── pages/                # index, services, engineers, contact, 404
│   │   └── ja/                # Same routes, Japanese — thin wrappers around *Content.astro
│   └── styles/global.css     # Tailwind + design tokens (dark, + light for service pages)
├── astro.config.mjs
└── wrangler.toml
```

## Editing content

Most copy lives in [`src/data/`](src/data/) — English only:

- **Company details** (name, address, email, phone, social, nav): `site.ts`
- **Services**: `services.ts`
- **Team / engineers**: `engineers.ts`
- **Stats, outcomes, client list, testimonials**: `content.ts`

### Translations (`src/i18n/`)

`src/data/*.ts` stays English-only; Japanese copy is layered on top rather
than duplicated into every field:

- **`ui.ts`** — static UI strings (nav, buttons, form labels, section
  headings, etc.), keyed by locale. Used via `t("some.key")`.
- **`translations.ts`** — Japanese overrides for `src/data/*.ts` records,
  keyed by their slug/name (e.g. a service's Japanese title/description is
  keyed by its English slug). `src/data/*.ts` stays the single source of
  truth for structure; this file only overrides the translatable fields.
- **`config.ts`** / **`utils.ts`** — locale list, the `resolveLocale`/
  `useTranslations` helpers, and `localizeHref`/`translatedRoutes` for
  building locale-correct internal links.

**Editing English copy** in `src/data/*.ts` does not touch the Japanese
site — update the matching entry in `src/i18n/translations.ts` too (keyed by
the same slug/name), or the `/ja/` page will keep showing the old text.

**Adding a new page in both locales**: build the page body as a shared
`src/components/<Name>Content.astro` (driven by `Astro.currentLocale`), add
a thin wrapper page under both `src/pages/` and `src/pages/ja/`, and add its
path to `translatedRoutes` in `src/i18n/utils.ts` so the language switcher
and hreflang tags pick it up.

## Theming

A single near-black, violet-accented dark theme is used site-wide, with a
light variant applied to the Services pages (`theme="light"` on `Layout`,
so the light hero videos blend into a white page) — there's no user-facing
theme toggle. Colors and design tokens live in CSS custom properties in
[`src/styles/global.css`](src/styles/global.css); edit the `:root` and
`:root[data-theme="light"]` blocks to adjust the palette. Japanese text
swaps to Noto Sans JP via `:lang(ja)` rules in the same file, since the
Latin display fonts have no CJK glyphs.

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
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets. Its runner
is pinned to Node 22 to match Astro 7's requirement.

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
[`functions/api/contact.ts`](functions/api/contact.ts). Its validation error
messages are English-only by design — the Japanese contact page shows a
localized generic error instead of relaying them verbatim (see
`src/components/ContactContent.astro`).

---

## Pre-launch checklist

- [ ] Confirm company details in `src/data/site.ts`.
- [ ] Replace placeholder engineer profiles with real, consented people.
- [ ] Review/replace marketing copy in `src/data/` **and** its Japanese
      counterpart in `src/i18n/translations.ts`.
- [ ] Have the Japanese copy reviewed by a native speaker — it hasn't had a
      professional/native review pass yet.
- [ ] Set the production domain in `astro.config.mjs` (`SITE`) and `robots.txt`.
- [ ] Add real logo (SVG) and OG image if brand assets are provided; the OG
      image (`public/og-image.svg`) is English-only and not yet localized.
- [ ] Set `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
- [ ] Set the real booking URL in `site.ts` (`contact.bookingUrl`).
