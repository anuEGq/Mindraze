/**
 * Company profile and contact configuration.
 *
 * IMPORTANT: Phone, email, address, WhatsApp, social links and the map embed are
 * PLACEHOLDERS until the business confirms them. Fill them in here or through the
 * environment variables listed in `.env.example`. Anything left empty renders as a
 * clearly labelled placeholder and is omitted from structured data.
 */

// Every value below is read with a literal `process.env.NAME` so Next.js inlines it at
// build time. Server renders, browser code and serverless re-renders then all agree.
// (Looking variables up by a computed key name returns nothing in the browser or on Netlify functions.)
const clean = (value: string | undefined) => (value ?? "").trim();

function resolveSiteUrl() {
  // Explicit setting wins; otherwise the primary URL Netlify exposes during builds
  // (captured as BUILD_SITE_URL in next.config.ts).
  const fromEnv = clean(process.env.NEXT_PUBLIC_SITE_URL) || clean(process.env.BUILD_SITE_URL);
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // Local fallback. Set NEXT_PUBLIC_SITE_URL in production so canonical URLs,
  // the sitemap and Open Graph tags point at the live domain.
  return "http://localhost:3000";
}

export type ContactField = {
  /** Confirmed value. Empty string means "not yet provided". */
  value: string;
  /** Text shown while the value is missing. */
  placeholder: string;
};

export const site = {
  name: "Mindraze Global",
  legalName: "Mindraze Global LLP",
  tagline: "Innovate. Evolve. Lead.",
  promise: "One Company. Three Verticals. Unlimited Possibilities.",
  description:
    "Mindraze Global LLP is a diversified business organisation delivering quality steel materials, complete rooftop solar solutions and innovative IT and digital services across Kerala.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  language: "en-IN",
  region: "Kerala, India",
  /** Set SITE_NOINDEX=true for preview/demo deployments so search engines skip them. */
  noindex: clean(process.env.SITE_NOINDEX) === "true",

  contact: {
    phone: {
      value: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
      placeholder: "+91 XXXXX XXXXX",
    } satisfies ContactField,
    email: {
      value: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
      placeholder: "enquiries@your-domain.com",
    } satisfies ContactField,
    /** International format without "+" or spaces, e.g. 919876543210 */
    whatsapp: {
      value: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/[^\d]/g, ""),
      placeholder: "+91 XXXXX XXXXX",
    } satisfies ContactField,
    address: {
      value: clean(process.env.NEXT_PUBLIC_OFFICE_ADDRESS),
      placeholder: "Office address to be confirmed, Kerala, India",
    } satisfies ContactField,
    /** Google Maps embed URL (https://www.google.com/maps/embed?pb=...). */
    mapEmbedUrl: clean(process.env.NEXT_PUBLIC_MAP_EMBED_URL),
  },

  social: [
    { name: "Facebook", href: clean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
    { name: "Instagram", href: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { name: "LinkedIn", href: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
    { name: "YouTube", href: clean(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) },
  ] as const,
} as const;

export type SocialName = (typeof site.social)[number]["name"];

export const hasValue = (field: ContactField) => field.value.length > 0;

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
