"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { BrandMask } from "@/components/brand/brand-mask";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { useLenis } from "@/components/motion/smooth-scroll";
import { mainNav, quoteHref } from "@/content/navigation";
import { hasValue, site, telHref } from "@/content/site";
import { whatsappHref, WHATSAPP_FALLBACK } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Scroll lock, focus management and focus trap.
  useEffect(() => {
    if (!open) return;
    const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();

    const focusables = () => [
      ...(toggle ? [toggle] : []),
      ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? []),
    ];
    const first = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus(), 350);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const idx = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && (idx <= 0)) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && idx === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && onClose();
    mq.addEventListener("change", onMq);

    return () => {
      window.clearTimeout(first);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      root.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  const wa = whatsappHref();
  const phone = site.contact.phone;
  const email = site.contact.email;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-theme="dark"
          data-lenis-prevent
          initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.75rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
          transition={{ duration: 0.8, ease }}
          className="grain fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink text-paper lg:hidden"
        >
          <BrandMask asset="mark" className="pointer-events-none absolute -right-24 bottom-28 w-[34rem] max-w-none text-olive/[0.06]" />
          <div className="container-x relative z-10 flex min-h-full flex-col pt-28 pb-10">
            <nav aria-label="Mobile">
              <ul className="border-t border-white/10">
                {mainNav.map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="border-b border-white/10">
                      <m.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className="group flex items-baseline gap-4 py-4"
                        >
                          <span className="eyebrow w-7 text-olive/80">0{i + 1}</span>
                          <span className={cn("text-[2.1rem] leading-none font-semibold tracking-[-0.03em] xs:text-[2.5rem]", active ? "text-olive" : "text-paper")}>
                            {item.label}
                          </span>
                        </Link>
                        {item.children && (
                          <ul className="-mt-1 flex flex-wrap gap-2 pb-5 pl-11">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  aria-current={pathname === child.href ? "page" : undefined}
                                  className={cn(
                                    "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium ring-1 ring-inset",
                                    pathname === child.href ? "bg-olive text-ink ring-olive" : "ring-white/15 text-paper/85",
                                  )}
                                >
                                  {child.label}
                                  <ArrowUpRight aria-hidden className="size-3.5" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </m.div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-6"
            >
              <ButtonLink href={quoteHref} onClick={onClose} size="lg" className="w-full justify-between">
                Get a Quote
              </ButtonLink>
              <div className="grid gap-3 text-sm text-paper/75">
                <a href={wa ?? WHATSAPP_FALLBACK} {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={onClose} className="flex min-h-11 items-center gap-3">
                  <WhatsAppIcon className="size-5 text-olive" /> WhatsApp {wa ? "us" : <span className="text-paper/45">(number to be added)</span>}
                </a>
                {hasValue(phone) ? (
                  <a href={telHref(phone.value)} className="flex min-h-11 items-center gap-3"><Phone aria-hidden className="size-5 text-olive" /> {phone.value}</a>
                ) : (
                  <p className="flex min-h-11 items-center gap-3"><Phone aria-hidden className="size-5 text-olive" /> <span className="text-paper/45">Phone: {phone.placeholder} (placeholder)</span></p>
                )}
                {hasValue(email) ? (
                  <a href={`mailto:${email.value}`} className="flex min-h-11 items-center gap-3"><Mail aria-hidden className="size-5 text-olive" /> {email.value}</a>
                ) : (
                  <p className="flex min-h-11 items-center gap-3"><Mail aria-hidden className="size-5 text-olive" /> <span className="text-paper/45">Email: {email.placeholder} (placeholder)</span></p>
                )}
              </div>
              <p className="eyebrow mt-auto text-paper/40">{site.tagline}</p>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
