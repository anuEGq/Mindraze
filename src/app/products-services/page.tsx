import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { CatalogueCard } from "@/components/products/catalogue-card";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { billingSoftware, marketingServices, webAppCapabilities, websiteServices } from "@/content/it";
import { panelBrands, solarAccessories, solarElectrical, solarPanelProduct, solarServices } from "@/content/solar";
import { steelProducts } from "@/content/steel";
import { enquireHref } from "@/content/showcase";
import { verticalById, type VerticalId } from "@/content/verticals";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Products & Services Catalogue",
  description:
    "Browse Mindraze Global's products and services by business: TMT bars and structural steel; solar installation, panels, electrical components and accessories; websites, web applications, digital marketing and NFC solutions.",
  path: "/products-services",
  keywords: ["TMT bars Kerala", "structural steel suppliers", "solar products Kerala", "solar accessories suppliers", "website development", "NFC review stands"],
});

const steelPath = "/businesses/steel-trading";
const solarPath = "/businesses/solar-solutions";
const itPath = "/businesses/it-services";

function VerticalHeader({ id, eyebrowIndex, title, lead, href, tone }: { id: VerticalId; eyebrowIndex: string; title: string; lead: string; href: string; tone: "light" | "dark" }) {
  const v = verticalById(id);
  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <SectionHeading id={`${id}-cat-title`} tone={tone} index={eyebrowIndex} eyebrow={v.name} title={title} lead={lead} />
      <Reveal delay={150}>
        <Link href={href} className={cn("group inline-flex items-center gap-2 font-semibold underline underline-offset-4", tone === "dark" ? "decoration-paper/30 hover:decoration-paper" : "decoration-charcoal/25 hover:decoration-charcoal")}>
          Visit {v.shortName === "IT Services" ? "IT Services" : v.name}
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>
    </div>
  );
}

function Group({ title, children, tone = "light" }: { title: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className="mt-14">
      <h3 className={cn("flex items-center gap-4 text-sm font-semibold tracking-[0.14em] uppercase", tone === "dark" ? "text-paper/60" : "text-grey-strong")}>
        {title}
        <span aria-hidden className={cn("h-px flex-1", tone === "dark" ? "bg-white/10" : "bg-charcoal/10")} />
      </h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</ul>
    </div>
  );
}

export default function ProductsServicesPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Products & Services"
        titleLines={["Everything we offer,", "organised by business."]}
        description="Each business has its own catalogue. Open any item for details or send an enquiry directly to the right team."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products & Services", path: "/products-services" },
        ]}
      />

      <div className="relative bg-paper">
        <SectionNav
          items={[
            { id: "steel-catalogue", label: "01 · Steel" },
            { id: "solar-catalogue", label: "02 · Solar" },
            { id: "it-catalogue", label: "03 · IT & Digital" },
          ]}
        />

        <section id="steel-catalogue" data-theme="dark" aria-labelledby="steel-cat-title" className="grain brushed-metal relative py-24 text-paper lg:py-32">
          <div className="container-x relative">
            <VerticalHeader id="steel" eyebrowIndex="01" tone="dark" title="Steel trading catalogue" lead="TMT bars from TUSKER TMT and WIN TMT, and structural steel for fabrication. Sizes and availability confirmed on enquiry." href={steelPath} />
            <Group title="TMT steel bars & structural steel" tone="dark">
              {steelProducts.map((p) => (
                <li key={p.id}>
                  <CatalogueCard
                    tone="dark"
                    title={p.name}
                    summary={p.summary}
                    meta={p.category}
                    visual={p.visual}
                    href={`${steelPath}#${p.id === "tmt-bars" ? "tmt" : "structural"}`}
                    enquireHref={enquireHref({ vertical: "steel", enquireAs: p.name })}
                  />
                </li>
              ))}
            </Group>
          </div>
        </section>

        <section id="solar-catalogue" data-theme="light" aria-labelledby="solar-cat-title" className="bg-olive-light/50 py-24 lg:py-32">
          <div className="container-x">
            <VerticalHeader id="solar" eyebrowIndex="02" tone="light" title="Solar solutions catalogue" lead={`Installation services and solar products across Kerala. Panels from ${panelBrands.join(", ")}.`} href={solarPath} />
            <Group title="Solar services">
              {solarServices.map((s) => (
                <li key={s.id}>
                  <CatalogueCard
                    title={s.title}
                    summary={s.points.slice(0, 3).join(" · ")}
                    meta={`Service ${s.index}`}
                    photo={s.photo}
                    href={`${solarPath}#services`}
                    enquireHref={enquireHref({ vertical: "solar", enquireAs: s.id === "cleaning-maintenance" ? "Panel cleaning & maintenance" : s.id === "structural-fabrication" ? "Structure fabrication & installation" : s.id === "product-supply" ? "Solar panels" : "Rooftop solar installation" })}
                  />
                </li>
              ))}
            </Group>
            <Group title="A · Solar panels">
              <li>
                <CatalogueCard title={solarPanelProduct.name} summary={solarPanelProduct.summary} meta="DCR & non-DCR" visual="solar-panel" href={`${solarPath}#panels`} enquireHref={enquireHref({ vertical: "solar", enquireAs: "Solar panels" })} />
              </li>
            </Group>
            <Group title="B · Solar electrical components">
              {solarElectrical.map((p) => (
                <li key={p.id}>
                  <CatalogueCard title={p.name} summary={p.summary} meta={p.aka} visual={p.visual} href={`${solarPath}#components`} enquireHref={enquireHref({ vertical: "solar", enquireAs: "Electrical components" })} />
                </li>
              ))}
            </Group>
            <Group title="C · Solar installation accessories">
              {solarAccessories.map((p) => (
                <li key={p.id}>
                  <CatalogueCard title={p.name} summary={p.summary} visual={p.visual} href={`${solarPath}#accessories`} enquireHref={enquireHref({ vertical: "solar", enquireAs: "Installation accessories" })} />
                </li>
              ))}
            </Group>
          </div>
        </section>

        <section id="it-catalogue" data-theme="dark" aria-labelledby="it-cat-title" className="grain relative bg-ink py-24 text-paper lg:py-32">
          <div aria-hidden className="tech-grid absolute inset-0 opacity-50" />
          <div className="container-x relative">
            <VerticalHeader id="it" eyebrowIndex="03" tone="dark" title="IT services & digital solutions" lead="Websites, custom web applications, digital marketing, NFC-powered products, and sales, support and training for billing software." href={itPath} />
            {[
              { title: "A · Website development", items: websiteServices.map((s) => ({ ...s, interest: "Website development", anchor: "websites" })) },
              { title: "B · Custom web applications", items: webAppCapabilities.map((s) => ({ ...s, interest: "Custom web application", anchor: "web-apps" })) },
              { title: "C · Digital marketing", items: marketingServices.map((s) => ({ ...s, interest: "Digital marketing", anchor: "marketing" })) },
              {
                title: "D & E · NFC products",
                items: [
                  { title: "NFC & QR Smart Review Stands", summary: "Pre-designed, brandable stands that open your review pages with a tap or scan.", interest: "NFC review stand", anchor: "review-stands" },
                  { title: "NFC Digital Visiting Cards", summary: "Smart cards with a printed QR code linking to your personal profile page.", interest: "NFC digital visiting card", anchor: "nfc-cards" },
                ],
              },
              {
                title: "F · Billing & accounting software: sales, support & training",
                items: billingSoftware.map((b) => ({ title: b.name, summary: b.summary, interest: b.name, anchor: "billing-software" })),
              },
            ].map((g) => (
              <Group key={g.title} title={g.title} tone="dark">
                {g.items.map((s) => (
                  <li key={s.title}>
                    <CatalogueCard tone="dark" title={s.title} summary={s.summary} href={`${itPath}#${s.anchor}`} enquireHref={enquireHref({ vertical: "it", enquireAs: s.interest })} />
                  </li>
                ))}
              </Group>
            ))}
          </div>
        </section>
      </div>

      <CtaBand />
    </>
  );
}
