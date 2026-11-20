import { ArrowUpRight, Ruler } from "lucide-react";
import { ProductVisual } from "./product-visual";
import { EnquireButton } from "@/components/forms/enquire-button";
import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";

/** Catalogue card: illustration/photo, name, sizes, summary, uses and a same-page enquire action. */
export function ProductCard({ product, interest, className, tone = "light", showSizes = true }: { product: Product; interest: string; className?: string; tone?: "light" | "dark"; showSizes?: boolean }) {
  const dark = tone === "dark";
  return (
    <article className={cn("group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] ring-1", dark ? "bg-graphite text-paper ring-white/10" : "bg-white text-charcoal ring-charcoal/[0.07]", className)}>
      <div className={cn("relative aspect-[4/3] overflow-hidden", dark ? "tech-grid bg-ink" : "tech-grid-light bg-paper")}>
        <ProductVisual
          kind={product.visual}
          photo={product.photo}
          tone={tone}
          title={product.name}
          className="absolute inset-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <span className={cn("absolute top-3 left-3 rounded-full px-3 py-1 font-mono text-[0.62rem] tracking-[0.14em] uppercase", dark ? "bg-white/10 text-paper/80" : "bg-white/85 text-charcoal/80 ring-1 ring-charcoal/5")}>
          Illustration
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
        {product.aka && <p className={cn("mt-0.5 text-sm", dark ? "text-paper/55" : "text-grey-strong")}>{product.aka}</p>}
        <p className={cn("mt-3 leading-relaxed", dark ? "text-paper/70" : "text-grey-strong")}>{product.summary}</p>
        {showSizes && product.sizes && (
          <p className={cn("mt-4 flex items-start gap-2 text-sm", dark ? "text-paper/75" : "text-charcoal/80")}>
            <Ruler aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-olive" : "text-olive-deep")} />
            <span>
              <span className="font-semibold">Sizes:</span> {product.sizes.label}
              {!product.sizes.confirmed && <span className={dark ? "text-paper/50" : "text-grey-strong"}>, availability confirmed on enquiry</span>}
            </span>
          </p>
        )}
        {product.uses && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Typical uses">
            {product.uses.map((u) => (
              <li key={u} className={cn("rounded-full px-2.5 py-1 text-xs font-medium", dark ? "bg-white/5 text-paper/70" : "bg-paper text-charcoal/75 ring-1 ring-charcoal/5")}>
                {u}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-6">
          <EnquireButton
            detail={{ interest }}
            label={`Enquire about this product: ${product.name}`}
            className={cn(
              "group/e inline-flex h-11 w-full items-center justify-between rounded-full pr-1.5 pl-5 text-sm font-semibold transition-colors",
              dark ? "bg-olive text-ink hover:bg-olive-mid" : "bg-charcoal text-paper hover:bg-ink",
            )}
          >
            Enquire about this product
            <span aria-hidden className={cn("grid size-8 place-items-center rounded-full", dark ? "bg-ink text-olive" : "bg-olive text-ink")}>
              <ArrowUpRight className="size-4 transition-transform group-hover/e:translate-x-0.5 group-hover/e:-translate-y-0.5" />
            </span>
          </EnquireButton>
        </div>
      </div>
    </article>
  );
}
