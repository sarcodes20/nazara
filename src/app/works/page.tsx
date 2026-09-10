import { WORKS } from "@/data/works";
import { meta } from "@/lib/seo";
import { spellOut, titleCase } from "@/lib/utils";
import { Body, Eyebrow } from "@/components/ui/primitives";
import { WorksIndex } from "./WorksIndex";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "Works · Six Rooms",
  ogTitle: "Six rooms.",
  description:
    "Six projects in which every stone was selected at the bench. Block numbers, sequences and dry-lay photographs, from Jodhpur to Zürich.",
  path: "/works",
});

export default function WorksPage() {
  return (
    <>
      <div className="gutter pb-16 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-5">
          <Eyebrow>Works</Eyebrow>
          <h1 className="font-display text-display-fluid-m text-ink">
            {titleCase(spellOut(WORKS.length))} rooms.
          </h1>
          <Body>
            Every project here used stone we selected at the bench. There are
            more; these are the six the clients allowed us to show.
          </Body>
        </div>
      </div>

      <WorksIndex works={WORKS} />

      <Footer />
    </>
  );
}
