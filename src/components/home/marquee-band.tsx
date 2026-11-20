import { BrandMask } from "@/components/brand/brand-mask";
import { Marquee } from "@/components/motion/marquee";

const items = ["Steel Trading", "Solar Energy Solutions", "IT & Digital Services", "Innovate. Evolve. Lead."];

export function MarqueeBand() {
  return (
    <div data-theme="dark" aria-hidden className="overflow-hidden bg-charcoal py-6 text-paper sm:py-8">
      <Marquee duration={45}>
        {items.map((t) => (
          <span key={t} className="flex items-center gap-8 pr-8 text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-[-0.04em] whitespace-nowrap">
            <span className={t.startsWith("Innovate") ? "text-olive" : undefined}>{t}</span>
            <BrandMask asset="mark" className="w-[clamp(2.5rem,5vw,4.5rem)] text-olive/70" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
