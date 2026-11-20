import type { Faq, Product } from "./types";

/**
 * Steel catalogue. Specifications, stock and prices are NOT published until the
 * business confirms them. Size lists marked `confirmed: false` are shown as
 * enquiry options with an explicit "availability confirmed on enquiry" note.
 */

/** Standard nominal diameters for TMT reinforcement bars (enquiry options, not a stock claim). */
export const tmtDiameters = ["8 mm", "10 mm", "12 mm", "16 mm", "20 mm", "25 mm", "32 mm"];

export type TmtBrand = {
  id: string;
  name: string;
  summary: string;
  /** Rows are rendered as "Shared with quotation" until values are confirmed. */
  specs: { label: string; value: string | null }[];
  sizes: { options: string[]; confirmed: boolean };
};

export const tmtBrands: TmtBrand[] = [
  {
    id: "tusker-tmt",
    name: "TUSKER TMT",
    summary:
      "TUSKER TMT bars supplied for residential, commercial and infrastructure construction. Tell us the diameters and quantity you need and we will confirm current availability and pricing.",
    specs: [
      { label: "Grade", value: null },
      { label: "Diameters", value: null },
      { label: "Bar length", value: null },
      { label: "Bundle / weight", value: null },
    ],
    sizes: { options: tmtDiameters, confirmed: false },
  },
  {
    id: "win-tmt",
    name: "WIN TMT",
    summary:
      "WIN TMT bars for reinforcement in RCC work, from individual homes to larger projects. Share your requirement for an up-to-date quotation and availability by size.",
    specs: [
      { label: "Grade", value: null },
      { label: "Diameters", value: null },
      { label: "Bar length", value: null },
      { label: "Bundle / weight", value: null },
    ],
    sizes: { options: tmtDiameters, confirmed: false },
  },
];

export const steelProducts: Product[] = [
  {
    id: "tmt-bars",
    name: "TMT Steel Bars",
    vertical: "steel",
    category: "TMT Steel Bars",
    summary:
      "Thermo-mechanically treated reinforcement bars for RCC foundations, columns, beams and slabs. Available brands: TUSKER TMT and WIN TMT.",
    uses: ["Foundations", "Columns & beams", "Slabs", "Infrastructure"],
    sizes: { label: "Common diameters 8–32 mm", options: tmtDiameters, confirmed: false, hint: "e.g. 12 mm" },
    visual: "tmt",
  },
  {
    id: "patta-flat-bars",
    name: "Patta (Flat Bars)",
    aka: "Flat bars",
    vertical: "steel",
    category: "Structural Steel & Fabrication",
    summary: "Steel flat bars for fabrication, gates, grills, frames, brackets and general structural work.",
    uses: ["Gates & grills", "Frames", "Brackets", "Fabrication"],
    sizes: { label: "Multiple widths & thicknesses", confirmed: false, hint: "width × thickness, e.g. 40 × 6 mm" },
    visual: "flat-bar",
  },
  {
    id: "ms-angles",
    name: "Angle Iron / MS Angles",
    aka: "MS angles",
    vertical: "steel",
    category: "Structural Steel & Fabrication",
    summary: "MS angles for frames, supports, trusses, racks and structural fabrication.",
    uses: ["Trusses", "Supports", "Racks", "Frames"],
    sizes: { label: "Multiple sections", confirmed: false, hint: "leg × leg × thickness, e.g. 50 × 50 × 5 mm" },
    visual: "angle",
  },
  {
    id: "l-clamps",
    name: "L-Clamps",
    vertical: "steel",
    category: "Structural Steel & Fabrication",
    summary: "L-clamps in different sizes for fixing, bracing and mounting applications.",
    uses: ["Fixing", "Bracing", "Mounting"],
    sizes: { label: "Different sizes", confirmed: false, hint: "size or application" },
    visual: "l-clamp",
  },
  {
    id: "square-rods",
    name: "Square Rods",
    vertical: "steel",
    category: "Structural Steel & Fabrication",
    summary: "Solid steel square rods for grills, gates, railings and fabrication work.",
    uses: ["Grills", "Gates", "Railings"],
    sizes: { label: "Multiple sizes", confirmed: false, hint: "side, e.g. 12 mm" },
    visual: "square-rod",
  },
  {
    id: "round-rods",
    name: "Round Rods",
    vertical: "steel",
    category: "Structural Steel & Fabrication",
    summary: "Solid steel round rods for fabrication, anchors and general engineering applications.",
    uses: ["Fabrication", "Anchors", "Engineering"],
    sizes: { label: "Multiple diameters", confirmed: false, hint: "diameter, e.g. 16 mm" },
    visual: "round-rod",
  },
];

export const structuralProducts = steelProducts.filter((p) => p.category === "Structural Steel & Fabrication");

export const steelProductOptions = [
  "TMT Steel Bars",
  "Patta (Flat Bars)",
  "Angle Iron / MS Angles",
  "L-Clamps",
  "Square Rods",
  "Round Rods",
  "Multiple products",
] as const;

export const steelBrandOptions = ["TUSKER TMT", "WIN TMT", "No preference"] as const;

export const steelFaqs: Faq[] = [
  {
    q: "Which TMT bar brands do you supply?",
    a: "We supply TUSKER TMT and WIN TMT bars. Tell us your preferred brand, or ask us to quote both so you can compare.",
  },
  {
    q: "Can I enquire for bulk quantities?",
    a: "Yes. Bulk and project-based enquiries are welcome. Share the products, sizes and approximate quantity, and our team will confirm availability and send a quotation.",
  },
  {
    q: "Do you supply structural steel as well as TMT bars?",
    a: "Yes. Along with TMT bars we supply flat bars (patta), angle iron / MS angles, L-clamps, square rods and round rods for fabrication and structural work.",
  },
  {
    q: "Where can I see specifications and prices?",
    a: "Specifications, current prices and stock vary by brand, size and date, so we confirm them with each quotation rather than publishing figures that may be out of date.",
  },
  {
    q: "How quickly will I hear back?",
    a: "Our team reviews every enquiry and responds by phone, WhatsApp or email. For urgent requirements, message us on WhatsApp with your product, size and quantity.",
  },
];
