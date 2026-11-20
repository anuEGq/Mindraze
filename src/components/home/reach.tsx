import Image from "next/image";
import { MapPin } from "lucide-react";
import { KeralaMap } from "@/components/sections/kerala-map";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Parallax } from "@/components/motion/parallax";
import { TextLink } from "@/components/ui/button";
import { districtNames } from "@/content/kerala";
import { media } from "@/content/media";

export function HomeReach() {
  return (
    <section data-theme="dark" aria-labelledby="reach-title" className="grain relative isolate overflow-hidden bg-charcoal text-paper">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.16]">
        <Parallax speed={0.1} className="absolute -inset-y-[12%] inset-x-0">
          <Image src={media.kerala.backwaters.src} alt="" fill sizes="100vw" className="object-cover grayscale" />
        </Parallax>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
      <div className="container-x section-y grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal as="p" className="eyebrow flex items-center gap-3 text-olive">
            <span aria-hidden className="h-px w-8 bg-current" /> Our reach
          </Reveal>
          <SplitText id="reach-title" lines={["Serving Businesses", "Across Kerala", "and Beyond."]} className="mt-6 text-h2" />
          <div className="mt-8 grid max-w-xl gap-5 text-[1.05rem] leading-relaxed text-paper/70">
            <Reveal as="p" delay={120}>
              Our solar team supports rooftop installations, structure fabrication, cleaning and maintenance, and supplies solar
              panels, electrical components and installation accessories across Kerala.
            </Reveal>
            <Reveal as="p" delay={200}>
              Steel enquiries are welcome from construction and fabrication projects, while our IT and digital services are
              delivered online, so businesses can work with us wherever they are based.
            </Reveal>
          </div>
          <Reveal delay={260} className="mt-10">
            <p className="eyebrow text-paper/50">Solar coverage · across Kerala</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {districtNames.map((d) => (
                <li key={d} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm text-paper/80 ring-1 ring-white/10">
                  <MapPin aria-hidden className="size-3.5 text-olive" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={320} className="mt-10">
            <TextLink href="/businesses/solar-solutions#coverage" className="text-paper">
              Solar services in Kerala
            </TextLink>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <KeralaMap idPrefix="home" className="mx-auto max-w-lg" />
        </div>
      </div>
    </section>
  );
}
