import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductVisual } from "@/components/products/product-visual";
import { DashboardMock, InvoiceMock, NfcCardMock, ReviewStandMock, SocialPostMock, WebsiteMock } from "@/components/it/ui-mockups";
import { SectionHeading } from "@/components/ui/section-heading";
import { FitScale } from "@/components/ui/fit-scale";
import { ShowcaseGrid } from "./showcase-grid";
import { enquireHref, showcase, type ShowcaseItem } from "@/content/showcase";
import { verticalById } from "@/content/verticals";
import { cn } from "@/lib/utils";

function Visual({ item }: { item: ShowcaseItem }) {
  const v = item.visual;
  if (v.type === "product") return <ProductVisual kind={v.kind} className="h-full w-full" />;
  if (v.type === "photo")
    return <Image src={v.photo.src} alt={v.photo.alt} fill placeholder="blur" sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />;
  const mocks = {
    website: [<WebsiteMock key="m" />, 440],
    dashboard: [<DashboardMock key="m" />, 460],
    social: [<SocialPostMock key="m" />, 280],
    "review-stand": [<ReviewStandMock key="m" />, 320],
    "nfc-card": [<NfcCardMock key="m" />, 340],
    invoice: [<InvoiceMock key="m" />, 400],
  } as const;
  const [node, width] = mocks[v.mock];
  return <FitScale width={width}>{node}</FitScale>;
}

export function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const vertical = verticalById(item.vertical);
  const darkVisual = item.vertical === "it";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-charcoal/[0.06] transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(21_21_21/0.35)]">
      <div className={cn("relative aspect-[4/3] overflow-hidden", darkVisual ? "tech-grid bg-ink" : "tech-grid-light bg-paper")}>
        <div className={cn("absolute inset-0", item.visual.type === "product" && "p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]")}>
          <Visual item={item} />
        </div>
        <span className={cn("absolute top-3 left-3 rounded-full px-3 py-1 font-mono text-[0.62rem] tracking-[0.14em] uppercase backdrop-blur", darkVisual ? "bg-white/10 text-paper" : "bg-white/80 text-charcoal ring-1 ring-charcoal/5")}>
          {vertical.index} · {vertical.shortName}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-olive-deep">{item.category}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {item.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-grey-strong">{item.summary}</p>
        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            href={enquireHref(item)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-semibold text-paper transition-colors hover:bg-ink"
            aria-label={`Enquire about ${item.title}`}
          >
            Enquire
            <ArrowUpRight aria-hidden className="size-4 text-olive" />
          </Link>
          <span aria-hidden className="grid size-10 place-items-center rounded-full ring-1 ring-charcoal/10 transition-colors group-hover:bg-olive group-hover:ring-olive">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function HomeShowcase() {
  return (
    <section data-theme="light" aria-labelledby="showcase-title" className="section-y bg-paper">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="showcase-title" eyebrow="Products & Services" titleLines={["Featured Products", "& Services"]} />
          <p className="max-w-sm text-grey-strong">
            A selection from all three verticals. Filter by business, open any item for details, or send an enquiry directly.
          </p>
        </div>
        <div className="mt-12">
          <ShowcaseGrid items={showcase.map((item) => ({ id: item.id, vertical: item.vertical, node: <ShowcaseCard item={item} /> }))} />
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/products-services" className="group inline-flex items-center gap-2 font-semibold underline decoration-charcoal/25 underline-offset-[0.35em] hover:decoration-charcoal">
            View the full products & services catalogue
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
