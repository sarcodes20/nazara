import { notFound } from "next/navigation";
import Link from "next/link";
import { STONES, getStone } from "@/data/stones";
import { worksUsingStone } from "@/data/works";
import { img, SIZES } from "@/lib/images";
import { meta, clamp } from "@/lib/seo";
import { stoneSchema } from "@/lib/schema";
import { dimensions, shortDate } from "@/lib/utils";
import { Curtain } from "@/components/motion/Curtain";
import { MasonLine, Rise } from "@/components/motion/MasonLine";
import { Body, Eyebrow, Mono, ScrollArea, StatusTag } from "@/components/ui/primitives";
import { RuleLink } from "@/components/ui/Button";
import { SlabCard } from "@/components/site/SlabCard";
import { BookmatchViewer } from "@/components/site/BookmatchViewer";
import { StoneActions } from "@/components/site/StoneActions";
import { Footer } from "@/components/site/Footer";

/** Statically rendered; the library changes weekly, not hourly. */
export const revalidate = 3600;

export function generateStaticParams() {
  return STONES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stone = getStone(slug);
  if (!stone) return {};
  const remaining = stone.slabs.filter((s) => s.status === "available").length;
  return meta({
    title: `${stone.name} · ${stone.family} from ${stone.originShort}`,
    ogTitle: stone.name,
    description: clamp(
      `${stone.character} Block ${stone.block.id}, ${remaining} slabs in the library. ${stone.finishes.join(", ")}.`,
    ),
    path: `/library/${stone.slug}`,
    image: img.stoneTypology(stone.slug),
  });
}

export default async function StonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stone = getStone(slug);
  if (!stone) notFound();

  const remaining = stone.slabs.filter((s) => s.status === "available").length;
  const works = worksUsingStone(stone.slug);
  const adjacent = stone.adjacent
    .map((a) => ({ stone: getStone(a.slug), reason: a.reason }))
    .filter((a) => a.stone);

  const specLine = `MARBLE: NAZARA '${stone.name.toUpperCase()}', VEIN-CUT, ${stone.finishes[0]!.toUpperCase()}, ${stone.thicknesses.at(-1)} MM, BOOKMATCHED PAIRS, BLOCK ${stone.block.id}. SUPPLIER: NAZARA, KISHANGARH, RAJASTHAN.`;

  return (
    <div className="viewing-room bg-ground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stoneSchema(stone)) }}
      />

      {/* §1 Hero — the typology photograph, full bleed, no text over it. */}
      <div className="pt-16 md:pt-[88px]">
        <Curtain
          src={img.stoneTypology(stone.slug)}
          alt={`${stone.name}, shot square against a black wall in raking light`}
          edge="left"
          ratio="slab"
          tone="dark"
          immediate
          priority
          sizes={SIZES.full}
          className="w-full"
        />
        <div className="gutter py-4">
          <Mono size="data-s">
            {stone.name} · Block {stone.block.id} · {stone.block.bench} · Cut{" "}
            {shortDate(stone.block.cutOn)}
          </Mono>
        </div>
      </div>

      {/* §2 Identity, and §2b the sticky block panel. */}
      <section className="gutter grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-2">
          <Eyebrow>
            <Link href="/library" className="hover:text-ink">
              Library
            </Link>{" "}
            / {stone.family} / {stone.originShort}
          </Eyebrow>

          <MasonLine
            as="h1"
            immediate
            lines={[stone.name]}
            className="font-display text-h1-fluid text-ink"
          />

          <Mono>
            {stone.family} · {stone.geology} · {stone.origin} ·{" "}
            {dimensions(stone.slabSize[0], stone.slabSize[1])} ·{" "}
            {stone.thicknesses.join(" / ")} mm
          </Mono>

          <Rise>
            <Body className="text-ink">{stone.character}</Body>
          </Rise>

          {stone.body.map((para) => (
            <Body key={para.slice(0, 24)}>{para}</Body>
          ))}

          <div className="mt-4 flex flex-col gap-3">
            <Eyebrow>Available finishes</Eyebrow>
            <Mono className="text-ink">{stone.finishes.join(" · ")}</Mono>
            <Body size="body-s">{stone.finishNote}</Body>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-8">
          <div className="sticky top-[120px] border border-line bg-surface p-6">
            <Eyebrow className="mb-5">The block</Eyebrow>
            <Mono size="data-s" className="leading-[2] text-ink">
              Block {stone.block.id}
              <br />
              {stone.block.bench}
              <br />
              Quarried {shortDate(stone.block.quarriedOn)}
              <br />
              Cut {shortDate(stone.block.cutOn)}
              <br />
              {remaining} of {stone.block.slabsTotal} slabs remain
              {stone.block.siblings.length ? (
                <>
                  <br />
                  Siblings: {stone.block.siblings.join(", ")}
                </>
              ) : null}
            </Mono>

            <StoneActions slug={stone.slug} specLine={specLine} />
          </div>
        </aside>
      </section>

      {/* §3 The bookmatch viewer — the signature interaction. */}
      <BookmatchViewer
        src={img.stoneBookmatch(stone.slug)}
        name={stone.name}
      />

      {/* §4 The slab index. Every physical slab from this block. */}
      <section className="gutter py-20">
        <Eyebrow className="mb-6">The slabs</Eyebrow>
        <ScrollArea>
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr>
                {["Slab", "Dimensions", "Thickness", "Finish", "Status"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-line px-4 py-3 text-left font-ui text-label-xs font-medium uppercase text-ink-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stone.slabs.map((slab) => (
                <tr
                  key={slab.id}
                  className="transition-colors duration-state ease-cut hover:bg-raised"
                >
                  <td className="border-b border-line px-4 py-3 font-mono text-data-s text-ink">
                    {slab.id}
                  </td>
                  <td className="border-b border-line px-4 py-3 font-mono text-data-s text-ink-2">
                    {slab.length} × {slab.width} mm
                  </td>
                  <td className="border-b border-line px-4 py-3 font-mono text-data-s text-ink-2">
                    {slab.thickness} mm
                  </td>
                  <td className="border-b border-line px-4 py-3 font-mono text-data-s text-ink-2">
                    {slab.finish}
                  </td>
                  <td className="border-b border-line px-4 py-3">
                    <StatusTag status={slab.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </section>

      {/* §5 In situ. Omitted entirely if the stone has never been installed —
          never replaced with a render or a stock room. */}
      {works.length > 0 ? (
        <section className="gutter grid gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Curtain
              src={img.workHero(works[0]!.slug)}
              alt={`${works[0]!.name} in ${works[0]!.city}, its surfaces lined in ${stone.name}`}
              ratio="plane"
              tone="dark"
              sizes={SIZES.half}
            />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Eyebrow>In situ</Eyebrow>
            {works.map((w) => (
              <RuleLink key={w.slug} href={`/works/${w.slug}`}>
                {w.name}, {w.city} · {w.year}
              </RuleLink>
            ))}
          </div>
        </section>
      ) : null}

      {/* §6 Adjacent. Never "you may also like". */}
      {adjacent.length > 0 ? (
        <section className="gutter py-20">
          <Eyebrow className="mb-8">Behaves similarly</Eyebrow>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {adjacent.map(({ stone: s, reason }) => (
              <div key={s!.slug} className="flex flex-col gap-3">
                <SlabCard stone={s!} />
                <Body size="body-s" className="text-ink-3">
                  {reason}
                </Body>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <Footer contextual={{ label: "For architects", href: "/architects" }} />
    </div>
  );
}
