import Link from "next/link";
import { REFUSAL, SITE } from "@/data/site";
import { QUARRIES } from "@/data/quarries";
import { MasonLine, Rise } from "@/components/motion/MasonLine";
import { RuleLink, Button } from "@/components/ui/Button";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";

/**
 * §06 · The refusal, and §07 · The viewing. Both Viewing Room, both type only.
 *
 * The figures do not count up — Volume One forbids ticking counters. They
 * arrive on the mason's line, 200ms apart, and hold. A chart here would make
 * the number look like a marketing claim rather than a fact.
 */
export function Refusal() {
  const latest = REFUSAL.at(-1)!;

  return (
    <section className="viewing-room relative z-10 bg-ground section-y">
      <div className="gutter flex flex-col gap-7 lg:max-w-[52rem]">
        <Eyebrow>Provenance</Eyebrow>

        <MasonLine
          as="h2"
          lines={[
            `${latest.seen} blocks were seen in ${latest.year}.`,
            `${latest.kept} were kept.`,
          ]}
          className="font-display text-display-fluid-m text-ink [font-variant-numeric:lining-nums]"
        />

        <Rise delay={0.2}>
          <Body className="text-ink">
            We are paid for the ones we walk away from.
          </Body>
          <Mono size="data-s" className="mt-6">
            {QUARRIES.length} quarries · Makrana {QUARRIES[0]!.lat}° N ·
            Kishangarh {SITE.coordinates.lat}° N · and four more
          </Mono>
        </Rise>

        <RuleLink href="/provenance" className="mt-2">
          Provenance
        </RuleLink>
      </div>
    </section>
  );
}

export function Viewing() {
  return (
    <section className="viewing-room relative z-10 bg-ground pb-24 pt-8 md:pb-32 lg:pb-40">
      <div className="gutter flex flex-col gap-8 lg:max-w-[44rem]">
        <MasonLine
          as="h2"
          lines={["The library is open by appointment."]}
          className="font-display text-h1-fluid text-ink"
        />
        <Rise delay={0.15}>
          <Body className="text-ink-2">
            Two hours. Six to twelve blocks, wet, under raking light. Nothing is
            sold in the room.
          </Body>
        </Rise>

        <Button asChild variant="ink" className="mt-2 w-full sm:w-fit">
          <Link href="/viewing">Request a viewing</Link>
        </Button>

        <Mono size="data-s" className="mt-2">
          {SITE.address.street} · {SITE.coordinates.lat}° N &nbsp;
          {SITE.coordinates.lon}° E · {SITE.hoursShort}
        </Mono>
      </div>
    </section>
  );
}
