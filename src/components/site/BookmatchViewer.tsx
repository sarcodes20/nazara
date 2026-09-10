"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BLUR, SIZES } from "@/lib/images";
import { DUR, EASE } from "@/lib/motion";
import { Eyebrow, Mono } from "@/components/ui/primitives";

/**
 * The signature interaction: drag the divider and the right half mirrors in
 * real time. Answers the question every specifier asks and no website answers.
 *
 * Pointer events rather than mouse/touch pairs, and the position is written
 * straight to a CSS custom property during the drag so React never re-renders
 * mid-gesture — that is what keeps it smooth on a trackpad.
 *
 * Below 64rem it becomes a two-state toggle: dragging a divider on a 375px
 * screen is a worse experience than a switch.
 */
export function BookmatchViewer({ src, name }: { src: string; name: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [mirrored, setMirrored] = useState(true);
  const reduced = useReducedMotion();

  const setPosition = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    el.style.setProperty("--split", `${pct}%`);
  }, []);

  return (
    <section className="viewing-room bg-ground py-16">
      <div className="gutter mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <Eyebrow>Bookmatch</Eyebrow>
        <div className="flex gap-4 lg:hidden">
          {(["Single", "Mirrored"] as const).map((label) => {
            const on = (label === "Mirrored") === mirrored;
            return (
              <button
                key={label}
                onClick={() => setMirrored(label === "Mirrored")}
                aria-pressed={on}
                className={cn(
                  "relative pb-1 font-mono text-data-s uppercase transition-colors duration-state",
                  on
                    ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent"
                    : "text-ink-3",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={frame}
        style={{ ["--split" as string]: "50%" }}
        data-cursor="Drag"
        className="relative aspect-[1.684] w-full touch-pan-y select-none overflow-hidden lg:aspect-[21/9]"
        onPointerDown={(e) => {
          if (window.innerWidth < 1024) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          setPosition(e.clientX);
        }}
        onPointerMove={(e) => dragging && setPosition(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <Image
          src={src}
          alt={`${name}: a single slab face`}
          fill
          loading="lazy"
          sizes={SIZES.full}
          placeholder="blur"
          blurDataURL={BLUR.dark}
          className="object-cover"
        />

        {/* The mirrored half. Clipped to the split on desktop; toggled whole
            on mobile. */}
        <div
          className={cn(
            "absolute inset-0 scale-x-[-1]",
            "lg:[clip-path:inset(0_0_0_var(--split))]",
            !mirrored && "hidden lg:block",
          )}
        >
          <Image
            src={src}
            alt=""
            aria-hidden
            fill
            loading="lazy"
            sizes={SIZES.full}
            className="object-cover"
          />
        </div>

        {/* Divider: a 1px line with a 44px circular grip at mid-height. */}
        <div
          className="pointer-events-none absolute inset-y-0 hidden w-px bg-white/70 lg:block"
          style={{ left: "var(--split)" }}
        >
          <motion.span
            className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-circle border border-white/80"
            animate={reduced ? undefined : { scale: dragging ? 1.08 : 1 }}
            transition={{ duration: DUR.state, ease: EASE.cut }}
          >
            <svg viewBox="0 0 20 10" className="w-4 stroke-white" fill="none" strokeWidth={1.25}>
              <path d="M7 1L2.5 5L7 9M13 1L17.5 5L13 9" strokeLinecap="butt" />
            </svg>
          </motion.span>
        </div>
      </div>

      <div className="gutter pt-4">
        <Mono size="data-s">
          Drag to compare a single face against its mirror. Every pair is
          dry-laid and photographed before it is crated.
        </Mono>
      </div>
    </section>
  );
}
