import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FaqSection } from "@/components/sections/faq-section";
import { KeralaMap } from "@/components/sections/kerala-map";
import { SocialLinks } from "@/components/layout/social-links";
import { Placeholder } from "@/components/ui/placeholder";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { Reveal } from "@/components/motion/reveal";
import { generalFaqs } from "@/content/company";
import { hasValue, site, telHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us for Steel, Solar & IT Enquiries",
  description:
    "Contact Mindraze Global LLP for steel trading, solar installation, solar materials, website development, digital marketing and NFC product enquiries. Send an enquiry or message us on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  const { phone, email, address, mapEmbedUrl } = site.contact;
  const wa = whatsappHref();
  const cards = [
    {
      icon: <Phone aria-hidden className="size-6" />,
      label: "Call us",
      body: hasValue(phone) ? <a href={telHref(phone.value)} className="hover:underline">{phone.value}</a> : <Placeholder>{phone.placeholder}</Placeholder>,
    },
    {
      icon: <WhatsAppIcon className="size-6" />,
      label: "WhatsApp",
      body: wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:underline">Start a chat</a> : <Placeholder>{site.contact.whatsapp.placeholder}</Placeholder>,
    },
    {
      icon: <Mail aria-hidden className="size-6" />,
      label: "Email",
      body: hasValue(email) ? <a href={`mailto:${email.value}`} className="break-all hover:underline">{email.value}</a> : <Placeholder>{email.placeholder}</Placeholder>,
    },
    {
      icon: <MapPin aria-hidden className="size-6" />,
      label: "Office",
      body: hasValue(address) ? <span className="whitespace-pre-line">{address.value}</span> : <Placeholder>{address.placeholder}</Placeholder>,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        titleLines={["Let's talk about", "your requirement."]}
        description="Steel, solar or digital: choose your enquiry type below and our team will get back to you. Prefer to chat? Message us on WhatsApp."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]}
      >
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.label} delay={i * 80} className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-white/5 p-6 ring-1 ring-white/10">
              <span className="grid size-12 place-items-center rounded-2xl bg-olive text-ink">{c.icon}</span>
              <div>
                <p className="eyebrow text-paper/50">{c.label}</p>
                <div className="mt-2 font-semibold">{c.body}</div>
              </div>
            </Reveal>
          ))}
        </ul>
      </PageHero>

      <EnquirySection
        id="enquiry"
        variant="contact"
        eyebrow="Send an enquiry"
        titleLines={["How can we", "help you?"]}
        lead="Select the relevant business vertical and the form adapts to collect exactly what our team needs."
        whatsappMessage="Hello Mindraze Global, I'd like to make an enquiry."
        points={["General business enquiries", "Steel trading, solar installation and solar materials", "Website development, digital marketing and NFC products", "Billing software: myBillBook, Vyapar, Tally, MargBooks and SpotERP"]}
      />

      <section data-theme="light" aria-labelledby="visit-title" className="section-y bg-paper">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-olive-deep">Find us</p>
            <h2 id="visit-title" className="mt-6 text-h2">
              Serving Kerala and beyond.
            </h2>
            <p className="mt-6 text-lead whitespace-pre-line text-grey-strong">
              {hasValue(address) ? address.value : "Our office address will be published here once confirmed."}
            </p>
            <div className="mt-10">
              <p className="eyebrow text-grey-strong">Follow us</p>
              <SocialLinks tone="light" className="mt-4" />
            </div>
          </div>
          <div className="lg:col-span-7">
            {mapEmbedUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-charcoal/10">
                <iframe src={mapEmbedUrl} title={`${site.legalName} office location on Google Maps`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" allowFullScreen />
              </div>
            ) : (
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--radius-panel)] bg-charcoal p-8 text-paper">
                <KeralaMap idPrefix="contact" showLabels={false} className="w-full max-w-sm opacity-70" />
                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-ink/80 p-5 ring-1 ring-white/10 backdrop-blur">
                  <p className="font-semibold">Google Maps location</p>
                  <p className="mt-1 text-sm text-paper/65">The interactive map will appear here once the office address is provided (set NEXT_PUBLIC_MAP_EMBED_URL).</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FaqSection id="contact-faq" faqs={generalFaqs} title="Before you get in touch" />
    </>
  );
}
