import { FINISH_SPEC, EDGE_PROFILES, LEAD_TIMES, LEAD_TIMES_UPDATED, ARCHITECT_FAQS } from "@/data/site";
import { img, SIZES } from "@/lib/images";
import { meta } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { shortDate } from "@/lib/utils";
import { Curtain } from "@/components/motion/Curtain";
import { Body, Eyebrow, Mono, ScrollArea } from "@/components/ui/primitives";
import { RuleLink } from "@/components/ui/Button";
import { CopySpec } from "@/components/site/CopySpec";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "For Architects · Specifications & Files",
  ogTitle: "Everything you need to specify us.",
  description:
    "Datasheets, DWG and Revit families, finishes with Ra values, tolerances, honest lead times and samples cut from the actual block.",
  path: "/architects",
});

const SPEC_LINE = `MARBLE: NAZARA 'MAKRANA ALBETA', VEIN-CUT, HONED, 20 MM, BOOKMATCHED PAIRS, BLOCK NZ-0412. SUPPLIER: NAZARA, KISHANGARH, RAJASTHAN.`;

/**
 * The one page in the system permitted to open with a list of links, and the
 * one permitted density: section rhythm drops from 160px to 96px. The trade
 * visitor is scanning, not strolling, and generous air reads as evasion when
 * someone needs a number.
 */
export default function ArchitectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(ARCHITECT_FAQS)) }}
      />

      <section className="gutter pb-14 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-6 lg:max-w-[46rem]">
          <Eyebrow>For architects</Eyebrow>
          <h1 className="font-display text-h1-fluid text-ink">
            Everything you need to specify us.
          </h1>
          <Body>
            Files, tolerances, finishes, lead times and samples. Nothing here
            needs an account except BIM.
          </Body>
        </div>

        {/* Four doors of equal weight — the page does not know which of them
            this visitor came for. */}
        <nav
          aria-label="Trade sections"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-10"
        >
          <RuleLink href="/architects/downloads">Downloads</RuleLink>
          <RuleLink href="#specify">Specifications</RuleLink>
          <RuleLink href="#samples">Order samples</RuleLink>
          <RuleLink href="/viewing">Book a viewing</RuleLink>
        </nav>
      </section>

      <section id="specify" className="gutter scroll-mt-28 border-t border-line py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <h2 className="font-display text-h2-fluid text-ink">
              How to write us into a schedule.
            </h2>
            <Body>
              Specify the block, not just the stone. It is the only way to
              guarantee that what arrives on site is what you stood in front of.
            </Body>
            <CopySpec line={SPEC_LINE} />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Body size="body-s" className="text-ink-3">
              Every stone page carries its own version of this line, with the
              current block, ready to copy.
            </Body>
          </div>
        </div>
      </section>

      <section className="gutter border-t border-line py-16 md:py-24">
        <h2 className="mb-10 font-display text-h2-fluid text-ink">
          Four finishes. We have a view on which one you want.
        </h2>
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
        <Body size="body-s" className="mt-8 text-ink-3">
          Brushed and split-face are available on request and are not stocked.
          Flamed is available on granite only.
        </Body>
      </section>

      <section className="gutter border-t border-line py-16 md:py-24">
        <h2 className="mb-8 font-display text-h2-fluid text-ink">
          Formats, thicknesses and edges.
        </h2>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Mono className="leading-[2.2] text-ink">
              Slab · 3200 × 1900 mm nominal · varies by block, stated per stone
              <br />
              Thickness · 16 / 18 / 20 / 30 mm · 20 mm unless otherwise specified
              <br />
              Tolerance · ± 1.5 mm on thickness, ± 5 mm on length and width
            </Mono>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow className="mb-3">Edges</Eyebrow>
            <Mono className="text-ink">{EDGE_PROFILES.join(" · ")}</Mono>
            <Body size="body-s" className="mt-4">
              Unsupported spans, fixing details and substrate requirements are
              in the technical datasheet for each stone. Where a detail is
              unusual, write to us before the drawing is issued rather than
              after.
            </Body>
          </div>
        </div>
      </section>

      <section className="gutter border-t border-line py-16 md:py-24">
        <h2 className="mb-4 font-display text-h2-fluid text-ink">
          Lead times, stated honestly and dated.
        </h2>
        <Body className="mb-8">
          From order to arrival at an Indian site, including fabrication and
          inland freight. International freight is quoted separately.
        </Body>
        <ScrollArea className="bg-surface">
          <table className="w-full min-w-[420px]">
            <thead>
              <tr>
                <th scope="col" className="border-b border-line px-4 py-3 text-left font-ui text-label-xs font-medium uppercase text-ink-3">
                  Origin
                </th>
                <th scope="col" className="border-b border-line px-4 py-3 text-left font-ui text-label-xs font-medium uppercase text-ink-3">
                  Lead time
                </th>
              </tr>
            </thead>
            <tbody>
              {LEAD_TIMES.map((row) => (
                <tr key={row.origin}>
                  <td className="border-b border-line px-4 py-3 font-mono text-data-s text-ink">
                    {row.origin}
                  </td>
                  <td className="border-b border-line px-4 py-3 font-mono text-data-s text-ink-2">
                    {row.weeks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        <Mono size="data-s" className="mt-4">
          Updated {shortDate(LEAD_TIMES_UPDATED)}
        </Mono>
        <Body className="mt-6">
          These are the times we actually achieve, not the times we would like
          to. If a project cannot accommodate eleven weeks for Carrara, say so
          at the outset and we will show you what is already here.
        </Body>
      </section>

      <section id="samples" className="gutter scroll-mt-28 border-t border-line py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-6">
            <h2 className="font-display text-h2-fluid text-ink">Samples.</h2>
            <Body>
              Up to five, 100 × 100 mm, cut from the actual block in the library
              and not from a reference set. Free anywhere in India. Charged at
              cost elsewhere.
            </Body>
            <Body>
              A sample tells you the colour and the finish. It cannot tell you
              the drawing, because the drawing is three metres wide. For that
              you need the viewing.
            </Body>
            <RuleLink href="/viewing?intent=samples">Order samples</RuleLink>
          </div>
        </div>
      </section>

      {/* Questions we are asked. The one block Volume Two did not specify;
          it sits in the same list rhythm as the sections above. */}
      <section className="gutter border-t border-line py-16 md:py-24">
        <h2 className="mb-10 font-display text-h2-fluid text-ink">
          Questions we are asked.
        </h2>
        <dl className="border-t border-line">
          {ARCHITECT_FAQS.map((item) => (
            <div key={item.q} className="grid gap-3 border-b border-line py-6 lg:grid-cols-12 lg:gap-10">
              <dt className="font-ui text-h4 text-ink lg:col-span-4">{item.q}</dt>
              <dd className="text-body text-ink-2 lg:col-span-7 lg:col-start-6">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="gutter border-t border-line py-16">
        <Body className="mb-6">
          Practices we work with regularly hold an account here: reserved stock,
          allocation holds and pricing. Pricing does not appear anywhere on the
          public site and never will.
        </Body>
        <RuleLink href="/architects/sign-in">Trade sign-in</RuleLink>
      </section>

      <Footer contextual={{ label: "The Index", href: "/architects/downloads" }} />
    </>
  );
}
