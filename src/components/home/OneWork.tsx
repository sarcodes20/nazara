import { WORKS } from "@/data/works";
import { img } from "@/lib/images";
import { Curtain } from "@/components/motion/Curtain";
import { MasonLine, Rise } from "@/components/motion/MasonLine";
import { RuleLink } from "@/components/ui/Button";
import { Body, Mono } from "@/components/ui/primitives";
import { SIZES } from "@/lib/images";

/**
 * §05 · One work. Showing one project is a stronger claim than showing six,
 * and it forces the click for the rest.
 *
 * The only 21:9 on the homepage, per the one-per-page rule. On mobile it
 * switches to the Plane ratio — a cinematic crop on a phone is a letterbox
 * strip, which is why five ratios exist.
 */
export function OneWork() {
  const work = WORKS[0]!;

  return (
    <section className="relative z-10 bg-ground pb-16 md:pb-24 lg:pb-40">
      <Curtain
        src={img.workHero(work.slug)}
        alt="A courtyard house at dusk, its ground floor lined in pale marble, lit from within."
        edge="bottom"
        ratio="plane"
        sizes={SIZES.full}
        className="w-full md:hidden"
      />
      <Curtain
        src={img.workHero(work.slug)}
        alt="A courtyard house at dusk, its ground floor lined in pale marble, lit from within."
        edge="bottom"
        ratio="bench"
        sizes={SIZES.full}
        className="hidden w-full md:block"
      />

      <div className="gutter mt-10 grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-2">
          <MasonLine
            as="h2"
            delay={0.2}
            lines={[`${work.name}, ${work.city}`]}
            className="font-display text-display-fluid-m text-ink"
          />
          <Rise delay={0.3}>
            <Body>
              Eleven slabs from one block, laid in sequence through four rooms.
              The vein continues across every threshold.
            </Body>
            <Mono size="data-s" className="mt-5">
              {work.year} · {work.stoneLine} · {work.area} m² · Photographed by{" "}
              {work.photographer}
            </Mono>
          </Rise>
        </div>
        <div className="lg:col-span-3 lg:col-start-11 lg:self-end">
          <RuleLink href="/works">Six works</RuleLink>
        </div>
      </div>
    </section>
  );
}
