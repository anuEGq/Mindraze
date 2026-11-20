import { Mail, MapPin, Phone } from "lucide-react";
import { Placeholder } from "@/components/ui/placeholder";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { hasValue, site, telHref } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Phone / email / WhatsApp / address list. Renders labelled placeholders for missing values. */
export function ContactDetails({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { phone, email, whatsapp, address } = site.contact;
  const wa = whatsappHref();
  const icon = cn("mt-0.5 size-5 shrink-0", tone === "dark" ? "text-olive" : "text-olive-deep");
  const row = "flex items-start gap-3";
  return (
    <ul className={cn("grid gap-4 text-[0.95rem]", className)}>
      <li className={row}>
        <Phone aria-hidden className={icon} />
        <span>
          <span className="sr-only">Phone: </span>
          {hasValue(phone) ? <a className="hover:underline" href={telHref(phone.value)}>{phone.value}</a> : <Placeholder>{phone.placeholder}</Placeholder>}
        </span>
      </li>
      <li className={row}>
        <WhatsAppIcon className={icon} />
        <span>
          <span className="sr-only">WhatsApp: </span>
          {wa ? (
            <a className="hover:underline" href={wa} target="_blank" rel="noopener noreferrer">
              +{whatsapp.value}
            </a>
          ) : (
            <Placeholder>{whatsapp.placeholder}</Placeholder>
          )}
        </span>
      </li>
      <li className={row}>
        <Mail aria-hidden className={icon} />
        <span>
          <span className="sr-only">Email: </span>
          {hasValue(email) ? <a className="hover:underline" href={`mailto:${email.value}`}>{email.value}</a> : <Placeholder>{email.placeholder}</Placeholder>}
        </span>
      </li>
      <li className={row}>
        <MapPin aria-hidden className={icon} />
        <span>
          <span className="sr-only">Office address: </span>
          {hasValue(address) ? <span className="whitespace-pre-line">{address.value}</span> : <Placeholder>{address.placeholder}</Placeholder>}
        </span>
      </li>
    </ul>
  );
}
