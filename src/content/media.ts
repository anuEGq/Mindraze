import type { StaticImageData } from "next/image";

import rebarBundle from "@/assets/images/steel/rebar-bundle.jpg";
import steelBeams from "@/assets/images/steel/steel-beams.jpg";
import rebarSiteAerial from "@/assets/images/steel/rebar-site-aerial.jpg";
import rebarInspection from "@/assets/images/steel/rebar-inspection.jpg";
import steelFrameSunlit from "@/assets/images/steel/steel-frame-sunlit.jpg";
import solarCellsSunlit from "@/assets/images/solar/solar-cells-sunlit.jpg";
import rooftopAerial from "@/assets/images/solar/rooftop-aerial.jpg";
import panelInstallation from "@/assets/images/solar/panel-installation.jpg";
import panelsSky from "@/assets/images/solar/panels-sky.jpg";
import commercialArray from "@/assets/images/solar/commercial-array.jpg";
import residentialRooftop from "@/assets/images/solar/residential-rooftop.jpg";
import codeWorkspace from "@/assets/images/it/code-workspace.jpg";
import codeLaptop from "@/assets/images/it/code-laptop.jpg";
import socialFeed from "@/assets/images/it/social-feed.jpg";
import backwatersAerial from "@/assets/images/kerala/backwaters-aerial.jpg";

export type Photo = { src: StaticImageData; alt: string };

/**
 * Representative photography (Unsplash License, see docs/IMAGE_CREDITS.md).
 * Replace with genuine Mindraze Global project photography when available.
 */
export const media = {
  steel: {
    rebarBundle: { src: rebarBundle, alt: "Close-up of bundled ribbed steel reinforcement bars" },
    beams: { src: steelBeams, alt: "Intersecting structural steel beams in monochrome" },
    siteAerial: { src: rebarSiteAerial, alt: "Aerial view of workers placing steel reinforcement on a construction site" },
    inspection: { src: rebarInspection, alt: "Construction worker standing on a steel rebar grid" },
    frameSunlit: { src: steelFrameSunlit, alt: "Steel roof framework silhouetted against warm sunlight" },
  },
  solar: {
    cellsSunlit: { src: solarCellsSunlit, alt: "Solar panel cells catching warm sunlight" },
    rooftopAerial: { src: rooftopAerial, alt: "Aerial view of a rooftop solar array on a sheet roof surrounded by greenery" },
    installation: { src: panelInstallation, alt: "Installer positioning a solar panel on a rooftop" },
    panelsSky: { src: panelsSky, alt: "Solar panels angled towards a bright blue sky" },
    commercialArray: { src: commercialArray, alt: "Rows of solar panels on a large commercial rooftop" },
    residentialRooftop: { src: residentialRooftop, alt: "Solar panels installed on a residential roof" },
  },
  it: {
    codeWorkspace: { src: codeWorkspace, alt: "Code editor with syntax highlighting on a monitor in a dark workspace" },
    codeLaptop: { src: codeLaptop, alt: "Laptop displaying source code in a dark room" },
    socialFeed: { src: socialFeed, alt: "Hands holding a smartphone showing a social media feed" },
  },
  kerala: {
    backwaters: { src: backwatersAerial, alt: "Aerial view of the Kerala backwaters with coconut palms" },
  },
} satisfies Record<string, Record<string, Photo>>;
