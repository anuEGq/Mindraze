import { site } from "@/content/site";
import { socialIcon } from "@/components/ui/social-icons";
import { cn } from "@/lib/utils";

/** Social profile links. Unconfigured profiles render as disabled, labelled placeholders. */
export function SocialLinks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const ring = tone === "dark" ? "ring-white/15 hover:bg-olive hover:text-ink hover:ring-olive" : "ring-charcoal/15 hover:bg-charcoal hover:text-paper";
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Social media">
      {site.social.map(({ name, href }) => {
        const Icon = socialIcon[name];
        const cls = cn("grid size-11 place-items-center rounded-full ring-1 ring-inset transition-colors duration-300", ring);
        return (
          <li key={name}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${name}`} className={cls}>
                <Icon className="size-5" />
              </a>
            ) : (
              <span
                role="img"
                aria-label={`${name} profile link to be added`}
                title={`${name}: link to be added`}
                className={cn(cls, "cursor-not-allowed opacity-45 hover:bg-transparent hover:text-current")}
              >
                <Icon className="size-5" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
