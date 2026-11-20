"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// One IntersectionObserver shared by every InView element.
type Callback = () => void;
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

function observe(el: Element, cb: Callback) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  callbacks.set(el, cb);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

type InViewProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
} & Record<string, unknown>;

/**
 * Adds `is-in` once the element scrolls into view. React owns the class, so it
 * survives re-renders and never causes hydration mismatches. Styling lives in
 * globals.css ([data-reveal], [data-mask], [data-split], [data-draw]).
 */
export function InView({ as: Tag = "div", className, children, ...rest }: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setInView(true));
  }, []);
  return (
    <Tag ref={ref} className={cn(className, inView && "is-in")} {...rest}>
      {children}
    </Tag>
  );
}
