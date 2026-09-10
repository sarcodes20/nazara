"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { DUR, EASE } from "@/lib/motion";
import { img, BLUR } from "@/lib/images";
import { MasonLine } from "@/components/motion/MasonLine";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/primitives";

/**
 * §01 · The first slab. 100vh, Viewing Room, sticky — §02 scrolls up over it,
 * which is how "the lights come up" becomes a physical event rather than a
 * cross-fade.
 *
 * The ambient drifting light is the page's one atmospheric effect and exists
 * nowhere else on the site: a highlight travels the slab on an 18s loop while
 * the image scales 1.00 → 1.04 over 20s. Neither is perceptible second to
 * second; together they make the stone read as lit by a real, moving source.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Type clears out across the first 40vh; the image holds until covered.
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      // On mobile the slab goes full width and the type sits on top of it, so
      // the type moves into the lower third where the scrim is. Centred, it
      // was Chalk on light marble and effectively invisible.
      className="viewing-room sticky top-0 flex h-dvh items-end overflow-hidden bg-ground lg:items-center"
      aria-label="Nazara"
    >
      <motion.div
        className="absolute inset-y-0 right-0 w-full lg:w-[52%]"
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
        animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: DUR.curtain, ease: EASE.stone }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduced ? undefined : { scale: [1, 1.04] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={img.homeHero()}
            alt="A white marble slab standing upright in a dark room, lit from the left at a low angle."
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 64rem) 62vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR.dark}
            className="object-cover"
          />
        </motion.div>

        {/* The raking light, drifting. A wide, very soft band on an 18s cycle. */}
        {reduced ? null : (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
              backgroundSize: "220% 100%",
            }}
            animate={{ backgroundPositionX: ["-60%", "160%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          />
        )}

        {/* Legibility wash, mobile only. It has to reach high enough to sit
            under the headline as well as the button, and be dense enough that
            Chalk holds over a near-white slab: at 0.85 the marble still read
            through the counters of the Bodoni. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[rgb(15_20_17/0.94)] via-[rgb(15_20_17/0.78)] to-transparent lg:hidden" />
      </motion.div>

      <motion.div
        // Clears the scroll indicator at bottom-10 on mobile; on desktop the
        // block is vertically centred against the slab and needs no offset.
        className="gutter relative z-10 w-full pb-32 lg:pb-0"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="flex max-w-[46rem] flex-col gap-6 lg:max-w-[40rem] lg:gap-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.rule, delay: 0.4 }}
          >
            {/* Broken deliberately rather than left to wrap: at 11.5px with
                0.055em tracking the full line is wider than a 360px phone,
                and an authored break keeps the two halves meaningful —
                stone and block, then bench and date. */}
            <Mono size="data-s" className="text-accent">
              Makrana Albeta · Block NZ-0412
              <span className="hidden lg:inline"> · </span>
              <br className="lg:hidden" />
              Bench 7 · Cut 18.03.26
            </Mono>
          </motion.div>

          <MasonLine
            as="h1"
            immediate
            delay={0.5}
            lines={["A hundred million years,", "and then a decision."]}
            className="font-display text-display-fluid-l leading-[0.94] tracking-[-0.025em] text-ink"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.rule, delay: 1.4 }}
          >
            <Button asChild variant="rule">
              <Link href="/library">Enter the library</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator, aligned to the text column. Nothing is centred. */}
      <motion.div
        aria-hidden
        className="gutter absolute inset-x-0 bottom-10 z-10"
        style={{ opacity: cueOpacity }}
      >
        <span className="flex size-10 items-center justify-center rounded-circle border border-ink-3">
          <svg viewBox="0 0 8 16" className="h-4 w-2 stroke-ink-2" fill="none" strokeWidth={1.25}>
            <path d="M4 0v14M0.5 10.5L4 14l3.5-3.5" strokeLinecap="butt" />
          </svg>
        </span>
      </motion.div>
    </section>
  );
}
