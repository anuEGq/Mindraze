"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { loadMotionFeatures } from "@/lib/motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BrandMask } from "@/components/brand/brand-mask";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { MobileMenu } from "./mobile-menu";
import { mainNav, quoteHref } from "@/content/navigation";
import { verticals } from "@/content/verticals";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const megaId = useId();
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Sample the section under the header to pick a legible colour scheme.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const header = headerRef.current;
      const y = Math.min((header?.offsetHeight ?? 80) * 0.55, 60);
      let next: Theme = "light";
      for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
        if (header?.contains(el)) continue;
        const t = el.closest("[data-theme]")?.getAttribute("data-theme");
        if (t === "dark" || t === "light") {
          next = t;
          break;
        }
      }
      setTheme(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const settle = window.setTimeout(update, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close menus on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI state when the route changes
    setMegaOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Escape + outside click for the businesses dropdown.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaButtonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  }, []);

  const dark = menuOpen || theme === "dark";
  const indicator = hovered ?? mainNav.find((n) => isActive(pathname, n.href))?.href ?? null;

  // Sliding pill indicator measured from the nav items (CSS transition, no layout animation library).
  const navRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const el = indicator ? navRef.current?.querySelector<HTMLElement>(`[data-nav="${indicator}"]`) : null;
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [indicator]);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          dark ? "text-paper" : "text-charcoal",
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "relative mt-3 flex h-16 items-center justify-between gap-4 rounded-full pr-2 pl-4 transition-[background-color,box-shadow,backdrop-filter,margin] duration-500 ease-[var(--ease-out-expo)] lg:h-[4.25rem] lg:pl-5",
              scrolled && !menuOpen
                ? dark
                  ? "bg-ink/70 shadow-[0_20px_60px_-25px_rgb(0_0_0/0.8)] ring-1 ring-white/10 backdrop-blur-xl"
                  : "bg-paper/80 shadow-[0_20px_60px_-30px_rgb(21_21_21/0.35)] ring-1 ring-charcoal/10 backdrop-blur-xl"
                : "bg-transparent",
            )}
          >
            <Link href="/" className="relative z-10 -my-2 flex items-center rounded-lg py-2" aria-label="Mindraze Global LLP – Home">
              <BrandMask asset="lockup" className="h-9 sm:h-10" />
            </Link>

            <nav aria-label="Main" className="hidden lg:block" onMouseLeave={() => setHovered(null)}>
              <ul ref={navRef} className="relative isolate flex items-center gap-1">
                <li
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-0 left-0 -z-10 h-11 rounded-full transition-[transform,width,opacity,background-color] duration-500 ease-[var(--ease-out-expo)]",
                    dark ? "bg-white/10" : "bg-charcoal/[0.07]",
                    pill ? "opacity-100" : "opacity-0",
                  )}
                  style={{ transform: `translateX(${pill?.left ?? 0}px)`, width: pill?.width ?? 0 }}
                />
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  const dot = active && (
                    <span aria-hidden className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-olive" />
                  );
                  if (item.children) {
                    return (
                      <li key={item.href} data-nav={item.href} onMouseEnter={() => { setHovered(item.href); openMega(); }} onMouseLeave={scheduleClose}>
                        <button
                          ref={megaButtonRef}
                          type="button"
                          aria-expanded={megaOpen}
                          aria-controls={megaId}
                          onClick={(e) => (e.detail > 0 && window.matchMedia("(hover: hover)").matches ? openMega() : setMegaOpen((o) => !o))}
                          onFocus={() => setHovered(item.href)}
                          className="relative isolate flex h-11 items-center gap-1.5 rounded-full px-4 text-[0.92rem] font-medium"
                        >
                          {item.label}
                          <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")} />
                          {dot}
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li key={item.href} data-nav={item.href} onMouseEnter={() => setHovered(item.href)}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onFocus={() => setHovered(item.href)}
                        className="relative isolate flex h-11 items-center rounded-full px-4 text-[0.92rem] font-medium"
                      >
                        {item.label}
                        {dot}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-10 flex items-center gap-2">
              <Magnetic className="hidden sm:inline-block">
                <ButtonLink href={quoteHref} size="sm" variant="primary">
                  Get a Quote
                </ButtonLink>
              </Magnetic>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                data-menu-toggle
                className={cn(
                  "grid size-12 place-items-center rounded-full transition-colors lg:hidden",
                  dark ? "bg-white/10 hover:bg-white/15" : "bg-charcoal/[0.07] hover:bg-charcoal/10",
                )}
              >
                <span aria-hidden className="relative block h-3.5 w-5">
                  <span className={cn("absolute left-0 h-[1.5px] w-5 rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "top-1.5 rotate-45" : "top-0")} />
                  <span className={cn("absolute left-0 top-1.5 h-[1.5px] rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "w-0 opacity-0" : "w-3.5")} />
                  <span className={cn("absolute left-0 h-[1.5px] w-5 rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "top-1.5 -rotate-45" : "top-3")} />
                </span>
              </button>
            </div>
          </div>

          {/* Businesses mega dropdown (desktop) */}
          <AnimatePresence>
            {megaOpen && (
              <m.div
                id={megaId}
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
                className="absolute inset-x-0 top-full z-40 hidden pt-3 lg:block"
              >
                <div className="container-x">
                  <div className="grid grid-cols-[1fr_3fr] gap-3 rounded-[1.75rem] bg-ink/90 p-3 text-paper shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/10 backdrop-blur-2xl">
                    <div className="flex flex-col justify-between rounded-[1.25rem] p-5">
                      <div>
                        <p className="eyebrow text-olive">Our Businesses</p>
                        <p className="mt-4 text-2xl font-semibold tracking-tight">Three industries. One vision.</p>
                      </div>
                      <Link
                        href="/businesses"
                        className="group/ov mt-8 inline-flex items-center gap-2 text-sm font-semibold text-paper/80 hover:text-paper"
                      >
                        Overview of all businesses
                        <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/ov:translate-x-0.5 group-hover/ov:-translate-y-0.5" />
                      </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-3">
                      {verticals.map((v) => (
                        <li key={v.id}>
                          <Link
                            href={v.href}
                            aria-current={isActive(pathname, v.href) ? "page" : undefined}
                            className="group/card relative flex h-full min-h-60 flex-col justify-end overflow-hidden rounded-[1.25rem] p-5 ring-1 ring-white/10"
                          >
                            <Image
                              src={v.photo.src}
                              alt=""
                              fill
                              sizes="320px"
                              quality={60}
                              className="-z-10 object-cover opacity-55 transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-105 group-hover/card:opacity-75"
                            />
                            <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                            <span className="eyebrow text-olive">{v.index}</span>
                            <span className="mt-2 flex items-center justify-between gap-2 text-lg font-semibold">
                              {v.shortName === "IT Services" ? "IT Services" : v.name.replace(" Energy", "")}
                              <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                            </span>
                            <span className="mt-1 text-sm leading-snug text-paper/70">{v.headline}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </LazyMotion>
  );
}
