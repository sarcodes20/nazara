/**
 * The complete motion vocabulary — Volume One §07 and Volume Two §10.
 * Nothing in the codebase hard-codes a duration or a curve; a literal `ms`
 * value anywhere outside this file is a bug.
 */

export const EASE = {
  /** Reveals, image wipes, page transitions. Fast departure, long settle. */
  stone: [0.16, 1, 0.3, 1],
  /** State changes: hover, focus, colour, opacity. */
  cut: [0.65, 0, 0.35, 1],
  /** Panels and drawers entering. Holds at the start, like something heavy. */
  lift: [0.33, 0, 0, 1],
} as const;

export const DUR = {
  instant: 0.12,
  state: 0.24,
  rule: 0.4,
  element: 0.48,
  image: 0.7,
  reveal: 0.8,
  curtain: 1.2,
  load: 1.6,
} as const;

/** Staggers are always 60ms and never exceed eight items. */
export const STAGGER = 0.06;
export const STAGGER_CAP = 8;

/** Reveals fire at 15% of viewport height, once. */
export const VIEWPORT = { once: true, amount: 0.15 } as const;

/**
 * The mason's line: per-line mask, translate up, opacity resolving across the
 * first 40% so type is never visibly half-faded.
 */
export const masonLine = {
  hidden: { y: "0.6em", opacity: 0 },
  shown: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: DUR.reveal,
      ease: EASE.stone,
      delay: Math.min(i, STAGGER_CAP) * STAGGER,
      opacity: { duration: DUR.reveal * 0.4, ease: EASE.stone },
    },
  }),
};

/** Body copy rises as one block. Never line by line. */
export const riseIn = {
  hidden: { y: 12, opacity: 0 },
  shown: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE.stone },
  },
};

/** Panels, trays, drawers. */
export const panel = (axis: "x" | "y", from: string) => ({
  hidden: { [axis]: from },
  shown: { [axis]: 0, transition: { duration: DUR.element, ease: EASE.lift } },
  exit: { [axis]: from, transition: { duration: 0.32, ease: EASE.cut } },
});
