import { Fragment, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { InView } from "./in-view";

type Line = string | { text: string; className?: string };

type SplitTextProps = {
  /** Text, or an array of lines rendered as blocks. */
  text?: string;
  lines?: Line[];
  as?: ElementType;
  className?: string;
  /** "scroll" reveals when in view; "auto" animates on first paint (above the fold). */
  mode?: "scroll" | "auto";
  delay?: number;
  id?: string;
};

/**
 * Word-by-word masked reveal. Words stay real text in the DOM (SEO + screen readers);
 * the animation is pure CSS (see globals.css), so it costs no JavaScript.
 */
export function SplitText({ text, lines, as: Tag = "h2", className, mode = "scroll", delay = 0, id }: SplitTextProps) {
  const all: Line[] = lines ?? [text ?? ""];
  let i = 0;
  return (
    <Wrapper as={Tag} id={id} data-split={mode === "auto" ? "auto" : ""} className={className} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {all.map((line, li) => {
        const { text: t, className: lc } = typeof line === "string" ? { text: line, className: undefined } : line;
        const ws = t.split(/\s+/).filter(Boolean);
        return (
          <span key={li} className={cn(lines ? "block" : "inline", lc)}>
            {ws.map((w, wi) => (
              <Fragment key={wi}>
                <span className="w">
                  <span style={{ "--i": i++ } as CSSProperties}>{w}</span>
                </span>
                {wi < ws.length - 1 ? " " : null}
              </Fragment>
            ))}
            {lines && li < all.length - 1 ? " " : null}
          </span>
        );
      })}
    </Wrapper>
  );
}

/** Scroll-mode headings need the client observer; auto-mode ones render as plain server markup. */
function Wrapper({ as: Tag, ...props }: { as: ElementType } & Record<string, unknown>) {
  if (props["data-split"] === "auto") return <Tag {...props} />;
  return <InView as={Tag} {...props} />;
}
