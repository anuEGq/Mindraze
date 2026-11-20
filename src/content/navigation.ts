export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const businessLinks: NavItem[] = [
  {
    label: "Steel Trading",
    href: "/businesses/steel-trading",
    description: "TMT bars and structural steel for construction and industry.",
  },
  {
    label: "Solar Solutions",
    href: "/businesses/solar-solutions",
    description: "Rooftop installation, maintenance and solar product supply in Kerala.",
  },
  {
    label: "IT Services",
    href: "/businesses/it-services",
    description: "Websites, web apps, digital marketing, NFC solutions and billing software.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Businesses", href: "/businesses", children: businessLinks },
  { label: "Products & Services", href: "/products-services" },
  { label: "Contact Us", href: "/contact" },
];

export const quoteHref = "/contact#enquiry";

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];
