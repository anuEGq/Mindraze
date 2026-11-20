import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { FaqSection } from "@/components/sections/faq-section";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { OtherVerticals } from "@/components/sections/other-verticals";
import { TmtBrandSelector } from "@/components/steel/tmt-brand-selector";
import { ProductCard } from "@/components/products/product-card";
import { ProductVisual } from "@/components/products/product-visual";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { Parallax } from "@/components/motion/parallax";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { JsonLd } from "@/components/seo/json-ld";
import { media } from "@/content/media";
import { steelFaqs, steelProducts, structuralProducts, tmtBrands } from "@/content/steel";
import { buildMetadata, serviceSchema } from "@/lib/seo";

const path = "/businesses/steel-trading";

export const metadata: Metadata = buildMetadata({
  title: "TMT Bars & Structural Steel Suppliers in Kerala",
  description:
    "TMT steel dealers and structural steel suppliers in Kerala. Mindraze Global supplies TUSKER TMT and WIN TMT bars, patta (flat bars), MS angles, L-clamps, square rods and round rods. Bulk enquiries welcome.",
  path,
  image: "/og/steel-trading.png",
  keywords: [
    "TMT steel dealers in Kerala",
    "TMT bar suppliers in Kerala",
    "steel wholesale traders Kerala",
    "structural steel suppliers",
    "MS angle suppliers",
    "patta steel suppliers",
    "square rod suppliers",
    "round rod suppliers",
    "L clamp suppliers",
    "TUSKER TMT",
    "WIN TMT",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Businesses", path: "/businesses" },
  { name: "Steel Trading", path },
];

const nav = [
  { id: "overview", label: "Overview" },
  { id: "tmt", label: "TMT Bars" },
  { id: "structural", label: "Structural Steel" },
  { id: "steel-process", label: "How it works" },
  { id: "steel-faq", label: "FAQ" },
  { id: "steel-enquiry", label: "Enquiry" },
];

export default function SteelTradingPage() {
  return (
    <>
      <PageHero
        eyebrow="01 · Steel Trading"
        titleLines={["Steel Solutions for", "Stronger Foundations."]}
        titleClassName="text-metal"
        description="Your trading partner for quality TMT bars and structural steel materials."
        crumbs={crumbs}
        photo={media.steel.beams}
        className="brushed-metal"
        actions={
          <>
            <Magnetic>
              <ButtonLink href="#steel-enquiry" size="lg">Request a bulk quote</ButtonLink>
            </Magnetic>
            <ButtonLink href="#tmt" size="lg" variant="outline-light">View products</ButtonLink>
          </>
        }
      >
        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 text-sm sm:grid-cols-4" aria-label="At a glance">
          {[
            ["TMT brands", "TUSKER TMT · WIN TMT"],
            ["Structural steel", "Patta, angles, clamps, rods"],
            ["Orders", "Bulk & project enquiries"],
            ["Specifications", "Confirmed with every quote"],
          ].map(([k, v]) => (
            <li key={k} className="bg-charcoal/80 p-5 backdrop-blur">
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-paper/50 uppercase">{k}</p>
              <p className="mt-2 font-semibold">{v}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="relative bg-paper">
        <SectionNav items={nav} />

        <section id="overview" data-theme="light" aria-labelledby="overview-title" className="pt-16 pb-24 lg:pb-32">
          <div className="container-x grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                id="overview-title"
                eyebrow="Steel trading"
                titleLines={["Strength That", "Builds Tomorrow."]}
                lead="Reliable steel trading solutions for construction, infrastructure and industrial requirements. We supply TMT bars and a wide range of structural steel products in different brands, sizes and specifications."
              />
              <Reveal delay={200} className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  ["Construction", "Homes, commercial buildings and RCC work."],
                  ["Infrastructure", "Material for larger projects and contractors."],
                  ["Fabrication", "Flat bars, angles, rods and clamps for workshops."],
                  ["Bulk orders", "Quotations for project quantities and specific sizes."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/[0.07]">
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-sm text-grey-strong">{d}</p>
                  </div>
                ))}
              </Reveal>
            </div>
            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)]">
                <MaskReveal className="absolute inset-0">
                  <Parallax speed={0.1} className="absolute -inset-y-[12%] inset-x-0">
                    <Image src={media.steel.inspection.src} alt={media.steel.inspection.alt} fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </Parallax>
                </MaskReveal>
              </div>
              <Reveal variant="scale" delay={300} className="absolute -bottom-8 -left-4 w-56 rounded-[var(--radius-card)] bg-charcoal p-5 text-paper shadow-2xl sm:-left-10 sm:w-64">
                <ProductVisual kind="tmt" tone="dark" className="h-28" />
                <p className="eyebrow mt-3 text-olive">TMT bars</p>
                <p className="mt-1 text-sm text-paper/70">TUSKER TMT and WIN TMT</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="tmt" data-theme="dark" aria-labelledby="tmt-title" className="grain relative bg-charcoal text-paper">
          <div className="container-x section-y">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading id="tmt-title" tone="dark" eyebrow="A · TMT steel bars" titleLines={["Choose your brand.", "Tell us your sizes."]} />
              <Reveal as="p" delay={150} className="max-w-md text-paper/65">
                TMT (thermo-mechanically treated) bars are the reinforcement backbone of RCC construction. Pick a brand and the
                diameters you need, and we&apos;ll confirm availability and pricing.
              </Reveal>
            </div>
            <div className="mt-14">
              <TmtBrandSelector brands={tmtBrands} visual={<ProductVisual kind="tmt" tone="dark" className="h-full w-full" />} />
            </div>
          </div>
        </section>

        <section id="structural" data-theme="light" aria-labelledby="structural-title" className="bg-paper py-24 lg:motion-safe:py-0">
          <HorizontalScroll
            label="Structural steel and fabrication products"
            header={
              <div className="container-x mb-12 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
                <div>
                  <p className="eyebrow flex items-center gap-3 text-olive-deep">
                    <span aria-hidden className="h-px w-8 bg-current" /> B · Structural steel & fabrication
                  </p>
                  <SplitText id="structural-title" lines={["Materials for every", "frame, grill and fixture."]} className="mt-6 text-h2" />
                </div>
                <p className="max-w-sm text-grey-strong">Available in different sizes. Share the size and quantity you need for a quotation.</p>
              </div>
            }
          >
            {structuralProducts.map((p) => (
              <div key={p.id} className="w-[82vw] max-w-[24rem] shrink-0 snap-start sm:w-[22rem]">
                <ProductCard product={p} interest={p.name} />
              </div>
            ))}
            <div className="flex w-[82vw] max-w-[24rem] shrink-0 snap-start flex-col justify-between rounded-[var(--radius-card)] bg-charcoal p-8 text-paper sm:w-[22rem]">
              <p className="eyebrow text-olive">Need something else?</p>
              <p className="text-h3">Bulk orders and specific sizes on request.</p>
              <ButtonLink href="#steel-enquiry" variant="primary">Send your requirement</ButtonLink>
            </div>
          </HorizontalScroll>
        </section>

        <ProcessSteps
          id="steel-process"
          eyebrow="How bulk enquiries work"
          title="From requirement to supply, in four steps."
          tone="dark"
          steps={[
            { title: "Share your requirement", summary: "Tell us the products, brand, sizes and approximate quantity." },
            { title: "Availability & quote", summary: "We confirm current availability and send you a quotation." },
            { title: "Confirm your order", summary: "Approve the quote and finalise quantities and timelines." },
            { title: "Supply coordination", summary: "We coordinate the supply of your order with you." },
          ]}
        />

        <FaqSection id="steel-faq" faqs={steelFaqs} title="Steel trading questions" />

        <EnquirySection
          id="steel-enquiry"
          variant="steel"
          eyebrow="Steel enquiry"
          titleLines={["Request a", "steel quotation."]}
          lead="Share the product, brand, size and quantity. Bulk and project enquiries are welcome."
          whatsappMessage="Hello Mindraze Global, I'd like a quotation for steel. Product: , Size: , Quantity: "
          points={["TMT bars: TUSKER TMT and WIN TMT", "Flat bars, MS angles, L-clamps, square & round rods", "Specific sizes and bulk quantities on request"]}
        />
      </div>

      <OtherVerticals current="steel" />

      <JsonLd
        data={serviceSchema({
          name: "Steel Trading",
          serviceType: "Steel trading and supply",
          description: "Supply of TMT steel bars (TUSKER TMT, WIN TMT) and structural steel materials including flat bars, MS angles, L-clamps, square rods and round rods.",
          path,
          offers: steelProducts.map((p) => p.name),
        })}
      />
    </>
  );
}
