"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { BLUR } from "@/lib/images";
import { useReveal } from "@/lib/use-reveal";

type Edge = "left" | "bottom" | "right" | "top";

const CLOSED: Record<Edge, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(100% 0 0 0)",
  top: "inset(0 0 100% 0)",
};

interface CurtainProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
  /** Which edge the cloth is drawn from. Full-bleed heroes use "bottom". */
  edge?: Edge;
  /** Offset when two images share a viewport — always 120ms. */
  delay?: number;
  /** Dark stone gets the dark blur so the first paint is not a grey flash. */
  tone?: keyof typeof BLUR;
  ratio?: "slab" | "block" | "plane" | "bench";
  className?: string;
  /** Skips the intersection trigger; used for above-the-fold heroes. */
  immediate?: boolean;
}

const RATIO: Record<string, string> = {
  slab: "aspect-[1.684]",
  block: "aspect-square",
  plane: "aspect-[4/5]",
  bench: "aspect-[21/9]",
};

/**
 * The image reveal, and the only one in the system. Never a fade: the clip
 * path opens from one edge while the image counter-scales 1.06 → 1.00, so it
 * reads as cloth being drawn off a slab rather than a picture loading.
 *
 * The scale sits on an inner element because animating transform and
 * clip-path on the same node forces a paint on every frame.
 */
export function Curtain({
  edge = "left",
  delay = 0,
  tone = "light",
  ratio = "slab",
  className,
  immediate = false,
  alt,
  ...image
}: CurtainProps) {
  const reduced = useReducedMotion();

  const animateProps = reduced
    ? { opacity: 1 }
    : { clipPath: "inset(0 0 0 0)" };
  const initialProps = reduced
    ? { opacity: 0 }
    : { clipPath: CLOSED[edge] };

  // A curtain that never opens hides the photograph outright, so the reveal
  // carries the same timer fallback as the type. See lib/use-reveal.
  const [revealed, reveal] = useReveal();
  const open = immediate || revealed;

  // Under reduced motion the cloth is simply already off the slab.
  if (reduced) {
    return (
      <div className={cn("relative overflow-hidden", RATIO[ratio], className)}>
        <Image
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={BLUR[tone]}
          className="object-cover"
          {...image}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("relative overflow-hidden", RATIO[ratio], className)}
      initial={initialProps}
      animate={open ? animateProps : initialProps}
      onViewportEnter={reveal}
      viewport={VIEWPORT}
      transition={{ duration: DUR.curtain, ease: EASE.stone, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.06 }}
        animate={open ? { scale: 1 } : { scale: reduced ? 1 : 1.06 }}
        transition={{ duration: DUR.curtain, ease: EASE.stone, delay }}
      >
        <Image
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={BLUR[tone]}
          className="object-cover"
          {...image}
        />
      </motion.div>
    </motion.div>
  );
}
