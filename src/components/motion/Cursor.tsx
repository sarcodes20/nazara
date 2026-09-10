"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * A 6px dot that expands to a 78px labelled ring over stone.
 *
 * Any element can set the label by declaring `data-cursor="VIEW"`; the
 * listener reads the closest ancestor carrying the attribute, so a card does
 * not have to thread a prop down to every child.
 *
 * mix-blend-mode: difference keeps it legible over any photograph without a
 * shadow or an outline. Disabled entirely on coarse pointers and under
 * reduced motion — the native cursor returns and nothing else changes.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.style.cursor = "none";

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.style.cursor = "";
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[900] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-circle border border-white text-[9.5px] font-medium uppercase tracking-[0.2em] text-white"
        animate={{
          width: label ? 78 : 6,
          height: label ? 78 : 6,
          x: label ? -39 : -3,
          y: label ? -39 : -3,
          backgroundColor: label ? "rgba(255,255,255,0)" : "rgb(255,255,255)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
