import Image from "next/image";
import { BrandMask } from "@/components/brand/brand-mask";
import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SplitText } from "@/components/motion/split-text";
import { TextLink } from "@/components/ui/button";
import { intro } from "@/content/company";
import { media } from "@/content/media";
import { site } from "@/content/site";

function RotatingBadge() {
  const text = `${site.tagline} · ${site.tagline} · `;
  return (
    <div aria-hidden className="relative grid size-36 place-items-center rounded-full bg-charcoal text-paper shadow-2xl sm:size-40">
      <svg viewBox="0 0 200 200" className="absolute inset-0 motion-safe:animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-paper/80 font-mono text-[13px] tracking-[0.26em] uppercase">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <BrandMask asset="mark" className="w-16 text-olive" />
    </div>
  );
}

export function HomeIntro() {
  return (
    <section id="intro" data-theme="light" aria-labelledby="intro-title" className="section-y relative overflow-hidden bg-paper">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pt-10">
          <Reveal as="p" className="eyebrow flex items-center gap-3 text-olive-deep">
            <span aria-hidden className="h-px w-8 bg-current" /> Who we are
          </Reveal>
          <SplitText id="intro-title" lines={["Built on Versatility.", "Driven by Innovation."]} className="mt-6 text-h2" />
          <div className="mt-10 grid max-w-xl gap-6 text-lg leading-relaxed text-grey-strong">
            {intro.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={120 + i * 120} className={i === 0 ? "text-xl text-charcoal" : undefined}>
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal delay={360} className="mt-10 flex flex-wrap items-center gap-8">
            <TextLink href="/about">More about Mindraze Global</TextLink>
            <TextLink href="/businesses" className="text-grey-strong">
              Our three businesses
            </TextLink>
          </Reveal>
        </div>

        {/* Layered editorial composition */}
        <div className="relative lg:col-span-6">
          <div className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-[var(--radius-panel)]">
            <MaskReveal className="absolute inset-0">
              <Parallax speed={0.1} className="absolute -inset-y-[12%] inset-x-0">
                <Image src={media.steel.frameSunlit.src} alt={media.steel.frameSunlit.alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 86vw" className="object-cover" />
              </Parallax>
            </MaskReveal>
          </div>
          <div className="absolute bottom-[-6%] left-0 aspect-square w-[46%] overflow-hidden rounded-[var(--radius-card)] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)] ring-8 ring-paper">
            <MaskReveal className="absolute inset-0" delay={250} from="left">
              <Parallax speed={0.18} className="absolute -inset-y-[18%] inset-x-0">
                <Image src={media.solar.cellsSunlit.src} alt={media.solar.cellsSunlit.alt} fill placeholder="blur" sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
              </Parallax>
            </MaskReveal>
          </div>
          <div className="absolute top-[8%] -left-2 hidden aspect-[4/3] w-[34%] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ring-8 ring-paper sm:block">
            <MaskReveal className="absolute inset-0" delay={450} from="top">
              <Image src={media.it.codeWorkspace.src} alt={media.it.codeWorkspace.alt} fill placeholder="blur" sizes="(min-width: 1024px) 16vw, 34vw" className="object-cover" />
            </MaskReveal>
          </div>
          <Reveal variant="scale" delay={500} className="absolute right-[-1rem] bottom-[14%] sm:right-[-2rem]">
            <RotatingBadge />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
