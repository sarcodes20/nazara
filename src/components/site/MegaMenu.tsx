"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { STONES, FAMILY_COUNTS } from "@/data/stones";
import { img, BLUR } from "@/lib/images";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { spellOut } from "@/lib/utils";
import { RuleLink } from "@/components/ui/Button";
import { Mono } from "@/components/ui/primitives";

const FAMILIES = [
  "Marble",
  "Granite",
  "Onyx",
  "Quartzite",
  "Limestone",
  "Semi-precious",
] as const;

/**
 * Full-width Viewing Room panel, wiping down from the header edge.
 * Closes faster than it opens — 320ms out against 480ms in.
 */
export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const featured = STONES[0]!;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="viewing-room absolute inset-x-0 top-full hidden overflow-hidden border-t border-line bg-ground shadow-lift lg:block"
          initial={{ height: 0 }}
          animate={{ height: 420 }}
          exit={{ height: 0, transition: { duration: 0.32, ease: EASE.cut } }}
          transition={{ duration: DUR.element, ease: EASE.lift }}
        >
          <div className="gutter grid h-[420px] grid-cols-12 gap-8 py-12">
            <div className="col-span-8 grid grid-cols-4 gap-8">
              {FAMILIES.map((family, i) => {
                const count = FAMILY_COUNTS[family] ?? 0;
                return (
                  <motion.div
                    key={family}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DUR.rule,
                      ease: EASE.stone,
                      delay: i * STAGGER,
                    }}
                  >
                    <Link
                      href={`/library?family=${family.toLowerCase()}`}
                      onClick={onClose}
                      className="group flex items-baseline gap-3"
                    >
                      <span className="font-display text-h4 text-ink transition-colors duration-state group-hover:text-accent">
                        {family}
                      </span>
                      <span
                        data-numeric
                        className="font-mono text-data-s text-ink-3"
                      >
                        {count}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="col-span-4 mt-auto flex gap-10">
                <RuleLink href="/library" onClick={onClose}>
                  All {spellOut(STONES.length)} stones
                </RuleLink>
                <RuleLink href="/architects" onClick={onClose}>
                  For architects
                </RuleLink>
              </div>
            </div>

            <motion.div
              className="col-span-4"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: DUR.reveal, ease: EASE.stone, delay: 0.1 }}
            >
              <Link href={`/library/${featured.slug}`} onClick={onClose}>
                <div className="relative aspect-[1.684] overflow-hidden">
                  <Image
                    src={img.stoneTypology(featured.slug)}
                    alt={`${featured.name}, shot square against a black wall`}
                    fill
                    sizes="33vw"
                    placeholder="blur"
                    blurDataURL={BLUR.dark}
                    className="object-cover"
                  />
                </div>
                <Mono size="data-s" className="mt-3">
                  {featured.name} · Block {featured.block.id} ·{" "}
                  {featured.slabs.filter((s) => s.status === "available").length} slabs
                </Mono>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
