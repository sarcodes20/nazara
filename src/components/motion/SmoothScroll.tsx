"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

/**
 * Inertial scroll, damping 0.08, multiplier 1.0 — never faster than native,
 * never bouncy (Volume One §07).
 *
 * Lenis and GSAP each want to own the rAF loop. Driving Lenis from GSAP's
 * ticker and telling ScrollTrigger to read Lenis' scroll position is the only
 * arrangement where the sticky triptych and the smooth scroll stay in sync;
 * running both loops independently produces a half-frame lag that is visible
 * on any pinned section.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      smoothWheel: true,
      // Touch devices keep native momentum; emulating it always feels wrong.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // A route change must land at the top with no animated scroll, because the
  // transition panel is already covering the viewport at that moment.
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
