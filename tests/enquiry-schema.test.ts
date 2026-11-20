import { describe, expect, it } from "vitest";
import { describeEnquiry, enquirySchema } from "@/lib/enquiry/schema";

const base = { name: "Asha Menon", phone: "+91 98765 43210" };
const errorsOf = (input: unknown) => {
  const r = enquirySchema.safeParse(input);
  return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]));
};

describe("enquirySchema", () => {
  it("accepts a minimal steel enquiry", () => {
    expect(enquirySchema.safeParse({ ...base, type: "steel", productCategory: "TMT Steel Bars" }).success).toBe(true);
  });

  it("requires a product for steel enquiries", () => {
    expect(errorsOf({ ...base, type: "steel" })).toHaveProperty("productCategory");
  });

  it("requires district, enquiry type and property type for solar", () => {
    const e = errorsOf({ ...base, type: "solar" });
    expect(Object.keys(e)).toEqual(expect.arrayContaining(["district", "enquiryType", "segment"]));
  });

  it("accepts a complete solar enquiry with optional capacity", () => {
    const ok = enquirySchema.safeParse({ ...base, type: "solar", district: "Thrissur", enquiryType: "Installation service", segment: "Residential", capacityKw: "5.5", requirements: ["Solar panels"] });
    expect(ok.success).toBe(true);
  });

  it("rejects districts outside Kerala's list and malformed capacity", () => {
    const e = errorsOf({ ...base, type: "solar", district: "Chennai", enquiryType: "Installation service", segment: "Residential", capacityKw: "five" });
    expect(e).toHaveProperty("district");
    expect(e).toHaveProperty("capacityKw");
  });

  it("requires email, category and message for general enquiries", () => {
    const e = errorsOf({ ...base, type: "general" });
    expect(Object.keys(e)).toEqual(expect.arrayContaining(["email", "category", "message"]));
  });

  it("validates phone numbers by digit count", () => {
    expect(errorsOf({ ...base, phone: "12345", type: "steel", productCategory: "L-Clamps" })).toHaveProperty("phone");
    expect(errorsOf({ ...base, phone: "98765-43210", type: "steel", productCategory: "L-Clamps" })).not.toHaveProperty("phone");
  });

  it("rejects messages with more than three links", () => {
    const message = "a http://a.com b http://b.com c http://c.com d http://d.com";
    expect(errorsOf({ ...base, type: "it", email: "a@b.co", service: "Digital marketing", message })).toHaveProperty("message");
  });

  it("accepts billing software enquiries with software and needs", () => {
    const r = enquirySchema.safeParse({
      ...base,
      type: "it",
      email: "owner@shop.in",
      service: "Billing & accounting software",
      software: ["Tally", "Vyapar"],
      billingNeeds: ["Sales", "Training"],
      message: "Need GST billing for two counters.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects billing software we don't offer", () => {
    const e = errorsOf({ ...base, type: "it", email: "a@b.co", service: "Billing & accounting software", software: ["QuickBooks"], message: "Hello there" });
    expect(e).toHaveProperty("software");
  });

  it("lists billing software and needs when describing an enquiry", () => {
    const rows = describeEnquiry({ type: "it", name: "Asha", phone: "9876543210", service: "Billing & accounting software", software: ["myBillBook"], billingNeeds: ["Support"] });
    expect(rows).toContainEqual(["Software", "myBillBook"]);
    expect(rows).toContainEqual(["Needs", "Support"]);
  });

  it("describes an enquiry with readable labels in a stable order", () => {
    const rows = describeEnquiry({ type: "steel", name: "Asha", phone: "9876543210", productCategory: "TMT Steel Bars", quantity: "5", quantityUnit: "Tonnes" });
    expect(rows[0]).toEqual(["Enquiry for", "Steel trading"]);
    expect(rows).toContainEqual(["Quantity", "5 Tonnes"]);
    expect(rows.map((r) => r[0])).not.toContain("Unit");
  });
});
