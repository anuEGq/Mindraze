import { z } from "zod";
import { districtNames } from "@/content/kerala";
import { billingNeedOptions, billingSoftwareOptions, itServiceOptions } from "@/content/it";
import { solarEnquiryTypes, solarRequirementOptions, solarSegments } from "@/content/solar";
import { steelBrandOptions, steelProductOptions } from "@/content/steel";

export const enquiryTypes = ["general", "steel", "solar", "it"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const contactCategories = [
  "General business enquiry",
  "Steel trading enquiry",
  "Solar installation enquiry",
  "Solar material enquiry",
  "Website development enquiry",
  "Digital marketing enquiry",
  "NFC product enquiry",
  "Billing software enquiry",
] as const;

export const quantityUnits = ["Tonnes", "Kg", "Bundles", "Pieces"] as const;

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters`).optional().or(z.literal(""));
const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) => z.enum(values).optional().or(z.literal(""));

const PHONE_DIGITS = /\d/g;

/**
 * One flat schema shared by the client form and the API route. Per-type required
 * fields are enforced in superRefine so the form can switch type without remounting.
 */
export const enquirySchema = z
  .object({
    type: z.enum(enquiryTypes),
    name: z.string().trim().min(2, "Please enter your name").max(80, "Please keep your name under 80 characters"),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter your phone number")
      .regex(/^\+?[\d\s()-]+$/, "Use digits, spaces, + or - only")
      .refine((v) => {
        const n = (v.match(PHONE_DIGITS) ?? []).length;
        return n >= 10 && n <= 15;
      }, "Enter a valid phone number (10–15 digits)"),
    email: z.union([z.literal(""), z.email("Enter a valid email address").max(120)]).optional(),
    company: optionalText(120),
    category: optionalEnum(contactCategories),
    // steel
    productCategory: optionalEnum(steelProductOptions),
    brandPreference: optionalEnum(steelBrandOptions),
    requiredSize: optionalText(160),
    quantity: optionalText(40),
    quantityUnit: optionalEnum(quantityUnits),
    // solar
    district: optionalEnum(districtNames as unknown as readonly [string, ...string[]]),
    enquiryType: optionalEnum(solarEnquiryTypes),
    segment: optionalEnum(solarSegments),
    capacityKw: z
      .string()
      .trim()
      .max(12)
      .regex(/^$|^\d{1,5}(\.\d{1,2})?$/, "Enter capacity as a number, e.g. 3 or 5.5")
      .optional(),
    requirements: z.array(z.enum(solarRequirementOptions)).max(solarRequirementOptions.length).optional(),
    // it
    service: optionalEnum(itServiceOptions),
    software: z.array(z.enum(billingSoftwareOptions)).max(billingSoftwareOptions.length).optional(),
    billingNeeds: z.array(z.enum(billingNeedOptions)).max(billingNeedOptions.length).optional(),
    // common
    message: optionalText(2000),
    // anti-spam (not shown to users)
    /** Honeypot: real users never fill this in. Accepted here so the route can fake success. */
    website: z.string().max(500).optional(),
    token: z.string().max(200).optional(),
    turnstileToken: z.string().max(4096).optional(),
    source: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    const need = (field: keyof typeof v, message: string) => {
      const value = v[field];
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) ctx.addIssue({ code: "custom", path: [field], message });
    };
    switch (v.type) {
      case "general":
        need("email", "Please enter your email address");
        need("category", "Please choose what your enquiry is about");
        need("message", "Please tell us a little about your requirement");
        break;
      case "steel":
        need("productCategory", "Please choose a product");
        break;
      case "solar":
        need("district", "Please choose your district");
        need("enquiryType", "Please choose an enquiry type");
        need("segment", "Please choose a property type");
        break;
      case "it":
        need("email", "Please enter your email address");
        need("service", "Please choose a service");
        need("message", "Please tell us a little about your project");
        break;
    }
    if (v.message && (v.message.match(/https?:\/\//gi) ?? []).length > 3) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Please include no more than three links" });
    }
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Human-readable labels for every field (emails, WhatsApp hand-off, logs). */
export const fieldLabels: Record<string, string> = {
  type: "Enquiry for",
  name: "Name",
  phone: "Phone",
  email: "Email",
  company: "Business / company",
  category: "Enquiry category",
  productCategory: "Product",
  brandPreference: "Brand preference",
  requiredSize: "Required size",
  quantity: "Quantity",
  quantityUnit: "Unit",
  district: "District",
  enquiryType: "Enquiry type",
  segment: "Property type",
  capacityKw: "Capacity (kW)",
  requirements: "Requirements",
  service: "Service",
  software: "Software",
  billingNeeds: "Needs",
  message: "Message",
  source: "Page",
};

export const typeLabels: Record<EnquiryType, string> = {
  general: "General enquiry",
  steel: "Steel trading",
  solar: "Solar solutions",
  it: "IT services",
};

/** Ordered [label, value] pairs describing an enquiry, skipping empty values. */
export function describeEnquiry(e: Partial<Enquiry>): [string, string][] {
  const order = ["type", "category", "productCategory", "brandPreference", "requiredSize", "quantity", "district", "enquiryType", "segment", "capacityKw", "requirements", "service", "software", "billingNeeds", "name", "phone", "email", "company", "message"] as const;
  const out: [string, string][] = [];
  for (const key of order) {
    let value: unknown = e[key];
    if (key === "type" && e.type) value = typeLabels[e.type];
    if (key === "quantity" && e.quantity) value = `${e.quantity}${e.quantityUnit ? ` ${e.quantityUnit}` : ""}`;
    if (Array.isArray(value)) value = value.join(", ");
    if (value === undefined || value === null || String(value).trim() === "") continue;
    out.push([fieldLabels[key], String(value).trim()]);
  }
  return out;
}
