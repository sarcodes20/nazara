"use client";

import { useEffect, useState } from "react";

/**
 * Reveal state with a guaranteed floor.
 *
 * Framer's `whileInView` parks an element at its hidden variant until an
 * IntersectionObserver fires. When that observer never runs — a hidden tab, a
 * throttled background frame, a headless renderer, a crawler — the content
 * stays at opacity 0 permanently. An entire paragraph on Provenance was
 * invisible for exactly this reason.
 *
 * Anything meant to be read has to be readable once the page has loaded, so
 * this pairs the observer with a timer: whichever resolves first wins, and the
 * reveal degrades to "just visible" rather than to "gone".
 */
export function useReveal(fallbackMs = 1400) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), fallbackMs);
    return () => clearTimeout(timer);
  }, [fallbackMs]);

  return [shown, () => setShown(true)] as const;
}
