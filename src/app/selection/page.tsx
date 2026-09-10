import { Suspense } from "react";
import type { Metadata } from "next";
import { STONE_MAP } from "@/data/stones";
import { SlabCard } from "@/components/site/SlabCard";
import { Body, Eyebrow } from "@/components/ui/primitives";
import { RuleLink } from "@/components/ui/Button";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Your Selection",
  description:
    "The stones you have set aside. Download as a PDF, share the link, or bring the list to a viewing.",
  robots: { index: false, follow: false },
};

/**
 * A shared selection travels in the URL rather than in a database: the link is
 * the record, it works for anyone who receives it, and nobody has to hold an
 * account to keep one.
 */
export default async function SelectionPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const { s } = await searchParams;
  const stones = (s?.split(",") ?? [])
    .map((slug) => STONE_MAP.get(slug))
    .filter(Boolean);

  return (
    <>
      <section className="gutter pb-14 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-5">
          <Eyebrow>Selection</Eyebrow>
          <h1 className="font-display text-display-fluid-m text-ink">
            {stones.length ? `${stones.length} stones.` : "Nothing selected yet."}
          </h1>
          <Body>
            {stones.length
              ? "Bring this list to a viewing, or send it on. The link holds the selection. Nobody needs an account."
              : "Add a stone from the library and it will wait here."}
          </Body>
          <RuleLink href={stones.length ? "/viewing?from=selection" : "/library"}>
            {stones.length ? "Request a viewing of these" : "The library"}
          </RuleLink>
        </div>
      </section>

      <section className="gutter pb-28">
        <Suspense>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {stones.map((stone) => (
              <SlabCard key={stone!.slug} stone={stone!} />
            ))}
          </div>
        </Suspense>
      </section>

      <Footer />
    </>
  );
}
