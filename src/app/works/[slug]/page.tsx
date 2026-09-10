import { notFound } from "next/navigation";
import { WORKS, getWork } from "@/data/works";
import { getStone } from "@/data/stones";
import { img, SIZES } from "@/lib/images";
import { meta, clamp } from "@/lib/seo";
import { workSchema } from "@/lib/schema";
import { Curtain } from "@/components/motion/Curtain";
import { MasonLine, Rise } from "@/components/motion/MasonLine";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";
import { RuleLink } from "@/components/ui/Button";
import { SlabCard } from "@/components/site/SlabCard";
import { Footer } from "@/components/site/Footer";

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return meta({
    title: `${work.name}, ${work.city} · ${work.year}`,
    ogTitle: `${work.name}, ${work.city}`,
    description: clamp(
      `${work.stoneLine}, ${work.area} m². ${work.brief[0]}`,
    ),
    path: `/works/${work.slug}`,
    image: img.workHero(work.slug),
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const stones = work.stoneSlugs.map(getStone).filter(Boolean);
  const index = WORKS.findIndex((w) => w.slug === work.slug);
  const next = WORKS[(index + 1) % WORKS.length]!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema(work)) }}
      />

      <div className="pt-16 md:pt-[88px]">
        <Curtain
          src={img.workHero(work.slug)}
          alt={`${work.name} in ${work.city} at dusk, its surfaces lined in ${work.stoneLine.toLowerCase()}`}
          edge="bottom"
          ratio="bench"
          immediate
          priority
          sizes={SIZES.full}
          className="w-full"
        />
      </div>

      <section className="gutter grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-2">
          <MasonLine
            as="h1"
            immediate
            lines={[work.name, work.city]}
            className="font-display text-h1-fluid text-ink"
          />
          <Mono>
            {work.year} · {work.city} · {work.area} m² · {work.stoneLine} ·
            Architect {work.architect} · Photographs {work.photographer}
          </Mono>

          <Rise>
            <Eyebrow className="mb-3">The brief</Eyebrow>
            <div className="flex flex-col gap-5">
              {work.brief.map((para) => (
                <Body key={para.slice(0, 24)}>{para}</Body>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      {/* Sequence: never two images the same size in a row. */}
      <section className="flex flex-col gap-6">
        <div className="gutter grid gap-6 lg:grid-cols-12">
          <Curtain
            src={img.workPlane(work.slug, 1)}
            alt={`A ${work.stoneLine.toLowerCase()} plane meeting a plaster wall across a shadow gap`}
            ratio="plane"
            sizes={SIZES.half}
            className="lg:col-span-7"
          />
          <Curtain
            src={img.workPlane(work.slug, 2)}
            alt="A mitred stone corner in raking afternoon light"
            ratio="block"
            delay={0.12}
            sizes={SIZES.card}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          />
        </div>

        <Curtain
          src={img.workPlane(work.slug, 3)}
          alt={`The principal room at ${work.name}, ${work.city}, in north light`}
          edge="bottom"
          ratio="bench"
          sizes={SIZES.full}
          className="w-full"
        />
      </section>

      {/* Stones used — closes the loop from a finished room to the block. */}
      <section className="viewing-room bg-ground section-y">
        <div className="gutter">
          <Eyebrow className="mb-8">Stones used</Eyebrow>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {stones.map((stone) => (
              <SlabCard key={stone!.slug} stone={stone!} />
            ))}
          </div>
          <Mono size="data-s" className="mt-8">
            {work.stonesUsed}
          </Mono>
        </div>
      </section>

      {/* One next work, never a grid of three. */}
      <section className="gutter py-16">
        <RuleLink href={`/works/${next.slug}`}>
          {next.name}, {next.city} →
        </RuleLink>
      </section>

      <Footer
        contextual={{
          label: "Stones used in this project",
          href: `/library/${work.stoneSlugs[0]}`,
        }}
      />
    </>
  );
}
