import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { verticals, type VerticalId } from "@/content/verticals";

/** Cross-links to the other two businesses (internal linking + discovery). */
export function OtherVerticals({ current }: { current: VerticalId }) {
  const others = verticals.filter((v) => v.id !== current);
  return (
    <section data-theme="light" aria-labelledby="other-verticals-title" className="bg-paper pb-24 lg:pb-32">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 border-t border-charcoal/10 pt-16">
          <h2 id="other-verticals-title" className="text-h3">
            Also from Mindraze Global
          </h2>
          <Link href="/businesses" className="hidden text-sm font-semibold underline underline-offset-4 sm:block">
            All businesses
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {others.map((v, i) => (
            <Reveal key={v.id} delay={i * 100}>
              <Link href={v.href} className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-ink p-8 text-paper">
                <Image src={v.photo.src} alt="" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <span className="eyebrow text-olive">
                  {v.index} · {v.name}
                </span>
                <span className="mt-3 flex items-end justify-between gap-4">
                  <span className="text-h3 max-w-md">{v.headline}</span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-olive text-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
