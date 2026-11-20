import { media, type Photo } from "./media";

export type VerticalId = "steel" | "solar" | "it";

export type Vertical = {
  id: VerticalId;
  index: string;
  name: string;
  shortName: string;
  href: string;
  headline: string;
  description: string;
  cta: string;
  highlights: string[];
  photo: Photo;
  theme: "dark" | "light";
};

export const verticals: Vertical[] = [
  {
    id: "steel",
    index: "01",
    name: "Steel Trading",
    shortName: "Steel",
    href: "/businesses/steel-trading",
    headline: "Strength That Builds Tomorrow.",
    description:
      "Reliable steel trading solutions for construction, infrastructure and industrial requirements. We supply TMT bars and a wide range of structural steel products in different brands, sizes and specifications.",
    cta: "Explore Steel Trading",
    highlights: ["TUSKER TMT", "WIN TMT", "Flat bars (Patta)", "MS angles", "L-clamps", "Square & round rods"],
    photo: media.steel.rebarBundle,
    theme: "dark",
  },
  {
    id: "solar",
    index: "02",
    name: "Solar Energy Solutions",
    shortName: "Solar",
    href: "/businesses/solar-solutions",
    headline: "Powering a Brighter Future.",
    description:
      "Complete rooftop solar solutions, structural installation, maintenance and solar product supply across Kerala. From installation to essential solar components, we support residential, commercial and industrial solar requirements.",
    cta: "Explore Solar Solutions",
    highlights: ["Rooftop installation", "Structure fabrication", "Cleaning & maintenance", "DCR & non-DCR panels", "Electrical components"],
    photo: media.solar.cellsSunlit,
    theme: "light",
  },
  {
    id: "it",
    index: "03",
    name: "IT Services & Digital Solutions",
    shortName: "IT Services",
    href: "/businesses/it-services",
    headline: "Transforming Ideas Into Digital Experiences.",
    description:
      "From website development and custom web applications to digital marketing, NFC-enabled review systems and smart digital visiting cards, we help businesses establish and grow their digital presence.",
    cta: "Explore IT Services",
    highlights: ["Websites", "Web applications", "Digital marketing", "NFC review stands", "NFC visiting cards", "Billing software"],
    photo: media.it.codeWorkspace,
    theme: "dark",
  },
];

export const verticalById = (id: VerticalId) => verticals.find((v) => v.id === id)!;
