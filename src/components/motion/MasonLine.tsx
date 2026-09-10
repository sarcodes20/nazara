"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, STAGGER, STAGGER_CAP, VIEWPORT, riseIn } from "@/lib/motion";
import { useReveal } from "@/lib/use-reveal";

interface MasonLineProps {
  /** One entry per rendered line. The line break is a design decision, so it
   *  is authored here rather than measured at runtime. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  immediate?: boolean;
}

/**
 * The mason's line. Each line is masked by its own container and translates up
 * from 0.6em with the clip revealing from the baseline. Opacity resolves
 * across the first 40% only, so type is never visibly half-faded.
 */
export function MasonLine({
  lines,
  as: Tag = "div",
  className,
  delay = 0,
  immediate = false,
}: MasonLineProps) {
  const reduced = useReducedMotion();
  const [revealed, reveal] = useReveal();

  // Reduced motion is not "the same reveal, faster" — it is no reveal. The
  // type is simply present, which is also what makes the page render
  // correctly in a crawler, a print stylesheet or a headless capture.
  if (reduced) {
    return (
      <Tag className={cn("text-balance", className)}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // `animate` is driven by state rather than by `whileInView` alone, so the
  // observer and the fallback timer share one source of truth.
  const trigger = immediate
    ? { animate: "shown" as const }
    : {
        animate: revealed ? ("shown" as const) : ("hidden" as const),
        onViewportEnter: reveal,
        viewport: VIEWPORT,
      };

  return (
    <Tag className={cn("text-balance", className)}>
      {/* The mask has to clear Bodoni's descenders. At 0.94 leading the comma
          and the "y" in "years," fall outside the line box, and overflow-hidden
          slices them off — so the mask is padded and the padding is pulled back
          out of the layout with a matching negative margin. */}
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.22em] block overflow-hidden pb-[0.22em]">
          <motion.span
            className="block"
            initial="hidden"
            {...trigger}
            variants={{
              hidden: reduced ? { opacity: 0 } : { y: "0.6em", opacity: 0 },
              shown: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: reduced ? 0.2 : DUR.reveal,
                  ease: EASE.stone,
                  delay: delay + Math.min(i, STAGGER_CAP) * STAGGER,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Body copy rises as one block. Never line by line. */
export function Rise({
  children,
  className,
  delay = 0,
  as: Tag = motion.div,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: typeof motion.div;
}) {
  const reduced = useReducedMotion();
  const [revealed, reveal] = useReveal();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <Tag
      className={className}
      initial="hidden"
      animate={revealed ? "shown" : "hidden"}
      onViewportEnter={reveal}
      viewport={VIEWPORT}
      variants={{
        ...riseIn,
        shown: { ...riseIn.shown, transition: { ...riseIn.shown.transition, delay } },
      }}
    >
      {children}
    </Tag>
  );
}
