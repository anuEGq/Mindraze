"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import type { VerticalId } from "@/content/verticals";
import { cn } from "@/lib/utils";

type Filter = "all" | VerticalId;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "steel", label: "Steel Trading" },
  { id: "solar", label: "Solar Solutions" },
  { id: "it", label: "IT Services" },
];

/**
 * Client-side category filter. Cards are rendered on the server; the reflow is
 * animated with the native View Transitions API where supported.
 */
export function ShowcaseGrid({ items }: { items: { id: string; vertical: VerticalId; node: ReactNode }[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = items.filter((i) => filter === "all" || i.vertical === filter);

  const select = (next: Filter) => {
    if (next === filter) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("startViewTransition" in document)) return setFilter(next);
    document.startViewTransition(() => flushSync(() => setFilter(next)));
  };

  return (
    <>
      <div role="group" aria-label="Filter products and services" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const active = filter === f.id;
          const count = f.id === "all" ? items.length : items.filter((i) => i.vertical === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => select(f.id)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-inset transition-colors duration-300",
                active ? "bg-charcoal text-paper ring-charcoal" : "text-charcoal ring-charcoal/15 hover:ring-charcoal/40",
              )}
            >
              {f.label}
              <span className={cn("font-mono text-[0.7rem]", active ? "text-olive" : "text-grey-strong")}>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} items
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item) => (
          <li key={item.id} className="h-full" style={{ viewTransitionName: `showcase-${item.id}` } as CSSProperties}>
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
}
