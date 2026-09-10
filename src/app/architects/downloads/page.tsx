import { DOWNLOADS, GROUP_LINES, GROUP_ORDER } from "@/data/downloads";
import { meta } from "@/lib/seo";
import { shortDate } from "@/lib/utils";
import { Eyebrow, Mono } from "@/components/ui/primitives";
import { IndexTable } from "./IndexTable";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "The Index · Downloads",
  ogTitle: "The Index.",
  description:
    "Thirty-four files: technical datasheets, CAD and BIM, 8K scanned textures, care guidance and origin certificates. Most need no account.",
  path: "/architects/downloads",
});

/**
 * A download page is a table. The design problem is resisting the urge to make
 * it anything else — no cards, no file-type icons, no coloured badges.
 */
export default function DownloadsPage() {
  const updated = DOWNLOADS.map((d) => d.updated).sort().at(-1)!;

  return (
    <>
      <section className="gutter pb-12 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-5">
          <Eyebrow>For architects</Eyebrow>
          <h1 className="font-display text-display-fluid-m text-ink">
            The Index.
          </h1>
          <Mono>
            {DOWNLOADS.length} files · Updated {shortDate(updated)}
          </Mono>
        </div>
      </section>

      <IndexTable
        files={DOWNLOADS}
        groups={GROUP_ORDER}
        lines={GROUP_LINES}
      />

      <Footer contextual={{ label: "For architects", href: "/architects" }} />
    </>
  );
}
