"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { NfcCardMock } from "./ui-mockups";
import { cn } from "@/lib/utils";

/** 3D flipping NFC visiting card (hover on desktop, button for touch and keyboard). */
export function NfcCardFlip({ className }: { className?: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={cn("group/flip", className)}>
      <div className="[perspective:1400px]">
        <div
          className={cn(
            "relative transition-transform duration-1000 ease-[var(--ease-out-expo)] [transform-style:preserve-3d]",
            flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(-16deg)_rotateX(8deg)] [@media(hover:hover)]:group-hover/flip:[transform:rotateY(180deg)]",
          )}
        >
          <div className="[backface-visibility:hidden]">
            <NfcCardMock side="front" />
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <NfcCardMock side="back" className="h-full" />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="mx-auto mt-6 flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-paper/75 ring-1 ring-white/15 ring-inset hover:text-paper"
      >
        <RefreshCw aria-hidden className="size-4" /> {flipped ? "Show front" : "Show the QR side"}
      </button>
    </div>
  );
}
