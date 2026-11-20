"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CircleCheck, Info, LoaderCircle, RotateCcw } from "lucide-react";
import { Field, Input, PillGroup, Select, Textarea } from "./fields";
import { ENQUIRE_EVENT, type EnquireDetail } from "./enquiry-events";
import { Turnstile, TURNSTILE_SITE_KEY } from "./turnstile";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { useLenis } from "@/components/motion/smooth-scroll";
import { districtNames } from "@/content/kerala";
import { billingNeedOptions, billingSoftwareNames, billingSoftwareOptions, itServiceOptions } from "@/content/it";
import { solarEnquiryTypes, solarRequirementOptions, solarSegments } from "@/content/solar";
import { steelBrandOptions, steelProductOptions } from "@/content/steel";
import {
  contactCategories,
  describeEnquiry,
  enquirySchema,
  quantityUnits,
  typeLabels,
  type Enquiry,
  type EnquiryInput,
  type EnquiryType,
} from "@/lib/enquiry/schema";
import { whatsappHref } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Variant = EnquiryType | "contact";

const categoryPreset: Record<(typeof contactCategories)[number], Partial<EnquiryInput> & { type: EnquiryType }> = {
  "General business enquiry": { type: "general" },
  "Steel trading enquiry": { type: "steel" },
  "Solar installation enquiry": { type: "solar", enquiryType: "Installation service" },
  "Solar material enquiry": { type: "solar", enquiryType: "Product / material supply" },
  "Website development enquiry": { type: "it", service: "Website development" },
  "Digital marketing enquiry": { type: "it", service: "Digital marketing" },
  "NFC product enquiry": { type: "it" },
  "Billing software enquiry": { type: "it", service: "Billing & accounting software" },
};

const solarInterestToType: Record<string, (typeof solarEnquiryTypes)[number]> = {
  "Rooftop solar installation": "Installation service",
  "Structure fabrication & installation": "Installation service",
  "Panel cleaning & maintenance": "Cleaning & maintenance",
  "Solar panels": "Product / material supply",
  "Electrical components": "Product / material supply",
  "Installation accessories": "Product / material supply",
};

const emptyValues = (type: EnquiryType): EnquiryInput => ({
  type,
  name: "",
  phone: "",
  email: "",
  company: "",
  category: "",
  productCategory: "",
  brandPreference: "",
  requiredSize: "",
  quantity: "",
  quantityUnit: "",
  district: "",
  enquiryType: "",
  segment: "",
  capacityKw: "",
  requirements: [],
  service: "",
  software: [],
  billingNeeds: [],
  message: "",
  website: "",
});

type Status = "idle" | "submitting" | "success" | "error";

async function fetchToken() {
  try {
    const res = await fetch("/api/enquiry", { cache: "no-store" });
    const data = (await res.json()) as { token?: string };
    return data.token;
  } catch {
    return undefined;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function EnquiryForm({ variant, className, id = "enquiry-form" }: { variant: Variant; className?: string; id?: string }) {
  const initialType: EnquiryType = variant === "contact" ? "general" : variant;
  const form = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: emptyValues(initialType),
    mode: "onTouched",
  });
  const { register, control, handleSubmit, setValue, setError, reset, trigger, getValues, setFocus, formState } = form;
  const { errors } = formState;
  const type = useWatch({ control, name: "type" }) as EnquiryType;
  const category = useWatch({ control, name: "category" });
  const productCategory = useWatch({ control, name: "productCategory" });
  const service = useWatch({ control, name: "service" });

  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Enquiry | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>();
  const [turnstileReset, setTurnstileReset] = useState(0);
  const token = useRef<string | undefined>(undefined);
  const tokenPromise = useRef<Promise<string | undefined> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const ensureToken = useCallback(() => {
    if (token.current) return Promise.resolve(token.current);
    tokenPromise.current ??= fetchToken().then((t) => {
      token.current = t;
      tokenPromise.current = null;
      return t;
    });
    return tokenPromise.current;
  }, []);

  // Contact form: switching category switches the field set.
  useEffect(() => {
    if (variant !== "contact" || !category) return;
    const preset = categoryPreset[category as keyof typeof categoryPreset];
    if (!preset) return;
    setValue("type", preset.type);
    setValue("enquiryType", preset.enquiryType ?? "");
    setValue("service", preset.service ?? "");
  }, [category, variant, setValue]);

  const applyInterest = useCallback(
    (detail: EnquireDetail) => {
      const { interest, brand, size } = detail;
      if (variant === "contact" && interest && (contactCategories as readonly string[]).includes(interest)) {
        setValue("category", interest as never, { shouldValidate: true });
        return;
      }
      const t = getValues("type");
      if (interest) {
        if (t === "steel" && (steelProductOptions as readonly string[]).includes(interest)) setValue("productCategory", interest as never, { shouldValidate: true });
        if (t === "solar" && (solarRequirementOptions as readonly string[]).includes(interest)) {
          setValue("requirements", [interest as (typeof solarRequirementOptions)[number]]);
          setValue("enquiryType", solarInterestToType[interest] ?? "", { shouldValidate: true });
        }
        if (t === "it" && (itServiceOptions as readonly string[]).includes(interest)) setValue("service", interest as never, { shouldValidate: true });
        if (t === "it" && (billingSoftwareNames as readonly string[]).includes(interest)) {
          setValue("service", "Billing & accounting software", { shouldValidate: true });
          setValue("software", [interest as (typeof billingSoftwareNames)[number]]);
        }
      }
      if (brand && t === "steel") setValue("brandPreference", brand as never);
      if (size && t === "steel") setValue("requiredSize", size);
    },
    [getValues, setValue, variant],
  );

  // Pre-fill from ?interest= (cross-page links) and from same-page enquire buttons.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    if (interest) applyInterest({ interest });
    const onEnquire = (e: Event) => {
      applyInterest((e as CustomEvent<EnquireDetail>).detail);
      const el = rootRef.current;
      if (!el) return;
      if (lenis) {
        // Re-sync Lenis with the real scroll position first: a native scroll it missed
        // (e.g. during start-up) would otherwise make it compute the wrong target.
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        lenis.scrollTo(el, { offset: -110, duration: 1.2 });
      }
      else el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => setFocus("name"), 700);
    };
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
  }, [applyInterest, lenis, setFocus]);

  const submit = async (values: Enquiry, attempt = 0): Promise<void> => {
    setStatus("submitting");
    setServerError(null);
    const t = await ensureToken();
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, token: t, turnstileToken, source: window.location.pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string; code?: string; fieldErrors?: Record<string, string> };
      if (res.ok && data.ok) {
        setReference(data.reference ?? null);
        setSubmitted(values);
        setStatus("success");
        token.current = undefined;
        // Bring the confirmation into view below the fixed header and section nav.
        requestAnimationFrame(() => {
          const el = rootRef.current;
          if (!el || el.getBoundingClientRect().top > 160) return;
          if (lenis) lenis.scrollTo(el, { offset: -170, duration: 0.8 });
          else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 170 });
        });
        return;
      }
      if (attempt === 0 && (data.code === "too-fast" || data.code === "missing" || data.code === "invalid" || data.code === "expired")) {
        if (data.code !== "too-fast") token.current = undefined;
        else await sleep(2600);
        return submit(values, 1);
      }
      if (data.fieldErrors) {
        for (const [field, message] of Object.entries(data.fieldErrors)) setError(field as keyof EnquiryInput, { message });
      }
      setServerError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      setTurnstileReset((n) => n + 1);
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again, or contact us on WhatsApp.");
      setStatus("error");
    }
  };

  const onInvalid = () => {
    setStatus("idle");
    setServerError("Please check the highlighted fields.");
  };

  const waNumberSet = Boolean(site.contact.whatsapp.value);
  const sendOnWhatsApp = async () => {
    const ok = await trigger();
    if (!ok) return onInvalid();
    const v = getValues() as Enquiry;
    const text = [`Hello ${site.name}, I'd like to make an enquiry.`, "", ...describeEnquiry(v).map(([k, val]) => `• ${k}: ${val}`)].join("\n");
    const href = whatsappHref(text);
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  if (status === "success" && submitted) {
    const waText = [`Hello ${site.name}, I just sent enquiry ${reference ?? ""} on your website.`, "", ...describeEnquiry(submitted).map(([k, v]) => `• ${k}: ${v}`)].join("\n");
    const wa = whatsappHref(waText);
    return (
      <div ref={rootRef} id={id} className={cn("rounded-[var(--radius-panel)] bg-white p-6 text-charcoal ring-1 ring-charcoal/10 sm:p-10", className)} role="status" aria-live="polite">
        <div className="grid size-14 place-items-center rounded-full bg-olive text-ink">
          <CircleCheck aria-hidden className="size-7" />
        </div>
        <h3 className="mt-6 text-h3">Thank you, {submitted.name.split(" ")[0]}.</h3>
        <p className="mt-3 max-w-lg text-grey-strong">
          Your {typeLabels[submitted.type].toLowerCase()} enquiry has been received. Our team will review it and get back to you by phone{submitted.email ? " or email" : ""}.
        </p>
        {reference && (
          <p className="mt-6 inline-flex items-center gap-3 rounded-full bg-paper px-4 py-2 font-mono text-sm ring-1 ring-charcoal/10">
            Reference <strong className="tracking-wider">{reference}</strong>
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-charcoal px-5 text-sm font-semibold text-paper hover:bg-ink">
              <WhatsAppIcon className="size-5 text-olive" /> Continue on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              reset(emptyValues(initialType));
              setStatus("idle");
              setSubmitted(null);
            }}
            className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-charcoal/15 ring-inset hover:ring-charcoal/40"
          >
            <RotateCcw aria-hidden className="size-4" /> Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const needEmail = type === "general" || type === "it";

  return (
    <div ref={rootRef} id={id} className={cn("rounded-[var(--radius-panel)] bg-white p-6 text-charcoal ring-1 ring-charcoal/10 sm:p-10", className)}>
      <form
        noValidate
        onFocusCapture={() => void ensureToken()}
        onSubmit={(e) => handleSubmit((v) => submit(v), onInvalid)(e)}
        aria-describedby={serverError ? `${id}-status` : undefined}
        className="grid gap-6"
      >
        {variant === "contact" && (
          <Field label="What is your enquiry about?" required error={errors.category?.message}>
            {({ id: fid, describedBy, invalid }) => (
              <Select id={fid} aria-describedby={describedBy} aria-invalid={invalid} options={contactCategories} placeholder="Choose a category" {...register("category")} />
            )}
          </Field>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Your name" required error={errors.name?.message}>
            {({ id: fid, describedBy, invalid }) => <Input id={fid} autoComplete="name" aria-describedby={describedBy} aria-invalid={invalid} {...register("name")} />}
          </Field>
          <Field label={type === "solar" ? "Contact number" : "Phone number"} required hint="We'll call or WhatsApp you on this number." error={errors.phone?.message}>
            {({ id: fid, describedBy, invalid }) => <Input id={fid} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" aria-describedby={describedBy} aria-invalid={invalid} {...register("phone")} />}
          </Field>
          {type !== "solar" && (
            <Field label="Email" required={needEmail} error={errors.email?.message}>
              {({ id: fid, describedBy, invalid }) => <Input id={fid} type="email" inputMode="email" autoComplete="email" aria-describedby={describedBy} aria-invalid={invalid} {...register("email")} />}
            </Field>
          )}
          {type !== "solar" && (
            <Field label="Business / company" error={errors.company?.message}>
              {({ id: fid, describedBy, invalid }) => <Input id={fid} autoComplete="organization" aria-describedby={describedBy} aria-invalid={invalid} {...register("company")} />}
            </Field>
          )}
        </div>

        {type === "steel" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Product category" required error={errors.productCategory?.message}>
              {({ id: fid, describedBy, invalid }) => <Select id={fid} aria-describedby={describedBy} aria-invalid={invalid} options={steelProductOptions} placeholder="Choose a product" {...register("productCategory")} />}
            </Field>
            <Field label="Brand preference" hint={productCategory === "TMT Steel Bars" ? "TUSKER TMT or WIN TMT" : "Mainly applies to TMT bars"} error={errors.brandPreference?.message}>
              {({ id: fid, describedBy, invalid }) => <Select id={fid} aria-describedby={describedBy} aria-invalid={invalid} options={steelBrandOptions} placeholder="No preference" {...register("brandPreference")} />}
            </Field>
            <Field label="Required size" hint="e.g. 12 mm, 16 mm or 50 × 50 × 5 mm" error={errors.requiredSize?.message}>
              {({ id: fid, describedBy, invalid }) => <Input id={fid} aria-describedby={describedBy} aria-invalid={invalid} {...register("requiredSize")} />}
            </Field>
            <div className="grid grid-cols-[1fr_8.5rem] gap-3">
              <Field label="Quantity" hint="Approximate is fine" error={errors.quantity?.message}>
                {({ id: fid, describedBy, invalid }) => <Input id={fid} inputMode="decimal" aria-describedby={describedBy} aria-invalid={invalid} {...register("quantity")} />}
              </Field>
              <Field label="Unit" error={errors.quantityUnit?.message}>
                {({ id: fid, describedBy, invalid }) => <Select id={fid} aria-describedby={describedBy} aria-invalid={invalid} options={quantityUnits} placeholder="Unit" {...register("quantityUnit")} />}
              </Field>
            </div>
          </div>
        )}

        {type === "solar" && (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="District in Kerala" required error={errors.district?.message}>
                {({ id: fid, describedBy, invalid }) => <Select id={fid} aria-describedby={describedBy} aria-invalid={invalid} options={districtNames} placeholder="Choose your district" {...register("district")} />}
              </Field>
              <Field label="Solar capacity requirement (kW)" hint="Leave blank if you're not sure" error={errors.capacityKw?.message}>
                {({ id: fid, describedBy, invalid }) => <Input id={fid} inputMode="decimal" placeholder="e.g. 3" aria-describedby={describedBy} aria-invalid={invalid} {...register("capacityKw")} />}
              </Field>
            </div>
            <Controller
              control={control}
              name="enquiryType"
              render={({ field }) => (
                <PillGroup legend="Installation or product enquiry?" name="enquiryType" required options={solarEnquiryTypes} value={field.value ?? ""} onChange={(v) => field.onChange(v)} error={errors.enquiryType?.message} />
              )}
            />
            <Controller
              control={control}
              name="segment"
              render={({ field }) => <PillGroup legend="Property type" name="segment" required options={solarSegments} value={field.value ?? ""} onChange={(v) => field.onChange(v)} error={errors.segment?.message} />}
            />
            <Controller
              control={control}
              name="requirements"
              render={({ field }) => (
                <PillGroup legend="Product or service requirements" name="requirements" multiple options={solarRequirementOptions} value={field.value ?? []} onChange={(v) => field.onChange(v)} hint="Select all that apply" />
              )}
            />
          </>
        )}

        {type === "it" && (
          <Controller
            control={control}
            name="service"
            render={({ field }) => <PillGroup legend="Service you're interested in" name="service" required options={itServiceOptions} value={field.value ?? ""} onChange={(v) => field.onChange(v)} error={errors.service?.message} />}
          />
        )}

        {type === "it" && service === "Billing & accounting software" && (
          <div className="grid gap-6 rounded-2xl bg-paper p-5 ring-1 ring-charcoal/10">
            <Controller
              control={control}
              name="software"
              render={({ field }) => (
                <PillGroup legend="Which software?" name="software" multiple options={billingSoftwareOptions} value={field.value ?? []} onChange={(v) => field.onChange(v)} hint="Select all that apply" error={errors.software?.message} />
              )}
            />
            <Controller
              control={control}
              name="billingNeeds"
              render={({ field }) => (
                <PillGroup legend="What do you need?" name="billingNeeds" multiple options={billingNeedOptions} value={field.value ?? []} onChange={(v) => field.onChange(v)} error={errors.billingNeeds?.message} />
              )}
            />
          </div>
        )}

        <Field
          label={type === "steel" ? "Additional requirements" : type === "solar" ? "Message" : "Tell us about your requirement"}
          required={type === "general" || type === "it"}
          error={errors.message?.message}
        >
          {({ id: fid, describedBy, invalid }) => (
            <Textarea
              id={fid}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              placeholder={type === "steel" ? "Delivery location, timeline, grades or anything else we should know" : type === "solar" ? "Roof type, recent electricity bill, timeline…" : "What do you need, and by when?"}
              {...register("message")}
            />
          )}
        </Field>

        {/* Honeypot: hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </label>
        </div>

        <Turnstile onToken={setTurnstileToken} resetKey={turnstileReset} />

        {serverError && (
          <p id={`${id}-status`} role="alert" className="flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" /> {serverError}
          </p>
        )}

        <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-6 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={submitting || Boolean(TURNSTILE_SITE_KEY && !turnstileToken)}
            className="group/btn inline-flex h-13 items-center justify-center gap-3 rounded-full bg-charcoal pr-2 pl-6 font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-60"
          >
            <span>{submitting ? "Sending…" : "Send enquiry"}</span>
            <span aria-hidden className="grid size-9 place-items-center rounded-full bg-olive text-ink">
              {submitting ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
            </span>
          </button>
          <button
            type="button"
            onClick={sendOnWhatsApp}
            disabled={!waNumberSet || submitting}
            title={waNumberSet ? undefined : "WhatsApp number to be added"}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-charcoal/15 ring-inset transition-colors hover:ring-charcoal/40 disabled:cursor-not-allowed disabled:opacity-55"
          >
            <WhatsAppIcon className="size-5 text-olive-deep" />
            {waNumberSet ? "Send via WhatsApp instead" : "WhatsApp (number to be added)"}
          </button>
        </div>
        <p className="text-xs text-grey-strong">
          By sending this form you agree to be contacted about your enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
