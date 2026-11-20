import { cn } from "@/lib/utils";

/** Warm, slowly rotating sun rays + breathing glow (pure CSS). */
export function SunGlow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgb(255_248_214/0.55)_8deg,transparent_18deg,transparent_40deg,rgb(255_248_214/0.4)_48deg,transparent_60deg,transparent_90deg,rgb(255_248_214/0.5)_100deg,transparent_112deg,transparent_150deg,rgb(255_248_214/0.35)_160deg,transparent_172deg,transparent_210deg,rgb(255_248_214/0.5)_220deg,transparent_232deg,transparent_270deg,rgb(255_248_214/0.4)_282deg,transparent_294deg,transparent_330deg,rgb(255_248_214/0.5)_340deg,transparent_352deg)] [mask-image:radial-gradient(circle,black_20%,transparent_68%)] motion-safe:animate-spin-slow" />
      <div className="sun-breathe absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgb(255_252_235)_0%,rgb(243_238_190/0.9)_30%,rgb(185_188_93/0.25)_60%,transparent_72%)]" />
    </div>
  );
}
