import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { HeroBull } from "@/components/brand/hero-bull";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { verticals } from "@/content/verticals";

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,rgb(185_188_93/0.14),transparent_55%)]" />
      <div className="absolute inset-x-[-40%] bottom-0 h-[55%] [perspective:520px]">
        <div className="hero-floor absolute inset-0 origin-bottom [transform:rotateX(72deg)] opacity-60" />
      </div>
      <svg className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <defs>
          <linearGradient id="hl" x1="0" x2="1">
            <stop offset="0" stopColor="#b9bc5d" stopOpacity="0" />
            <stop offset="0.5" stopColor="#b9bc5d" stopOpacity="0.5" />
            <stop offset="1" stopColor="#b9bc5d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M-100 640 L620 180 L1540 520",
          "M-60 300 L700 760 L1500 120",
          "M200 980 L980 80",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#hl)" strokeWidth="1" strokeDasharray="220 1400" className="lg:motion-safe:[animation:energy-flow_9s_linear_infinite]" style={{ animationDelay: `${i * -3}s`, animationDuration: `${9 + i * 3}s` }} />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

export function HomeHero() {
  return (
    <section data-theme="dark" aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      <Backdrop />
      <div className="absolute top-[12svh] left-1/2 w-[min(112vw,38rem)] -translate-x-1/2 lg:top-[11svh] lg:right-[-5vw] lg:left-auto lg:w-[min(52vw,56rem)] lg:translate-x-0">
        <HeroBull className="opacity-90 lg:opacity-100" />
      </div>
      {/* Keeps the headline legible where it overlaps the bull */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/75 to-transparent lg:inset-y-0 lg:right-auto lg:h-auto lg:w-[72%] lg:bg-gradient-to-r lg:from-ink lg:via-ink/70 lg:to-transparent" />
      <div className="container-x relative z-10 mt-auto pt-[52svh] pb-8 sm:pt-[50svh] lg:pt-[clamp(7rem,18svh,12rem)] lg:pb-[clamp(2rem,5svh,3rem)]">
        <p data-animate="fade-up" className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-olive">
          <span>Mindraze Global LLP</span>
          <span aria-hidden className="h-px w-8 bg-current" />
          <span className="text-paper/60">Steel · Solar · Digital</span>
        </p>
        <SplitText
          as="h1"
          id="hero-title"
          mode="auto"
          delay={150}
          className="mt-6 text-display"
          lines={["Three Industries.", "One Vision.", { text: "Endless Possibilities.", className: "text-olive" }]}
        />

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:mt-[clamp(2rem,5svh,3.5rem)] lg:grid-cols-12 lg:items-end">
          <p data-animate="fade-up" style={{ "--delay": "700ms" } as CSSProperties} className="max-w-xl text-[1.05rem] leading-relaxed text-paper/70 lg:col-span-5">
            Mindraze Global brings together expertise in steel trading, solar energy solutions and digital innovation to deliver
            products and services that move businesses forward.
          </p>
          <div data-animate="fade-up" style={{ "--delay": "850ms" } as CSSProperties} className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-center">
            <Magnetic>
              <ButtonLink href="#businesses" size="lg" className="w-full sm:w-auto">
                Explore Our Businesses
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/contact" size="lg" variant="outline-light" className="w-full sm:w-auto">
                Get in Touch
              </ButtonLink>
            </Magnetic>
          </div>
          <div data-animate="fade-up" style={{ "--delay": "1000ms" } as CSSProperties} className="hidden items-end justify-end gap-6 lg:col-span-3 lg:flex lg:pr-20">
            <ul className="grid gap-1.5 text-right text-sm">
              {verticals.map((v) => (
                <li key={v.id}>
                  <Link href={v.href} className="group inline-flex items-center gap-2 text-paper/60 transition-colors hover:text-paper">
                    {v.shortName === "IT Services" ? "IT & Digital" : v.shortName}
                    <span className="eyebrow text-olive/80">{v.index}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <a href="#intro" className="group grid justify-items-center gap-2" aria-label="Scroll to introduction">
              <span className="relative block h-14 w-px overflow-hidden bg-white/15">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-olive motion-safe:[animation:scroll-cue_2.2s_var(--ease-in-out-quart)_infinite]" />
              </span>
              <ArrowDown aria-hidden className="size-4 text-paper/60 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
