import type { CSSProperties } from "react";
import { keralaDistricts, keralaOutline } from "@/content/kerala";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/in-view";

const LON0 = 74.6;
const LAT0 = 12.95;
const K = 100;
const COS = Math.cos((10.5 * Math.PI) / 180);
const px = (lat: number, lon: number) => [+((lon - LON0) * K * COS).toFixed(1), +((LAT0 - lat) * K).toFixed(1)] as const;

// Coastal HQs sit on the coastline; nudge them inland so markers read clearly.
const NUDGE: Record<string, number> = { Kasaragod: 0.08, Kannur: 0.07, Kozhikode: 0.08, Alappuzha: 0.06, Thiruvananthapuram: 0.03, Kollam: 0.04 };
const LEFT = new Set(["Kasaragod", "Kannur", "Kozhikode", "Thrissur", "Ernakulam", "Alappuzha", "Kollam", "Thiruvananthapuram"]);

const outlinePath = `M${keralaOutline.map(([la, lo]) => px(la, lo).join(",")).join("L")}Z`;
const points = keralaDistricts.map((d) => {
  const [x, y] = px(d.lat, d.lon + (NUDGE[d.name] ?? 0));
  return { ...d, x, y, left: LEFT.has(d.name) };
});
const network = `M${points.map((p) => `${p.x},${p.y}`).join("L")}`;

/** Illustrative (not to scale) Kerala coverage map with animated district markers. */
export function KeralaMap({ className, tone = "dark", showLabels = true, idPrefix }: { className?: string; tone?: "dark" | "light"; showLabels?: boolean; idPrefix: string }) {
  const dark = tone === "dark";
  const fillId = `${idPrefix}-km-fill`;
  const titleId = `${idPrefix}-km-title`;
  return (
    <InView as="figure" data-draw="" className={cn("relative", className)}>
      <svg viewBox="-115 -5 520 480" role="img" aria-labelledby={titleId} className="w-full overflow-visible">
        <title id={titleId}>Illustrative map of Kerala and its 14 districts, where Mindraze Global offers solar installation and material supply</title>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9bc5d" stopOpacity={dark ? 0.22 : 0.35} />
            <stop offset="1" stopColor="#b9bc5d" stopOpacity={dark ? 0.06 : 0.12} />
          </linearGradient>
        </defs>
        <path d={outlinePath} fill={`url(#${fillId})`} />
        <path className="draw" d={outlinePath} fill="none" stroke={dark ? "#e8e9c9" : "#5e6123"} strokeOpacity={0.7} strokeWidth="1.2" strokeLinejoin="round" style={{ "--len": 1400 } as CSSProperties} />
        <path
          d={network}
          fill="none"
          stroke="#b9bc5d"
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeOpacity="0.8"
          className="lg:motion-safe:[animation:energy-flow_6s_linear_infinite]"
        />
        {points.map((p, i) => (
          <g key={p.name} style={{ "--i": i } as CSSProperties}>
            <circle cx={p.x} cy={p.y} r="9" fill="#b9bc5d" opacity="0.35" className="origin-center [transform-box:fill-box] lg:motion-safe:animate-pulse-ring" style={{ animationDelay: `${i * 170}ms` }} />
            <circle cx={p.x} cy={p.y} r="4.2" fill={dark ? "#e8e9c9" : "#151515"} stroke="#b9bc5d" strokeWidth="2" />
            {showLabels && (
              <text
                x={p.left ? p.x - 12 : p.x + 12}
                y={p.y + 4}
                textAnchor={p.left ? "end" : "start"}
                className={cn("font-mono text-[11px] tracking-wide", dark ? "fill-paper/75" : "fill-charcoal/75")}
              >
                {p.name}
              </text>
            )}
          </g>
        ))}
      </svg>
      <figcaption className={cn("mt-3 font-mono text-[0.7rem] tracking-[0.12em] uppercase", dark ? "text-paper/45" : "text-grey-strong")}>
        Illustrative map · not to scale
      </figcaption>
    </InView>
  );
}
