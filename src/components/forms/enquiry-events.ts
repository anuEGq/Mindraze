"use client";

export type EnquireDetail = { interest?: string; brand?: string; size?: string };
export const ENQUIRE_EVENT = "mindraze:enquire";

/** Ask the enquiry form on the current page to pre-fill and come into view. */
export function requestEnquiry(detail: EnquireDetail) {
  window.dispatchEvent(new CustomEvent<EnquireDetail>(ENQUIRE_EVENT, { detail }));
}
