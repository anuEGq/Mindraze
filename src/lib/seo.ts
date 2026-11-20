import type { Metadata } from "next";
import { hasValue, site } from "@/content/site";
import type { Faq } from "@/content/types";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Path to an Open Graph image in /public (1200×630). */
  image?: string;
  /** Use the title as-is instead of the "%s | Mindraze Global LLP" template. */
  absoluteTitle?: boolean;
};

export const defaultOgImage = "/og/mindraze-global.png";

export function buildMetadata({ title, description, path, keywords, image, absoluteTitle }: PageSeo): Metadata {
  const ogImage = image ?? defaultOgImage;
  const fullTitle = absoluteTitle ? title : `${title} | ${site.legalName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: path,
      siteName: site.legalName,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.legalName}: ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

const abs = (path: string) => new URL(path, site.url).toString();

const sameAs = () => site.social.map((s) => s.href).filter(Boolean);

export function organizationSchema() {
  const phone = site.contact.phone;
  const email = site.contact.email;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: site.legalName,
    alternateName: site.name,
    url: abs("/"),
    logo: abs("/brand/mindraze-logo-olive.png"),
    slogan: site.tagline,
    description: site.description,
    areaServed: { "@type": "State", name: "Kerala", containedInPlace: { "@type": "Country", name: "India" } },
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
    ...(hasValue(phone) || hasValue(email)
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["en", "ml"],
              ...(hasValue(phone) ? { telephone: phone.value } : {}),
              ...(hasValue(email) ? { email: email.value } : {}),
            },
          ],
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: abs("/"),
    name: site.legalName,
    inLanguage: site.language,
    publisher: { "@id": abs("/#organization") },
  };
}

/** LocalBusiness requires a real address and phone; returns null until both are configured. */
export function localBusinessSchema() {
  const { address, phone } = site.contact;
  if (!hasValue(address) || !hasValue(phone)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": abs("/#localbusiness"),
    name: site.legalName,
    url: abs("/"),
    image: abs("/brand/mindraze-logo-olive.png"),
    telephone: phone.value,
    address: { "@type": "PostalAddress", streetAddress: address.value, addressRegion: "Kerala", addressCountry: "IN" },
    parentOrganization: { "@id": abs("/#organization") },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType: string; offers: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": abs("/#organization") },
    areaServed: { "@type": "State", name: "Kerala" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
