# Mindraze Global LLP: corporate website

*Innovate. Evolve. Lead.*

Premium, animated, SEO-ready website for Mindraze Global LLP and its three verticals:
**Steel Trading**, **Solar Energy Solutions** and **IT Services & Digital Solutions**.

- Design system: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- Architecture, SEO and enquiry pipeline: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Photo credits: [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md)

## Stack

Next.js 16 (App Router, Cache Components, fully prerendered pages) · React 19 · TypeScript ·
Tailwind CSS 4 · GSAP + ScrollTrigger · Motion · Lenis · Zod + React Hook Form · Lucide.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local     # optional in development
npm run dev                    # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build + standalone server bundle |
| `npm start` | Runs the standalone production server (`PORT`, `HOSTNAME` respected) |
| `npm run lint` / `npm run typecheck` / `npm test` | ESLint, TypeScript, Vitest unit tests |
| `npm run brand` | Regenerates brand files from the supplied logo (see below) |

## Pages

`/` · `/about` · `/businesses` · `/businesses/steel-trading` · `/businesses/solar-solutions` ·
`/businesses/it-services` · `/products-services` · `/contact` · `/privacy-policy` ·
`/terms-and-conditions`, plus `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and `POST /api/enquiry`.

## Before going live: information still needed

Everything below currently renders as a clearly labelled placeholder. None of it was invented.

| Item | Where to set it |
| --- | --- |
| Live domain | `NEXT_PUBLIC_SITE_URL` |
| Phone, email, WhatsApp number, office address | `NEXT_PUBLIC_CONTACT_*`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_OFFICE_ADDRESS` |
| Google Maps embed | `NEXT_PUBLIC_MAP_EMBED_URL` |
| Social profile links | `NEXT_PUBLIC_SOCIAL_*` |
| Enquiry email delivery | `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (or `ENQUIRY_WEBHOOK_URL`) |
| TMT specifications (grade, diameters, length, bundle weight) | `src/content/steel.ts` → `tmtBrands[].specs` (shown as "Shared with quotation" until filled) |
| Confirmed stocked sizes | `src/content/steel.ts` → set `sizes.confirmed: true` and list `options` |
| Genuine product & project photos | `src/assets/images/*` (same file names) or a `photo` on any product in `src/content/*.ts` |
| Privacy Policy / Terms | `src/app/privacy-policy`, `src/app/terms-and-conditions` (templates: need legal review) |

Coverage across Kerala lists all 14 districts on the solar page and the home page. Please confirm this
matches the area you serve.

## Editing content

All copy and catalogue data lives in `src/content/`:

- `site.ts`: company profile, contact placeholders, social links
- `verticals.ts`: the three businesses (headlines, descriptions, highlights, photos)
- `steel.ts`, `solar.ts`, `it.ts`: catalogues, services, FAQs, form options
- `company.ts`: introduction, values, approach, "at a glance" figures (counted from the catalogue)
- `showcase.ts`: products featured on the home page
- `media.ts`: photography (Unsplash placeholders; swap for genuine photography)

Product illustrations (steel sections, solar components) are original technical drawings generated
in code (`src/components/products/product-scenes.ts`) and served as static SVG files from
`/visuals/<kind>.svg`. Adding a `photo` to a product shows the photograph instead.

### Logo

The supplied files in `Logo/` are untouched. `scripts/source/logo-optimised.svg` is the transparent
SVG with coordinates rounded to 4 decimals (visually identical, about 80% smaller). `npm run brand` regenerates
`public/brand/*.svg` and `src/components/brand/logo-data.ts` from it. On the site the logo is rendered
as a CSS mask over those files, so it takes the text colour of light or dark sections without being
redrawn. `scripts/generate-images.mjs` rebuilds the Open Graph images and icons (needs `playwright-core`
and a local Chrome).

## Enquiries

Every form (steel, solar, IT, contact) posts to `/api/enquiry`, which:

1. validates with the same Zod schema as the browser (`src/lib/enquiry/schema.ts`);
2. rejects spam through a hidden honeypot field, a signed "form opened" token with a minimum fill time,
   per-IP rate limiting (5 per 10 minutes) and optional Cloudflare Turnstile;
3. delivers to every configured channel: an append-only log (`$ENQUIRY_LOG_DIR/enquiries.ndjson`),
   email through Resend, and/or a JSON webhook. It succeeds if at least one channel stored the enquiry.

Visitors get a reference number (e.g. `MG-8XQD1F2F`) and, once a WhatsApp number is configured,
a pre-filled WhatsApp hand-off. Product "Enquire" buttons pre-select the product on the form, and
cross-page links can use `?interest=<option>`.

> The enquiry log contains personal data. Keep `ENQUIRY_LOG_DIR` outside the web root and back it up.

## Deployment on Netlify (client preview)

`netlify.toml` is included, and Netlify installs its Next.js adapter automatically. From this folder:

```bash
npx netlify-cli login        # once, opens the browser
npx netlify-cli deploy --prod   # builds locally, then uploads to the linked project
```

The project is linked to the Netlify project `mindraze-preview` (https://mindraze-preview.netlify.app)
through `.netlify/state.json`. To create a different project, run `npx netlify-cli link` or
`npx netlify-cli sites:create` first and deploy afterwards: creating the project inside `deploy`
(`--site-name`) fails at "Uploading blobs" because that build starts without a site ID.

Or push the project to GitHub and use **Add new project > Import an existing project** in Netlify.

- `SITE_NOINDEX=true` in `netlify.toml` keeps the preview out of search engines. Remove it for the live site.
- Canonical and sharing URLs use Netlify's site URL unless `NEXT_PUBLIC_SITE_URL` is set.
- Netlify functions can't write to disk. Without `RESEND_API_KEY`/`ENQUIRY_TO_EMAIL` or `ENQUIRY_WEBHOOK_URL`,
  enquiries still succeed but are only printed to **Logs > Functions** in the Netlify dashboard.
- Environment variables go in **Project configuration > Environment variables**. Redeploy after changing them.
- Free `*.netlify.app` sites get a promotional HTML comment injected into `<head>`. The inline script in
  `src/app/layout.tsx` removes it before React hydrates; without that, every page logs React error #418.

## Deployment (Node behind Apache)

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com npm run build   # plus the other NEXT_PUBLIC_* values
PORT=3000 HOSTNAME=127.0.0.1 ENQUIRY_LOG_DIR=/var/lib/mindraze npm start
```

Run `npm start` under systemd or pm2. Then proxy Apache to it (`a2enmod proxy proxy_http headers`):

```apache
<VirtualHost *:443>
    ServerName www.your-domain.com
    # ... SSL directives ...
    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Real-IP "%{REMOTE_ADDR}s"
    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

Keep Node bound to `127.0.0.1` so clients cannot bypass the proxy and spoof `X-Real-IP`.

## Quality checks

Measured against the production build on the development machine:

| Check | Result |
| --- | --- |
| Lighthouse Accessibility / Best Practices / SEO | 100 / 100 / 100 on all audited pages |
| Lighthouse Performance, desktop (home) | 100. LCP 0.3 s, TBT 0 ms, CLS 0 |
| Lighthouse Performance, mobile (home, DevTools throttling) | 94–95. LCP 1.7 s, TBT 220–240 ms, CLS 0 |
| End-to-end browser checks (navigation, menus, filters, forms, overflow) | 22 / 22 pass |
| Unit tests (schema, tokens, rate limiting) | 14 / 14 pass |

Animations respect `prefers-reduced-motion`. Smooth scrolling and GSAP load only on large,
fine-pointer screens, and touch devices keep native scrolling.
