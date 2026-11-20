import Image from "next/image";
import type { Product, VisualKind } from "@/content/types";
import { visualSrc } from "./scene-svg";
import { cn } from "@/lib/utils";

/**
 * Technical illustration of a product (served as a static SVG file so pages stay light),
 * or the genuine product photo when one is provided in the catalogue data.
 */
export function ProductVisual({
  kind,
  photo,
  className,
  tone = "light",
  title,
  eager,
}: {
  kind: VisualKind;
  photo?: Product["photo"];
  className?: string;
  tone?: "light" | "dark";
  title?: string;
  eager?: boolean;
}) {
  if (photo) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("relative", className)}>
      <Image
        src={visualSrc(kind, tone)}
        alt={title ? `Illustration of ${title}` : ""}
        fill
        unoptimized
        loading={eager ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-contain"
      />
    </div>
  );
}
