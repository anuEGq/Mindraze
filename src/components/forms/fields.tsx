"use client";

import { forwardRef, useId, type ComponentProps, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldShellProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

/** Label + control + hint + error, with ids wired for accessibility. */
export function Field({ label, required, hint, error, className, children }: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {required ? <span className="text-olive-deep"> *</span> : <span className="font-normal text-grey-strong"> (optional)</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-grey-strong">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const control =
  "w-full rounded-xl bg-paper px-4 text-[0.95rem] text-charcoal ring-1 ring-charcoal/15 ring-inset transition-shadow outline-none placeholder:text-grey hover:ring-charcoal/30 focus:ring-2 focus:ring-charcoal aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(control, "h-12", className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(control, "min-h-32 resize-y py-3 leading-relaxed", className)} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select"> & { placeholder?: string; options: readonly string[] }>(function Select(
  { className, placeholder = "Select an option", options, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select ref={ref} className={cn(control, "h-12 appearance-none pr-10", className)} {...props}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-grey-strong" />
    </div>
  );
});

type PillGroupProps = {
  legend: string;
  name: string;
  options: readonly string[];
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

/** Touch-friendly radio / checkbox group styled as pills (native inputs for a11y). */
export function PillGroup({ legend, name, options, value, onChange, multiple, required, error, hint, className }: PillGroupProps) {
  const id = useId();
  const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);
  return (
    <fieldset className={cn("grid gap-2.5", className)} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} aria-invalid={Boolean(error) || undefined}>
      <legend className="mb-1 text-sm font-semibold text-charcoal">
        {legend}
        {required ? <span className="text-olive-deep"> *</span> : <span className="font-normal text-grey-strong"> (optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = selected.has(o);
          return (
            <label
              key={o}
              className={cn(
                "relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 ring-inset transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-charcoal",
                checked ? "bg-charcoal text-paper ring-charcoal" : "bg-paper text-charcoal ring-charcoal/15 hover:ring-charcoal/40",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o}
                checked={checked}
                onChange={() => {
                  if (multiple) {
                    const next = new Set(selected);
                    if (checked) next.delete(o);
                    else next.add(o);
                    onChange(options.filter((x) => next.has(x)));
                  } else onChange(o);
                }}
                className="sr-only"
              />
              {checked && <Check aria-hidden className="size-3.5 text-olive" />}
              {o}
            </label>
          );
        })}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-grey-strong">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
