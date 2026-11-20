"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { useLenis } from "@/components/motion/smooth-scroll";
import { whatsappHref, WHATSAPP_FALLBACK } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Floating WhatsApp button and a back-to-top button with scroll progress. */
export function FloatingActions() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const wa = whatsappHref();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  const C = 2 * Math.PI * 21;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={cn(
          "pointer-events-auto relative grid size-12 place-items-center rounded-full bg-charcoal/85 text-paper shadow-lg ring-1 ring-white/10 backdrop-blur transition-all duration-500 ease-[var(--ease-out-expo)] hover:bg-ink",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
          <circle cx="24" cy="24" r="21" fill="none" stroke="var(--color-olive)" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
        </svg>
        <ArrowUp aria-hidden className="size-5" />
      </button>
      <a
        href={wa ?? WHATSAPP_FALLBACK}
        {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={wa ? "Chat with us on WhatsApp (opens in a new tab)" : "WhatsApp number coming soon – send an enquiry instead"}
        className="group pointer-events-auto relative grid size-14 place-items-center rounded-full bg-olive text-ink shadow-[0_18px_50px_-12px_rgb(185_188_93/0.7)] transition-transform duration-300 hover:scale-105"
      >
        <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-olive/50" />
        <WhatsAppIcon className="relative size-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-ink px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
          {wa ? "Chat on WhatsApp" : "WhatsApp coming soon"}
        </span>
      </a>
    </div>
  );
}
