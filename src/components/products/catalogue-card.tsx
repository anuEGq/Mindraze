import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductVisual } from "./product-visual";
import type { Photo } from "@/content/media";
import type { VisualKind } from "@/content/types";
import { cn } from "@/lib/utils";

/** Compact catalogue entry linking to its detail section and to a pre-filled enquiry. */
export function CatalogueCard({
  title,
  summary,
  meta,
  href,
  enquireHref,
  visual,
  photo,
  tone = "light",
}: {
  title: string;
  summary: string;
  meta?: string;
  href: string;
  enquireHref: string;
  visual?: VisualKind;
  photo?: Photo;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] ring-1 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1", dark ? "bg-graphite text-paper ring-white/10" : "bg-white text-charcoal ring-charcoal/[0.07]")}>
      {(visual || photo) && (
        <div className={cn("relative aspect-[16/10] overflow-hidden", dark ? "tech-grid bg-ink" : "tech-grid-light bg-paper")}>
          {photo ? (
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <ProductVisual kind={visual!} tone={tone} title={title} className="absolute inset-5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {meta && <p className={cn("eyebrow", dark ? "text-olive" : "text-olive-deep")}>{meta}</p>}
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-paper/65" : "text-grey-strong")}>{summary}</p>
        <div className="relative z-10 mt-auto pt-5">
          <Link href={enquireHref} aria-label={`Enquire about ${title}`} className={cn("inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors", dark ? "bg-olive text-ink hover:bg-olive-mid" : "bg-charcoal text-paper hover:bg-ink")}>
            Enquire <ArrowUpRight aria-hidden className={cn("size-4", dark ? "text-ink" : "text-olive")} />
          </Link>
        </div>
      </div>
    </article>
  );
}
