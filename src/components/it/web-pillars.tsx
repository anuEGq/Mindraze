import type { CSSProperties } from "react";
import { Gauge, MonitorSmartphone, MousePointerClick, Search, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { websitePillars } from "@/content/it";

const icons: Record<string, LucideIcon> = { MonitorSmartphone, MousePointerClick, Gauge, Search };

function PillarVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div aria-hidden className="flex h-20 items-end justify-center gap-2">
        <span className="h-16 w-24 rounded-md ring-2 ring-charcoal/70" />
        <span className="h-14 w-10 rounded-md ring-2 ring-charcoal/70" />
        <span className="h-10 w-6 rounded-md bg-olive ring-2 ring-charcoal/70" />
      </div>
    );
  if (i === 1)
    return (
      <svg aria-hidden viewBox="0 0 160 80" className="h-20 w-full">
        <path d="M10 60 C 40 10, 90 70, 130 25" fill="none" stroke="#151515" strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="4 5" />
        <circle cx="130" cy="25" r="10" fill="#b9bc5d" className="origin-center motion-safe:animate-pulse-ring [transform-box:fill-box]" />
        <circle cx="130" cy="25" r="5" fill="#151515" />
      </svg>
    );
  if (i === 2)
    return (
      <svg aria-hidden viewBox="0 0 160 90" className="h-20 w-full">
        <path d="M30 80 A 50 50 0 0 1 130 80" fill="none" stroke="#151515" strokeOpacity=".15" strokeWidth="10" strokeLinecap="round" />
        <path d="M30 80 A 50 50 0 0 1 130 80" fill="none" stroke="#b9bc5d" strokeWidth="10" strokeLinecap="round" strokeDasharray="157" strokeDashoffset="20" />
        <line x1="80" y1="80" x2="118" y2="52" stroke="#151515" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  return (
    <div aria-hidden className="bars flex h-20 items-end justify-center gap-2">
      {[30, 45, 40, 62, 78, 96].map((h, k) => (
        <span key={k} style={{ height: `${h}%`, "--i": k } as CSSProperties} className={k === 5 ? "w-5 rounded-t bg-olive" : "w-5 rounded-t bg-charcoal/20"} />
      ))}
    </div>
  );
}

export function WebPillars() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {websitePillars.map((p, i) => {
        const Icon = icons[p.icon];
        return (
          <Reveal as="li" key={p.title} delay={i * 80} className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-olive-light/70 p-6">
            <PillarVisual i={i} />
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Icon aria-hidden className="size-5 text-olive-deep" /> {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey-strong">{p.summary}</p>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
