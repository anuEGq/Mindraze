"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type GsapApi = { gsap: typeof GsapCore; ScrollTrigger: typeof ScrollTriggerType };

let loading: Promise<GsapApi> | null = null;

/**
 * GSAP + ScrollTrigger are loaded on demand (after hydration) so they never sit on
 * the critical rendering path. Every caller shares the same promise.
 */
const whenIdle = () =>
  new Promise<void>((resolve) => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 1200 });
    else setTimeout(resolve, 200);
  });

export function loadGsap(): Promise<GsapApi> {
  loading ??= whenIdle().then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")])).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    st.ScrollTrigger.config({ ignoreMobileResize: true });
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
  return loading;
}

/** Runs `fn` only if GSAP has already been requested (never triggers a download). */
export function ifGsapLoaded(fn: (api: GsapApi) => void) {
  loading?.then(fn);
}

/**
 * Runs GSAP setup inside a gsap.context scoped to `scope`, reverting everything
 * (tweens, ScrollTriggers, matchMedia) on unmount or when deps change.
 * When `media` is given, GSAP is only downloaded once that media query matches,
 * so small screens and reduced-motion users never pay for it.
 */
export function useGsap(
  setup: (api: GsapApi, scope: HTMLElement) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
  media?: string,
) {
  useEffect(() => {
    let cancelled = false;
    let started = false;
    let ctx: ReturnType<GsapApi["gsap"]["context"]> | undefined;
    let cleanup: void | (() => void);
    const start = () => {
      if (started) return;
      started = true;
      loadGsap().then((api) => {
        const el = scope.current;
        if (cancelled || !el) return;
        ctx = api.gsap.context(() => {
          cleanup = setup(api, el);
        }, el);
      });
    };
    const mq = media ? window.matchMedia(media) : null;
    const onChange = () => mq?.matches && start();
    if (!mq || mq.matches) start();
    else mq.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      mq?.removeEventListener("change", onChange);
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers pass explicit deps
  }, deps);
}

/** Matches the conditions under which rich scroll choreography should run. */
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
