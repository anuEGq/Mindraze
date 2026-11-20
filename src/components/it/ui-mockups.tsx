import type { CSSProperties, ReactNode } from "react";
import { Nfc, Play, Star } from "lucide-react";
import { BrandMask } from "@/components/brand/brand-mask";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { cn } from "@/lib/utils";

/** All mockups are illustrative interfaces (no real client work or data). */

export function BrowserFrame({ children, className, url = "yourbusiness.in", tone = "dark" }: { children: ReactNode; className?: string; url?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("overflow-hidden rounded-2xl shadow-[0_40px_100px_-40px_rgb(0_0_0/0.7)] ring-1", dark ? "bg-graphite ring-white/10" : "bg-white ring-charcoal/10", className)}>
      <div className={cn("flex h-9 items-center gap-2 border-b px-4", dark ? "border-white/10" : "border-charcoal/10")}>
        <span className="size-2.5 rounded-full bg-[#5a5b55]" />
        <span className="size-2.5 rounded-full bg-[#5a5b55]" />
        <span className="size-2.5 rounded-full bg-olive" />
        <span className={cn("ml-3 truncate rounded-full px-3 py-0.5 font-mono text-[0.65rem]", dark ? "bg-white/5 text-paper/50" : "bg-charcoal/5 text-charcoal/50")}>{url}</span>
      </div>
      {children}
    </div>
  );
}

export function WebsiteMock({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const bar = dark ? "bg-paper/15" : "bg-charcoal/10";
  return (
    <BrowserFrame className={className} tone={tone}>
      <div className="grid gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-16 rounded-full bg-olive" />
          <span className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("h-1.5 w-8 rounded-full", bar)} />
            ))}
          </span>
        </div>
        <div className="grid grid-cols-5 items-center gap-4 pt-2">
          <div className="col-span-3 grid gap-2">
            <span className={cn("h-4 w-11/12 rounded", dark ? "bg-paper/80" : "bg-charcoal/80")} />
            <span className={cn("h-4 w-8/12 rounded", dark ? "bg-paper/80" : "bg-charcoal/80")} />
            <span className={cn("mt-2 h-1.5 w-10/12 rounded-full", bar)} />
            <span className={cn("h-1.5 w-9/12 rounded-full", bar)} />
            <span className="mt-2 h-6 w-24 rounded-full bg-olive" />
          </div>
          <div className="col-span-2 aspect-square rounded-xl bg-gradient-to-br from-olive/70 to-olive-deep/40" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn("grid gap-2 rounded-lg p-3", dark ? "bg-white/5" : "bg-charcoal/[0.04]")}>
              <span className="size-4 rounded bg-olive/70" />
              <span className={cn("h-1.5 w-full rounded-full", bar)} />
              <span className={cn("h-1.5 w-2/3 rounded-full", bar)} />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

const code: { t: string; c?: string }[][] = [
  [{ t: "export", c: "text-olive" }, { t: " async function " }, { t: "getEnquiries", c: "text-olive-light" }, { t: "() {" }],
  [{ t: "  const rows = " }, { t: "await", c: "text-olive" }, { t: " db.enquiry.findMany({" }],
  [{ t: "    where: { status: " }, { t: "'open'", c: "text-[#d6d89a]" }, { t: " }," }],
  [{ t: "    orderBy: { createdAt: " }, { t: "'desc'", c: "text-[#d6d89a]" }, { t: " }," }],
  [{ t: "  });" }],
  [{ t: "  " }, { t: "return", c: "text-olive" }, { t: " rows.map(toDashboardRow);" }],
  [{ t: "}" }],
];

export function CodeMock({ className }: { className?: string }) {
  return (
    <BrowserFrame className={className} url="app.yourbusiness.in/api">
      <div className="typing grid gap-1.5 p-5 font-mono text-[0.72rem] leading-relaxed text-paper/75 sm:text-xs">
        {code.map((ln, i) => (
          <div key={i} style={{ "--i": i } as CSSProperties} className={cn("whitespace-pre", i === code.length - 1 && "caret")}>
            <span className="mr-4 select-none text-paper/25">{String(i + 1).padStart(2, "0")}</span>
            {ln.map((tk, j) => (
              <span key={j} className={tk.c}>
                {tk.t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

export function DashboardMock({ className }: { className?: string }) {
  const bars = [38, 62, 48, 80, 56, 92, 70, 84];
  return (
    <BrowserFrame className={className} url="app.yourbusiness.in/dashboard">
      <div className="grid grid-cols-[3.25rem_1fr] text-paper">
        <div className="grid content-start gap-3 border-r border-white/10 p-3">
          <BrandMask asset="mark" className="w-7 text-olive" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={cn("h-6 rounded-md", i === 1 ? "bg-olive/80" : "bg-white/5")} />
          ))}
        </div>
        <div className="grid gap-3 p-4">
          <div className="grid grid-cols-3 gap-3">
            {["Orders", "Enquiries", "Tasks"].map((l, i) => (
              <div key={l} className="rounded-lg bg-white/5 p-3">
                <p className="font-mono text-[0.6rem] tracking-wider text-paper/50 uppercase">{l}</p>
                <span className={cn("mt-2 block h-3 rounded", i === 0 ? "w-10 bg-olive" : "w-8 bg-paper/60")} />
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <div className="bars flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <span key={i} style={{ height: `${h}%`, "--i": i } as CSSProperties} className={cn("flex-1 rounded-t", i === 5 ? "bg-olive" : "bg-paper/20")} />
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-md bg-white/[0.03] px-3 py-2">
                <span className="size-2 rounded-full bg-olive" />
                <span className="h-1.5 flex-1 rounded-full bg-paper/15" />
                <span className="h-1.5 w-10 rounded-full bg-paper/25" />
              </div>
            ))}
          </div>
          <p className="font-mono text-[0.6rem] tracking-wider text-paper/60 uppercase">Illustrative interface · sample layout</p>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-[2.4rem] bg-ink p-2 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.75)] ring-1 ring-white/15", className)}>
      <div className="relative overflow-hidden rounded-[1.9rem] bg-paper text-charcoal">
        <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

/** Personalised NFC profile page preview (static web page). */
export function ProfileMock({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <div className="h-24 bg-gradient-to-br from-olive to-olive-deep" />
      <div className="-mt-10 px-5 pb-6">
        <div className="grid size-20 place-items-center rounded-full bg-charcoal text-paper ring-4 ring-paper">
          <span className="text-xl font-semibold">YN</span>
        </div>
        <p className="mt-3 text-lg font-semibold tracking-tight">Your Name</p>
        <p className="text-sm text-grey-strong">Designation · Company</p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {["Call", "Chat", "Email", "Save"].map((l, i) => (
            <span key={l} className={cn("grid place-items-center gap-1 rounded-xl py-2 text-[0.62rem] font-semibold", i === 3 ? "bg-charcoal text-paper" : "bg-olive-light text-olive-deep")}>
              {i === 1 ? <WhatsAppIcon className="size-4" /> : <span className="size-4 rounded-full bg-current/25" />}
              {l}
            </span>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {["Resume", "Portfolio", "Website"].map((l) => (
            <div key={l} className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-xs font-semibold ring-1 ring-charcoal/5">
              {l}
              <span className="h-1.5 w-10 rounded-full bg-charcoal/15" />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  );
}

/** Decorative, non-functional QR-style pattern. */
export function QrPattern({ className, size = 21 }: { className?: string; size?: number }) {
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) => x < 7 && y < 7;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (finder(x, y) || finder(size - 1 - x, y) || finder(x, size - 1 - y)) continue;
      if (((x * 73856093) ^ (y * 19349663) ^ (x * y * 83492791)) % 7 < 3) cells.push([x, y]);
    }
  }
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} aria-hidden className={cn("bg-white", className)} shapeRendering="crispEdges">
      <Finder x={0} y={0} />
      <Finder x={size - 7} y={0} />
      <Finder x={0} y={size - 7} />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}

export function NfcWaves({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute grid place-items-center", className)}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ "--i": i } as CSSProperties} className="nfc-wave absolute size-full rounded-full border-2 border-olive" />
      ))}
    </span>
  );
}

export function NfcCardMock({ className, side = "front" }: { className?: string; side?: "front" | "back" }) {
  return (
    <div className={cn("relative aspect-[85.6/54] overflow-hidden rounded-2xl p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10", side === "front" ? "bg-gradient-to-br from-[#1d1e1a] to-ink text-paper" : "bg-olive text-ink", className)}>
      {side === "front" ? (
        <>
          <BrandMask asset="mark" className="absolute -right-6 -bottom-6 w-40 text-white/[0.05]" />
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="h-2 w-14 rounded-full bg-olive" />
              <Nfc aria-hidden className="size-6 text-olive" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight sm:text-lg">Your Name</p>
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-paper/55 uppercase">Designation</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.16em] uppercase">Tap or scan</p>
            <p className="mt-1 text-sm font-semibold">Your digital profile</p>
          </div>
          <QrPattern className="aspect-square h-full rounded-lg p-1 text-ink" />
        </div>
      )}
    </div>
  );
}

export function ReviewStandMock({ className }: { className?: string }) {
  return (
    <div className={cn("relative [perspective:1200px]", className)}>
      <div className="relative mx-auto w-full [transform:rotateY(-14deg)_rotateX(4deg)] [transform-style:preserve-3d]">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-white to-olive-light p-6 text-charcoal shadow-[30px_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-charcoal/10">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-16 rounded-full bg-charcoal" />
            <span className="font-mono text-[0.6rem] tracking-[0.16em] text-grey-strong uppercase">Your brand</span>
          </div>
          <p className="mt-6 text-2xl leading-tight font-semibold tracking-tight">Loved your visit? Leave us a review.</p>
          <div className="mt-3 flex gap-1 text-olive-deep">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} aria-hidden className="size-5 fill-current" />
            ))}
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="relative grid size-20 place-items-center rounded-full bg-charcoal text-olive">
              <NfcWaves className="inset-0" />
              <Nfc aria-hidden className="relative size-8" />
            </div>
            <QrPattern className="size-24 rounded-lg p-1.5 text-ink ring-1 ring-charcoal/10" />
          </div>
          <p className="mt-4 font-mono text-[0.62rem] tracking-[0.14em] text-grey-strong uppercase">Tap your phone · or scan the code</p>
        </div>
        <div className="mx-auto h-5 w-[86%] rounded-b-2xl bg-gradient-to-b from-[#c9cab8] to-[#a6a795] shadow-[0_30px_40px_-20px_rgb(0_0_0/0.6)]" />
      </div>
    </div>
  );
}

export function SocialPostMock({ variant = 0, className }: { variant?: 0 | 1 | 2; className?: string }) {
  const themes = [
    { bg: "bg-olive", fg: "text-ink", title: "New season. New collection.", tag: "Poster design" },
    { bg: "bg-charcoal", fg: "text-paper", title: "Grand opening this Saturday", tag: "Social creative" },
    { bg: "bg-olive-light", fg: "text-charcoal", title: "5 tips for a faster website", tag: "Content post" },
  ][variant];
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white text-charcoal shadow-[0_30px_70px_-35px_rgb(0_0_0/0.5)] ring-1 ring-charcoal/10", className)}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="grid size-7 place-items-center rounded-full bg-charcoal text-[0.55rem] font-bold text-olive">YB</span>
        <span className="text-xs font-semibold">yourbrand</span>
        <span className="ml-auto font-mono text-[0.55rem] tracking-widest text-grey-strong uppercase">{themes.tag}</span>
      </div>
      <div className={cn("relative flex aspect-square flex-col justify-end p-5", themes.bg, themes.fg)}>
        <BrandMask asset="mark" className="absolute top-4 right-4 w-14 opacity-20" />
        <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">{themes.title}</p>
        <span className="mt-3 h-1.5 w-12 rounded-full bg-current opacity-60" />
      </div>
      <div className="flex gap-3 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-4 rounded-full bg-charcoal/15" />
        ))}
        <span className="ml-auto h-4 w-4 rounded bg-charcoal/15" />
      </div>
    </div>
  );
}

export function VideoPreviewMock({ className, label = "Promotional video" }: { className?: string; label?: string }) {
  return (
    <div className={cn("group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-graphite via-ink to-olive-deep/60 text-paper ring-1 ring-white/10", className)}>
      <BrandMask asset="mark" className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-olive/15" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-olive text-ink shadow-[0_0_60px_rgb(185_188_93/0.5)] transition-transform duration-500 group-hover:scale-110">
          <Play aria-hidden className="ml-1 size-6 fill-current" />
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4">
        <div className="flex items-center justify-between font-mono text-[0.6rem] tracking-widest text-paper/70 uppercase">
          <span>{label}</span>
          <span>Concept</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
          <span className="block h-full origin-left bg-olive motion-safe:[animation:progress_6s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}

/** Brand-neutral billing / invoice interface (illustrative; not any vendor's actual UI). */
export function InvoiceMock({ className }: { className?: string }) {
  const rows = [72, 56, 64];
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white text-charcoal shadow-[0_40px_100px_-40px_rgb(0_0_0/0.55)] ring-1 ring-charcoal/10", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-charcoal/10 bg-paper px-4">
        <span className="size-2.5 rounded-full bg-charcoal/20" />
        <span className="size-2.5 rounded-full bg-charcoal/20" />
        <span className="size-2.5 rounded-full bg-olive" />
        <span className="ml-3 font-mono text-[0.65rem] text-charcoal/50">Billing · New sale</span>
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1.5">
            <span className="text-sm font-semibold">Your Business</span>
            <span className="h-1.5 w-28 rounded-full bg-charcoal/10" />
            <span className="h-1.5 w-20 rounded-full bg-charcoal/10" />
          </div>
          <div className="text-right">
            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-olive-deep uppercase">Tax invoice</p>
            <p className="mt-1 font-mono text-xs">INV-0001</p>
          </div>
        </div>
        <div className="rounded-lg bg-paper p-3">
          <p className="font-mono text-[0.58rem] tracking-[0.14em] text-grey-strong uppercase">Bill to</p>
          <span className="mt-2 block h-2 w-32 rounded-full bg-charcoal/20" />
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-[1fr_2.5rem_4rem] gap-3 border-b border-charcoal/10 pb-2 font-mono text-[0.58rem] tracking-[0.12em] text-grey-strong uppercase">
            <span>Item</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Amount</span>
          </div>
          {rows.map((w, i) => (
            <div key={i} className="grid grid-cols-[1fr_2.5rem_4rem] items-center gap-3">
              <span className="h-2 rounded-full bg-charcoal/15" style={{ width: `${w}%` }} />
              <span className="ml-auto h-2 w-4 rounded-full bg-charcoal/15" />
              <span className="ml-auto h-2 w-10 rounded-full bg-charcoal/25" />
            </div>
          ))}
        </div>
        <div className="ml-auto grid w-48 gap-1.5 border-t border-charcoal/10 pt-3 text-xs">
          <div className="flex items-center justify-between"><span className="text-grey-strong">Subtotal</span><span className="h-2 w-12 rounded-full bg-charcoal/15" /></div>
          <div className="flex items-center justify-between"><span className="text-grey-strong">GST</span><span className="h-2 w-9 rounded-full bg-charcoal/15" /></div>
          <div className="flex items-center justify-between font-semibold"><span>Total</span><span className="h-2.5 w-14 rounded-full bg-charcoal/60" /></div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-olive-light px-3 py-1 text-[0.65rem] font-semibold text-olive-deep">Paid</span>
          <span className="flex gap-2">
            <span className="rounded-full px-3 py-1.5 text-[0.65rem] font-semibold ring-1 ring-charcoal/15">Print</span>
            <span className="rounded-full bg-charcoal px-3 py-1.5 text-[0.65rem] font-semibold text-paper">Share</span>
          </span>
        </div>
        <p className="font-mono text-[0.58rem] tracking-[0.14em] text-grey-strong uppercase">Illustrative interface</p>
      </div>
    </div>
  );
}
