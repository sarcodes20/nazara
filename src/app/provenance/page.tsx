import { REFUSAL } from "@/data/site";
import { img, SIZES } from "@/lib/images";
import { meta } from "@/lib/seo";
import { Curtain } from "@/components/motion/Curtain";
import { MasonLine, Rise } from "@/components/motion/MasonLine";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";
import { RuleLink } from "@/components/ui/Button";
import { DrawnMap } from "@/components/site/DrawnMap";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "Provenance · Six Quarries",
  ogTitle: "Six quarries, and we have walked all of them.",
  description:
    "Six benches, four of them within a day's drive. In 2025 we saw 406 blocks and kept nineteen. This page explains the other 387.",
  path: "/provenance",
});

/**
 * Opens dark and stays dark: the Viewing Room in document form. No hero image
 * — after a homepage that was almost entirely photography, an opening of pure
 * language reads as confidence.
 */
export default function ProvenancePage() {
  return (
    <div className="viewing-room bg-ground">
      {/* 01 The word */}
      <section className="gutter flex min-h-[80dvh] flex-col justify-center gap-8 pt-32 md:pt-40">
        <MasonLine
          as="h1"
          immediate
          lines={["नज़ारा", "نظارہ"]}
          className="font-display text-display-fluid-m leading-[1.1] text-ink"
        />
        <Rise delay={0.4}>
          <Body size="lead" className="text-ink-2">
            Hindi and Urdu, from the Arabic <em>naẓar</em>, the gaze. A nazara
            is a view. Not scenery: the specific thing you stop walking to look
            at.
          </Body>
          <Body className="mt-6">
            It is a word about the person looking as much as the thing seen. We
            took it because marble is the only building material whose entire
            case is optical, and because the work of this studio is not
            manufacture. It is looking, for long enough, at the right things.
          </Body>
        </Rise>
      </section>

      {/* 02 The manifesto — verbatim, never shortened. */}
      <section className="gutter flex min-h-[70dvh] flex-col justify-center gap-8">
        <MasonLine
          as="h2"
          lines={["Nothing here was designed.", "Everything here was chosen."]}
          className="max-w-[18ch] font-display text-h1-fluid text-ink"
        />
        <Rise>
          <Body>
            A block comes out of the hill in the dark. We wet it, rake a light
            across it, turn it, and look for a long time. Then we take it, or we
            leave it on the bench. There is no third option, and no amount of
            money changes the answer.
          </Body>
        </Rise>
      </section>

      {/* 03 Six quarries */}
      <section className="gutter section-y">
        <div className="mb-12 flex flex-col gap-6">
          <MasonLine
            as="h2"
            lines={["We buy from six benches,", "and we have walked all of them."]}
            className="max-w-[22ch] font-display text-h2-fluid text-ink"
          />
          <Body>
            Not six countries, not fifty. Six specific faces of rock, four of
            them within a day&rsquo;s drive, each with a foreman we have known
            for years and a history of what that bench gives in a wet year and a
            dry one. The library is small because the sourcing is narrow, and
            the sourcing is narrow on purpose.
          </Body>
        </div>
        <DrawnMap />
      </section>

      {/* 04 Makrana — one paragraph beneath a full bleed. Nothing more. */}
      <section>
        <Curtain
          src={img.quarry("makrana")}
          alt="Stepped white terraces cut into a hillside, a truck at the base for scale."
          edge="bottom"
          ratio="bench"
          tone="dark"
          sizes={SIZES.full}
          className="w-full"
        />
        <div className="gutter grid gap-8 py-14 lg:grid-cols-12">
          <h2 className="font-display text-h2-fluid text-ink lg:col-span-3">
            Makrana
          </h2>
          <Rise className="lg:col-span-7 lg:col-start-5">
            <Body>
              Ninety kilometres north of this studio, in Nagaur district, there
              is a marble bench that has been worked since before the Mughals
              and has never been fully exhausted. The stone from it built the
              Taj Mahal. It also builds a great many bathrooms in Gurugram,
              which is the honest and less flattering half of the sentence. What
              separates one from the other is not the quarry. It is who is
              standing at the bench on the day the block comes out.
            </Body>
          </Rise>
        </div>
      </section>

      {/* 05 The atelier — the full account lives on /atelier. This page is
          about what the studio chooses; that one is about what it makes, and
          the two were duplicating each other. */}
      <section className="gutter section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <Curtain
            src={img.dryLay()}
            alt="Eleven numbered slabs laid in sequence on a workshop floor, chalk marks between them."
            ratio="plane"
            tone="dark"
            sizes={SIZES.half}
            className="lg:col-span-6"
          />
          <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:self-end">
            <Eyebrow>The atelier</Eyebrow>
            <MasonLine
              as="h2"
              lines={["Choosing is half of it."]}
              className="font-display text-h2-fluid text-ink"
            />
            <Body>
              The other half is orientation, sequence, finish and edge. Four
              decisions taken at the block, before the saw comes down, none of
              them reversible afterwards.
            </Body>
            <RuleLink href="/atelier">The atelier</RuleLink>
          </div>
        </div>
      </section>

      {/* 06 The hands — Register III, no faces to camera. */}
      <section className="gutter section-y">
        <div className="mb-10 flex flex-col gap-5">
          <Eyebrow>The hands</Eyebrow>
          <Body>
            Three people decide what this library contains. None of them has a
            title on a business card that describes what they actually do.
          </Body>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Selection, at the bench", "22 years", "A selector's hands chalking a block number onto wet stone at the quarry bench."],
            ["Gangsaw and sequence", "17 years", "Hands guiding a slab off the gangsaw, water running from the blade."],
            ["Finishing and edges", "11 years", "A finisher's hands running a diamond pad along a mitred edge."],
          ].map(([role, years, alt], i) => (
            <figure key={role} className="flex flex-col gap-3">
              <Curtain
                src={img.craft((i + 1) as 1 | 2 | 3)}
                alt={alt!}
                ratio="plane"
                tone="dark"
                delay={i * 0.12}
                sizes={SIZES.card}
              />
              <figcaption>
                <Mono size="data-s">
                  [First name], {role} · {years}
                </Mono>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 07 The refusal */}
      <section className="gutter section-y">
        <div className="flex flex-col gap-7 lg:max-w-[50rem]">
          <MasonLine
            as="h2"
            lines={["What we did not buy."]}
            className="font-display text-h1-fluid text-ink"
          />
          <Body>
            A supplier publishes what it sold. This is the other number, and it
            is the more useful one.
          </Body>

          <dl className="mt-4 border-t border-line">
            {REFUSAL.map((row) => (
              <div
                key={row.year}
                className="flex items-baseline gap-6 border-b border-line py-3"
              >
                <dt data-numeric className="font-mono text-data w-16 text-ink">
                  {row.year}
                </dt>
                <dd data-numeric className="font-mono text-data uppercase text-ink-2">
                  {row.seen} blocks seen · {row.kept} kept
                </dd>
              </div>
            ))}
          </dl>

          <Body className="mt-2">
            Four and a half per cent, across five years. The rest went to
            somebody else, and is very probably excellent. It simply was not
            what we were standing there for.
          </Body>

          <RuleLink href="/library" className="mt-4">
            The library
          </RuleLink>
        </div>
      </section>

      <Footer contextual={{ label: "The library", href: "/library" }} />
    </div>
  );
}
