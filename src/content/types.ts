import type { StaticImageData } from "next/image";
import type { VerticalId } from "./verticals";

/** Technical illustration used when no genuine product photograph is available. */
export type VisualKind =
  | "tmt"
  | "flat-bar"
  | "angle"
  | "l-clamp"
  | "square-rod"
  | "round-rod"
  | "solar-panel"
  | "energy-meter"
  | "acdb"
  | "dcdb"
  | "lightning-arrester"
  | "earthing-pit"
  | "dc-cable"
  | "down-conductor"
  | "conduit-pipe"
  | "conduit-fitting"
  | "ss-screw"
  | "ss-bolt"
  | "mounting-clamp";

export type SizeInfo = {
  /** Short label for cards, e.g. "Multiple sizes". */
  label: string;
  /** Selectable options for enquiries. Only list values the business has confirmed or standard nominal sizes. */
  options?: string[];
  /** True once the business confirms these sizes are stocked. */
  confirmed: boolean;
  /** Format hint for the "required size" field. */
  hint?: string;
};

export type Product = {
  id: string;
  name: string;
  aka?: string;
  vertical: VerticalId;
  category: string;
  summary: string;
  uses?: string[];
  sizes?: SizeInfo;
  visual: VisualKind;
  /** Optional genuine product photograph; overrides the illustration when set. */
  photo?: { src: StaticImageData; alt: string };
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: string;
};

export type Faq = { q: string; a: string };
