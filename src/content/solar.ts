import { media, type Photo } from "./media";
import type { Faq, Product } from "./types";

export type SolarService = {
  id: string;
  index: string;
  title: string;
  summary: string;
  points: string[];
  photo: Photo;
};

export const solarServices: SolarService[] = [
  {
    id: "rooftop-installation",
    index: "01",
    title: "Rooftop Solar Installation",
    summary:
      "Complete rooftop solar solutions for homes, businesses and industrial buildings, from understanding your energy needs and recommending a system to supplying the components and installing it on your roof.",
    points: ["Residential rooftops", "Commercial buildings", "Industrial facilities", "DCR and non-DCR panel options"],
    photo: media.solar.rooftopAerial,
  },
  {
    id: "structural-fabrication",
    index: "02",
    title: "Solar Structural Fabrication and Installation",
    summary:
      "Mounting structures fabricated and installed to suit your roof type and site, so panels sit securely, at the right orientation, in sun and monsoon alike.",
    points: ["Structure fabrication", "On-site installation", "Panel mounting and alignment", "Stainless steel fasteners and clamps"],
    photo: media.solar.installation,
  },
  {
    id: "cleaning-maintenance",
    index: "03",
    title: "Solar Panel Cleaning and Maintenance",
    summary:
      "Dust, bird droppings and debris reduce how much power panels produce. Regular cleaning and maintenance helps your system keep generating as it should.",
    points: ["Panel cleaning", "Visual inspection", "Maintenance support", "Residential, commercial and industrial systems"],
    photo: media.solar.panelsSky,
  },
  {
    id: "product-supply",
    index: "04",
    title: "Solar Product and Component Supply",
    summary:
      "Solar panels, electrical components and installation accessories supplied across Kerala, for new installations, system expansions and replacements.",
    points: ["Solar panels from leading brands", "Electrical protection components", "Installation accessories", "Supply-only or with installation"],
    photo: media.solar.commercialArray,
  },
];

export const panelBrands = ["Adani", "Waaree", "Microtek", "Loom Solar", "Vikram Solar"] as const;

export const panelTypes = [
  {
    id: "dcr",
    name: "DCR Solar Panels",
    label: "Domestic Content Requirement",
    summary:
      "DCR panels use solar cells and modules manufactured in India. They are generally required when a rooftop project is installed under government subsidy schemes.",
    bestFor: ["Subsidy-linked residential projects", "Projects that specify Indian-made cells"],
  },
  {
    id: "non-dcr",
    name: "Non-DCR Solar Panels",
    label: "Open market modules",
    summary:
      "Non-DCR panels can use imported solar cells. They suit commercial, industrial and private projects that are not claiming a subsidy that requires DCR modules.",
    bestFor: ["Commercial and industrial rooftops", "Projects without DCR conditions"],
  },
] as const;

export const solarPanelProduct: Product = {
  id: "solar-panels",
  name: "Solar Panels",
  vertical: "solar",
  category: "Solar Panels",
  summary: "DCR and non-DCR solar panels from Adani, Waaree, Microtek, Loom Solar and Vikram Solar.",
  uses: ["Residential", "Commercial", "Industrial"],
  sizes: { label: "DCR & non-DCR", confirmed: false, hint: "brand, type and wattage if known" },
  visual: "solar-panel",
};

export const solarElectrical: Product[] = [
  {
    id: "energy-meters",
    name: "Energy Meters",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "Meters for measuring and monitoring solar generation and energy consumption.",
    visual: "energy-meter",
  },
  {
    id: "acdb",
    name: "ACDB",
    aka: "AC Distribution Box",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "AC distribution box housing the protection devices between the inverter and the building's supply.",
    visual: "acdb",
  },
  {
    id: "dcdb",
    name: "DCDB",
    aka: "DC Distribution Box",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "DC distribution box protecting the circuit between the solar panels and the inverter.",
    visual: "dcdb",
  },
  {
    id: "lightning-arresters",
    name: "Lightning Arresters",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "Protects the rooftop installation by safely channelling lightning discharge to earth.",
    visual: "lightning-arrester",
  },
  {
    id: "earthing-pits",
    name: "Earthing Pits",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "Earthing that provides a safe path to ground for fault currents and lightning protection.",
    visual: "earthing-pit",
  },
  {
    id: "dc-cables",
    name: "DC Cables",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "Solar DC cables for connecting panel strings to the inverter on rooftop installations.",
    visual: "dc-cable",
  },
  {
    id: "down-conductors",
    name: "Down Conductors",
    vertical: "solar",
    category: "Solar Electrical Components",
    summary: "Conductors that carry lightning current from the arrester down to the earthing system.",
    visual: "down-conductor",
  },
];

export const solarAccessories: Product[] = [
  {
    id: "conduit-pipes",
    name: "Conduit Pipes",
    vertical: "solar",
    category: "Solar Installation Accessories",
    summary: "Protect and route cables neatly across rooftops, walls and structures.",
    visual: "conduit-pipe",
  },
  {
    id: "conduit-fittings",
    name: "Conduit Pipe Fittings",
    vertical: "solar",
    category: "Solar Installation Accessories",
    summary: "Fittings for joining, turning and terminating conduit runs.",
    visual: "conduit-fitting",
  },
  {
    id: "ss-screws",
    name: "Stainless Steel Screws",
    vertical: "solar",
    category: "Solar Installation Accessories",
    summary: "Corrosion-resistant stainless steel screws for fixing structures and accessories.",
    visual: "ss-screw",
  },
  {
    id: "ss-bolts",
    name: "Stainless Steel Bolts",
    vertical: "solar",
    category: "Solar Installation Accessories",
    summary: "Stainless steel bolts for secure structural and panel mounting connections.",
    visual: "ss-bolt",
  },
  {
    id: "mounting-clamps",
    name: "Panel Mounting Clamps",
    vertical: "solar",
    category: "Solar Installation Accessories",
    summary: "Different types of clamps for securing solar panels to their mounting structures.",
    visual: "mounting-clamp",
  },
];

export const solarProducts: Product[] = [solarPanelProduct, ...solarElectrical, ...solarAccessories];

export const solarEnquiryTypes = ["Installation service", "Product / material supply", "Cleaning & maintenance", "Installation and products"] as const;
export const solarSegments = ["Residential", "Commercial", "Industrial"] as const;
export const solarRequirementOptions = [
  "Rooftop solar installation",
  "Structure fabrication & installation",
  "Panel cleaning & maintenance",
  "Solar panels",
  "Electrical components",
  "Installation accessories",
] as const;

export const solarFaqs: Faq[] = [
  {
    q: "Do you only install systems, or can I buy materials too?",
    a: "Both. We provide complete rooftop installations, and we also supply solar panels, electrical components and installation accessories on their own for your project.",
  },
  {
    q: "Which areas do you serve?",
    a: "We support solar installations and material supply across Kerala. Tell us your district when you enquire so we can plan the visit or supply.",
  },
  {
    q: "What is the difference between DCR and non-DCR panels?",
    a: "DCR (Domestic Content Requirement) panels use cells and modules made in India and are generally needed for subsidy-linked rooftop projects. Non-DCR panels can use imported cells and suit projects without that condition. We will help you choose based on your project.",
  },
  {
    q: "Which solar panel brands are available?",
    a: "We work with Adani, Waaree, Microtek, Loom Solar and Vikram Solar panels. Availability of specific models is confirmed at the time of quotation.",
  },
  {
    q: "Can you clean and maintain my existing solar system?",
    a: "Yes. Our cleaning and maintenance service helps keep panels free of dust and debris so they keep generating as expected. Share your system size and location to get started.",
  },
  {
    q: "Do I need to know my required capacity before enquiring?",
    a: "No. Capacity is optional on our form. Share your building type and a recent electricity bill if you have one, and we will guide you from there.",
  },
];
