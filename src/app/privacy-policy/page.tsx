import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by {site.legalName} (&quot;we&quot;, &quot;us&quot;). For privacy questions, contact us using the details on our
          Contact page.
        </p>
      </section>
      <section>
        <h2>Information we collect</h2>
        <p>When you send an enquiry, we collect the information you choose to provide, which may include:</p>
        <ul>
          <li>your name, phone number and email address;</li>
          <li>your business name, district and the products or services you are interested in;</li>
          <li>quantities, sizes, capacities and any message you write.</li>
        </ul>
        <p>Our server also records technical information needed to protect the form from abuse, such as your IP address, browser type and the time of submission.</p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>to respond to your enquiry and prepare quotations;</li>
          <li>to contact you by phone, WhatsApp or email about your enquiry;</li>
          <li>to prevent spam and misuse of our website.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>
      <section>
        <h2>WhatsApp</h2>
        <p>If you choose to contact us on WhatsApp, your messages are handled through WhatsApp and are also subject to WhatsApp&apos;s own privacy policy.</p>
      </section>
      <section>
        <h2>Service providers</h2>
        <p>[To be completed: list the hosting, email delivery, spam protection and analytics providers used, if any.]</p>
      </section>
      <section>
        <h2>How long we keep it</h2>
        <p>[To be completed: retention period for enquiry records.]</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You can ask us to access, correct or delete the personal information you have submitted by contacting us. [To be completed with any rights under applicable law, including India&apos;s Digital Personal Data Protection Act, 2023.]</p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>We may update this policy. The date at the top of this page shows when it was last changed.</p>
      </section>
    </LegalPage>
  );
}
