import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "light" | "outline-light" | "outline-dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-ink hover:bg-olive-mid shadow-[0_10px_40px_-12px_rgb(185_188_93/0.55)]",
  dark: "bg-charcoal text-paper hover:bg-ink",
  light: "bg-paper text-charcoal hover:bg-white",
  "outline-light": "text-paper ring-1 ring-inset ring-paper/25 hover:ring-paper/60 hover:bg-paper/5",
  "outline-dark": "text-charcoal ring-1 ring-inset ring-charcoal/20 hover:ring-charcoal/50 hover:bg-charcoal/[0.03]",
};

const sizes: Record<Size, string> = {
  sm: "h-11 pl-5 pr-2 text-sm",
  md: "h-13 pl-6 pr-2 text-[0.95rem]",
  lg: "h-15 pl-7 pr-2.5 text-base",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-ink text-olive",
  dark: "bg-olive text-ink",
  light: "bg-charcoal text-paper",
  "outline-light": "bg-paper text-ink",
  "outline-dark": "bg-charcoal text-paper",
};

const iconSize: Record<Size, string> = { sm: "size-7", md: "size-9", lg: "size-10" };

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Arrow({ variant, size }: { variant: Variant; size: Size }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full",
        iconWrap[variant],
        iconSize[size],
      )}
    >
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5" />
      <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
    </span>
  );
}

type Common = { variant?: Variant; size?: Size; icon?: ReactNode | false; className?: string; children: ReactNode };

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], icon === false && "px-6", className)} {...props}>
      <span>{children}</span>
      {icon === false ? null : icon ?? <Arrow variant={variant} size={size} />}
    </Link>
  );
}

/** External / non-route link (tel:, mailto:, wa.me). */
export function ButtonAnchor({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<"a">, "className" | "children">) {
  return (
    <a className={cn(base, variants[variant], sizes[size], icon === false && "px-6", className)} {...props}>
      <span>{children}</span>
      {icon === false ? null : icon ?? <Arrow variant={variant} size={size} />}
    </a>
  );
}

/** Round icon slot matching the button arrow, for custom icons (e.g. WhatsApp). */
export function ButtonIcon({ variant = "primary", size = "md", children }: { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <span aria-hidden className={cn("grid shrink-0 place-items-center rounded-full", iconWrap[variant], iconSize[size])}>
      {children}
    </span>
  );
}

/** Inline text link with animated underline and arrow. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group/link inline-flex items-center gap-2 font-semibold underline decoration-current/25 decoration-1 underline-offset-[0.35em] transition-[text-decoration-color] duration-300 hover:decoration-current",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </Link>
  );
}
