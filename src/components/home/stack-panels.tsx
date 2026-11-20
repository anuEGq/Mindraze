"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/gsap";

const STACK_MEDIA = "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";

/**
 * Sticky stacking panels: as the next panel slides over, the current one recedes.
 * Only runs on large, tall-enough screens with motion allowed; otherwise panels stack normally.
 */
export function StackPanels({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGsap(
    ({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add(STACK_MEDIA, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-stack-panel]", root.current);
        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          if (!next) return;
          const inner = panel.querySelector<HTMLElement>("[data-stack-inner]");
          gsap.to(inner, {
            scale: 0.9,
            yPercent: -4,
            filter: "brightness(0.45)",
            borderRadius: "2rem",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
        });
      });
    },
    root,
    [],
    STACK_MEDIA,
  );
  return <div ref={root}>{children}</div>;
}
