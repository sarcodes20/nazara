"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { dimensions } from "@/lib/utils";
import { img, BLUR, SIZES } from "@/lib/images";
import type { Stone } from "@/lib/types";
import { useSelection } from "@/components/selection/SelectionProvider";

/**
 * The component that carries the whole brand (Volume Two §04).
 *
 * No border, no background, no shadow, no radius. Separation comes entirely
 * from the grid gap. The spec line is mandatory and never abbreviated — it is
 * the card's proof of provenance and the single detail that separates it from
 * every competitor's product tile.
 */
export function SlabCard({
  stone,
  priority = false,
  className,
}: {
  stone: Stone;
  priority?: boolean;
  className?: string;
}) {
  const { has, toggle } = useSelection();
  const inSelection = has(stone.slug);
  const remaining = stone.slabs.filter((s) => s.status === "available").length;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/library/${stone.slug}`}
        data-cursor="View"
        className="flex flex-col focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative aspect-[1.684] overflow-hidden bg-surface">
          <Image
            src={img.stoneTypology(stone.slug)}
            alt={`${stone.name}: ${stone.character.toLowerCase()}`}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={SIZES.card}
            placeholder="blur"
            blurDataURL={BLUR.dark}
            className={cn(
              "object-cover transition-transform duration-image ease-stone",
              "group-hover:scale-[1.03]",
              // Reserved stock is never hidden — history is part of the library.
              remaining === 0 && "grayscale",
            )}
          />
        </div>

        {/* The Backlight rule grows above the caption. Never a border. */}
        <div className="relative pt-5">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-[500ms] ease-stone group-hover:w-full"
          />
          <h3 className="font-display text-h4 leading-tight text-ink md:text-[1.5rem]">
            {stone.name}
          </h3>
          <p data-numeric className="mt-2 font-mono text-data-s uppercase text-ink-3">
            {stone.family} ·{" "}
            {dimensions(stone.slabSize[0], stone.slabSize[1], stone.thicknesses.at(-1))} ·
            Block {stone.block.id} ·{" "}
            {remaining === 0 ? (
              <span className="text-error">Reserved</span>
            ) : (
              `${remaining} ${remaining === 1 ? "slab" : "slabs"}`
            )}
          </p>
        </div>
      </Link>

      <button
        onClick={() => toggle(stone.slug)}
        aria-pressed={inSelection}
        className={cn(
          "mt-3 w-fit font-mono text-data-s uppercase transition-colors duration-state ease-cut",
          "opacity-0 focus-visible:opacity-100 group-hover:opacity-100",
          inSelection ? "text-success opacity-100" : "text-ink-3 hover:text-ink",
        )}
      >
        {inSelection ? "In selection" : "Add to selection"}
      </button>
    </article>
  );
}
