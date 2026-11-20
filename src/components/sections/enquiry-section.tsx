import { Check } from "lucide-react";
import { ContactDetails } from "@/components/layout/contact-details";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonAnchor, ButtonIcon, ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { whatsappHref } from "@/lib/whatsapp";
import type { EnquiryType } from "@/lib/enquiry/schema";

type Props = {
  id: string;
  variant: EnquiryType | "contact";
  eyebrow: string;
  titleLines: string[];
  lead: string;
  whatsappMessage: string;
  points?: string[];
  /** Make the WhatsApp call-to-action more prominent (solar). */
  whatsappFirst?: boolean;
};

/** Enquiry block: context + WhatsApp hand-off on the left, validated form on the right. */
export function EnquirySection({ id, variant, eyebrow, titleLines, lead, whatsappMessage, points = [], whatsappFirst }: Props) {
  const wa = whatsappHref(whatsappMessage);
  const waButton = wa ? (
    <ButtonAnchor href={wa} target="_blank" rel="noopener noreferrer" size="lg" variant={whatsappFirst ? "primary" : "outline-light"} icon={<ButtonIcon variant={whatsappFirst ? "primary" : "outline-light"} size="lg"><WhatsAppIcon className="size-5" /></ButtonIcon>}>
      Enquire on WhatsApp
    </ButtonAnchor>
  ) : (
    <ButtonLink href={`#${id}-form`} size="lg" variant="outline-light" icon={<ButtonIcon variant="outline-light" size="lg"><WhatsAppIcon className="size-5" /></ButtonIcon>}>
      WhatsApp (number to be added)
    </ButtonLink>
  );
  return (
    <section id={id} data-theme="dark" aria-labelledby={`${id}-title`} className="grain relative isolate overflow-hidden bg-charcoal text-paper">
      <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(185_188_93/0.12),transparent_65%)]" />
      <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal as="p" className="eyebrow flex items-center gap-3 text-olive">
              <span aria-hidden className="h-px w-8 bg-current" /> {eyebrow}
            </Reveal>
            <SplitText id={`${id}-title`} lines={titleLines} className="mt-6 text-h2" />
            <Reveal as="p" delay={120} className="mt-6 max-w-md text-lead text-paper/70">
              {lead}
            </Reveal>
            {points.length > 0 && (
              <Reveal as="ul" delay={180} className="mt-8 grid gap-3 text-paper/80">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-olive text-ink">
                      <Check aria-hidden className="size-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </Reveal>
            )}
            <Reveal delay={240} className="mt-10">
              {waButton}
            </Reveal>
            <Reveal delay={300} className="mt-12 border-t border-white/10 pt-8">
              <p className="eyebrow text-paper/50">Or reach us directly</p>
              <ContactDetails className="mt-5 text-paper/80" />
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm variant={variant} id={`${id}-form`} />
        </div>
      </div>
    </section>
  );
}
