import { site } from "@/content/site";

export const DEFAULT_WHATSAPP_MESSAGE = `Hello ${site.name}, I would like to make an enquiry.`;

/** wa.me deep link, or null while the WhatsApp number has not been configured. */
export function whatsappHref(message = DEFAULT_WHATSAPP_MESSAGE): string | null {
  const number = site.contact.whatsapp.value;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Fallback destination used until a WhatsApp number is configured. */
export const WHATSAPP_FALLBACK = "/contact#enquiry";
