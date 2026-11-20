import Image from "next/image";
import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ProductVisual } from "@/components/products/product-visual";
import { CodeMock, NfcCardMock } from "@/components/it/ui-mockups";
import { StackPanels } from "./stack-panels";
import { verticals, type Vertical } from "@/content/verticals";
import { cn } from "@/lib/utils";

function SteelVisual({ v }: { v: Vertical }) {
  return (
    <div className="relative h-full min-h-[22rem]">
      <div className="sheen absolute inset-0 overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-white/10">
        <Image src={v.photo.src} alt={v.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover grayscale-[35%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      </div>
      <div className="absolute -bottom-6 left-4 w-[min(17rem,70%)] rounded-[var(--radius-card)] bg-charcoal/85 p-4 text-paper ring-1 ring-white/10 backdrop-blur-xl sm:left-8">
        <ProductVisual kind="angle" tone="dark" className="h-24" />
        <p className="eyebrow mt-3 text-olive">Structural steel</p>
        <p className="mt-1 text-sm text-paper/70">Flat bars, MS angles, L-clamps, square & round rods</p>
      </div>
      <div className="absolute top-6 right-6 rounded-full bg-ink/70 px-4 py-2 font-mono text-[0.68rem] tracking-[0.14em] text-paper uppercase ring-1 ring-white/10 backdrop-blur">
        TUSKER TMT · WIN TMT
      </div>
    </div>
  );
}

function SolarVisual({ v }: { v: Vertical }) {
  return (
    <div className="relative h-full min-h-[22rem]">
      <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-panel)]">
        <Image src={v.photo.src} alt={v.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        <div className="sun-breathe absolute -top-1/3 -right-1/4 size-[80%] rounded-full bg-[radial-gradient(circle,rgb(255_244_200/0.75),rgb(232_233_201/0.25)_40%,transparent_70%)] mix-blend-screen" />
        <svg aria-hidden viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M-20 ${330 - i * 40} C 160 ${260 - i * 40}, 340 ${380 - i * 30}, 640 ${140 - i * 25}`}
              fill="none"
              stroke="#f3f4dc"
              strokeOpacity="0.7"
              strokeWidth="1.4"
              strokeDasharray="6 14"
              className="lg:motion-safe:[animation:energy-flow_5s_linear_infinite]"
              style={{ animationDelay: `${i * -1.2}s` }}
            />
          ))}
        </svg>
      </div>
      <div className="absolute -bottom-6 left-4 w-[min(17rem,72%)] rounded-[var(--radius-card)] bg-paper/90 p-4 text-charcoal shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-charcoal/10 backdrop-blur-xl sm:left-8">
        <ProductVisual kind="solar-panel" className="h-24" />
        <p className="eyebrow mt-3 text-olive-deep">DCR & non-DCR panels</p>
        <p className="mt-1 text-sm text-grey-strong">Adani · Waaree · Microtek · Loom Solar · Vikram Solar</p>
      </div>
    </div>
  );
}

function ItVisual() {
  return (
    <div className="relative h-full min-h-[22rem]">
      <div className="tech-grid absolute inset-0 rounded-[var(--radius-panel)] ring-1 ring-white/10" />
      <div className="absolute inset-x-6 top-8 sm:inset-x-10">
        <CodeMock />
      </div>
      <div className="absolute right-4 -bottom-6 w-[min(15rem,60%)] motion-safe:animate-float sm:right-8">
        <NfcCardMock />
      </div>
    </div>
  );
}

function Panel({ v, i }: { v: Vertical; i: number }) {
  const dark = v.theme === "dark";
  const surface = v.id === "steel" ? "brushed-metal text-paper" : v.id === "solar" ? "bg-olive-light text-charcoal" : "bg-ink text-paper";
  return (
    <article
      data-stack-panel
      data-theme={v.theme}
      aria-labelledby={`vertical-${v.id}`}
      className="relative lg:h-[100svh] [@media(min-height:760px)]:lg:sticky [@media(min-height:760px)]:lg:top-0"
      style={{ zIndex: i + 1 } as CSSProperties}
    >
      <div data-stack-inner className={cn("grain relative h-full origin-top overflow-hidden will-change-transform", surface)}>
        {v.id === "solar" && <div aria-hidden className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.85),transparent_65%)]" />}
        <div className="container-x relative z-10 grid h-full items-center gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-5">
            <p className={cn("eyebrow flex items-center gap-3", dark ? "text-olive" : "text-olive-deep")}>
              <span className={cn("text-5xl font-semibold tracking-tight sm:text-6xl", dark ? "text-paper/15" : "text-charcoal/15")} style={{ fontFamily: "var(--font-sans)" }}>
                {v.index}
              </span>
              {v.name}
            </p>
            <SplitText as="h3" id={`vertical-${v.id}`} text={v.headline} className={cn("mt-6 text-h2", v.id === "steel" && "text-metal")} />
            <Reveal as="p" delay={120} className={cn("mt-6 max-w-lg text-[1.05rem] leading-relaxed", dark ? "text-paper/70" : "text-grey-strong")}>
              {v.description}
            </Reveal>
            <Reveal as="ul" delay={200} className="mt-8 flex flex-wrap gap-2">
              {v.highlights.map((h) => (
                <li key={h} className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset", dark ? "ring-white/15 text-paper/85" : "ring-charcoal/15 text-charcoal/85")}>
                  <Check aria-hidden className={cn("size-3.5", dark ? "text-olive" : "text-olive-deep")} />
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
          <div className="lg:col-span-7 lg:h-[min(36rem,70svh)]">
            {v.id === "steel" ? <SteelVisual v={v} /> : v.id === "solar" ? <SolarVisual v={v} /> : <ItVisual />}
          </div>
        </div>
      </div>
    </article>
  );
}

export function HomeVerticals() {
  return (
    <section id="businesses" aria-labelledby="businesses-title" className="relative bg-ink">
      <div data-theme="dark" className="container-x pt-24 pb-16 text-paper lg:pt-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal as="p" className="eyebrow flex items-center gap-3 text-olive">
              <span aria-hidden className="h-px w-8 bg-current" /> Our Businesses
            </Reveal>
            <SplitText id="businesses-title" lines={["Three Business Verticals.", "One Standard of Excellence."]} className="mt-6 text-h2" />
          </div>
          <Reveal as="p" delay={150} className="max-w-sm text-paper/60">
            Each vertical has its own expertise and identity, and all three share the same commitment to quality and service.
          </Reveal>
        </div>
      </div>
      <StackPanels>
        {verticals.map((v, i) => (
          <Panel key={v.id} v={v} i={i} />
        ))}
      </StackPanels>
    </section>
  );
}
