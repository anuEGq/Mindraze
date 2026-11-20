"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/motion/smooth-scroll";
import { cn } from "@/lib/utils";

/** Sticky "on this page" navigation with scroll-spy active indicator. */
export function SectionNav({ items, className }: { items: { id: string; label: string }[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active chip visible in the horizontal list on small screens.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && chip) list.scrollTo({ left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="On this page" className={cn("pointer-events-none sticky top-[5.25rem] z-30 py-3 lg:top-[5.75rem]", className)}>
      <div className="container-x">
        <ul ref={listRef} className="no-scrollbar pointer-events-auto mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-paper/85 p-1.5 shadow-[0_20px_50px_-25px_rgb(21_21_21/0.45)] ring-1 ring-charcoal/10 backdrop-blur-xl">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id} data-id={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => {
                    const el = document.getElementById(item.id);
                    if (!el) return;
                    e.preventDefault();
                    if (lenis) lenis.scrollTo(el, { offset: -150, duration: 1.2 });
                    else el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                    history.replaceState(null, "", `#${item.id}`);
                  }}
                  className={cn(
                    "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-300",
                    isActive ? "bg-charcoal text-paper" : "text-charcoal/70 hover:text-charcoal",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
