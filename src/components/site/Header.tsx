"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV } from "@/data/site";
import { DUR, EASE } from "@/lib/motion";
import { useSelection } from "@/components/selection/SelectionProvider";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";

/**
 * 88px at rest, 72px scrolled, hides on scroll down and returns on any
 * upward scroll. Transparent over a hero, where its contents sit in Chalk and
 * the hero's own bottom gradient carries the legibility.
 *
 * On Home the five links are absent until 8% scroll — only the wordmark and
 * the action are present at the top of the page.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { slugs, setOpen } = useSelection();

  /**
   * The header is fixed and lives outside the page wrapper, so it does not
   * inherit a route's `.viewing-room` scope. These four routes render on the
   * dark ground, and without this the wordmark is drawn in Nero on Viewing
   * Room black and disappears.
   */
  const darkPage =
    isHome ||
    pathname.startsWith("/library/") ||
    pathname === "/provenance" ||
    pathname === "/viewing";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [revealNav, setRevealNav] = useState(!isHome);
  // Roughly one wheel notch. Set to 0 to show the navigation on arrival.
  const NAV_REVEAL_PX = 90;
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;

    /**
     * The header only stays transparent while it is genuinely sitting over a
     * full-bleed hero. Everywhere else it takes its ground the moment the page
     * moves, otherwise body copy scrolls straight through it — on the Library
     * the h1 was passing over the wordmark.
     *
     * Home is the only page with a 100vh hero, so it is the only one that
     * measures against the viewport.
     */
    const groundAt = isHome ? window.innerHeight * 0.82 : 8;
    setScrolled(y > groundAt);

    // Always visible at the top, and whenever an overlay is open.
    setHidden(y > 400 && y > prev && !drawer && !mega);

    /**
     * The hero opens uninterrupted — wordmark and one action, nothing else.
     * The first scroll gesture brings the navigation in.
     *
     * This was originally specified as 8% of page progress, which reads like a
     * nudge but is a percentage of a variable height: on the homepage it came
     * to 808px, so a visitor scrolled a full screen before discovering the
     * site had navigation at all. A fixed threshold is what the intent
     * actually was, and it does not drift when content is added.
     */
    if (isHome) setRevealNav(y > NAV_REVEAL_PX);
  });

  useEffect(() => setRevealNav(!isHome), [isHome, pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[200] border-b transition-[height,background-color,border-color] duration-state ease-cut",
          // Dark routes keep the Viewing Room tokens at every scroll position,
          // so the scrolled backdrop wash resolves dark too.
          darkPage && "viewing-room",
          scrolled
            ? "h-16 border-line bg-ground/[0.72] backdrop-blur-[20px] md:h-[72px]"
            : "h-16 border-transparent bg-transparent md:h-[88px]",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: DUR.state, ease: EASE.cut }}
        onMouseLeave={() => setMega(false)}
      >
        <div className="gutter flex h-full items-center justify-between">
          <Link
            href="/"
            className="font-display text-[1.375rem] uppercase leading-none tracking-[0.32em] text-ink"
            style={{ paddingLeft: "0.32em" }}
          >
            Nazara
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <AnimatePresence>
              {revealNav
                ? NAV.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: DUR.rule }}
                        onMouseEnter={() => setMega(item.label === "Library")}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "relative pb-1 font-ui text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-ink",
                            "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent",
                            "after:transition-[width] after:duration-[320ms] after:ease-stone hover:after:w-full",
                            active && "after:w-full after:bg-line-strong hover:after:bg-accent",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })
                : null}
            </AnimatePresence>
          </nav>

          <div className="flex items-center gap-6">
            {slugs.length > 0 ? (
              <button
                onClick={() => setOpen(true)}
                className="hidden font-mono text-data-s uppercase text-ink transition-colors duration-state hover:text-accent-ink md:block"
              >
                Selection {slugs.length}
              </button>
            ) : null}

            <Link
              href="/viewing"
              className="hidden font-ui text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-accent-ink lg:block"
            >
              Request a viewing
            </Link>

            <button
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="text-ink lg:hidden"
            >
              <Menu size={22} strokeWidth={1.25} absoluteStrokeWidth />
            </button>
          </div>
        </div>

        <MegaMenu open={mega} onClose={() => setMega(false)} />
      </motion.header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
