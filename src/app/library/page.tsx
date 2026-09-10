import { STONES, FILTER_FACETS } from "@/data/stones";
import { REFUSAL } from "@/data/site";
import { meta } from "@/lib/seo";
import { spellOut, titleCase } from "@/lib/utils";
import { Eyebrow, Mono } from "@/components/ui/primitives";
import { LibraryBrowser } from "./LibraryBrowser";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "The Library · Forty-one Stones",
  ogTitle: "Forty-one stones.",
  description:
    "Every stone photographed in one frame, at the same distance, in the same light. Marble, granite, onyx and quartzite with block numbers and slab counts.",
  path: "/library",
});

/**
 * No hero. A tool that opens with a poster wasted its first screen: the page
 * arrives with every stone already on it, filters visible and un-applied.
 *
 * The page shell is a server component and ships the full grid as HTML; only
 * the filtering, sorting and view toggle are hydrated.
 */
export default function LibraryPage() {
  const latest = REFUSAL.at(-1)!;
  const origins = FILTER_FACETS.Origin.length;

  return (
    <>
      <div className="gutter pb-16 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-5">
          <Eyebrow>The library</Eyebrow>
          <h1 className="font-display text-display-fluid-m text-ink">
            {titleCase(spellOut(STONES.length))} stones.
          </h1>
          <Mono>
            {new Set(STONES.map((s) => s.family)).size} families · {origins}{" "}
            origins · {latest.kept} kept from {latest.seen} blocks seen in{" "}
            {latest.year}
          </Mono>
        </div>
      </div>

      <LibraryBrowser stones={STONES} />

      <Footer contextual={{ label: "For architects", href: "/architects" }} />
    </>
  );
}
