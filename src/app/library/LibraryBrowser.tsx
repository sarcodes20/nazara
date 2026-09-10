"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Stone } from "@/lib/types";
import { FILTER_FACETS } from "@/data/stones";
import { cn, spellOut } from "@/lib/utils";
import { img, BLUR, SIZES } from "@/lib/images";
import { DUR, EASE } from "@/lib/motion";
import { SlabCard } from "@/components/site/SlabCard";
import { Button, RuleLink } from "@/components/ui/Button";
import { Eyebrow, Mono, Body } from "@/components/ui/primitives";

type View = "cards" | "typology";
type Sort = "newest" | "az" | "slabs";
type Facet = keyof typeof FILTER_FACETS;

const PER_PAGE = 24;

const SORTS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "az", label: "A–Z" },
  { id: "slabs", label: "Slabs remaining" },
];

function available(stone: Stone) {
  return stone.slabs.filter((s) => s.status === "available").length;
}

/**
 * Filters are plain text lists with mono counts rather than dropdowns: a
 * specifier scans a list faster than they open a menu.
 *
 * There is no loading state on filtering at all. Framer's `layout` prop gives
 * a FLIP transition — survivors move, departures fade first so the layout
 * never jumps under the cursor — and the result count crossfades rather than
 * counting up.
 */
export function LibraryBrowser({ stones }: { stones: Stone[] }) {
  const [view, setView] = useState<View>("cards");
  const [sort, setSort] = useState<Sort>("newest");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [page, setPage] = useState(1);
  const [sheet, setSheet] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const activeCount = Object.values(filters).flat().length;

  const toggle = (facet: string, value: string) => {
    setPage(1);
    setFilters((f) => {
      const current = f[facet] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return next.length ? { ...f, [facet]: next } : omit(f, facet);
    });
  };

  const results = useMemo(() => {
    const matched = stones.filter((stone) =>
      Object.entries(filters).every(([facet, values]) => {
        if (!values.length) return true;
        switch (facet as Facet) {
          case "Family":
            return values.includes(stone.family);
          case "Colour":
            return stone.colour.some((c) => values.includes(c));
          case "Origin":
            return values.includes(stone.originShort);
          case "Finish":
            return stone.finishes.some((f) => values.includes(f));
          default:
            return true;
        }
      }),
    );

    return [...matched].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "slabs") return available(b) - available(a);
      return b.block.cutOn.localeCompare(a.block.cutOn);
    });
  }, [stones, filters, sort]);

  const shown = results.slice(0, page * PER_PAGE);
  const remaining = results.length - shown.length;

  return (
    <div className="gutter pb-28">
      {/* Controls. Mono text links only — no selects, no segmented control. */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSheet(true)}
            className="font-mono text-data-s uppercase text-ink lg:hidden"
          >
            Filter{activeCount ? ` (${activeCount})` : ""}
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={results.length}
              data-numeric
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.instant }}
              className="font-mono text-data-s uppercase text-ink-3"
            >
              {results.length} stones
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Toggle
            label="View"
            options={[
              { id: "cards", label: "Cards" },
              { id: "typology", label: "Typology" },
            ]}
            value={view}
            onChange={(v) => setView(v as View)}
          />
          <Toggle
            label="Sort"
            options={SORTS}
            value={sort}
            onChange={(v) => setSort(v as Sort)}
          />
        </div>
      </div>

      <div className={cn("lg:grid lg:gap-8", view === "cards" && "lg:grid-cols-12")}>
        {/* Filter rail. Collapses to a single line in typology mode so the
            wall gets the full width. */}
        {view === "cards" ? (
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-[120px] flex flex-col gap-9">
              {(Object.keys(FILTER_FACETS) as Facet[]).map((facet) => (
                <div key={facet}>
                  <Eyebrow className="mb-3">{facet}</Eyebrow>
                  <ul className="flex flex-col">
                    {FILTER_FACETS[facet].map((value) => {
                      const on = filters[facet]?.includes(value) ?? false;
                      const count = stones.filter((s) =>
                        facet === "Family"
                          ? s.family === value
                          : facet === "Colour"
                            ? s.colour.includes(value)
                            : facet === "Origin"
                              ? s.originShort === value
                              : s.finishes.includes(value as never),
                      ).length;
                      return (
                        <li key={value}>
                          <button
                            onClick={() => toggle(facet, value)}
                            aria-pressed={on}
                            className={cn(
                              "flex w-full items-baseline justify-between gap-3 border-l py-1.5 pl-3 text-left text-body-s transition-colors duration-state ease-cut",
                              on
                                ? "border-accent text-ink"
                                : "border-transparent text-ink-2 hover:text-ink",
                            )}
                          >
                            <span>{value}</span>
                            <span data-numeric className="font-mono text-[0.625rem] text-ink-3">
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {activeCount > 0 ? (
                <button
                  onClick={() => {
                    setFilters({});
                    setPage(1);
                  }}
                  className="w-fit font-mono text-data-s uppercase text-ink-3 transition-colors duration-state hover:text-ink"
                >
                  Clear {spellOut(activeCount)} filter
                  {activeCount === 1 ? "" : "s"}
                </button>
              ) : null}
            </div>
          </aside>
        ) : null}

        <div className={cn(view === "cards" ? "lg:col-span-9 lg:col-start-4" : "w-full")}>
          {results.length === 0 ? (
            <div className="flex flex-col gap-8 py-10">
              <Body className="text-ink">
                No stone matches those filters. The nearest is{" "}
                {stones[0]!.name}.
              </Body>
              <div className="max-w-md">
                <SlabCard stone={stones[0]!} />
              </div>
            </div>
          ) : view === "cards" ? (
            <motion.div layout className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {shown.map((stone, i) => (
                  <motion.div
                    key={stone.slug}
                    layout={!reduced}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: DUR.element, ease: EASE.stone }}
                  >
                    <SlabCard stone={stone} priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <>
              <Mono size="data-s" className="mb-5">
                Every stone at the same distance, in the same light, on the same
                wall. Names appear when you point at one.
              </Mono>
              {/* The hovered tile holds full opacity and the rest of the wall
                  drops back. This cannot be done with `group-hover` alone,
                  because a tile has to react to a sibling being hovered, not
                  to itself — so the wall owns the state and the tiles read it. */}
              <motion.div
                layout
                className="grid grid-cols-3 gap-[3px] md:grid-cols-4 lg:grid-cols-6"
                onMouseLeave={() => setHoveredTile(null)}
              >
                {shown.map((stone) => {
                  const dimmed = hoveredTile !== null && hoveredTile !== stone.slug;
                  return (
                    <motion.div key={stone.slug} layout={!reduced}>
                      <Link
                        href={`/library/${stone.slug}`}
                        data-cursor="View"
                        onMouseEnter={() => setHoveredTile(stone.slug)}
                        onFocus={() => setHoveredTile(stone.slug)}
                        className="group relative block aspect-[1.684] overflow-hidden"
                      >
                        <Image
                          src={img.stoneTypology(stone.slug)}
                          alt={`${stone.name}, shot square against a black wall`}
                          fill
                          sizes={SIZES.tile}
                          placeholder="blur"
                          blurDataURL={BLUR.dark}
                          className={cn(
                            "object-cover transition-opacity duration-rule ease-cut",
                            dimmed ? "opacity-55" : "opacity-100",
                          )}
                        />
                        <span className="absolute bottom-2 left-2 font-mono text-[0.625rem] uppercase text-white opacity-0 transition-opacity duration-state group-hover:opacity-100 group-focus-visible:opacity-100">
                          {stone.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}

          {remaining > 0 ? (
            <div className="mt-16 flex flex-col gap-4">
              <Mono size="data-s">
                1–{shown.length} of {results.length}
              </Mono>
              <RuleLink href="#" onClick={(e) => { e.preventDefault(); setPage((p) => p + 1); }}>
                The next {spellOut(Math.min(remaining, PER_PAGE))}
              </RuleLink>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile filter sheet: rises from the bottom edge on ease-lift, with a
          fixed action stating the result rather than saying "Apply". */}
      <AnimatePresence>
        {sheet ? (
          <motion.div
            className="viewing-room fixed inset-0 z-[300] flex flex-col bg-ground lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.32, ease: EASE.cut } }}
            transition={{ duration: DUR.element, ease: EASE.lift }}
          >
            <div className="flex-1 overflow-y-auto px-5 py-8">
              {(Object.keys(FILTER_FACETS) as Facet[]).map((facet) => (
                <div key={facet} className="mb-8">
                  <Eyebrow className="mb-3">{facet}</Eyebrow>
                  <ul className="flex flex-wrap gap-2">
                    {FILTER_FACETS[facet].map((value) => {
                      const on = filters[facet]?.includes(value) ?? false;
                      return (
                        <li key={value}>
                          <button
                            onClick={() => toggle(facet, value)}
                            aria-pressed={on}
                            className={cn(
                              "border px-4 py-2 font-mono text-data-s uppercase transition-colors duration-state",
                              on
                                ? "border-accent text-ink"
                                : "border-line text-ink-2",
                            )}
                          >
                            {value}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-line p-5">
              <Button
                variant="ink"
                className="w-full"
                onClick={() => setSheet(false)}
              >
                Show {results.length} stones
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3">
        {label}
      </span>
      <div className="flex gap-4">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={cn(
              "relative pb-1 font-mono text-data-s uppercase transition-colors duration-state",
              value === o.id
                ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent"
                : "text-ink-3 hover:text-ink",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function omit<T extends Record<string, unknown>>(obj: T, key: string) {
  const { [key]: _, ...rest } = obj;
  return rest as T;
}
