"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Sun } from "lucide-react";
import { requestEnquiry } from "@/components/forms/enquiry-events";
import type { panelTypes } from "@/content/solar";
import { cn } from "@/lib/utils";

const COLS = 10;
const ROWS = 6;

/** Interactive panel: the "sun" follows the pointer, lighting nearby cells and moving the glare. */
function InteractivePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [sun, setSun] = useState({ x: 0.72, y: 0.22 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    setSun({ x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) });
  };
  return (
    <div ref={ref} onPointerMove={onMove} className="relative [perspective:1600px]" aria-hidden>
      <div
        className="relative mx-auto aspect-[1.65] w-full max-w-2xl rounded-2xl bg-[#c9cbc1] p-2.5 shadow-[0_60px_90px_-40px_rgb(21_21_21/0.55)] transition-transform duration-700 ease-[var(--ease-out-expo)]"
        style={{ transform: `rotateX(${18 - sun.y * 10}deg) rotateY(${(sun.x - 0.5) * -14}deg)` }}
      >
        <div className="relative grid h-full grid-cols-10 gap-[3px] overflow-hidden rounded-lg bg-[#9a9c93] p-[3px]">
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const cx = ((i % COLS) + 0.5) / COLS;
            const cy = (Math.floor(i / COLS) + 0.5) / ROWS;
            const d = Math.hypot(cx - sun.x, (cy - sun.y) * 0.6);
            const glow = Math.max(0, 1 - d * 2.6);
            return (
              <div key={i} className="relative overflow-hidden rounded-[2px] bg-[#0d0f0e]">
                <div className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
                <div className="absolute inset-y-0 left-2/3 w-px bg-white/10" />
                <div className="absolute inset-0 bg-olive transition-opacity duration-300" style={{ opacity: glow * 0.55 }} />
              </div>
            );
          })}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen transition-[background] duration-300"
            style={{ background: `radial-gradient(circle at ${sun.x * 100}% ${sun.y * 100}%, rgb(255 252 230 / 0.55), transparent 38%)` }}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute -top-4 grid size-14 place-items-center rounded-full bg-[#fff6d1] text-olive-deep shadow-[0_0_60px_20px_rgb(255_240_180/0.7)] transition-[left,top] duration-500 ease-[var(--ease-out-expo)]" style={{ left: `calc(${sun.x * 100}% - 1.75rem)` }}>
        <Sun className="size-7 motion-safe:animate-spin-slow" />
      </div>
    </div>
  );
}

export function PanelShowcase({ brands, types }: { brands: readonly string[]; types: typeof panelTypes }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const t = types[active];
  return (
    <div className="grid items-center gap-14 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <InteractivePanel />
        <p className="mt-10 text-center font-mono text-[0.7rem] tracking-[0.14em] text-grey-strong uppercase">Move your pointer to move the sun · illustration</p>
      </div>
      <div className="lg:col-span-5">
        <p className="eyebrow text-olive-deep">Available brands</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {brands.map((b) => (
            <li key={b} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-charcoal/10">
              {b}
            </li>
          ))}
        </ul>
        <div role="tablist" aria-label="Panel types" className="mt-10 flex gap-2 rounded-full bg-charcoal/[0.06] p-1.5">
          {types.map((p, i) => (
            <button
              key={p.id}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${uid}-panel`}
              onClick={() => setActive(i)}
              className={cn("h-11 flex-1 rounded-full text-sm font-semibold transition-colors", i === active ? "bg-charcoal text-paper" : "text-charcoal/70 hover:text-charcoal")}
            >
              {p.id === "dcr" ? "DCR" : "Non-DCR"}
            </button>
          ))}
        </div>
        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="mt-6">
          <div key={t.id} className="motion-safe:animate-[fade-up_.6s_var(--ease-out-expo)_both]">
            <p className="font-mono text-xs tracking-[0.14em] text-grey-strong uppercase">{t.label}</p>
            <h3 className="mt-2 text-h3">{t.name}</h3>
            <p className="mt-3 leading-relaxed text-grey-strong">{t.summary}</p>
            <p className="mt-5 text-sm font-semibold">Typically chosen for</p>
            <ul className="mt-2 grid gap-1.5 text-sm text-grey-strong">
              {t.bestFor.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-olive" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={() => requestEnquiry({ interest: "Solar panels" })}
          className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-charcoal pr-1.5 pl-5 text-sm font-semibold text-paper hover:bg-ink"
        >
          Enquire about solar panels
          <span aria-hidden className="grid size-9 place-items-center rounded-full bg-olive text-ink">
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
