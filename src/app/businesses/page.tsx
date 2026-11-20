import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { verticals } from "@/content/verticals";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Our Businesses: Steel, Solar & IT Services",
  description:
    "Mindraze Global LLP operates three business verticals: steel trading (TMT bars and structural steel), solar energy solutions across Kerala, and IT services and digital solutions.",
  path: "/businesses",
});

const surfaces = {
  steel: "brushed-metal text-paper",
  solar: "bg-olive-light text-charcoal",
  it: "bg-ink text-paper",
} as const;

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Businesses"
        titleLines={["Three Industries.", "One Vision."]}
        description="Steel, solar and digital: three complementary businesses, each with its own specialist focus, held to one Mindraze standard."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Businesses", path: "/businesses" },
        ]}
      >
        <ul className="mt-14 grid gap-3 sm:grid-cols-3">
          {verticals.map((v) => (
            <li key={v.id}>
              <a href={`#${v.id}`} className="group flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                <span>
                  <span className="eyebrow text-olive">{v.index}</span>
                  <span className="mt-1 block font-semibold">{v.name}</span>
                </span>
                <span aria-hidden className="text-paper/40 transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {verticals.map((v, i) => {
        const dark = v.theme === "dark";
        return (
          <section key={v.id} id={v.id} data-theme={v.theme} aria-labelledby={`${v.id}-overview-title`} className={cn("grain relative overflow-hidden", surfaces[v.id])}>
            <div className="container-x section-y grid items-center gap-14 lg:grid-cols-12">
              <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]">
                  <MaskReveal className="absolute inset-0" from={i % 2 ? "right" : "left"}>
                    <Parallax speed={0.1} className="absolute -inset-y-[12%] inset-x-0">
                      <Image src={v.photo.src} alt={v.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    </Parallax>
                  </MaskReveal>
                  <span className="absolute top-5 left-5 grid size-16 place-items-center rounded-full bg-olive text-xl font-semibold text-ink">{v.index}</span>
                </div>
              </div>
              <div className={cn("lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:pr-8" : "lg:pl-8")}>
                <p className={cn("eyebrow", dark ? "text-olive" : "text-olive-deep")}>{v.name}</p>
                <SplitText id={`${v.id}-overview-title`} text={v.headline} className="mt-6 text-h2" />
                <Reveal as="p" delay={120} className={cn("mt-6 text-lg leading-relaxed", dark ? "text-paper/70" : "text-grey-strong")}>
                  {v.description}
                </Reveal>
                <Reveal as="ul" delay={200} className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {v.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 font-medium">
                      <span className={cn("grid size-5 place-items-center rounded-full", dark ? "bg-olive text-ink" : "bg-charcoal text-olive")}>
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </Reveal>
                <Reveal delay={280} className="mt-10">
                  <Magnetic>
                    <ButtonLink href={v.href} size="lg" variant={dark ? "primary" : "dark"}>
                      {v.cta}
                    </ButtonLink>
                  </Magnetic>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
