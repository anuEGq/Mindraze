import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite CSS marquee. Content is duplicated once; the copy is hidden from assistive tech. */
export function Marquee({ children, className, duration = 40, reverse = false }: { children: ReactNode; className?: string; duration?: number; reverse?: boolean }) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)} style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
      <div className={cn("flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
