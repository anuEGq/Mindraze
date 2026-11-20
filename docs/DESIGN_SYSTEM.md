# Mindraze Global LLP: Design System

**Tagline:** Innovate. Evolve. Lead.
**Positioning:** One company. Three verticals. Unlimited possibilities.

The system is derived from the supplied logo: a geometric, faceted leaping bull, a light serif
wordmark, and a muted olive field. Everything below is implemented as CSS custom properties and
Tailwind v4 theme tokens in `src/app/globals.css`.

## 1. Colour

| Token | Hex | Role |
| --- | --- | --- |
| `olive` | `#B9BC5D` | Primary brand accent. Fills, rules, highlights, focus rings on dark. |
| `olive-light` | `#E8E9C9` | Tinted surfaces on light sections, chips, hover fills. |
| `olive-deep` | `#5E6123` | Olive used **as text** on light backgrounds (AA contrast on warm white). |
| `charcoal` | `#151515` | Primary dark surface, body text on light. |
| `ink` | `#080808` | Deepest surface (hero, IT vertical). |
| `paper` | `#F8F8F3` | Warm white, default light surface. |
| `grey` | `#77786E` | Neutral grey for rules, icons and large text (4.2:1 on paper, so not for small text). |
| `grey-strong` | `#6B6C62` | Small meta text on light surfaces (5.0:1 on paper). |
| `mist` | `#9A9B90` | Muted text on charcoal/ink (6.5:1 on charcoal). |
| `white` | `#FFFFFF` | Cards on paper, text on dark. |

Rules:
- Olive is an accent, never a large flat background except the brand CTA and the logo plate.
- Olive text is only used on charcoal or ink (contrast 9:1). On paper, use `olive-deep` text.
- No neon, no corporate blue, no rainbow gradients. Gradients are tonal (charcoal to ink,
  olive to transparent) and used for light and depth, not decoration.

### Vertical identities
Each vertical keeps the brand palette and differs in **material, light and motion**:

| Vertical | Surface | Texture & light | Motion signature |
| --- | --- | --- | --- |
| Steel Trading | Charcoal `#151515` | Brushed-metal sheen, hard edges, monochrome photography | Linear sheen sweeps, mechanical stepped reveals |
| Solar Solutions | Paper + olive light | Warm sunlight glow, soft rays | Slow radial light, energy lines flowing |
| IT Services | Ink `#080808` | Fine grid, interface chrome, mono labels | Typing, floating UI cards, NFC ripples |

## 2. Typography

- **Manrope** (variable 200–800) for display, headings and body.
- **JetBrains Mono** (400/500) for small technical labels only: indices (`01`), eyebrows,
  product codes, and form helper text.

| Style | Size (fluid) | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- |
| Display (hero) | `clamp(3rem, 8.4vw, 9.5rem)` | 600 | -0.045em | 0.92 |
| H1 (inner hero) | `clamp(2.75rem, 7vw, 7.5rem)` | 600 | -0.04em | 0.95 |
| H2 | `clamp(2.25rem, 5vw, 4.75rem)` | 600 | -0.035em | 1.0 |
| H3 | `clamp(1.5rem, 2.4vw, 2.25rem)` | 600 | -0.02em | 1.1 |
| Lead | `clamp(1.125rem, 1.6vw, 1.5rem)` | 400 | -0.01em | 1.45 |
| Body | `1rem` to `1.0625rem` | 400 | 0 | 1.65 |
| Eyebrow | `0.75rem` mono | 500 | 0.18em uppercase | 1 |

One `h1` per page. Headings follow document order with no skipped levels.

## 3. Layout and spacing

- Container: max 1440px, gutters `clamp(1.25rem, 4vw, 3rem)`.
- Section rhythm: `clamp(5rem, 11vw, 10rem)` vertical padding.
- 12-column grid on desktop; single column with deliberate re-ordering on mobile
  (mobile-first, never a shrunken desktop).
- Radii: 10px (inputs, chips), 20px (cards), 32px (panels), full (pills, buttons).

## 4. Brand motif: the bull

The bull is used three ways and never altered:
1. **Logo**: the supplied artwork, proportions untouched. Horizontal lockup (mark + wordmark)
   in the header, stacked full logo in the footer, hero and brand moments.
2. **Faceted bull**: the 20 negative-space facets of the logo's bull, rendered as shaded
   planes that assemble in the home hero and respond to the pointer in 3D.
3. **Watermark**: the bull outline at low opacity behind CTAs and section ends.

## 5. Motion

| Token | Value | Use |
| --- | --- | --- |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, menus |
| `ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | Masks, page-level transitions |
| `dur-fast / base / slow` | 300 / 700 / 1100 ms | Micro, reveal, cinematic |

Principles:
- Motion explains structure (reveal order, depth, cause and effect). Nothing loops loudly.
- Tools: CSS for micro-interactions and reveals; GSAP + ScrollTrigger for pinned, scrubbed
  and horizontal sequences; Motion for component state (menus, tabs, filters); Lenis for
  smooth wheel scrolling on desktop only (native touch scrolling is preserved).
- `prefers-reduced-motion: reduce` disables smooth scrolling, pinning, parallax, magnetic
  effects and text splitting; content renders in its final state.
- Below 1024px, pinned/horizontal sequences become native swipe rows with scroll-snap.
- No information is conveyed only through animation or hover.

## 6. Components (inventory)

Buttons (primary olive, dark, ghost, link; magnetic on fine pointers) · Eyebrow · Section
heading with split reveal · Reveal / image mask / parallax wrappers · Bento tile · Product
card (illustration or photo, sizes, enquire) · Filter chips · Service tabs · Accordion (FAQ) ·
Breadcrumbs · Kerala coverage map · Enquiry form (config-driven variants) · Floating WhatsApp
and back-to-top · Mobile full-screen menu · Mega dropdown · Marquee strip · CTA band.

## 7. Accessibility

WCAG 2.2 AA: visible 2px olive/charcoal focus rings, 44px minimum touch targets, labelled
form controls with inline error text and `aria-describedby`, skip link, landmark regions,
`aria-current` for active navigation, focus trap in the mobile menu, and reduced-motion support.
