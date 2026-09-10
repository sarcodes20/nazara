"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { STONES } from "@/data/stones";
import { img, BLUR, SIZES } from "@/lib/images";
import { cn, spellOut } from "@/lib/utils";
import { DUR, EASE, STAGGER, STAGGER_CAP, VIEWPORT } from "@/lib/motion";
import { Eyebrow, Body } from "@/components/ui/primitives";
import { MasonLine } from "@/components/motion/MasonLine";
import { RuleLink } from "@/components/ui/Button";
import { SlabCard } from "@/components/site/SlabCard";

/**
 * §04 · The typology wall. Twelve identical frames, six across, 3px gap — the
 * tightest gap in the system, because these are one object rather than twelve.
 *
 * Hovering holds one tile at full opacity and drops the other eleven to 55%.
 * That is exactly what a person does with their hands at a slab yard, and it
 * is the most persuasive interaction on the site.
 */
export function TypologyWall() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // A 4% row differential — well under the 12% parallax ceiling. Just enough
  // that the wall breathes without anyone being able to say what is moving.
  const rowA = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const rowB = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  const tiles = [...STONES, ...STONES].slice(0, 12);

  return (
    <section ref={ref} className="relative z-10 bg-ground section-y">
      <div className="gutter mb-14 flex flex-col gap-6">
        <Eyebrow>The library</Eyebrow>
        <MasonLine
          as="h2"
          lines={[
            "Forty-one stones, photographed in one",
            "frame, so that comparison is honest.",
          ]}
          className="max-w-[22ch] font-display text-h2-fluid text-ink"
        />
        <Body>
          Same wall. Same light. Same distance. Every slab we have kept, since
          the first.
        </Body>
      </div>

      {/* Full bleed: the wall ignores the page margins entirely. */}
      <div
        className="flex flex-col gap-[3px] overflow-hidden"
        onMouseLeave={() => setHovered(null)}
      >
        {[0, 1].map((row) => (
          <motion.div
            key={row}
            className="grid grid-cols-3 gap-[3px] md:grid-cols-4 lg:grid-cols-6"
            style={reduced ? undefined : { x: row === 0 ? rowA : rowB }}
          >
            {tiles.slice(row * 6, row * 6 + 6).map((stone, i) => {
              const index = row * 6 + i;
              const dimmed = hovered !== null && hovered !== index;
              return (
                <motion.div
                  key={`${stone.slug}-${index}`}
                  className={cn(
                    // Two of twelve are hidden below the 6-up breakpoint: the
                    // point of the wall is comparison, not count.
                    index >= 8 && "hidden lg:block",
                  )}
                  initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
                  whileInView={
                    reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0 0)" }
                  }
                  viewport={VIEWPORT}
                  transition={{
                    duration: DUR.curtain,
                    ease: EASE.stone,
                    delay: Math.min(index, STAGGER_CAP) * STAGGER,
                  }}
                >
                  <Link
                    href={`/library/${stone.slug}`}
                    data-cursor="View"
                    onMouseEnter={() => setHovered(index)}
                    onFocus={() => setHovered(index)}
                    className="group relative block aspect-[1.684] overflow-hidden"
                  >
                    <Image
                      src={img.stoneTypology(stone.slug)}
                      alt={`${stone.name}, shot square against a black wall`}
                      fill
                      loading="lazy"
                      sizes={SIZES.tile}
                      placeholder="blur"
                      blurDataURL={BLUR.dark}
                      className={cn(
                        "object-cover transition-opacity duration-rule ease-cut",
                        dimmed ? "opacity-55" : "opacity-100",
                      )}
                    />
                    <span className="absolute bottom-2 left-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-state group-hover:opacity-100 group-focus-visible:opacity-100">
                      {stone.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>

      <div className="gutter mt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {STONES.slice(0, 3).map((stone, i) => (
            <SlabCard key={stone.slug} stone={stone} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""} />
          ))}
        </div>
        <div className="mt-14">
          <RuleLink href="/library">All {spellOut(41)}</RuleLink>
        </div>
      </div>
    </section>
  );
}
