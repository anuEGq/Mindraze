import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { HomeIntro } from "@/components/home/intro";
import { MarqueeBand } from "@/components/home/marquee-band";
import { HomeVerticals } from "@/components/home/verticals";
import { WhyChoose } from "@/components/home/why-choose";
import { HomeReach } from "@/components/home/reach";
import { HomeShowcase } from "@/components/home/showcase";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mindraze Global LLP | Steel, Solar & IT Services in Kerala",
  absoluteTitle: true,
  description:
    "Mindraze Global LLP brings together steel trading (TMT bars and structural steel), rooftop solar installation and solar product supply across Kerala, and IT services including websites, digital marketing and NFC solutions.",
  path: "/",
  keywords: [
    "Mindraze Global",
    "TMT steel dealers in Kerala",
    "rooftop solar installation Kerala",
    "website development company Kerala",
    "solar panel suppliers Kerala",
    "NFC review stands",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <MarqueeBand />
      <HomeVerticals />
      <WhyChoose />
      <HomeReach />
      <HomeShowcase />
      <CtaBand />
    </>
  );
}
