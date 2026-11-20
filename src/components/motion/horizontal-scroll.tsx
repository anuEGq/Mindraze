"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP_MOTION, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Pinned horizontal scrolling on desktop (≥1024px, motion allowed).
 * Elsewhere it degrades to a native, swipeable scroll-snap row.
 */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
  label,
  header,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  label: string;
  header?: ReactNode;
}) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGsap(
    ({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const t = track.current!;
        const distance = () => Math.max(0, t.scrollWidth - t.clientWidth);
        gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: self.progress }),
          },
        });
      });
    },
    section,
    [],
    DESKTOP_MOTION,
  );

  return (
    <div ref={section} className={cn("relative overflow-hidden lg:motion-safe:flex lg:motion-safe:min-h-svh lg:motion-safe:flex-col lg:motion-safe:justify-center", className)}>
      {header}
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 sm:gap-6 lg:scroll-px-[max(3rem,calc((100vw_-_90rem)/2_+_3rem))] lg:px-[max(3rem,calc((100vw_-_90rem)/2_+_3rem))] lg:motion-safe:snap-none lg:motion-safe:overflow-visible",
          trackClassName,
        )}
      >
        {children}
      </div>
      <div aria-hidden className="container-x mt-8 hidden lg:motion-safe:block">
        <div className="h-px w-full bg-current/15">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-olive" />
        </div>
      </div>
    </div>
  );
}
