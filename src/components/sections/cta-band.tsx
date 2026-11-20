import { BrandMask } from "@/components/brand/brand-mask";
import { Arrow, ButtonLink, buttonClasses } from "@/components/ui/button";
import { EnquireButton } from "@/components/forms/enquire-button";
import type { EnquireDetail } from "@/components/forms/enquiry-events";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

type Action = { label: string; href: string } | { label: string; enquire: EnquireDetail };

export function CtaBand({
  eyebrow = "Let's work together",
  titleLines = ["Have a Project in Mind?", "Let's Build Something Together."],
  text = "Whether you need quality steel materials, complete solar solutions or innovative digital services, Mindraze Global is ready to help.",
  primary = { label: "Discuss Your Requirement", href: "/contact#enquiry" },
  secondary = { label: "Contact Our Team", href: "/contact" },
}: {
  eyebrow?: string;
  titleLines?: string[];
  text?: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <section data-theme="dark" aria-label="Get in touch" className="grain relative isolate overflow-hidden bg-charcoal text-paper">
      <BrandMask asset="mark" className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[min(70rem,140vw)] max-w-none -translate-x-1/2 -translate-y-1/2 text-olive/[0.06]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-olive/40 to-transparent" />
      <div className="container-x section-y relative text-center">
        <Reveal as="p" className="eyebrow text-olive">
          {eyebrow}
        </Reveal>
        <SplitText lines={[titleLines[0], { text: titleLines[1] ?? "", className: "text-olive" }]} className="mx-auto mt-8 max-w-5xl text-h1" />
        <Reveal delay={200} as="p" className="mx-auto mt-8 max-w-2xl text-lead text-paper/70">
          {text}
        </Reveal>
        <Reveal delay={300} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <ActionButton action={primary} variant="primary" />
          </Magnetic>
          <Magnetic>
            <ActionButton action={secondary} variant="outline-light" />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

function ActionButton({ action, variant }: { action: Action; variant: "primary" | "outline-light" }) {
  if ("enquire" in action) {
    return (
      <EnquireButton detail={action.enquire} className={buttonClasses(variant, "lg")}>
        <span>{action.label}</span>
        <Arrow variant={variant} size="lg" />
      </EnquireButton>
    );
  }
  return (
    <ButtonLink href={action.href} size="lg" variant={variant}>
      {action.label}
    </ButtonLink>
  );
}
