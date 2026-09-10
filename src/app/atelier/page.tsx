import { FINISH_SPEC, EDGE_PROFILES } from "@/data/site";
import { img, SIZES } from "@/lib/images";
import { meta } from "@/lib/seo";
import { Curtain } from "@/components/motion/Curtain";
import { MasonLine, Rise } from "@/components/motion/MasonLine";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";
import { RuleLink } from "@/components/ui/Button";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "The Atelier · Cutting, Finishing, Dry-lay",
  ogTitle: "A block becomes a room in four decisions.",
  description:
    "Orientation, sequence, finish and edge. The gangsaw does the cutting; everything that matters happens before it starts and after it stops.",
  path: "/atelier",
});

/**
 * Provenance proves the studio chooses well. This page proves it can make the
 * thing — the half of the claim that separates a studio from a trader.
 *
 * Deliberately on the light ground: Provenance is the Viewing Room in document
 * form, and the atelier is a daylit working building. The contrast is the
 * point.
 */
const DECISIONS = [
  {
    name: "Orientation",
    body: "Which axis the block enters the saw on. Vein-cut follows the bedding and gives long horizontal drift; cross-cut sections it and gives a bloom. This is decided at the block, before anything is cut, and it cannot be undone.",
  },
  {
    name: "Sequence",
    body: "The order slabs come off the saw is the order they must sit in the building. They are chalked as they are lifted and they keep those numbers to site. A bookmatch laid out of sequence is a wall with a stutter in it.",
  },
  {
    name: "Finish",
    body: "Four in stock, each a different material as far as a room is concerned. A polished floor and a leathered floor cut from the same block share a colour and almost nothing else.",
  },
  {
    name: "Edge",
    body: "Where the stone stops. A mitred corner makes a plane read as solid; a square edge admits it is a cladding. Both are correct answers to different questions.",
  },
];

export default function AtelierPage() {
  return (
    <>
      <section className="gutter pb-14 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-6 lg:max-w-[52rem]">
          <Eyebrow>The Atelier</Eyebrow>
          <MasonLine
            as="h1"
            immediate
            lines={[
              "A block becomes a room in four decisions,",
              "and none of them are made by a machine.",
            ]}
            className="font-display text-h1-fluid text-ink"
          />
          <Body>
            Madanganj–Kishangarh, one building, forty metres of gangsaw. The saw
            does the cutting. Everything that matters happens before it starts
            and after it stops.
          </Body>
        </div>
      </section>

      {/* The four decisions. Numbered because the order is chronological and
          irreversible — not because numbers look considered. */}
      <section className="gutter py-16 md:py-24">
        <ol className="border-t border-line">
          {DECISIONS.map((d, i) => (
            <li
              key={d.name}
              className="grid gap-3 border-b border-line py-8 lg:grid-cols-12 lg:gap-8"
            >
              <span
                data-numeric
                className="font-mono text-data-s text-accent-ink lg:col-span-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-h3-fluid text-ink lg:col-span-3">
                {d.name}
              </h2>
              <Body className="lg:col-span-7 lg:col-start-6">{d.body}</Body>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <Curtain
          src={img.craft(2)}
          alt="Hands guiding a slab off the gangsaw, water running from the blade."
          edge="bottom"
          ratio="bench"
          sizes={SIZES.full}
          className="w-full"
        />
        <div className="gutter grid gap-8 py-14 lg:grid-cols-12">
          <h2 className="font-display text-h2-fluid text-ink lg:col-span-3">
            The saw
          </h2>
          <Rise className="lg:col-span-7 lg:col-start-5">
            <Body>
              A block spends between two and four days in the gangsaw, cut by a
              frame of parallel blades under a constant slurry. Nothing about
              the process is delicate and nothing about it is reversible: the
              thickness, the axis and the number of slabs are all fixed the
              moment the frame comes down.
            </Body>
            <Body className="mt-5">
              Which is why the decisions above happen at the block, in daylight,
              with the person who selected it standing there. By the time a
              slab exists, every interesting question has already been answered.
            </Body>
          </Rise>
        </div>
      </section>

      {/* Moved here from Provenance, where it was duplicating this page. */}
      <section className="gutter py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-5">
          <MasonLine
            as="h2"
            lines={["Four finishes. We have a view on which one you want."]}
            className="max-w-[24ch] font-display text-h2-fluid text-ink"
          />
          <Body>
            Brushed and split-face are available on request and are not stocked.
            Flamed is available on granite only.
          </Body>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FINISH_SPEC.map((f, i) => (
            <figure key={f.name} className="flex flex-col gap-3">
              <Curtain
                src={img.stoneMacro("makrana-albeta", f.name)}
                alt={`${f.name} marble in raking light, its texture at ${f.ra}`}
                ratio="block"
                delay={i * 0.12}
                sizes={SIZES.card}
              />
              <figcaption>
                <Mono size="data-s" className="text-ink">
                  {f.name} · {f.ra}
                </Mono>
                <Body size="body-s" className="mt-1 text-ink-3">
                  {f.note}
                </Body>
              </figcaption>
            </figure>
          ))}
        </div>
        <Mono size="data-s" className="mt-6">
          Ra values are house figures for these finishes as produced here, and
          are confirmed per order against the current test report.
        </Mono>
      </section>

      <section className="gutter py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <Curtain
            src={img.dryLay()}
            alt="Eleven numbered slabs laid in sequence on a workshop floor, chalk marks between them."
            ratio="plane"
            sizes={SIZES.half}
            className="lg:col-span-7"
          />
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Eyebrow>The dry-lay</Eyebrow>
            <Body>
              Every bookmatch is laid out on the atelier floor, chalked, and
              photographed before it is crated. That photograph goes to the
              architect for approval, and nothing ships until it comes back.
            </Body>
            <Body>
              If the sequence is wrong, it is wrong here, where it costs a
              morning, not on site, where it costs a season.
            </Body>
          </div>
        </div>
      </section>

      <section className="gutter border-t border-line py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-4">Edges</Eyebrow>
            <Mono className="text-ink">{EDGE_PROFILES.join(" · ")}</Mono>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <Eyebrow className="mb-4">Tolerances</Eyebrow>
            <Mono className="leading-[2] text-ink">
              Thickness · ± 1.5 mm
              <br />
              Length and width · ± 5 mm
              <br />
              Slab · 3200 × 1900 mm nominal, varies by block
            </Mono>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:gap-10">
          <RuleLink href="/architects">Specifications and files</RuleLink>
          <RuleLink href="/viewing">Request a viewing</RuleLink>
        </div>
      </section>

      <Footer contextual={{ label: "Provenance", href: "/provenance" }} />
    </>
  );
}
