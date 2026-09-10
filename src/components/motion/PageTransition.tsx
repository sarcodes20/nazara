"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DUR, EASE } from "@/lib/motion";

/**
 * The room change. A Viewing Room panel wipes up over the viewport (600ms,
 * ease-lift), holds black for 200ms while the new route paints behind it, then
 * wipes off the top (700ms, ease-stone).
 *
 * Back and forward use the identical transition — direction is never reversed,
 * because a room change is not undoable.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // The panel must not play on first mount. The loader has just cleared the
  // viewport; running the room change on top of it stacks two black wipes and
  // buries the hero for four seconds. Only a genuine route change gets one.
  const first = useRef(true);
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setRoute(pathname);
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, delay: route === pathname ? 0.6 : 0 },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {route === pathname ? (
          <motion.div
            key={`panel-${pathname}`}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[400] bg-[#0F1411]"
            initial={{ y: "100%" }}
            animate={{
              y: ["100%", "0%", "0%", "-100%"],
              transition: {
                duration: 1.5,
                times: [0, 0.4, 0.53, 1],
                ease: [EASE.lift, EASE.lift, EASE.stone] as never,
              },
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * The wetting. First visit only: the wordmark sits in Ash on Viewing Room and
 * fills with Chalk from the bottom, holds 400ms, then the panel lifts.
 * A return within 24h gets 600ms with the mark already filled.
 */
export function Loader({ returning }: { returning: boolean }) {
  const reduced = useReducedMotion();
  const fill = reduced || returning ? 0 : DUR.load;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F1411]"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 0.7,
        ease: EASE.stone,
        delay: returning ? 0.6 : DUR.load + 0.4,
      }}
    >
      <motion.span
        className="font-display text-[clamp(2.75rem,9vw,6rem)] uppercase tracking-[0.3em] pl-[0.3em] bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #737969 50%, #E9EBE4 50%)",
          backgroundSize: "100% 200%",
          WebkitBackgroundClip: "text",
        }}
        initial={{ backgroundPositionY: "0%" }}
        animate={{ backgroundPositionY: "100%" }}
        transition={{ duration: fill, ease: EASE.stone }}
      >
        Nazara
      </motion.span>
    </motion.div>
  );
}
