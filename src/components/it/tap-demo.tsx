import { Star } from "lucide-react";
import { NfcWaves, PhoneFrame, ReviewStandMock } from "./ui-mockups";
import { cn } from "@/lib/utils";

/** Review stand with a phone tapping it and the review page opening (CSS animation). */
export function TapDemo({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto w-[min(21rem,78%)]", className)}>
      <ReviewStandMock />
      <div className="tap-anim absolute -right-16 bottom-16 w-32 sm:-right-24 sm:w-36">
        <PhoneFrame>
          <div className="grid gap-2 p-3 pt-9">
            <span className="h-2 w-16 rounded-full bg-charcoal/80" />
            <span className="text-[0.6rem] font-semibold">Rate your experience</span>
            <span className="flex gap-0.5 text-olive-deep">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="h-10 rounded-md bg-charcoal/5 ring-1 ring-charcoal/10" />
            <span className="h-5 rounded-full bg-charcoal text-center text-[0.55rem] leading-5 font-semibold text-paper">Post review</span>
          </div>
        </PhoneFrame>
        <span className="absolute top-1/3 -left-6 size-12">
          <NfcWaves className="inset-0" />
        </span>
      </div>
    </div>
  );
}
