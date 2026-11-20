import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: `Terms for using the ${site.legalName} website.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" path="/terms-and-conditions">
      <section>
        <h2>About this website</h2>
        <p>This website provides information about the steel trading, solar energy and IT services offered by {site.legalName}. By using it, you agree to these terms.</p>
      </section>
      <section>
        <h2>Information on this website</h2>
        <p>
          Product names, brands, sizes and services are listed for general information. Specifications, availability and prices are
          confirmed only in a written quotation and may change without notice. Product illustrations and photographs are
          representative.
        </p>
      </section>
      <section>
        <h2>Enquiries and quotations</h2>
        <p>Submitting an enquiry does not create an order or a contract. Orders are governed by the quotation and any terms agreed in writing at that time.</p>
      </section>
      <section>
        <h2>Trademarks</h2>
        <p>Brand names such as TUSKER TMT, WIN TMT, Adani, Waaree, Microtek, Loom Solar, Vikram Solar, myBillBook, Vyapar, Tally, MargBooks and SpotERP belong to their respective owners and are mentioned only to identify products we supply.</p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>Do not misuse the website, including by submitting false information, attempting to disrupt it or sending spam through our forms.</p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>[To be completed with appropriate limitation of liability wording.]</p>
      </section>
      <section>
        <h2>Governing law</h2>
        <p>[To be completed: governing law and jurisdiction.]</p>
      </section>
    </LegalPage>
  );
}
