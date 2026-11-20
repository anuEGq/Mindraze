"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { requestEnquiry } from "@/components/forms/enquiry-events";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import type { TmtBrand } from "@/content/steel";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Brand tabs + diameter selection that hands off to the enquiry form or WhatsApp. */
export function TmtBrandSelector({ brands, visual }: { brands: TmtBrand[]; visual: ReactNode }) {
  const [active, setActive] = useState(0);
  const [sizes, setSizes] = useState<string[]>([]);
  const uid = useId();
  const brand = brands[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : brands.length - 1)) % brands.length;
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  const toggle = (s: string) => setSizes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : brand.sizes.options.filter((o) => cur.includes(o) || o === s)));
  const sizeText = sizes.join(", ");
  const wa = whatsappHref(`Hello Mindraze Global, I'd like a quotation for ${brand.name} TMT bars${sizeText ? ` (${sizeText})` : ""}. Quantity: `);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="TMT brands" className="flex gap-2 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10">
          {brands.map((b, i) => (
            <button
              key={b.id}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${uid}-panel`}
              tabIndex={i === active ? 0 : -1}
              onKeyDown={onKey}
              onClick={() => setActive(i)}
              className={cn("h-12 flex-1 rounded-full text-sm font-semibold tracking-wide transition-colors", i === active ? "bg-olive text-ink" : "text-paper/70 hover:text-paper")}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink ring-1 ring-white/10">
          <div className="tech-grid absolute inset-0" />
          <div className="absolute inset-8">{visual}</div>
          <span key={brand.id} className="absolute bottom-4 left-4 rounded-full bg-olive px-3 py-1.5 font-mono text-xs font-medium tracking-[0.12em] text-ink uppercase motion-safe:animate-[fade-up_.6s_var(--ease-out-expo)_both]">
            {brand.name}
          </span>
          <span className="absolute top-4 right-4 font-mono text-[0.6rem] tracking-[0.14em] text-paper/45 uppercase">Illustration</span>
        </div>
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="rounded-[var(--radius-card)] bg-graphite p-6 ring-1 ring-white/10 sm:p-8 lg:col-span-7">
        <div key={brand.id} className="motion-safe:animate-[fade-up_.6s_var(--ease-out-expo)_both]">
          <p className="eyebrow text-olive">TMT steel bars</p>
          <h3 className="mt-3 text-h3">{brand.name}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-paper/70">{brand.summary}</p>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold">Select diameters for your enquiry</legend>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-paper/55">
              <Info aria-hidden className="size-3.5" /> Common nominal diameters. Availability by brand is confirmed when we quote.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {brand.sizes.options.map((s) => {
                const on = sizes.includes(s);
                return (
                  <label key={s} className={cn("inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-semibold ring-1 ring-inset transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-olive", on ? "bg-paper text-ink ring-paper" : "text-paper/80 ring-white/15 hover:ring-white/40")}>
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(s)} />
                    {on && <Check aria-hidden className="size-3.5 text-olive-deep" />}
                    {s}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 text-sm sm:grid-cols-4">
            {brand.specs.map((row) => (
              <div key={row.label} className="bg-graphite p-4">
                <dt className="font-mono text-[0.65rem] tracking-[0.14em] text-paper/50 uppercase">{row.label}</dt>
                <dd className={cn("mt-1.5", row.value ? "font-semibold" : "text-paper/55 italic")}>{row.value ?? "Shared with quotation"}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => requestEnquiry({ interest: "TMT Steel Bars", brand: brand.name, size: sizeText })}
              className="group inline-flex h-13 items-center justify-between gap-3 rounded-full bg-olive pr-2 pl-6 font-semibold text-ink transition-colors hover:bg-olive-mid"
            >
              Bulk enquiry{sizes.length ? ` · ${sizes.length} size${sizes.length > 1 ? "s" : ""}` : ""}
              <span aria-hidden className="grid size-9 place-items-center rounded-full bg-ink text-olive">
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-white/20 ring-inset hover:ring-white/50">
                <WhatsAppIcon className="size-5 text-olive" /> Ask on WhatsApp
              </a>
            ) : (
              <span className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-paper/45 ring-1 ring-white/10 ring-inset" title="WhatsApp number to be added">
                <WhatsAppIcon className="size-5" /> WhatsApp (number to be added)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
