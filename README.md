# Ahmad Albasha — Portfolio

Bilingual (English / Arabic RTL) portfolio for an AI-focused software engineer, built to turn visitors into booked discovery calls.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · next-intl · Cal.com embed · MDX

---

## Getting started

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000 → redirects to /en or /ar
```

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack) |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript, no emit              |

### Environment variables

| Variable               | Purpose                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production URL. Used for canonical URLs, hreflang, sitemap and Open Graph.                  |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com link as `username/event-slug`. If empty, the Book page shows WhatsApp/email instead. |
| `RESEND_API_KEY`       | Optional. Emails contact-form leads via [Resend](https://resend.com). Without it, leads are logged on the server. |
| `CONTACT_TO_EMAIL`     | Where leads are sent (defaults to the email in `data/site.ts`).                              |
| `CONTACT_FROM_EMAIL`   | Verified sender address in Resend.                                                          |

---

## Editing content

All content lives in `/data` and `/messages`. You never need to touch components to update the site.

| File                     | What's in it                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `data/site.ts`           | Name, role, email, **WhatsApp number**, social links, trust-strip stats, feature flags     |
| `data/projects.ts`       | Every project: tier (`featured` / `secondary` / `more`), categories, copy, tags, images    |
| `data/services.ts`       | The four services: benefit line, description, deliverables, timeline, tools                |
| `data/process.ts`        | The four "How I Work" steps                                                                |
| `data/testimonials.ts`   | Testimonials. **The section hides itself while the array is empty.**                       |
| `data/stack.ts`          | Tech logos in the trust strip and on the About page ([simple-icons](https://simpleicons.org)) |
| `data/posts.ts`          | Blog index                                                                                 |
| `messages/en.json`, `messages/ar.json` | All interface text (headings, buttons, form labels, SEO titles)               |

Content fields that differ by language use `{ en: "…", ar: "…" }`.

### Projects

- **Featured** projects get a large card and a case-study page at `/projects/<slug>` (problem, solution, result, highlights, tech, gallery, live link).
- **Secondary** projects get a medium card linking to `liveUrl`.
- **More** projects appear as compact rows.
- Images: put files in `public/projects/` and set `image: "/projects/faqih.jpg"`. For a case-study gallery add entries to `media`. Without an image, a branded abstract placeholder is rendered.
- Copy marked **"Placeholder"** in `data/projects.ts` (DataForge, the secondary and robotics projects, and all "result" lines) should be replaced with real details and metrics.

### Portrait

Add `public/portrait.jpg` and pass `src="/portrait.jpg"` to `<Portrait />` in `components/home/AboutTeaser.tsx` and `app/[locale]/about/page.tsx`.

### Placeholders to replace before launch

In `data/site.ts`: `contact.email`, `contact.whatsapp`, and the `socials` URLs (LinkedIn, Instagram, Facebook, GitHub).

### Blog

The blog is scaffolded but hidden (not in the navigation or the sitemap, and marked `noindex`).

1. Write `content/blog/<slug>.mdx`.
2. Register it in `data/posts.ts`.
3. Set `features.blog: true` in `data/site.ts` to publish.

---

## Project structure

```
app/
  [locale]/            Pages (home, projects, projects/[slug], services, about, book, blog)
  api/contact/         Contact form endpoint (validation, honeypot, rate limit, Resend)
  sitemap.ts robots.ts SEO routes (with hreflang alternates)
components/
  ui/                  Design-system primitives (Button, Section, Reveal, Tag, PageHeader…)
  layout/              Navbar, Footer, LanguageSwitcher
  home/                Home page sections
  projects/            Cards, artwork, filterable explorer
  contact/             Form, Cal.com embed, contact channels
data/                  Editable content
messages/              UI translations
i18n/                  next-intl routing and request config
proxy.ts               Locale detection and redirects
```

### Design tokens

Defined once in `app/globals.css` under `@theme` and used as Tailwind utilities:

- **Colour:** `ink` #0A0A0A (background), `surface` #111, `surface-2` #161616, `fg` #F5F5F5, `muted` #A1A1A1, `gold` #C9A96E, `cool` #7DA6C8, `line` / `line-strong` (hairline borders)
- **Type:** `font-display` (Cormorant Garamond / IBM Plex Sans Arabic), `font-sans` (Inter / IBM Plex Sans Arabic), `font-mono` (JetBrains Mono). Fluid sizes: `text-hero`, `text-display`, `text-title`, `text-lead`, `text-label`
- **Spacing:** `py-section`, `px-gutter`, `max-w-site`, `rounded-card`
- **Effects:** `shadow-glow`, `bg-grid`, `bg-noise`, `hairline`, `glass`, `text-gold-gradient`, `flip-rtl` (mirrors arrows in Arabic)

### RTL

`<html dir="rtl">` is set for Arabic. Layout uses logical properties (`ms-`, `pe-`, `start-`, `border-s`…) so it mirrors automatically; directional icons use `flip-rtl`. Arabic uses IBM Plex Sans Arabic for headings and body.

### Motion

- The hero headline and page entrances are CSS animations, so they run before JavaScript loads (good for LCP).
- Scroll reveals, filters and the mobile menu use Framer Motion with `LazyMotion` (smaller bundle).
- The hero particle field starts when the browser is idle and pauses when it's off-screen.
- `prefers-reduced-motion` turns all of this off. The booking page and forms have no motion.

### A note on next-intl's plugin

`next.config.ts` sets the `next-intl/config` alias directly instead of using `next-intl/plugin`. The plugin loads `@swc/core`'s native binary, which refuses to start on some Windows machines (an `ERR_SWC_NATIVE_CACHE` error about directory permissions). The alias is all the plugin does for this project.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, import the repo (framework preset: Next.js).
3. Add the environment variables from `.env.example`, and set `NEXT_PUBLIC_SITE_URL` to your domain.
4. Deploy, then add your custom domain under **Settings → Domains**.
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

All pages and the Open Graph image are generated at build time. Only `/api/contact` runs on demand.
