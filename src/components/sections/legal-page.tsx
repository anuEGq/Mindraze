import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Info } from "lucide-react";

/** Long-form legal layout with a clearly labelled template notice. */
export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <section data-theme="light" className="bg-paper pt-36 pb-24 lg:pt-44">
      <div className="container-x">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title, path }]} className="text-charcoal" />
        <h1 className="mt-10 text-h1">{title}</h1>
        <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl bg-olive-light p-5 text-sm text-charcoal">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-olive-deep" />
          <span>
            <strong>Template notice:</strong> this page is a starting template and must be reviewed and completed by Mindraze Global LLP
            (and a legal adviser) before the website is published. Last updated: <em>[date to be confirmed]</em>.
          </span>
        </p>
        <div className="mt-14 max-w-3xl space-y-10 text-[1.05rem] leading-relaxed text-grey-strong [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-charcoal [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </section>
  );
}
