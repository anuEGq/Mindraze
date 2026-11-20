import { cn } from "@/lib/utils";

/** Visibly labelled placeholder for business details that have not been supplied yet. */
export function Placeholder({ children, className, label = "Placeholder" }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <span className="opacity-60">{children}</span>
      <span className="rounded-full border border-dashed border-current/40 px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase opacity-70">
        {label}
      </span>
    </span>
  );
}
