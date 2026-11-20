import type { SVGProps } from "react";
import type { SocialName } from "@/content/site";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function FacebookIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M15 3.5h-2.4A3.6 3.6 0 0 0 9 7.1V10H6.5v3.4H9v7.1h3.4v-7.1h2.7l.6-3.4h-3.3V7.6c0-.6.5-1 1-1H15z" />
    </svg>
  );
}
export function InstagramIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function LinkedInIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8.2 10.5v6M8.2 7.6v.01M11.8 16.5v-6M11.8 13.2c0-1.6 1-2.7 2.3-2.7s2.1.9 2.1 2.5v3.5" />
    </svg>
  );
}
export function YouTubeIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.3 9.4 4.6 2.6-4.6 2.6z" fill="currentColor" />
    </svg>
  );
}
export function WhatsAppIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M4.2 19.8 5.3 16A8.2 8.2 0 1 1 8.4 19z" />
      <path d="M9.2 8.6c.2-.4.5-.5.8-.5h.5l.9 2-.6.8c.5 1 1.3 1.8 2.3 2.3l.8-.6 2 .9v.5c0 .3-.1.6-.5.8-.6.3-1.4.4-2.2.1a7.2 7.2 0 0 1-4.1-4.1c-.3-.8-.2-1.6.1-2.2z" />
    </svg>
  );
}

export const socialIcon: Record<SocialName, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
};
