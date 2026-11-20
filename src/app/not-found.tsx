import type { Metadata } from "next";
import { BrandMask } from "@/components/brand/brand-mask";
import { ButtonLink } from "@/components/ui/button";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section data-theme="dark" className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper">
      <BrandMask asset="mark" className="pointer-events-none absolute -right-20 bottom-0 -z-10 w-[min(60rem,110vw)] max-w-none text-olive/[0.08]" />
      <div className="container-x py-40">
        <p className="eyebrow text-olive">Error 404</p>
        <h1 className="mt-6 text-h1">This page wandered off.</h1>
        <p className="mt-6 max-w-xl text-lead text-paper/70">The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of our businesses instead.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">Back to home</ButtonLink>
          {verticals.map((v) => (
            <ButtonLink key={v.id} href={v.href} size="lg" variant="outline-light">
              {v.shortName}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
