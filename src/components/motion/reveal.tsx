import type { CSSProperties, ElementType, ReactNode } from "react";
import { InView } from "./in-view";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "scale" | "left" | "right";
  id?: string;
} & Record<string, unknown>;

/** Fades/slides content in when it scrolls into view (CSS + shared observer). */
export function Reveal({ as: Tag = "div", children, className, delay = 0, variant = "up", ...rest }: RevealProps) {
  return (
    <InView as={Tag} data-reveal={variant === "up" ? "" : variant} className={className} style={{ "--delay": `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </InView>
  );
}

/** Clip-path mask reveal for images and media blocks. */
export function MaskReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "top" | "left" | "right";
}) {
  const inset = { bottom: "100% 0 0 0", top: "0 0 100% 0", left: "0 100% 0 0", right: "0 0 0 100%" }[from];
  return (
    <InView data-mask="" className={className} style={{ "--delay": `${delay}ms`, "--mask-from": inset } as CSSProperties}>
      {children}
    </InView>
  );
}
