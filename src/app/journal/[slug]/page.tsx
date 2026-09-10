import { notFound } from "next/navigation";
import Link from "next/link";
import { JOURNAL, JOURNAL_SORTED, getEntry } from "@/data/journal";
import { getStone } from "@/data/stones";
import { SITE } from "@/data/site";
import { meta, clamp } from "@/lib/seo";
import { longDate } from "@/lib/utils";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";
import { MasonLine } from "@/components/motion/MasonLine";
import { RuleLink } from "@/components/ui/Button";
import { SlabCard } from "@/components/site/SlabCard";
import { Footer } from "@/components/site/Footer";

export function generateStaticParams() {
  return JOURNAL.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return meta({
    title: entry.title.replace(/\.$/, ""),
    ogTitle: entry.title,
    description: clamp(entry.standfirst),
    path: `/journal/${entry.slug}`,
  });
}

/**
 * Long-form measure at body-l, columns 2–7. The pull quote is the only place
 * on the site where Bodoni interrupts running text, and there is at most one
 * per piece.
 */
export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const stones = entry.stoneSlugs.map(getStone).filter(Boolean);
  const index = JOURNAL_SORTED.findIndex((j) => j.slug === entry.slug);
  const next = JOURNAL_SORTED[(index + 1) % JOURNAL_SORTED.length]!;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.standfirst,
    datePublished: entry.published,
    articleSection: entry.column,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/journal/${entry.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <header className="gutter grid gap-6 pb-12 pt-32 md:pt-40 lg:grid-cols-12 lg:pt-48">
          <div className="flex flex-col gap-5 lg:col-span-7 lg:col-start-2">
            <Eyebrow>
              <Link href="/journal" className="hover:text-ink">
                The Journal
              </Link>{" "}
              / {entry.column}
            </Eyebrow>
            <MasonLine
              as="h1"
              immediate
              lines={[entry.title]}
              className="font-display text-h1-fluid text-ink"
            />
            <Body size="lead">{entry.standfirst}</Body>
            <Mono size="data-s">
              <time dateTime={entry.published}>{longDate(entry.published)}</time>
            </Mono>
          </div>
        </header>

        <div className="gutter grid gap-6 pb-16 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-2">
            {entry.body.map((para, i) => (
              <div key={para.slice(0, 28)} className="flex flex-col gap-6">
                <p className="max-w-[62ch] text-body-l text-ink-2">{para}</p>
                {entry.pull && entry.pull.after === i ? (
                  <blockquote className="my-6 border-l border-accent py-2 pl-6">
                    <p className="max-w-[24ch] font-display text-h3-fluid text-ink">
                      {entry.pull.text}
                    </p>
                  </blockquote>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </article>

      {stones.length > 0 ? (
        <section className="viewing-room bg-ground section-y">
          <div className="gutter">
            <Eyebrow className="mb-8">Stones in this piece</Eyebrow>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {stones.map((stone) => (
                <SlabCard key={stone!.slug} stone={stone!} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="gutter py-16">
        <RuleLink href={`/journal/${next.slug}`}>{next.title} →</RuleLink>
      </section>

      <Footer contextual={{ label: "The Journal", href: "/journal" }} />
    </>
  );
}
