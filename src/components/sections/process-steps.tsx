import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function ProcessSteps({ id, eyebrow, title, steps, tone = "light" }: { id: string; eyebrow: string; title: string; steps: { title: string; summary: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section id={id} data-theme={tone} aria-labelledby={`${id}-title`} className={cn("section-y", dark ? "bg-ink text-paper" : "bg-paper text-charcoal")}>
      <div className="container-x">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} tone={tone} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className={cn("relative flex min-h-64 flex-col justify-between p-7", dark ? "bg-graphite" : "bg-white")}>
              <span className={cn("text-6xl font-semibold tracking-tight", dark ? "text-paper/10" : "text-charcoal/10")}>0{i + 1}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className={cn("mt-2 leading-relaxed", dark ? "text-paper/65" : "text-grey-strong")}>{s.summary}</p>
              </div>
              <span aria-hidden className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-olive transition-transform duration-700 [li.is-in_&]:scale-x-100" style={{ transitionDelay: `${300 + i * 150}ms` }} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
