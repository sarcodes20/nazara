import Link from "next/link";
import { JOURNAL_SORTED } from "@/data/journal";
import { meta } from "@/lib/seo";
import { longDate, shortDate } from "@/lib/utils";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";
import { MasonLine } from "@/components/motion/MasonLine";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "The Journal · Notes on Stone",
  ogTitle: "The Journal.",
  description:
    "Notes from the bench and the atelier: how a cut changes a stone, what a wet slab tells you, and why you should buy the block rather than the slab.",
  path: "/journal",
});

/**
 * Editorial cards, per Volume One §06: a rule above, an eyebrow, a Bodoni
 * headline, a two-line standfirst and a mono date. No images — the module
 * exists to prove the system can hold attention with type alone.
 */
export default function JournalPage() {
  return (
    <>
      <section className="gutter pb-14 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-5">
          <Eyebrow>The Journal</Eyebrow>
          <MasonLine
            as="h1"
            immediate
            lines={["Notes on stone."]}
            className="font-display text-display-fluid-m text-ink"
          />
          <Body>
            Four or five letters a year, written for people who specify stone
            for a living. No announcements, and nothing about us.
          </Body>
        </div>
      </section>

      <section className="gutter pb-28">
        <ul className="border-t border-line">
          {JOURNAL_SORTED.map((entry) => (
            <li key={entry.slug} className="border-b border-line">
              <Link
                href={`/journal/${entry.slug}`}
                className="group grid gap-4 py-10 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-2">
                  <Mono size="data-s">{entry.column}</Mono>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-7">
                  <h2
                    className={[
                      "relative w-fit font-display text-h3-fluid text-ink",
                      // The rule ignites under the headline, per the Rule
                      // button treatment — the only hover this page has.
                      "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent",
                      "after:transition-[width] after:duration-rule after:ease-stone group-hover:after:w-full",
                    ].join(" ")}
                  >
                    {entry.title}
                  </h2>
                  <Body size="body-s" className="max-w-[52ch]">
                    {entry.standfirst}
                  </Body>
                </div>

                <div className="lg:col-span-2 lg:col-start-11 lg:text-right">
                  <Mono size="data-s">
                    <time dateTime={entry.published}>
                      {shortDate(entry.published)}
                    </time>
                  </Mono>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Body className="mt-14 text-ink-3">
          The most recent letter went out on{" "}
          {longDate(JOURNAL_SORTED[0]!.published)}. The sign-up is in the footer.
        </Body>
      </section>

      <Footer contextual={{ label: "The library", href: "/library" }} />
    </>
  );
}
