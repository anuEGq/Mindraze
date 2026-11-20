import { panelBrands, solarProducts } from "./solar";
import { tmtBrands } from "./steel";
import type { Faq } from "./types";

export const intro = {
  heading: "Built on Versatility. Driven by Innovation.",
  paragraphs: [
    "Mindraze Global LLP is a diversified business organisation committed to delivering quality products, dependable services and innovative solutions across multiple industries.",
    "From steel trading and solar energy installations to modern IT and digital solutions, we bring different capabilities together under one vision.",
  ],
};

export const values = [
  {
    title: "Multiple Business Expertise",
    summary: "Steel, solar and digital capabilities under one roof, so you work with one accountable partner across projects.",
    icon: "Layers",
  },
  {
    title: "Quality Products and Services",
    summary: "Established brands, carefully sourced materials and work done with attention to detail.",
    icon: "BadgeCheck",
  },
  {
    title: "Customer-Focused Approach",
    summary: "We start with your requirement, budget and site, then recommend what genuinely fits.",
    icon: "Users",
  },
  {
    title: "Reliable Business Partnerships",
    summary: "Clear communication, transparent quotations and follow-through you can plan around.",
    icon: "Handshake",
  },
  {
    title: "Innovative Solutions",
    summary: "From rooftop solar to NFC-powered review stands, practical innovation for everyday business.",
    icon: "Sparkles",
  },
  {
    title: "End-to-End Support",
    summary: "Guidance from the first enquiry through supply, installation and after-care.",
    icon: "LifeBuoy",
  },
] as const;

export const approach = [
  { step: "01", title: "Understand", summary: "We listen to your requirement: what you need, where, by when and within what budget." },
  { step: "02", title: "Recommend", summary: "We suggest the right products, brands or solution, and confirm availability and pricing." },
  { step: "03", title: "Deliver", summary: "We supply, install or build, keeping you informed at each stage." },
  { step: "04", title: "Support", summary: "We stay available after delivery for questions, maintenance and what comes next." },
] as const;

/** Facts derived from the catalogue itself (no invented statistics). */
export const glance = [
  { value: 3, label: "Business verticals under one vision" },
  { value: tmtBrands.length, label: "TMT steel brands supplied" },
  { value: panelBrands.length, label: "Solar panel brands available" },
  { value: solarProducts.length, label: "Solar product lines for installers and owners" },
] as const;

export const generalFaqs: Faq[] = [
  {
    q: "What does Mindraze Global do?",
    a: "Mindraze Global LLP operates three business verticals: steel trading (TMT bars and structural steel), solar energy solutions (installation, maintenance and product supply across Kerala) and IT services (websites, web applications, digital marketing, NFC solutions, and sales, support and training for myBillBook, Vyapar, Tally, MargBooks and SpotERP billing software).",
  },
  {
    q: "How do I request a quote?",
    a: "Use the enquiry form on this page or the relevant business page, or message us on WhatsApp. Include the product or service, quantity or scope, and your location.",
  },
  {
    q: "Can one enquiry cover more than one vertical?",
    a: "Yes. Mention everything you need in your message, for example steel for a building and a rooftop solar system, and we will coordinate a single response.",
  },
];
