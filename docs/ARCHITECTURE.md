# Mindraze Global LLP: Website Architecture

## Stack
Next.js 16 (App Router, Cache Components, static prerendering) · React 19 · TypeScript ·
Tailwind CSS v4 · GSAP 3 + ScrollTrigger · Motion · Lenis · Lucide icons · Zod +
React Hook Form.

Every page is fully prerendered at build time (no request-time data), so HTML is served
from the static shell. The only server code that runs per request is `POST /api/enquiry`.

## Sitemap and URLs

```
/                                   Home
/about                              About Us
/businesses                         Our Businesses (overview)
/businesses/steel-trading           Steel Trading
/businesses/solar-solutions         Solar Solutions
/businesses/it-services             IT Services & Digital Solutions
/products-services                  Products & Services catalogue (grouped by vertical)
/contact                            Contact & enquiries
/privacy-policy                     Privacy Policy (template, needs legal review)
/terms-and-conditions               Terms & Conditions (template, needs legal review)
/api/enquiry                        POST, enquiry intake
/sitemap.xml  /robots.txt  /manifest.webmanifest
```

No location-specific landing pages are generated: there is not yet enough unique,
verified content per district to justify them (avoids thin/duplicate pages).

## Folder structure

```
src/
  app/                    Routes, metadata files (sitemap, robots, manifest, icons, OG)
    api/enquiry/route.ts  Enquiry endpoint (validation, spam checks, delivery)
  assets/images/          Source photography (optimised by next/image to AVIF/WebP)
  components/
    brand/                Logo, faceted bull, watermark, generated logo data
    layout/               Header, mobile menu, footer, breadcrumbs, floating actions
    motion/               Smooth scroll, reveals, split text, parallax, magnetic, horizontal
    ui/                   Buttons, section headings, accordion, chips, tabs
    sections/             Shared page sections (page hero, CTA band, FAQ, coverage map)
    home/ steel/ solar/ it/ about/ contact/   Page-specific sections
    products/             Product card, technical product visuals, catalogue
    forms/                Config-driven enquiry form + fields + WhatsApp hand-off
  content/                All copy and catalogue data (single source of truth)
  lib/                    SEO + JSON-LD builders, enquiry schema, delivery, rate limit, utils
docs/                     Design system, architecture, image credits
scripts/                  Brand asset generation from the supplied logo
```

## Content and configuration

- `src/content/site.ts` holds the company profile and **all placeholders** (phone, email,
  address, WhatsApp, social links, map embed). Each placeholder is labelled and flagged so the UI
  renders "to be confirmed" states and structured data omits unknown facts.
- Catalogue data lives in `src/content/{steel,solar,it}.ts`. Fields for specifications and
  sizes are present but marked unconfirmed until the business supplies real values.
- Environment variables (see `.env.example`) configure the site URL, WhatsApp number, email
  delivery, webhook delivery and optional Cloudflare Turnstile.

## Enquiry pipeline

1. Client form (React Hook Form + Zod) validates inline and shows loading, success and error states.
2. `POST /api/enquiry` re-validates with the same Zod schema, then runs spam checks: a honeypot
   field, a minimum fill time, per-IP rate limiting and, when configured, Cloudflare Turnstile.
3. Delivery: email via Resend (if configured), JSON webhook (if configured), and an append-only
   NDJSON log on disk as a durable fallback. The request succeeds if at least one channel stores it.
4. Each form also offers a WhatsApp hand-off that pre-fills the enquiry as a message.

## SEO

- Per-page `metadata` (unique title, description, canonical, Open Graph, Twitter) via
  `lib/seo.ts`.
- JSON-LD: Organization + WebSite (all pages), BreadcrumbList (inner pages), Service (vertical
  pages, area served: Kerala), FAQPage where FAQs are shown. LocalBusiness is emitted only once a
  real address and phone are configured. Product schema is intentionally not emitted because
  prices, offers and reviews are not available.
- `sitemap.ts` and `robots.ts` are generated from the route list.

## Performance

- Static prerendering; fonts self-hosted through `next/font`; images through `next/image` with
  AVIF/WebP, responsive `sizes`, blur placeholders and lazy loading below the fold.
- Logos render as CSS masks over the static files in `/public/brand`, and product illustrations are
  prerendered SVG files (`/visuals/[file]`), so neither bloats the HTML or the React payload.
- GSAP + ScrollTrigger load on demand (`src/lib/gsap.ts`), only when a component's media query
  matches (desktop scroll choreography, fine-pointer interactions). Phones never download them.
  Lenis loads only on fine-pointer devices. Motion features load asynchronously via `LazyMotion`.
- The hero bull's assembly and all text reveals are CSS animations that start at first paint.
  Scroll reveals use one shared IntersectionObserver (`InView`) with React-owned classes.
- Continuous SVG animations (dash flows, pulses, light sweeps) run on desktop only, and decorative
  loops use compositor-friendly transforms.
- Heavy scroll sequences are disabled on small screens and for reduced motion.

## Notable implementation details

- **Activity**: Cache Components keeps up to three visited routes in the DOM (hidden). Anchor IDs are
  therefore page-unique (`#steel-enquiry`, `#solar-faq`…) and SVG gradient IDs are generated per instance.
- **Enquiry log location**: the standalone server `chdir`s into `.next/standalone`; `npm start` pins
  `ENQUIRY_LOG_DIR` to the project's `.data` folder, and `.data` is excluded from output file tracing.
- **Tests**: `tests/` (Vitest) covers the enquiry schema, signed tokens and the rate limiter.
