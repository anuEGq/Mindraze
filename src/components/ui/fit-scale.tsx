"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders children at a fixed design width and uniformly scales them down to fit
 * the container (like object-fit: contain), so detailed mockups stay proportional.
 */
export function FitScale({ children, width, className, padding = 0.08 }: { children: ReactNode; width: number; className?: string; padding?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = box.current;
    const el = inner.current;
    if (!b || !el) return;
    const fit = () => {
      const availW = b.clientWidth * (1 - padding * 2);
      const availH = b.clientHeight * (1 - padding * 2);
      const s = Math.min(availW / el.offsetWidth, availH / el.offsetHeight, 1.25);
      el.style.transform = `translate(-50%, -50%) scale(${s})`;
      el.style.opacity = "1";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    ro.observe(el);
    return () => ro.disconnect();
  }, [padding]);

  return (
    <div ref={box} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div ref={inner} style={{ width, transform: "translate(-50%, -50%) scale(0.6)", opacity: 0 }} className="absolute top-1/2 left-1/2 origin-center transition-opacity duration-300">
        {children}
      </div>
    </div>
  );
}
