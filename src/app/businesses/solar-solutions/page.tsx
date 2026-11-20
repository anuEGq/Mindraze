import type { Metadata } from "next";
import { MapPin, PackageCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { FaqSection } from "@/components/sections/faq-section";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { OtherVerticals } from "@/components/sections/other-verticals";
import { KeralaMap } from "@/components/sections/kerala-map";
import { SunGlow } from "@/components/solar/sun-glow";
import { ServiceTabs } from "@/components/solar/service-tabs";
import { PanelShowcase } from "@/components/solar/panel-showcase";
import { ProductCard } from "@/components/products/product-card";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonAnchor, ButtonIcon, ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { JsonLd } from "@/components/seo/json-ld";
import { districtNames } from "@/content/kerala";
import { media } from "@/content/media";
import { panelBrands, panelTypes, solarAccessories, solarElectrical, solarFaqs, solarProducts, solarServices } from "@/content/solar";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

const path = "/businesses/solar-solutions";

export const metadata: Metadata = buildMetadata({
  title: "Rooftop Solar Installation & Solar Panels in Kerala",
  description:
    "Rooftop solar installation, solar structure fabrication, panel cleaning and maintenance, and solar product supply across Kerala. DCR and non-DCR panels from Adani, Waaree, Microtek, Loom Solar and Vikram Solar, plus electrical components and mounting accessories.",
  path,
  image: "/og/solar-solutions.png",
  keywords: [
    "rooftop solar installation Kerala",
    "solar panel installation Kerala",
    "solar panel suppliers Kerala",
    "DCR solar panels Kerala",
    "non-DCR solar panels",
    "solar accessories suppliers",
    "solar panel cleaning services Kerala",
    "solar mounting accessories",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Businesses", path: "/businesses" },
  { name: "Solar Solutions", path },
];

const nav = [
  { id: "services", label: "Services" },
  { id: "panels", label: "Solar Panels" },
  { id: "components", label: "Electrical" },
  { id: "accessories", label: "Accessories" },
  { id: "coverage", label: "Coverage" },
  { id: "solar-faq", label: "FAQ" },
  { id: "solar-enquiry", label: "Enquiry" },
];

const electricalInterest = "Electrical components";
const accessoryInterest = "Installation accessories";

export default function SolarSolutionsPage() {
  const wa = whatsappHref("Hello Mindraze Global, I'd like to enquire about solar. District: , Requirement: ");
  return (
    <>
      <PageHero
        tone="light"
        className="bg-gradient-to-b from-paper via-paper to-olive-light"
        background={<SunGlow className="-top-48 -right-40 size-[44rem] sm:-top-56 sm:-right-24 lg:size-[52rem]" />}
        eyebrow="02 · Solar Energy Solutions"
        titleLines={["Make the Sun", "Work for You."]}
        description="Complete rooftop solar solutions, professional installations and reliable solar product supply across Kerala."
        crumbs={crumbs}
        photo={media.solar.rooftopAerial}
        actions={
          <>
            <Magnetic>
              <ButtonLink href="#solar-enquiry" size="lg" variant="dark">Get a solar quote</ButtonLink>
            </Magnetic>
            {wa ? (
              <ButtonAnchor href={wa} target="_blank" rel="noopener noreferrer" size="lg" variant="outline-dark" icon={<ButtonIcon variant="outline-dark" size="lg"><WhatsAppIcon className="size-5" /></ButtonIcon>}>
                WhatsApp us
              </ButtonAnchor>
            ) : (
              <ButtonLink href="#solar-enquiry" size="lg" variant="outline-dark" icon={<ButtonIcon variant="outline-dark" size="lg"><WhatsAppIcon className="size-5" /></ButtonIcon>}>
                WhatsApp (soon)
              </ButtonLink>
            )}
          </>
        }
      >
        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-charcoal/10 text-sm sm:grid-cols-4" aria-label="At a glance">
          {[
            ["Services", "Installation & maintenance"],
            ["Supply", "Panels, components, accessories"],
            ["For", "Residential · Commercial · Industrial"],
            ["Coverage", "Across Kerala"],
          ].map(([k, v]) => (
            <li key={k} className="bg-white/70 p-5 backdrop-blur">
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-grey-strong uppercase">{k}</p>
              <p className="mt-2 font-semibold">{v}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="relative bg-paper">
        <SectionNav items={nav} />

        <section id="services" data-theme="light" aria-labelledby="services-title" className="pt-16 pb-24 lg:pb-32">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading id="services-title" eyebrow="Solar services" titleLines={["Installation, maintenance", "and supply, end to end."]} />
              <Reveal as="p" delay={150} className="max-w-sm text-grey-strong">
                Choose a complete installation, or buy only the materials you need. Both installation services and material supply are available.
              </Reveal>
            </div>
            <div className="mt-14">
              <ServiceTabs services={solarServices} />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Reveal className="flex gap-5 rounded-[var(--radius-card)] bg-charcoal p-7 text-paper">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-olive text-ink">
                  <Wrench aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">Install with us</h3>
                  <p className="mt-2 text-paper/70">Rooftop systems, mounting structures, and cleaning and maintenance carried out by our team.</p>
                </div>
              </Reveal>
              <Reveal delay={100} className="flex gap-5 rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-charcoal/[0.07]">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-charcoal text-olive">
                  <PackageCheck aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">Buy the materials</h3>
                  <p className="mt-2 text-grey-strong">Panels, electrical components and installation accessories supplied for your own or your installer&apos;s project.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="panels" data-theme="light" aria-labelledby="panels-title" className="relative overflow-hidden bg-olive-light/60 py-24 lg:py-32">
          <SunGlow className="-bottom-80 -left-80 size-[46rem] opacity-60" />
          <div className="container-x relative">
            <SectionHeading id="panels-title" eyebrow="A · Solar panels" titleLines={["DCR and non-DCR panels", "from brands you know."]} />
            <div className="mt-16">
              <PanelShowcase brands={panelBrands} types={panelTypes} />
            </div>
          </div>
        </section>

        <section id="components" data-theme="dark" aria-labelledby="components-title" className="grain relative bg-charcoal py-24 text-paper lg:py-32">
          <div className="container-x relative">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading id="components-title" tone="dark" eyebrow="B · Solar electrical components" titleLines={["Protection and control,", "done properly."]} />
              <Reveal as="p" delay={150} className="max-w-sm text-paper/60">
                The electrical components that keep a solar installation safe, measurable and compliant.
              </Reveal>
            </div>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {solarElectrical.map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 4) * 80}>
                  <ProductCard product={p} interest={electricalInterest} tone="dark" showSizes={false} />
                </Reveal>
              ))}
              <Reveal as="li" delay={240} className="flex flex-col justify-between gap-6 rounded-[var(--radius-card)] bg-olive p-7 text-ink">
                <p className="eyebrow">Need a full kit?</p>
                <p className="text-h3">Share your system size and we&apos;ll list what you need.</p>
                <ButtonLink href="#solar-enquiry" variant="dark">Request a component list</ButtonLink>
              </Reveal>
            </ul>
          </div>
        </section>

        <section id="accessories" data-theme="light" aria-labelledby="accessories-title" className="bg-paper py-24 lg:motion-safe:py-0">
          <HorizontalScroll
            label="Solar installation accessories"
            header={
              <div className="container-x mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="eyebrow flex items-center gap-3 text-olive-deep">
                    <span aria-hidden className="h-px w-8 bg-current" /> C · Installation accessories
                  </p>
                  <SplitText id="accessories-title" lines={["The details that hold", "everything together."]} className="mt-6 text-h2" />
                </div>
                <p className="max-w-sm text-grey-strong">Conduit, fittings, stainless steel fasteners and panel mounting clamps.</p>
              </div>
            }
          >
            {solarAccessories.map((p) => (
              <div key={p.id} className="w-[82vw] max-w-[24rem] shrink-0 snap-start sm:w-[22rem]">
                <ProductCard product={p} interest={accessoryInterest} showSizes={false} />
              </div>
            ))}
          </HorizontalScroll>
        </section>

        <section id="coverage" data-theme="dark" aria-labelledby="coverage-title" className="grain relative overflow-hidden bg-ink text-paper">
          <div className="container-x section-y grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading id="coverage-title" tone="dark" eyebrow="Service coverage" titleLines={["Solar support", "across Kerala."]} lead="Installation, cleaning and maintenance, and material supply for homes, businesses and industries across the state. Tell us your district when you enquire." />
              <Reveal delay={200} as="ul" className="mt-10 flex flex-wrap gap-2">
                {districtNames.map((d) => (
                  <li key={d} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm text-paper/80 ring-1 ring-white/10">
                    <MapPin aria-hidden className="size-3.5 text-olive" />
                    {d}
                  </li>
                ))}
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <KeralaMap idPrefix="solar" className="mx-auto max-w-lg" />
            </div>
          </div>
        </section>

        <ProcessSteps
          id="solar-process"
          eyebrow="How it works"
          title="Your solar project, step by step."
          steps={[
            { title: "Share your details", summary: "Your district, property type and requirement, plus an electricity bill if you have one." },
            { title: "Get a recommendation", summary: "We suggest the system, panel type and components that suit your site." },
            { title: "Install or supply", summary: "We install the system, or supply the materials for your project." },
            { title: "Keep it performing", summary: "Cleaning and maintenance support to keep panels generating well." },
          ]}
        />

        <FaqSection id="solar-faq" faqs={solarFaqs} title="Solar questions" />

        <EnquirySection
          id="solar-enquiry"
          variant="solar"
          eyebrow="Solar enquiry"
          titleLines={["Let's plan your", "solar project."]}
          lead="Tell us your district, property type and whether you need installation or products. Capacity is optional."
          whatsappMessage="Hello Mindraze Global, I'd like to enquire about solar. District: , Requirement: "
          whatsappFirst
          points={["Rooftop installation and structure fabrication", "Cleaning and maintenance", "Panels, electrical components and accessories"]}
        />
      </div>

      <OtherVerticals current="solar" />

      <JsonLd
        data={serviceSchema({
          name: "Solar Energy Solutions",
          serviceType: "Rooftop solar installation and solar product supply",
          description: "Rooftop solar installation, solar structure fabrication and installation, solar panel cleaning and maintenance, and supply of solar panels, electrical components and installation accessories across Kerala.",
          path,
          offers: [...solarServices.map((s) => s.title), ...solarProducts.map((p) => p.name)],
        })}
      />
    </>
  );
}
