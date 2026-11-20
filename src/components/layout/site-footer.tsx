import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { BrandMask } from "@/components/brand/brand-mask";
import { ContactDetails } from "./contact-details";
import { SocialLinks } from "./social-links";
import { legalLinks, mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { verticals } from "@/content/verticals";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="grain relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-x relative z-10 pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Mindraze Global LLP – Home" className="inline-block rounded-lg">
              <BrandMask asset="full" className="h-28 text-paper sm:h-32" />
            </Link>
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-mist">
              {site.legalName} is a diversified business organisation delivering quality steel materials, complete solar
              solutions and innovative digital services. One company, three verticals, one commitment to doing things right.
            </p>
          </div>

          <nav aria-label="Our businesses" className="lg:col-span-3">
            <p className="eyebrow text-olive">Our Businesses</p>
            <ul className="mt-6 grid gap-3">
              {verticals.map((v) => (
                <li key={v.id}>
                  <Link href={v.href} className="group inline-flex items-baseline gap-3 text-lg font-medium text-paper/90 hover:text-paper">
                    <span className="eyebrow text-paper/40">{v.index}</span>
                    <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-olive">{v.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <p className="eyebrow text-olive">Quick Links</p>
            <ul className="mt-6 grid gap-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/75 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact#enquiry" className="inline-flex items-center gap-1 text-paper/75 transition-colors hover:text-paper">
                  Get a Quote <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-olive">Contact</p>
            <ContactDetails className="mt-6 text-paper/80" />
            <SocialLinks className="mt-8" />
          </div>
        </div>

        {/* Oversized wordmark (from the supplied logo) */}
        <BrandMask asset="wordmark" className="mt-20 block w-full text-olive/[0.09] lg:mt-28" />

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {site.legalName}. All rights reserved.
          </p>
          <p className="eyebrow text-paper/50">{site.tagline}</p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
