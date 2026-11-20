import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand artwork rendered as a CSS mask over the original logo SVG files in /public/brand.
 * The shape is the supplied artwork (never redrawn); colour comes from `currentColor`,
 * so it adapts to light/dark sections. Keeps long path data out of every page's HTML.
 */
const assets = {
  lockup: { src: "/brand/mindraze-lockup.svg", ratio: 4.6499 },
  mark: { src: "/brand/mindraze-mark.svg", ratio: 1.3942 },
  full: { src: "/brand/mindraze-logo.svg", ratio: 1.1507 },
  wordmark: { src: "/brand/mindraze-wordmark.svg", ratio: 7.3707 },
} as const;

export type BrandAsset = keyof typeof assets;

export function BrandMask({ asset, className, label, style }: { asset: BrandAsset; className?: string; label?: string; style?: CSSProperties }) {
  const a = assets[asset];
  const mask = `url(${a.src}) center / contain no-repeat`;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("brand-mask inline-block bg-current align-middle", className)}
      style={{ aspectRatio: a.ratio, WebkitMask: mask, mask, ...style }}
    />
  );
}
