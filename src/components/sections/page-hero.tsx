import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SplitText } from "@/components/motion/split-text";
import { Parallax } from "@/components/motion/parallax";
import type { Photo } from "@/content/media";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  titleLines: string[];
  description: ReactNode;
  crumbs: Crumb[];
  tone?: "dark" | "light";
  photo?: Photo;
  actions?: ReactNode;
  background?: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Extra content rendered under the hero copy (e.g. quick facts). */
  children?: ReactNode;
};

/** Inner-page hero: breadcrumbs, animated H1, description, optional cinematic photo strip. */
export function PageHero({ eyebrow, titleLines, description, crumbs, tone = "dark", photo, actions, background, className, titleClassName, children }: Props) {
  const dark = tone === "dark";
  return (
    <section
      data-theme={tone}
      className={cn("grain relative isolate overflow-hidden pt-32 lg:pt-40", dark ? "bg-ink text-paper" : "bg-paper text-charcoal", className)}
    >
      {background}
      <div className="container-x relative z-10">
        <Breadcrumbs items={crumbs} className={dark ? "text-paper/85" : "text-charcoal"} />
        <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-animate="fade-up" className={cn("eyebrow", dark ? "text-olive" : "text-olive-deep")}>
              {eyebrow}
            </p>
            <SplitText as="h1" mode="auto" delay={120} lines={titleLines} className={cn("mt-6 text-h1", titleClassName)} />
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <div data-animate="fade-up" style={{ "--delay": "450ms" } as CSSProperties} className={cn("text-lead", dark ? "text-paper/70" : "text-grey-strong")}>
              {description}
            </div>
            {actions && (
              <div data-animate="fade-up" style={{ "--delay": "600ms" } as CSSProperties} className="mt-8 flex flex-wrap gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
      {photo ? (
        <div className="container-x relative z-10 mt-14 pb-0 lg:mt-20">
          <div data-animate="fade-up" style={{ "--delay": "500ms" } as CSSProperties} className="relative aspect-[16/10] overflow-hidden rounded-t-[var(--radius-panel)] sm:aspect-[21/9]">
            <Parallax speed={0.08} className="absolute -inset-y-[10%] inset-x-0">
              <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1440px) 1344px, 100vw" quality={75} fetchPriority="high" loading="eager" className="object-cover" />
            </Parallax>
          </div>
        </div>
      ) : (
        <div className="h-16 lg:h-24" />
      )}
    </section>
  );
}
