import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMask } from "@/components/brand/brand-mask";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaBand } from "@/components/sections/cta-band";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { Counter } from "@/components/motion/counter";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SplitText } from "@/components/motion/split-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { approach, glance, intro, values } from "@/content/company";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { verticals } from "@/content/verticals";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Mindraze Global LLP is a diversified business organisation operating in steel trading, solar energy solutions and IT services, committed to quality products, dependable services and innovative solutions.",
  path: "/about",
});

const tagline = [
  { word: "Innovate.", text: "Bring practical new ideas to every requirement, from NFC-powered review stands to modern solar installations." },
  { word: "Evolve.", text: "Keep improving how we source, install, build and support, as industries and customer needs change." },
  { word: "Lead.", text: "Set a dependable standard across three industries, and earn trust through how we work." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Mindraze Global"
        titleLines={["Innovate.", "Evolve.", "Lead."]}
        description={intro.paragraphs[0]}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
        background={<BrandMask asset="mark" className="pointer-events-none absolute top-24 -right-32 w-[min(64rem,120vw)] max-w-none text-olive/[0.07]" />}
        photo={media.steel.frameSunlit}
      />

      <section data-theme="light" aria-labelledby="who-title" className="section-y bg-paper">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="who-title" eyebrow="Who we are" titleLines={["Built on Versatility.", "Driven by Innovation."]} />
            <div className="mt-8 grid max-w-xl gap-5 text-lg leading-relaxed text-grey-strong">
              {intro.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={100 + i * 100} className={i === 0 ? "text-charcoal" : undefined}>
                  {p}
                </Reveal>
              ))}
              <Reveal as="p" delay={300}>
                Each vertical runs with its own specialist focus, while customers get one point of contact, one standard of service and
                one commitment to doing things right.
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Reveal variant="scale" className="relative mx-auto grid aspect-square max-w-lg place-items-center rounded-[var(--radius-panel)] bg-olive p-12 shadow-[0_50px_100px_-50px_rgb(94_97_35/0.8)]">
              <BrandMask asset="full" label={`${site.legalName} logo – ${site.tagline}`} className="w-full text-[#0e0904]" />
            </Reveal>
          </div>
        </div>
      </section>

      <section data-theme="dark" aria-labelledby="tagline-title" className="grain relative overflow-hidden bg-ink text-paper">
        <div className="container-x section-y">
          <SectionHeading id="tagline-title" tone="dark" eyebrow="Our tagline" title="Three words that shape how we work." />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 lg:grid-cols-3">
            {tagline.map((t, i) => (
              <Reveal as="li" key={t.word} delay={i * 120} className="bg-ink p-8 lg:p-10">
                <span className="font-mono text-xs text-olive">0{i + 1}</span>
                <p className="mt-10 text-h2 text-olive">{t.word}</p>
                <p className="mt-4 max-w-sm leading-relaxed text-paper/65">{t.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <BrandMask asset="mark" className="w-full max-w-md text-olive" />
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow text-olive">Our mark</p>
              <SplitText as="p" lines={["A geometric bull:", "strength, built from many parts."]} className="mt-6 text-h3" />
              <Reveal as="p" delay={150} className="mt-6 max-w-xl leading-relaxed text-paper/65">
                Our logo is a bull drawn from connected facets. It reflects what we aim to bring to every project: strength,
                determination and forward momentum, and many capabilities that work together as one.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" aria-labelledby="glance-title" className="bg-paper pt-24 lg:pt-32">
        <div className="container-x">
          <SectionHeading id="glance-title" eyebrow="At a glance" title="What we bring together." />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g) => (
              <div key={g.label} className="bg-white p-8">
                <dt className="sr-only">{g.label}</dt>
                <dd>
                  <Counter value={g.value} className="text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-semibold tracking-tight" />
                  <p className="mt-4 text-grey-strong">{g.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section data-theme="light" aria-labelledby="about-verticals-title" className="bg-paper py-24 lg:motion-safe:py-0">
        <HorizontalScroll
          label="Our three businesses"
          header={
            <div className="container-x mb-12">
              <p className="eyebrow flex items-center gap-3 text-olive-deep">
                <span aria-hidden className="h-px w-8 bg-current" /> Our businesses
              </p>
              <SplitText id="about-verticals-title" lines={["Three verticals.", "One vision."]} className="mt-6 text-h2" />
            </div>
          }
        >
          {verticals.map((v) => (
            <Link key={v.id} href={v.href} className="group relative isolate flex h-[30rem] w-[85vw] max-w-[34rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-ink p-8 text-paper sm:w-[34rem]">
              <Image src={v.photo.src} alt="" fill placeholder="blur" sizes="34rem" className="-z-10 object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <span className="eyebrow text-olive">
                {v.index} · {v.name}
              </span>
              <span className="mt-3 text-h3">{v.headline}</span>
              <span className="mt-3 max-w-md text-sm text-paper/70">{v.description}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                {v.cta} <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </HorizontalScroll>
      </section>

      <section data-theme="light" aria-labelledby="values-title" className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="values-title" eyebrow="What we stand for" titleLines={["One Company.", "Multiple Capabilities.", "One Commitment."]} className="lg:sticky lg:top-32" />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-charcoal/10 sm:grid-cols-2 lg:col-span-7">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 2) * 80} className="bg-white p-7">
                <span className="font-mono text-xs text-olive-deep">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-grey-strong">{v.summary}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="relative">
        <MaskReveal className="relative h-[60svh] overflow-hidden">
          <Parallax speed={0.12} className="absolute -inset-y-[14%] inset-x-0">
            <Image src={media.kerala.backwaters.src} alt={media.kerala.backwaters.alt} fill placeholder="blur" sizes="100vw" className="object-cover" />
          </Parallax>
        </MaskReveal>
        <div data-theme="dark" className="absolute inset-0 grid place-items-center bg-ink/65 text-center text-paper">
          <div className="container-x">
            <p className="eyebrow text-olive-light">Our reach</p>
            <p className="mx-auto mt-6 max-w-3xl text-h2">Serving businesses across Kerala and beyond.</p>
          </div>
        </div>
      </div>

      <ProcessSteps id="about-approach" eyebrow="How we work" title="A simple, dependable way of working." tone="dark" steps={approach.map((a) => ({ title: a.title, summary: a.summary }))} />

      <CtaBand />
    </>
  );
}
