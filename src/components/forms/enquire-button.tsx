"use client";

import type { ReactNode } from "react";
import { requestEnquiry, type EnquireDetail } from "./enquiry-events";
import { cn } from "@/lib/utils";

/** Same-page "Enquire" trigger: pre-fills the page's enquiry form and scrolls to it. */
export function EnquireButton({ detail, className, children, label }: { detail: EnquireDetail; className?: string; children: ReactNode; label?: string }) {
  return (
    <button type="button" aria-label={label} className={cn(className)} onClick={() => requestEnquiry(detail)}>
      {children}
    </button>
  );
}
