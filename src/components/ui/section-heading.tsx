import type { ReactNode } from "react";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  index?: string;
  /** Plain title, or use titleLines for explicit line breaks. */
  title?: string;
  titleLines?: string[];
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  id?: string;
};

/** Eyebrow + split-reveal heading + optional lead paragraph. `tone` is the background tone. */
export function SectionHeading({ eyebrow, index, title, titleLines, lead, as = "h2", align = "left", tone = "light", className, titleClassName, id }: Props) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal as="p" className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center", tone === "dark" ? "text-olive" : "text-olive-deep")}>
          {index && <span className={tone === "dark" ? "text-paper/40" : "text-grey-strong"}>{index}</span>}
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </Reveal>
      )}
      <SplitText as={as} id={id} text={titleLines ? undefined : title} lines={titleLines} className={cn("mt-6 text-h2", titleClassName)} />
      {lead && (
        <Reveal delay={150} className={cn("mt-6 max-w-2xl text-lead", align === "center" && "mx-auto", tone === "dark" ? "text-paper/70" : "text-grey-strong")}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}
