"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/gsap";

const PARALLAX_MEDIA = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked vertical drift. `speed` is the travel as a fraction of the element's
 * height (0.15 = ±15%). Wrap media in an overflow-hidden frame and oversize it.
 */
export function Parallax({ children, speed = 0.12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGsap(
    ({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add(PARALLAX_MEDIA, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: ref.current?.parentElement ?? ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    ref,
    [speed],
    PARALLAX_MEDIA,
  );
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
