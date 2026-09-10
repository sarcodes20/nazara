import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect warns during SSR. GSAP needs layout-effect timing on the
 * client so ScrollTrigger measures after paint, so this swaps the two rather
 * than suppressing the warning.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
