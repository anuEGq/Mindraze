import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { faqSchema } from "@/lib/seo";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

/** Expandable FAQs (native details/summary: keyboard and screen-reader friendly, works without JS). */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "FAQ",
  tone = "light",
  className,
  id = "faq",
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  tone?: "dark" | "light";
  className?: string;
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <section id={id} data-theme={tone} aria-labelledby={`${id}-title`} className={cn("section-y", dark ? "bg-charcoal text-paper" : "bg-paper text-charcoal", className)}>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} tone={tone} className="lg:sticky lg:top-32" />
        </div>
        <div className="lg:col-span-7">
          <ul className={cn("border-t", dark ? "border-white/10" : "border-charcoal/10")}>
            {faqs.map((f, i) => (
              <Reveal as="li" key={f.q} delay={i * 60} className={cn("border-b", dark ? "border-white/10" : "border-charcoal/10")}>
                <details className="acc group" name={`${id}-faq`}>
                  <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold tracking-tight sm:text-xl">
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45",
                        dark ? "ring-white/20 group-open:bg-olive group-open:text-ink" : "ring-charcoal/15 group-open:bg-charcoal group-open:text-paper",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className={cn("max-w-2xl pr-14 pb-7 leading-relaxed", dark ? "text-paper/70" : "text-grey-strong")}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
