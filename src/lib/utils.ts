import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge aware of the custom type scale (text-display/h1/h2/h3/lead) and text-metal. */
const twMerge = extendTailwindMerge<"text-effect">({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "lead"] }],
      "text-effect": ["text-metal"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
