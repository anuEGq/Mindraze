"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ifGsapLoaded, loadGsap } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance (null on touch devices, with reduced motion, or before it loads). */
export const useLenis = () => useContext(LenisContext);

/**
 * Smooth wheel scrolling for fine-pointer devices only. Touch devices and users who
 * prefer reduced motion keep native scrolling and never download Lenis.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let instance: Lenis | null = null;
    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({
        autoRaf: true,
        lerp: 0.11,
        anchors: { offset: -96 },
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
        prevent: (node) => node.closest?.("[data-lenis-prevent]") !== null,
      });
      const created = instance;
      loadGsap().then(({ ScrollTrigger }) => {
        if (!cancelled) created.on("scroll", ScrollTrigger.update);
      });
      setLenis(instance);
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  // Keep Lenis and ScrollTrigger measurements fresh after client-side navigation.
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => {
      lenis?.resize();
      ifGsapLoaded(({ ScrollTrigger }) => ScrollTrigger.refresh());
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
