import type { Faq } from "./types";

export const websiteServices = [
  { title: "Static Website Development", summary: "Fast, secure, low-maintenance sites for businesses that need a clear online presence." },
  { title: "Business Websites", summary: "Websites that explain what you do, build trust and turn visitors into enquiries." },
  { title: "Corporate Websites", summary: "Multi-page corporate sites with structured content for brands with several offerings." },
  { title: "E-commerce Websites", summary: "Online stores with product catalogues, carts and checkout journeys." },
  { title: "Website Redesign", summary: "Modernise an existing site's design, structure, speed and search visibility." },
  { title: "Website Maintenance and Management", summary: "Updates, content changes, backups and ongoing care after launch." },
] as const;

export const websitePillars = [
  { title: "Responsive design", summary: "Layouts designed for phones first, then scaled up to tablets and large screens.", icon: "MonitorSmartphone" },
  { title: "User experience", summary: "Clear structure, readable content and journeys that lead to an enquiry.", icon: "MousePointerClick" },
  { title: "Performance", summary: "Optimised images, code and hosting choices for fast loading.", icon: "Gauge" },
  { title: "Search engine optimisation", summary: "Technical SEO foundations so customers can find you on search engines.", icon: "Search" },
] as const;

export const webAppCapabilities = [
  { title: "Business Management Applications", summary: "Manage customers, orders, inventory or staff in one place.", icon: "LayoutDashboard" },
  { title: "Custom Dashboards", summary: "See the numbers that matter to your business at a glance.", icon: "ChartLine" },
  { title: "Workflow Automation", summary: "Replace repetitive manual steps with dependable digital workflows.", icon: "Workflow" },
  { title: "Industry-Specific Applications", summary: "Tools shaped around how your industry actually works.", icon: "Factory" },
  { title: "Database-Driven Applications", summary: "Structured data, search and reporting built on a solid database.", icon: "Database" },
  { title: "API Integrations", summary: "Connect your application with the services you already use.", icon: "Plug" },
] as const;

export const marketingServices = [
  { title: "Social Media Management", summary: "Planning, posting and community management for your brand channels.", icon: "Share2" },
  { title: "Search Engine Optimisation (SEO)", summary: "On-page and technical improvements that help you rank for the right searches.", icon: "Search" },
  { title: "Content Creation", summary: "Copy, captions and visuals that explain your products clearly.", icon: "PenTool" },
  { title: "Promotional Video Creation", summary: "Short videos that introduce your business, products and services.", icon: "Clapperboard" },
  { title: "Advertising Video Production", summary: "Video creatives produced for paid campaigns and social ads.", icon: "Video" },
  { title: "Poster and Creative Design", summary: "Posters, social creatives and print-ready designs on brand.", icon: "Palette" },
  { title: "Digital Campaign Management", summary: "Campaigns planned, launched and refined across digital channels.", icon: "Megaphone" },
] as const;

export const reviewStandFeatures = [
  { title: "NFC-enabled review stands", summary: "Customers tap their phone on the stand to open your review page." },
  { title: "QR-code review access", summary: "A printed QR code works with any smartphone camera." },
  { title: "Multiple review platform integration", summary: "Point customers to the review platforms that matter to your business." },
  { title: "Pre-designed stand options", summary: "Ready-made designs for counters, receptions and tables." },
  { title: "Custom branding options", summary: "Your logo, colours and message on the stand." },
] as const;

export const nfcCardFeatures = [
  { title: "NFC-enabled visiting cards", summary: "Share your details with a single tap on a smartphone." },
  { title: "Printed QR code", summary: "A QR code on the card for phones without NFC." },
  { title: "Personalised profile page", summary: "A personal web page with your photo, role and links." },
  { title: "Digital resume presentation", summary: "Present your professional resume as a clean static web page." },
  { title: "Contact information display", summary: "Phone, email, WhatsApp and address, ready to save." },
  { title: "Professional portfolio integration", summary: "Link your work samples, website and social profiles." },
] as const;

/**
 * Billing & accounting software we sell, support and train on. Descriptions are general
 * product summaries; no partner status, pricing or edition details are claimed.
 */
export const billingSoftware = [
  {
    name: "myBillBook",
    summary: "GST billing and invoicing software for small and growing businesses, with inventory and payment tracking.",
    bestFor: "Quick GST invoicing on mobile and desktop",
  },
  {
    name: "Vyapar",
    summary: "Billing, inventory and accounting software built for small businesses, shops and traders.",
    bestFor: "Shops, traders and day-to-day billing",
  },
  {
    name: "Tally",
    summary: "Widely used accounting, inventory and GST compliance software for businesses across India.",
    bestFor: "Full accounting, inventory and compliance",
  },
  {
    name: "MargBooks",
    summary: "Cloud-based billing and accounting software from Marg ERP, covering invoicing, inventory and GST.",
    bestFor: "Online billing and accounting from any device",
  },
  {
    name: "SpotERP",
    summary: "Billing, inventory and accounting software for businesses.",
    bestFor: "Billing and day-to-day business accounts",
  },
] as const;

export const billingSoftwareNames = ["myBillBook", "Vyapar", "Tally", "MargBooks", "SpotERP"] as const;

export const billingServices = [
  {
    title: "Sales",
    summary: "We help you choose between myBillBook, Vyapar, Tally, MargBooks and SpotERP for your business and get you set up with the right plan.",
    icon: "ShoppingCart",
  },
  {
    title: "Support",
    summary: "Installation, setup and configuration, plus help when you get stuck with day-to-day use.",
    icon: "Headphones",
  },
  {
    title: "Training",
    summary: "Hands-on training for owners and staff, from creating invoices to managing stock and reports.",
    icon: "GraduationCap",
  },
] as const;

export const billingNeedOptions = ["Sales", "Support", "Training"] as const;
export const billingSoftwareOptions = [...billingSoftwareNames, "Not sure yet"] as const;

export const itServiceOptions = [
  "Website development",
  "Custom web application",
  "Digital marketing",
  "NFC review stand",
  "NFC digital visiting card",
  "Billing & accounting software",
  "Not sure yet",
] as const;

export const itFaqs: Faq[] = [
  {
    q: "Will my website work well on mobile phones?",
    a: "Yes. Every website we build is designed mobile-first and tested across phones, tablets and desktops, with a focus on performance and search engine optimisation.",
  },
  {
    q: "Can you redesign or take over my existing website?",
    a: "Yes. We offer website redesign as well as ongoing maintenance and management for existing sites.",
  },
  {
    q: "How does an NFC review stand work?",
    a: "Customers tap an NFC-enabled phone on the stand, or scan the printed QR code, and your review page opens directly. No app is needed on most modern smartphones.",
  },
  {
    q: "What happens when someone taps my NFC visiting card?",
    a: "Their phone opens your personalised profile page, a static web page with your contact details, resume and portfolio links. The printed QR code on the card does the same for phones without NFC.",
  },
  {
    q: "Which billing software is right for my business: myBillBook, Vyapar, Tally, MargBooks or SpotERP?",
    a: "It depends on how you bill, the size of your team and how much accounting you need. Tell us about your business and we'll help you compare the options before you buy.",
  },
  {
    q: "Do you provide support and training for billing software?",
    a: "Yes. Along with sales, we help with installation and setup, support you with day-to-day questions, and train owners and staff to use myBillBook, Vyapar, Tally, MargBooks or SpotERP.",
  },
  {
    q: "Do you build custom software for specific industries?",
    a: "Yes. We build custom web applications, including business management tools, dashboards, workflow automation and integrations, designed around how your business operates.",
  },
];
