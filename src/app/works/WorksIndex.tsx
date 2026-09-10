"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Work } from "@/lib/types";
import { img, BLUR } from "@/lib/images";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A list, not a grid — a grid of thumbnails is how a portfolio admits it has
 * too many. All six fit one viewport at 1440px, which is the whole argument.
 *
 * The floating hover panel carries the only tilt permitted anywhere in the
 * system, and it is on a floating panel rather than on a card: velocity is
 * damped through a spring and clamped to 6°, so it reads as weight rather
 * than as a 3D effect.
 *
 * On mobile this becomes a stack of 4:5 cards. The list is a desktop idea and
 * is not faked with a tap.
 */
export function WorksIndex({ works }: { works: Work[] }) {
  const [hovered, setHovered] = useState<Work | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 34, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 34, mass: 0.6 });
  const rotate = useTransform(sx, [-600, 600], [-6, 6], { clamp: true });

  return (
    <>
      {/* Desktop list */}
      <div
        className="gutter hidden pb-28 lg:block"
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        <ul className="border-t border-line">
          {works.map((work, i) => (
            <motion.li
              key={work.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.reveal,
                ease: EASE.stone,
                delay: i * STAGGER,
              }}
              className="border-b border-line"
            >
              <Link
                href={`/works/${work.slug}`}
                data-cursor="View"
                onPointerEnter={() => setHovered(work)}
                onFocus={() => setHovered(work)}
                className={cn(
                  "group relative grid h-[88px] grid-cols-12 items-center gap-6",
                  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent",
                  "after:transition-[width] after:duration-rule after:ease-stone hover:after:w-full",
                )}
              >
                <span data-numeric className="col-span-2 font-mono text-data-s uppercase text-ink-3">
                  {work.year} · {work.city}
                </span>
                <span className="col-span-6 font-display text-h3 text-ink transition-transform duration-state ease-cut group-hover:translate-x-3">
                  {work.name}
                </span>
                <span className="col-span-3 font-mono text-data-s uppercase text-ink-3">
                  {work.stoneLine}
                </span>
                <span className="col-span-1 flex justify-end text-ink-3 transition-transform duration-state ease-cut group-hover:translate-x-[3px]">
                  <ArrowRight size={18} strokeWidth={1.25} absoluteStrokeWidth />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <AnimatePresence>
          {hovered && !reduced ? (
            <motion.div
              className="pointer-events-none fixed left-0 top-0 z-[150] w-[300px]"
              style={{ x: sx, y: sy, rotate }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: DUR.state, ease: EASE.cut }}
            >
              <div className="relative aspect-[4/5] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <Image
                  src={img.workHero(hovered.slug)}
                  alt=""
                  aria-hidden
                  fill
                  sizes="300px"
                  placeholder="blur"
                  blurDataURL={BLUR.dark}
                  className="object-cover"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Mobile: one 4:5 card per screen. */}
      <div className="gutter flex flex-col gap-16 pb-24 lg:hidden">
        {works.map((work) => (
          <Link key={work.slug} href={`/works/${work.slug}`} className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={img.workHero(work.slug)}
                alt={`${work.name} in ${work.city}, ${work.stoneLine}`}
                fill
                loading="lazy"
                sizes="100vw"
                placeholder="blur"
                blurDataURL={BLUR.dark}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-[1.75rem] leading-tight text-ink">
                {work.name}
              </h2>
              <p data-numeric className="mt-2 font-mono text-data-s uppercase text-ink-3">
                {work.year} · {work.city} · {work.stoneLine}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
