# ZeeSpires

## Corporate Website for a Tech Services Company (Modern & Refined)

> **Overview**
> A full redesign of the ZeeSpires US LLC corporate website, based on the current site (https://zeespires.com/). The goal is to present the four core services — AI Agent Development, Data Engineering, Full-Stack Development, and IT Consulting & IT Staffing — in a cleaner, more elegant, and visually appealing way. In addition, a new **Team / Our Engineers** page will showcase senior engineers with backgrounds at leading companies such as Microsoft and IBM, foregrounding expertise and trust. The result is a lightweight, fast, brand-forward site built to drive inquiries and sales conversations from an English-speaking B2B audience.

---

# Challenges

## Business Challenges

- Communicate the four core services (**AI Agent Development / Data Engineering / Full-Stack Development / IT Consulting & IT Staffing**) at a glance and with credibility.
- Elevate the brand from the current site into something **cleaner, more elegant, and visually appealing**.
- Foreground **senior engineers from leading companies (Microsoft, IBM, etc.)** to convey technical strength and trust (Team / Our Engineers page).
- Provide clear paths to **inquiries and sales conversations** from English-speaking B2B prospects.
- Present accurate company information (name, address, contact details).

## Technical Challenges

- Prioritize **fast rendering** and **flawless mobile layout**, which shape first impressions.
- Publish robustly with **minimal server maintenance and cost**.
- Be correctly discoverable as a "tech services company" in **English-language search and social sharing**.

---

# Solution

## Roles

- Frontend / Full-Stack Developer (architecture, implementation, deployment)
- Brand / UI & UX Design
- Content setup & handoff

## Scope of Work

### Brand & Design

- A minimal, refined B2B enterprise aesthetic — emphasis on whitespace, typography, and clear hierarchy.
- Decide a light / dark theme direction (to be finalized after reviewing references).
- Preserve the current tone ("Software built to reach higher." — grounded, trust-focused) while significantly raising visual polish.

### Page Structure (multi-page)

- **Home**: hero → services overview (4 disciplines) → why us → tech stack → industries/impact → CTA
- **Services**: detail for each of the 4 services (AI agents / data platforms / full-stack / IT consulting & staffing)
- **Team / Our Engineers** (new): senior engineer profiles — backgrounds (Microsoft, IBM, etc.), specialties, and tech stacks
- **Process**: engagement flow (consult → design → build → deliver → support)
- **Why Us**: differentiators (senior-led, direct client relationships, accountability, etc.)
- **Contact**: inquiry form / email & phone / call booking

### Responsive

- A single layout that holds up across mobile, tablet, and desktop (CSS Grid / Flex).

### Performance

- Static site generation (Astro): HTML generated at build time; JavaScript only where needed (islands).
- Optimized image delivery.

### SEO & Structured Data

- `Organization` / `ProfessionalService` JSON-LD, OGP, and optimized meta (English).
- Sitemap, robots, and canonical set up.

### Accessibility

- Keyboard operation, visible focus, contrast, and heading hierarchy considered.

### Inquiry Funnel

- Clear CTAs throughout. Inquiry form (or email link), with an optional call-booking link as needed.

### Deployment

- Static delivery on Cloudflare Pages. Automatic build & deploy on git push (fast, low-cost, maintenance-free).

---

# Outcomes

- A refined corporate site that conveys the four services and the company's credibility at a glance.
- A senior-engineer showcase that makes technical strength and trust tangible.
- A structure with clear paths that convert English-speaking B2B visitors into inquiries.
- Fast rendering and mobile optimization via static generation, protecting first impressions.
- No server maintenance — continuously publishable at low cost.

---

# Team

- Small team (estimated ~2–3 weeks)
- Design
- Frontend / Full-Stack Development
- Content Setup / Handoff

---

# Tech Stack

| Area            | Technology                                                        |
| --------------- | ----------------------------------------------------------------- |
| Framework       | Astro (static site generator)                                     |
| Language        | TypeScript                                                        |
| Styling         | Tailwind CSS                                                      |
| UI              | Astro Components, responsive (CSS Grid / Flex)                    |
| Theme           | Light / Dark (after requirements are confirmed)                   |
| SEO             | JSON-LD structured data (Organization / ProfessionalService), OGP |
| Forms           | Inquiry (email link / external form / Pages Functions)            |
| Hosting         | Cloudflare Pages (static delivery, edge CDN)                      |
| CI/CD           | Git, GitHub Actions (automatic build & deploy)                   |
| Tools / PM      | Figma, Slack                                                      |

---

# Key Features

1. Brand-forward hero
2. Services section for the four disciplines (AI agents / data engineering / full-stack / IT consulting & staffing)
3. **Team / Our Engineers page** (senior engineers' backgrounds, specialties, and track record)
4. Trust-building via Process / Why Us
5. Clear inquiry funnel (form, email, phone / call booking)
6. Responsive & light / dark support
7. SEO & structured data (optimized for English-language search & social sharing)

---

# Technical Highlights

### Static means fast, cheap, and robust

Generating HTML at build time keeps the site fast, hosting inexpensive, and delivery robust. With no server to maintain, it comfortably meets the "always stable and fast" bar expected of a B2B corporate site.

### JavaScript only where needed (Astro islands)

JS is loaded only where it's genuinely required (forms, interactions), keeping the site lightweight while remaining extensible for future features.

### Making trust visible with the Team page

Senior engineers with backgrounds at companies like Microsoft and IBM are presented with their experience, specialties, and tech stacks. This foregrounds a tech services company's biggest differentiator — its people — and reassures B2B decision-makers.

### Built to be found

`Organization` / `ProfessionalService` structured data and OGP ensure correct presentation across English-language search and social sharing.

### Known trade-offs & growth path

Because the site is static, content updates require developer involvement. If frequent self-editing of a blog or case studies becomes necessary, a headless CMS can be added. The plan is to launch lean and fast, then extend when needed.

---

# Assumptions & Open Questions (to confirm with Dan)

- **Existing assets**: Access to the current site's GitHub repo / hosting / domain owner (to reuse copy and brand assets, and to deploy).
- **Service lineup**: Confirm the four new services **replace** the current six. Is "IT Consulting & IT Staffing" one page or two?
- **Design**: Reference sites (1–2), light/dark preference, brand colors & fonts, and whether a logo (SVG) exists.
- **Team page**: Permission to publish engineers' **real names, photos, and résumés** (with their consent). If real names can't be shown, we can use "initials + background" instead.
- **Content**: Will service descriptions and company copy be provided, or drafted by us for review? Any case studies, client logos, or testimonials?
- **Functionality**: Inquiry form destination email, call booking (e.g., Calendly), need for a blog or Careers page, and multilingual requirements.
- **Company details** (from the current site — please confirm): ZeeSpires US LLC / 1021 E Lincolnway, Unit #1933, Cheyenne, WY 82001, USA / admin@zeespires.com / +94 78 843 0853.
- **Launch target**: Replace zeespires.com, or a new domain / staging URL first?
