import type { CSSProperties } from "react";
import { BadgeCheck, Handshake, Layers, LifeBuoy, Nfc, Sparkles, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightGroup } from "@/components/ui/spotlight";
import { NfcWaves } from "@/components/it/ui-mockups";
import { values } from "@/content/company";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { Layers, BadgeCheck, Users, Handshake, Sparkles, LifeBuoy };

const layout = [
  "lg:col-span-2 lg:row-span-2 bg-charcoal text-paper",
  "lg:col-span-2 bg-olive-light text-charcoal",
  "lg:col-span-1 bg-white text-charcoal ring-1 ring-charcoal/5",
  "lg:col-span-1 bg-white text-charcoal ring-1 ring-charcoal/5",
  "lg:col-span-2 bg-ink text-paper",
  "lg:col-span-2 bg-olive text-ink",
];

function VennGraphic() {
  const items = [
    { cx: 120, cy: 105, label: "Steel" },
    { cx: 200, cy: 105, label: "Solar" },
    { cx: 160, cy: 172, label: "Digital" },
  ];
  return (
    <svg aria-hidden viewBox="0 0 320 260" className="w-full max-w-sm">
      {items.map((c, i) => (
        <g key={c.label} className="origin-center motion-safe:[animation:float_7s_ease-in-out_infinite]" style={{ animationDelay: `${i * -2.3}s`, transformBox: "fill-box" } as CSSProperties}>
          <circle cx={c.cx} cy={c.cy} r="70" fill="#b9bc5d" fillOpacity="0.1" stroke="#b9bc5d" strokeOpacity="0.7" strokeWidth="1.2" />
          <text x={c.cx + (i === 0 ? -30 : i === 1 ? 30 : 0)} y={c.cy + (i === 2 ? 34 : -18)} textAnchor="middle" className="fill-paper/70 font-mono text-[11px] tracking-[0.18em] uppercase">
            {c.label}
          </text>
        </g>
      ))}
      <circle cx="160" cy="128" r="5" fill="#b9bc5d" />
    </svg>
  );
}

function Journey() {
  const steps = ["Enquiry", "Supply", "Install", "Support"];
  return (
    <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Support stages">
      {steps.map((s, i) => (
        <li key={s} className="grid gap-2">
          <span className="relative h-1 overflow-hidden rounded-full bg-ink/15">
            <span className="absolute inset-0 origin-left bg-ink motion-safe:[animation:progress_1.2s_var(--ease-out-expo)_both]" style={{ animationDelay: `${0.4 + i * 0.25}s` }} />
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function WhyChoose() {
  return (
    <section data-theme="light" aria-labelledby="why-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          eyebrow="Why choose Mindraze"
          titleLines={["One Company.", "Multiple Capabilities.", "One Commitment."]}
          className="max-w-5xl"
        />
        <SpotlightGroup className="mt-16 grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = icons[v.icon];
            const dark = i === 0 || i === 4;
            return (
              <Reveal
                key={v.title}
                delay={i * 80}
                data-spotlight
                className={cn(
                  "group flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-8",
                  layout[i],
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-6",
                      dark ? "bg-olive text-ink" : i === 5 ? "bg-ink text-olive" : "bg-charcoal text-olive",
                    )}
                  >
                    <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                  </span>
                  <span className={cn("font-mono text-xs", dark ? "text-paper/40" : "text-current/50")}>0{i + 1}</span>
                </div>
                {i === 0 && (
                  <div className="my-6 flex justify-center">
                    <VennGraphic />
                  </div>
                )}
                {i === 4 && (
                  <div aria-hidden className="relative my-4 ml-auto grid size-16 place-items-center">
                    <NfcWaves className="inset-0" />
                    <Nfc className="size-6 text-olive" />
                  </div>
                )}
                <div className="mt-6">
                  <h3 className={cn("font-semibold tracking-tight", i === 0 ? "text-h3" : "text-xl")}>{v.title}</h3>
                  <p className={cn("mt-2 leading-relaxed", dark ? "text-paper/65" : i === 5 ? "text-ink/75" : "text-grey-strong")}>{v.summary}</p>
                  {i === 5 && <Journey />}
                </div>
              </Reveal>
            );
          })}
        </SpotlightGroup>
      </div>
    </section>
  );
}
