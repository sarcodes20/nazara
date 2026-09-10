"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader, PageTransition } from "./PageTransition";

const SEEN = "nazara.seen";
const DAY = 1000 * 60 * 60 * 24;

/**
 * Owns the two whole-page moments: the wetting on arrival and the room change
 * between routes.
 *
 * The loader renders only on the first paint of a session and is skipped
 * entirely for a visitor returning within 24 hours — a returning visitor is
 * never made to watch the ceremony twice.
 */
export function Choreography({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    let seenRecently = false;
    try {
      const last = Number(sessionStorage.getItem(SEEN) ?? 0);
      seenRecently = Date.now() - last < DAY;
      sessionStorage.setItem(SEEN, String(Date.now()));
    } catch {
      /* storage blocked — treat as a first visit */
    }
    setReturning(seenRecently);

    const total = seenRecently ? 1300 : 2700;
    const timer = setTimeout(() => setPhase("done"), total);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {phase === "loading" ? <Loader key="loader" returning={returning} /> : null}
      </AnimatePresence>

      {/* PageTransition is mounted once, always. Swapping between two different
          trees when the loader ends remounts every component below and strands
          any animation already running — which is how the hero headline ended
          up frozen at opacity 0. The transition suppresses its own panel on
          first mount, so the loader is the only thing covering the viewport on
          arrival. */}
      <PageTransition>{children}</PageTransition>
    </>
  );
}
