import { media, type Photo } from "./media";
import type { VisualKind } from "./types";
import type { VerticalId } from "./verticals";

export type MockKind = "website" | "dashboard" | "social" | "review-stand" | "nfc-card" | "invoice";

export type ShowcaseItem = {
  id: string;
  vertical: VerticalId;
  category: string;
  title: string;
  summary: string;
  href: string;
  /** Option label pre-selected in the vertical's enquiry form. */
  enquireAs: string;
  visual: { type: "product"; kind: VisualKind } | { type: "photo"; photo: Photo } | { type: "mock"; mock: MockKind };
};

const steel = "/businesses/steel-trading";
const solar = "/businesses/solar-solutions";
const it = "/businesses/it-services";

export const showcase: ShowcaseItem[] = [
  { id: "tmt", vertical: "steel", category: "TMT Steel Bars", title: "TMT Steel Bars", summary: "TUSKER TMT and WIN TMT reinforcement bars for RCC construction.", href: `${steel}#tmt`, enquireAs: "TMT Steel Bars", visual: { type: "product", kind: "tmt" } },
  { id: "patta", vertical: "steel", category: "Structural Steel", title: "Patta (Flat Bars)", summary: "Flat bars for gates, grills, frames and fabrication.", href: `${steel}#structural`, enquireAs: "Patta (Flat Bars)", visual: { type: "product", kind: "flat-bar" } },
  { id: "angles", vertical: "steel", category: "Structural Steel", title: "Angle Iron / MS Angles", summary: "MS angles for frames, supports, trusses and racks.", href: `${steel}#structural`, enquireAs: "Angle Iron / MS Angles", visual: { type: "product", kind: "angle" } },
  { id: "l-clamps", vertical: "steel", category: "Structural Steel", title: "L-Clamps", summary: "L-clamps in different sizes for fixing and mounting.", href: `${steel}#structural`, enquireAs: "L-Clamps", visual: { type: "product", kind: "l-clamp" } },
  { id: "rods", vertical: "steel", category: "Structural Steel", title: "Square & Round Rods", summary: "Solid square and round rods for fabrication work.", href: `${steel}#structural`, enquireAs: "Multiple products", visual: { type: "product", kind: "round-rod" } },
  { id: "rooftop", vertical: "solar", category: "Solar Service", title: "Rooftop Solar Installation", summary: "Complete rooftop systems for homes, businesses and industry.", href: `${solar}#services`, enquireAs: "Rooftop solar installation", visual: { type: "photo", photo: media.solar.rooftopAerial } },
  { id: "panels", vertical: "solar", category: "Solar Panels", title: "DCR & Non-DCR Solar Panels", summary: "Adani, Waaree, Microtek, Loom Solar and Vikram Solar.", href: `${solar}#panels`, enquireAs: "Solar panels", visual: { type: "product", kind: "solar-panel" } },
  { id: "acdb-dcdb", vertical: "solar", category: "Electrical Components", title: "ACDB & DCDB", summary: "Distribution boxes for AC and DC side protection.", href: `${solar}#components`, enquireAs: "Electrical components", visual: { type: "product", kind: "dcdb" } },
  { id: "protection", vertical: "solar", category: "Electrical Components", title: "Lightning & Earthing", summary: "Lightning arresters, earthing pits and down conductors.", href: `${solar}#components`, enquireAs: "Electrical components", visual: { type: "product", kind: "lightning-arrester" } },
  { id: "accessories", vertical: "solar", category: "Installation Accessories", title: "Mounting Clamps & Fasteners", summary: "Panel clamps, SS screws, SS bolts and conduit.", href: `${solar}#accessories`, enquireAs: "Installation accessories", visual: { type: "product", kind: "mounting-clamp" } },
  { id: "cleaning", vertical: "solar", category: "Solar Service", title: "Cleaning & Maintenance", summary: "Keep panels clean and generating as they should.", href: `${solar}#services`, enquireAs: "Panel cleaning & maintenance", visual: { type: "photo", photo: media.solar.panelsSky } },
  { id: "websites", vertical: "it", category: "Website Development", title: "Website Development", summary: "Business, corporate and e-commerce websites.", href: `${it}#websites`, enquireAs: "Website development", visual: { type: "mock", mock: "website" } },
  { id: "web-apps", vertical: "it", category: "Web Applications", title: "Custom Web Applications", summary: "Dashboards, workflows and business tools.", href: `${it}#web-apps`, enquireAs: "Custom web application", visual: { type: "mock", mock: "dashboard" } },
  { id: "marketing", vertical: "it", category: "Digital Marketing", title: "Digital Marketing", summary: "Social media, SEO, content and video.", href: `${it}#marketing`, enquireAs: "Digital marketing", visual: { type: "mock", mock: "social" } },
  { id: "review-stands", vertical: "it", category: "NFC Products", title: "NFC & QR Review Stands", summary: "Tap or scan to reach your review pages.", href: `${it}#review-stands`, enquireAs: "NFC review stand", visual: { type: "mock", mock: "review-stand" } },
  { id: "nfc-cards", vertical: "it", category: "NFC Products", title: "NFC Digital Visiting Cards", summary: "One tap to your personal profile page.", href: `${it}#nfc-cards`, enquireAs: "NFC digital visiting card", visual: { type: "mock", mock: "nfc-card" } },
  { id: "billing-software", vertical: "it", category: "Billing Software", title: "myBillBook, Vyapar, Tally, MargBooks & SpotERP", summary: "Sales, support and training for billing and accounting software.", href: `${it}#billing-software`, enquireAs: "Billing & accounting software", visual: { type: "mock", mock: "invoice" } },
];

const verticalPath: Record<VerticalId, string> = { steel, solar, it };

/** Cross-page link that opens the vertical's enquiry form with the item pre-selected. */
export function enquireHref(item: Pick<ShowcaseItem, "vertical" | "enquireAs">) {
  return `${verticalPath[item.vertical]}?interest=${encodeURIComponent(item.enquireAs)}#${item.vertical}-enquiry`;
}
