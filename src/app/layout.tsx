import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { defaultOgImage, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | Steel, Solar & IT Services in Kerala`,
    template: `%s | ${site.legalName}`,
  },
  description: site.description,
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.legalName,
    url: "/",
    title: `${site.legalName}: ${site.tagline}`,
    description: site.description,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${site.legalName}: ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName}: ${site.tagline}`,
    description: site.description,
    images: [defaultOgImage],
  },
  robots: site.noindex
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.language} className={`${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables the CSS reveal system only when JavaScript runs, and removes comment or
            whitespace nodes that hosts inject into <head> (Netlify adds a promotional comment on
            *.netlify.app), which would otherwise make React's hydration fail (error #418). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');[].slice.call(document.head.childNodes).forEach(function(n){if(n.nodeType===8||(n.nodeType===3&&!n.textContent.trim()))n.remove()})",
          }}
        />
        <link rel="preload" href="/brand/mindraze-lockup.svg" as="image" type="image/svg+xml" crossOrigin="anonymous" />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-olive px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <FloatingActions />
        </SmoothScroll>
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
