"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { loadMotionFeatures } from "@/lib/motion";
import { ArrowUpRight, Check } from "lucide-react";
import { requestEnquiry } from "@/components/forms/enquiry-events";
import type { SolarService } from "@/content/solar";
import { cn } from "@/lib/utils";

const interestFor: Record<string, string> = {
  "rooftop-installation": "Rooftop solar installation",
  "structural-fabrication": "Structure fabrication & installation",
  "cleaning-maintenance": "Panel cleaning & maintenance",
  "product-supply": "Solar panels",
};

/** Accessible tabs (arrow keys) for the four solar services. */
export function ServiceTabs({ services }: { services: SolarService[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const s = services[active];
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + services.length) % services.length;
    setActive(next);
    document.getElementById(`${uid}-t${next}`)?.focus();
  };
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div role="tablist" aria-orientation="vertical" aria-label="Solar services" className="grid content-start gap-2 lg:col-span-5">
          {services.map((svc, i) => {
            const on = i === active;
            return (
              <button
                key={svc.id}
                id={`${uid}-t${i}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onKeyDown={onKey}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex items-center gap-5 overflow-hidden rounded-[var(--radius-card)] p-5 text-left transition-colors duration-500 sm:p-6",
                  on ? "bg-charcoal text-paper" : "bg-white text-charcoal ring-1 ring-charcoal/[0.07] hover:ring-charcoal/20",
                )}
              >
                <span className={cn("font-mono text-sm", on ? "text-olive" : "text-grey-strong")}>{svc.index}</span>
                <span className="flex-1 text-lg font-semibold tracking-tight sm:text-xl">{svc.title}</span>
                <ArrowUpRight aria-hidden className={cn("size-5 shrink-0 transition-transform duration-500", on ? "rotate-45 text-olive" : "text-grey-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5")} />
                <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1 origin-top bg-olive transition-transform duration-500 ease-[var(--ease-out-expo)]", on ? "scale-y-100" : "scale-y-0")} />
              </button>
            );
          })}
        </div>
        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-t${active}`} className="relative overflow-hidden rounded-[var(--radius-panel)] bg-white ring-1 ring-charcoal/[0.07] lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <m.div className="absolute inset-0" initial={{ scale: 1.08, clipPath: "inset(0 0 100% 0)" }} animate={{ scale: 1, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
                  <Image src={s.photo.src} alt={s.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </m.div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-grey-strong">{s.summary}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm font-medium">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive-light text-olive-deep">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => requestEnquiry({ interest: interestFor[s.id] })}
                  className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-charcoal pr-1.5 pl-5 text-sm font-semibold text-paper hover:bg-ink"
                >
                  Enquire about {s.title.toLowerCase().replace("solar ", "")}
                  <span aria-hidden className="grid size-9 place-items-center rounded-full bg-olive text-ink">
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  );
}
