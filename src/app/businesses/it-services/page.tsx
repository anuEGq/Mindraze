import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, ChartLine, Check, Clapperboard, Database, Factory, GraduationCap, Headphones, LayoutDashboard, Megaphone, Palette, PenTool, Plug, Search, Share2, ShoppingCart, Video, Workflow, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { FaqSection } from "@/components/sections/faq-section";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { OtherVerticals } from "@/components/sections/other-verticals";
import { CtaBand } from "@/components/sections/cta-band";
import { CodeMock, DashboardMock, InvoiceMock, ProfileMock, SocialPostMock, VideoPreviewMock, WebsiteMock } from "@/components/it/ui-mockups";
import { NfcCardFlip } from "@/components/it/nfc-card-flip";
import { TapDemo } from "@/components/it/tap-demo";
import { WebPillars } from "@/components/it/web-pillars";
import { EnquireButton } from "@/components/forms/enquire-button";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { billingServices, billingSoftware, itFaqs, marketingServices, nfcCardFeatures, reviewStandFeatures, webAppCapabilities, websiteServices } from "@/content/it";
import { media } from "@/content/media";
import { buildMetadata, serviceSchema } from "@/lib/seo";

const path = "/businesses/it-services";

export const metadata: Metadata = buildMetadata({
  title: "Websites, Digital Marketing, NFC & Billing Software",
  description:
    "Website development company in Kerala: business, corporate and e-commerce websites, custom web applications, digital marketing and SEO, NFC review stands and visiting cards, plus sales, support and training for myBillBook, Vyapar, Tally, MargBooks and SpotERP.",
  path,
  image: "/og/it-services.png",
  keywords: [
    "website development company Kerala",
    "e-commerce website development",
    "custom web application development",
    "digital marketing services Kerala",
    "SEO services",
    "social media management",
    "NFC review stands",
    "NFC business visiting cards",
    "QR code digital visiting cards",
    "Tally software sales and support",
    "Tally training",
    "Vyapar billing software",
    "myBillBook billing software",
    "MargBooks billing software",
    "SpotERP billing software",
    "billing software Kerala",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Our Businesses", path: "/businesses" },
  { name: "IT Services", path },
];

const nav = [
  { id: "websites", label: "Websites" },
  { id: "web-apps", label: "Web Apps" },
  { id: "marketing", label: "Marketing" },
  { id: "review-stands", label: "Review Stands" },
  { id: "nfc-cards", label: "NFC Cards" },
  { id: "billing-software", label: "Billing Software" },
  { id: "it-faq", label: "FAQ" },
  { id: "it-enquiry", label: "Enquiry" },
];

const icons: Record<string, LucideIcon> = { LayoutDashboard, ChartLine, Workflow, Factory, Database, Plug, Share2, Search, PenTool, Clapperboard, Video, Palette, Megaphone, ShoppingCart, Headphones, GraduationCap };

function HeroMockups() {
  return (
    <div aria-hidden className="relative mt-16 h-[22rem] sm:h-[28rem] lg:mt-20 lg:h-[34rem]">
      <div className="absolute inset-x-0 top-0 mx-auto w-[min(100%,52rem)]" data-animate="fade-up" style={{ "--delay": "550ms" } as CSSProperties}>
        <WebsiteMock />
      </div>
      <Parallax speed={0.25} className="absolute top-24 -left-2 hidden w-72 sm:block lg:left-[4%] lg:w-80">
        <DashboardMock />
      </Parallax>
      <Parallax speed={0.4} className="absolute top-16 right-0 w-36 sm:w-44 lg:right-[6%] lg:w-52">
        <ProfileMock />
      </Parallax>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

export default function ItServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="03 · IT Services & Digital Solutions"
        titleLines={["Digital Ideas.", "Intelligent Solutions.", "Measurable Growth."]}
        titleClassName="lg:text-[clamp(4rem,6.2vw,6.25rem)]"
        description="We help businesses build their digital presence through websites, custom applications, digital marketing and innovative NFC-powered solutions."
        crumbs={crumbs}
        background={
          <>
            <div aria-hidden className="tech-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
            <div aria-hidden className="absolute top-1/3 left-1/2 size-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(185_188_93/0.16),transparent_60%)]" />
          </>
        }
        actions={
          <>
            <Magnetic>
              <ButtonLink href="#it-enquiry" size="lg">Start a Project</ButtonLink>
            </Magnetic>
            <ButtonLink href="#websites" size="lg" variant="outline-light">Explore services</ButtonLink>
          </>
        }
      >
        <HeroMockups />
      </PageHero>

      <div className="relative bg-paper">
        <SectionNav items={nav} />

        <section id="websites" data-theme="light" aria-labelledby="websites-title" className="pt-16 pb-24 lg:pb-32">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading id="websites-title" eyebrow="A · Website development" titleLines={["Websites that work", "as hard as you do."]} />
              <Reveal as="p" delay={150} className="max-w-md text-grey-strong">
                Every site is built around responsive design, user experience, performance and search engine optimisation, so it looks
                good, loads fast and brings in enquiries.
              </Reveal>
            </div>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
              {websiteServices.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 80} className="group relative bg-white p-7 transition-colors duration-500 hover:bg-charcoal hover:text-paper">
                  <span className="font-mono text-xs text-grey-strong group-hover:text-olive">0{i + 1}</span>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey-strong group-hover:text-paper/70">{s.summary}</p>
                  <EnquireButton detail={{ interest: "Website development" }} label={`Enquire about ${s.title}`} className="absolute top-6 right-6 grid size-10 place-items-center rounded-full ring-1 ring-charcoal/10 transition-colors group-hover:bg-olive group-hover:text-ink group-hover:ring-olive">
                    <ArrowUpRight aria-hidden className="size-4" />
                  </EnquireButton>
                </Reveal>
              ))}
            </ul>
            <div className="mt-6">
              <WebPillars />
            </div>
          </div>
        </section>

        <section id="web-apps" data-theme="dark" aria-labelledby="web-apps-title" className="grain relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
          <div aria-hidden className="tech-grid absolute inset-0 opacity-60" />
          <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="web-apps-title"
                tone="dark"
                eyebrow="B · Custom web applications"
                titleLines={["Technology Built", "Around Your Business."]}
                lead="Custom web applications designed to streamline operations, improve productivity and solve industry-specific business challenges."
              />
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {webAppCapabilities.map((c, i) => {
                  const Icon = icons[c.icon];
                  return (
                    <Reveal as="li" key={c.title} delay={i * 60} className="flex gap-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-olive text-ink">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold">{c.title}</span>
                        <span className="mt-0.5 block text-sm text-paper/60">{c.summary}</span>
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
            <div className="relative lg:col-span-7">
              <Reveal variant="scale">
                <DashboardMock />
              </Reveal>
              <Parallax speed={0.2} className="relative z-10 -mt-16 ml-auto w-[85%] sm:-mt-24">
                <CodeMock />
              </Parallax>
            </div>
          </div>
        </section>

        <section id="marketing" data-theme="light" aria-labelledby="marketing-title" className="bg-paper py-24 lg:py-32">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading id="marketing-title" eyebrow="C · Digital marketing" titleLines={["Creative that gets noticed.", "Campaigns that get results."]} />
              <Reveal as="p" delay={150} className="max-w-sm text-grey-strong">
                Strategy, content and creative under one roof, from social media management and SEO to promotional and advertising videos.
              </Reveal>
            </div>
            <div className="mt-14 grid auto-rows-[minmax(10rem,auto)] gap-4 md:grid-cols-6 lg:grid-cols-12">
              <Reveal className="relative overflow-hidden rounded-[var(--radius-card)] md:col-span-3 md:row-span-2 lg:col-span-4">
                <Image src={media.it.socialFeed.src} alt={media.it.socialFeed.alt} fill placeholder="blur" sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.14em] uppercase">Social media management</span>
              </Reveal>
              <Reveal delay={80} className="md:col-span-3 lg:col-span-5">
                <VideoPreviewMock label="Promotional video" />
              </Reveal>
              <Reveal delay={160} className="grid grid-cols-2 gap-4 md:col-span-6 lg:col-span-3 lg:row-span-2 lg:grid-cols-1">
                <SocialPostMock variant={0} />
                <SocialPostMock variant={2} />
              </Reveal>
              <Reveal delay={120} className="grid gap-4 sm:grid-cols-2 md:col-span-3 lg:col-span-5">
                <VideoPreviewMock label="Ad creative" className="aspect-[4/3]" />
                <SocialPostMock variant={1} />
              </Reveal>
            </div>
            <p className="mt-4 font-mono text-[0.68rem] tracking-[0.14em] text-grey-strong uppercase">Concept creatives shown for illustration</p>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {marketingServices.map((m, i) => {
                const Icon = icons[m.icon];
                return (
                  <Reveal as="li" key={m.title} delay={(i % 4) * 60} className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/[0.07]">
                    <Icon aria-hidden className="size-5 text-olive-deep" />
                    <h3 className="mt-4 font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm text-grey-strong">{m.summary}</p>
                  </Reveal>
                );
              })}
              <li className="flex items-center rounded-2xl bg-charcoal p-5 text-paper">
                <EnquireButton detail={{ interest: "Digital marketing" }} className="group flex w-full items-center justify-between gap-4 text-left font-semibold">
                  Plan a campaign with us
                  <span aria-hidden className="grid size-10 place-items-center rounded-full bg-olive text-ink">
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </EnquireButton>
              </li>
            </ul>
          </div>
        </section>

        <section id="review-stands" data-theme="light" aria-labelledby="review-stands-title" className="relative overflow-hidden bg-olive-light py-24 lg:py-32">
          <div className="container-x grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                id="review-stands-title"
                eyebrow="D · NFC & QR smart review stands"
                titleLines={["Turn Every Customer", "Experience Into a", "Review Opportunity."]}
                lead="Pre-designed NFC-enabled and QR-powered review stands that make it easier for customers to access your business review platforms."
              />
              <ul className="mt-10 grid gap-3">
                {reviewStandFeatures.map((f, i) => (
                  <Reveal as="li" key={f.title} delay={i * 60} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-charcoal text-olive">
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    <span>
                      <span className="font-semibold">{f.title}.</span> <span className="text-grey-strong">{f.summary}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={300} className="mt-10">
                <EnquireButton detail={{ interest: "NFC review stand" }} className="group inline-flex h-13 items-center gap-3 rounded-full bg-charcoal pr-2 pl-6 font-semibold text-paper hover:bg-ink">
                  Order review stands
                  <span aria-hidden className="grid size-9 place-items-center rounded-full bg-olive text-ink">
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </EnquireButton>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <TapDemo />
              <p className="mt-10 text-center font-mono text-[0.68rem] tracking-[0.14em] text-olive-deep uppercase">Illustrative mockup · custom branding available</p>
            </div>
          </div>
        </section>

        <section id="nfc-cards" data-theme="dark" aria-labelledby="nfc-cards-title" className="grain relative overflow-hidden bg-charcoal py-24 text-paper lg:py-32">
          <div className="container-x grid items-center gap-16 lg:grid-cols-12">
            <div className="order-2 grid items-center gap-10 sm:grid-cols-[1.4fr_1fr] lg:order-1 lg:col-span-7">
              <NfcCardFlip />
              <div className="mx-auto w-48 sm:w-full">
                <ProfileMock />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <SectionHeading
                id="nfc-cards-title"
                tone="dark"
                eyebrow="E · NFC digital visiting cards"
                titleLines={["Your Professional Identity.", "One Smart Tap."]}
                lead="Smart NFC-enabled visiting cards featuring a printed QR code that directs users to a personalised digital profile or professional resume presented as a static web page."
              />
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {nfcCardFeatures.map((f, i) => (
                  <Reveal as="li" key={f.title} delay={i * 60} className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                    <span className="font-semibold">{f.title}</span>
                    <span className="mt-1 block text-sm text-paper/60">{f.summary}</span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={300} className="mt-10">
                <EnquireButton detail={{ interest: "NFC digital visiting card" }} className="group inline-flex h-13 items-center gap-3 rounded-full bg-olive pr-2 pl-6 font-semibold text-ink hover:bg-olive-mid">
                  Get your NFC card
                  <span aria-hidden className="grid size-9 place-items-center rounded-full bg-ink text-olive">
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </EnquireButton>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="billing-software" data-theme="light" aria-labelledby="billing-software-title" className="bg-paper py-24 lg:py-32">
          <div className="container-x">
            <div className="grid items-center gap-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <SectionHeading
                  id="billing-software-title"
                  eyebrow="F · Billing & accounting software"
                  titleLines={["Billing and accounting,", "set up the right way."]}
                  lead="Sales, support and training for myBillBook, Vyapar, Tally, MargBooks and SpotERP, so your team can bill, track stock and manage accounts with confidence."
                />
                <ul className="mt-10 grid gap-3">
                  {billingServices.map((b, i) => {
                    const Icon = icons[b.icon];
                    return (
                      <Reveal as="li" key={b.title} delay={i * 80} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-charcoal/[0.07]">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-charcoal text-olive">
                          <Icon aria-hidden className="size-5" />
                        </span>
                        <span>
                          <span className="block text-lg font-semibold tracking-tight">{b.title}</span>
                          <span className="mt-1 block text-grey-strong">{b.summary}</span>
                        </span>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
              <div className="relative lg:col-span-6">
                <Reveal variant="scale" className="relative mx-auto max-w-lg">
                  <InvoiceMock />
                  <ul aria-label="Software we work with" className="absolute -top-5 -left-3 flex flex-wrap gap-2 sm:-left-6">
                    {billingSoftware.map((sw) => (
                      <li key={sw.name} className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-paper shadow-lg">
                        {sw.name}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
            <ul className="mt-16 grid gap-4 md:grid-cols-3">
              {billingSoftware.map((sw, i) => (
                <Reveal as="li" key={sw.name} delay={i * 90} className="flex flex-col rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-charcoal/[0.07]">
                  <span aria-hidden className="grid size-14 place-items-center rounded-2xl bg-olive-light text-lg font-semibold text-olive-deep">
                    {sw.name.slice(0, 2)}
                  </span>
                  <h3 className="mt-6 text-h3">{sw.name}</h3>
                  <p className="mt-2 leading-relaxed text-grey-strong">{sw.summary}</p>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold">Good for:</span> <span className="text-grey-strong">{sw.bestFor}</span>
                  </p>
                  <p className="mt-4 flex flex-wrap gap-1.5" aria-label="Services offered">
                    {["Sales", "Support", "Training"].map((t) => (
                      <span key={t} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium ring-1 ring-charcoal/10">
                        {t}
                      </span>
                    ))}
                  </p>
                  <div className="mt-auto pt-6">
                    <EnquireButton
                      detail={{ interest: sw.name }}
                      label={`Enquire about ${sw.name}`}
                      className="group/e inline-flex h-11 w-full items-center justify-between rounded-full bg-charcoal pr-1.5 pl-5 text-sm font-semibold text-paper transition-colors hover:bg-ink"
                    >
                      Enquire about {sw.name}
                      <span aria-hidden className="grid size-8 place-items-center rounded-full bg-olive text-ink">
                        <ArrowUpRight className="size-4 transition-transform group-hover/e:translate-x-0.5 group-hover/e:-translate-y-0.5" />
                      </span>
                    </EnquireButton>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-sm text-grey-strong">
              myBillBook, Vyapar, Tally, MargBooks and SpotERP are trademarks of their respective owners. Pricing and plans are confirmed when you enquire.
            </p>
          </div>
        </section>

        <CtaBand
          eyebrow="IT services"
          titleLines={["Let's Build Your", "Digital Future."]}
          text="Tell us what you need, from a new website or custom application to a campaign, NFC products or billing software, and we'll take it from there."
          primary={{ label: "Start a Project", href: "#it-enquiry" }}
          secondary={{ label: "Request a Consultation", enquire: { interest: "Not sure yet" } }}
        />

        <FaqSection id="it-faq" faqs={itFaqs} title="IT services questions" />

        <EnquirySection
          id="it-enquiry"
          variant="it"
          eyebrow="Start a project"
          titleLines={["Tell us about", "your project."]}
          lead="Choose a service and share a few details. We'll get back to you to discuss scope and next steps."
          whatsappMessage="Hello Mindraze Global, I'd like to discuss a digital project. Service: "
          points={["Websites and e-commerce", "Custom web applications", "Digital marketing", "NFC review stands and visiting cards", "myBillBook, Vyapar, Tally, MargBooks and SpotERP: sales, support and training"]}
        />
      </div>

      <OtherVerticals current="it" />

      <JsonLd
        data={serviceSchema({
          name: "IT Services & Digital Solutions",
          serviceType: "Website development, web applications, digital marketing, NFC solutions and billing software",
          description: "Website development, custom web application development, digital marketing, NFC and QR review stands, NFC digital visiting cards, and sales, support and training for myBillBook, Vyapar, Tally, MargBooks and SpotERP.",
          path,
          offers: [...websiteServices.map((s) => s.title), ...webAppCapabilities.map((s) => s.title), ...marketingServices.map((s) => s.title), "NFC & QR Smart Review Stands", "NFC Digital Visiting Cards", ...billingSoftware.map((b) => `${b.name} sales, support and training`)],
        })}
      />
    </>
  );
}
