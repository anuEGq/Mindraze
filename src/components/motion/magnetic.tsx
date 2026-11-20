"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Pulls its child towards the pointer on fine-pointer devices. GSAP loads on first hover. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let xTo: ((v: number) => void) | null = null;
    let yTo: ((v: number) => void) | null = null;
    let reset: (() => void) | null = null;
    let cancelled = false;
    const init = () => {
      el.removeEventListener("pointerenter", init);
      loadGsap().then(({ gsap }) => {
        if (cancelled) return;
        xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.45)" });
        yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.45)" });
        reset = () => gsap.set(el, { x: 0, y: 0 });
      });
    };
    const move = (e: PointerEvent) => {
      if (!xTo || !yTo) return;
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo?.(0);
      yTo?.(0);
    };
    el.addEventListener("pointerenter", init);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelled = true;
      el.removeEventListener("pointerenter", init);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      reset?.();
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
