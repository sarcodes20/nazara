"use client";

import { MasonLine } from "@/components/motion/MasonLine";

/**
 * §02 · The threshold. 100vh of one sentence and nothing else.
 *
 * This is a solid Quarry Dust panel with `relative z-10`, scrolling up over
 * the sticky hero beneath it — the light rising over the dark. No fade, no
 * cross-dissolve.
 *
 * The type sits at 46% of viewport height rather than 50%: a mathematically
 * centred block reads low.
 */
export function Threshold() {
  return (
    <section className="relative z-10 flex min-h-dvh items-start bg-ground pt-[46dvh]">
      <div className="gutter w-full -translate-y-1/2">
        <MasonLine
          as="h2"
          lines={["Nothing here was designed.", "Everything here was chosen."]}
          className="max-w-[18ch] font-display text-display-fluid-m leading-[0.98] tracking-[-0.022em] text-ink"
        />
      </div>
    </section>
  );
}
