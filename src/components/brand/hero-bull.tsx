"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { BULL_FACETS, BULL_NORM_HEIGHT, BULL_OUTLINE, BULL_PATH } from "./logo-data";
import { loadGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Map the logo's bull path into the facets' normalised 1000-unit space.
const K = 1000 / 7.9774;
const OUTLINE_TRANSFORM = `scale(${K}) translate(${-2.4454} ${-1.7158}) translate(1.8282 7.6504) scale(0.8492)`;

const DARK = [0x5e, 0x61, 0x23];
const LIGHT = [0xe8, 0xe9, 0xc9];
const MID = [0xb9, 0xbc, 0x5d];

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const hex = (c: number[]) => `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;

/** Facet orientation = angle of its longest edge; used to fake directional lighting. */
const facetAngles = BULL_FACETS.map((f) => {
  let best = 0;
  let angle = 0;
  f.points.forEach((p, i) => {
    const q = f.points[(i + 1) % f.points.length];
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    if (len > best) {
      best = len;
      angle = Math.atan2(q[1] - p[1], q[0] - p[0]);
    }
  });
  return angle;
});

/** Deterministic depth per facet for parallax separation. */
const depths = BULL_FACETS.map((_, i) => 0.35 + (((i * 7919) % 97) / 97) * 0.65);

function shade(i: number, light: number) {
  const t = 0.5 + 0.5 * Math.cos(2 * (facetAngles[i] - light));
  const c = t > 0.5 ? mix(MID, LIGHT, (t - 0.5) * 2 * 0.85) : mix(DARK, MID, t * 2);
  return hex(c);
}

const BASE_LIGHT = -0.7;

/** CSS intro parameters per facet (scattered start, staggered pseudo-random order). */
const intro = BULL_FACETS.map((_, i) => ({
  "--dx": `${(Math.cos(i * 2.4) * 260).toFixed(0)}px`,
  "--dy": `${(Math.sin(i * 1.7) * 220 - 60).toFixed(0)}px`,
  "--r": `${((i % 5) - 2) * 18}deg`,
  "--d": `${200 + ((i * 37) % 20) * 45}ms`,
})) as CSSProperties[];
const INTRO_MS = 200 + 19 * 45 + 1800;

/**
 * The logo's bull rebuilt from its 20 facets. The assembly intro is pure CSS (runs at
 * first paint, no JavaScript). On fine-pointer devices GSAP is loaded on the first
 * pointer move to add a 3D tilt, facet parallax and a moving light.
 */
export function HeroBull({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setIntroDone(true), reduce ? 0 : INTRO_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!introDone || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const el = root.current;
    if (!el) return;
    const facets = Array.from(el.querySelectorAll<SVGPolygonElement>(".hb-facet"));
    const tilt = el.querySelector<HTMLDivElement>(".hb-tilt")!;
    let cancelled = false;
    let loading = false;
    let handlers: { rx: (v: number) => void; ry: (v: number) => void; fx: ((v: number) => void)[]; fy: ((v: number) => void)[] } | null = null;
    let revert: (() => void) | null = null;
    let light = BASE_LIGHT;
    let target = BASE_LIGHT;
    let raf = 0;
    let last: PointerEvent | null = null;

    const paint = () => {
      light += (target - light) * 0.08;
      facets.forEach((f, i) => f.setAttribute("fill", shade(i, light)));
      raf = Math.abs(target - light) > 0.002 ? requestAnimationFrame(paint) : 0;
    };
    const apply = (e: PointerEvent) => {
      if (!handlers) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      handlers.ry(nx * 12);
      handlers.rx(-ny * 9);
      facets.forEach((_, i) => {
        handlers!.fx[i](nx * 22 * depths[i]);
        handlers!.fy[i](ny * 16 * depths[i]);
      });
      target = BASE_LIGHT + nx * 0.9;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (handlers) return apply(e);
      if (loading) return;
      loading = true;
      loadGsap().then(({ gsap }) => {
        if (cancelled) return;
        const ctx = gsap.context(() => {
          handlers = {
            rx: gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" }),
            ry: gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3.out" }),
            fx: facets.map((f) => gsap.quickTo(f, "x", { duration: 1.4, ease: "power3.out" })),
            fy: facets.map((f) => gsap.quickTo(f, "y", { duration: 1.4, ease: "power3.out" })),
          };
        }, el);
        revert = () => ctx.revert();
        if (last) apply(last);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      revert?.();
    };
  }, [introDone]);

  const H = BULL_NORM_HEIGHT;
  return (
    <div ref={root} aria-hidden className={cn("hero-bull pointer-events-none select-none [perspective:1400px]", !introDone && "hb-intro", className)}>
      <div className="hb-tilt [transform-style:preserve-3d] will-change-transform">
        <svg viewBox={`-40 -40 1080 ${H + 80}`} className="w-full overflow-visible">
          <defs>
            <radialGradient id={`hb-glow-${uid}`} cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#b9bc5d" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#b9bc5d" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`hb-sheen-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`hb-clip-${uid}`}>
              {BULL_FACETS.map((f, i) => (
                <polygon key={i} points={f.points.map((p) => p.join(",")).join(" ")} />
              ))}
            </clipPath>
          </defs>
          <ellipse cx="520" cy={H / 2} rx="620" ry={H * 0.62} fill={`url(#hb-glow-${uid})`} />
          <g>
            {BULL_FACETS.map((f, i) => (
              <polygon key={i} className="hb-facet" style={intro[i]} points={f.points.map((p) => p.join(",")).join(" ")} fill={shade(i, BASE_LIGHT)} />
            ))}
          </g>
          {/* light sweep across the facets (fine pointers only) */}
          <g clipPath={`url(#hb-clip-${uid})`}>
            <rect x="-400" y="-50" width="320" height={H + 100} fill={`url(#hb-sheen-${uid})`} className="hb-sheen" />
          </g>
          <path className="hb-outline" transform={OUTLINE_TRANSFORM} d={BULL_PATH} fill="none" stroke="#e8e9c9" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.55" />
          {BULL_OUTLINE.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
            <circle key={i} className="hb-node" style={{ "--d": `${1050 + i * 12}ms` } as CSSProperties} cx={x} cy={y} r="3.2" fill="#e8e9c9" opacity="0.8" />
          ))}
        </svg>
      </div>
      <style>{`
        .hb-facet, .hb-node { transform-box: fill-box; transform-origin: 50% 50%; }
        @media (prefers-reduced-motion: no-preference) {
          .hb-intro .hb-facet { animation: hb-facet-in 1.8s cubic-bezier(.16,1,.3,1) var(--d) both; }
          .hb-intro .hb-node { animation: hb-node-in .8s cubic-bezier(.16,1,.3,1) var(--d) both; }
          .hb-intro .hb-outline { stroke-dasharray: 5200; animation: hb-draw 2.4s cubic-bezier(.65,0,.35,1) both; }
          .hb-sheen { display: none; }
        }
        @media (prefers-reduced-motion: no-preference) and (pointer: fine) {
          .hero-bull:not(.hb-intro) .hb-sheen { display: inline; animation: hb-sweep 7s cubic-bezier(.76,0,.24,1) 1s infinite; }
        }
        @media (prefers-reduced-motion: no-preference) and (pointer: coarse) {
          .hero-bull:not(.hb-intro) .hb-tilt { animation: float 7s ease-in-out infinite; }
        }
        @keyframes hb-facet-in {
          from { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scale(.35); }
          to { opacity: 1; transform: none; }
        }
        @keyframes hb-node-in { from { opacity: 0; transform: scale(0); } }
        @keyframes hb-draw { from { stroke-dashoffset: 5200; opacity: 1; } to { stroke-dashoffset: 0; opacity: .55; } }
        @keyframes hb-sweep { 0% { transform: translateX(0); } 55%, 100% { transform: translateX(1500px); } }
      `}</style>
    </div>
  );
}
