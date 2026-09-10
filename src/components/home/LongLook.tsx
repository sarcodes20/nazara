"use client";

import { useRef } from "react";
import Image from "next/image";
import { img, BLUR } from "@/lib/images";
import { Eyebrow, Body } from "@/components/ui/primitives";
import { MasonLine } from "@/components/motion/MasonLine";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const FRAMES = [
  {
    heading: "We wet it.",
    body: "Water returns a slab to the colour it will be in a finished room. Dry, every stone flatters itself.",
    alt: "Water running down a dry slab, the wet edge advancing as a dark line.",
  },
  {
    heading: "We rake it.",
    body: "A light held almost flat against the face. It is the only way the crystal, the saw marks and the true depth of a vein will show.",
    alt: "A hand-held lamp held almost flat against a slab face, dust visible in the beam.",
  },
  {
    heading: "We turn it.",
    body: "One block gives a different drawing on every axis. Vein-cut is a landscape. Cross-cut is a bloom. The block does not care which one you wanted.",
    alt: "Two workers rotating a slab on a steel A-frame in a saw shed.",
  },
] as const;

/**
 * §03 · The long look. 200vh, sticky image left, three captions scrolling past.
 *
 * GSAP rather than Framer Motion here for one reason: the cross-wipe has to be
 * driven by the caption's own position in the scroll, and ScrollTrigger's
 * per-element triggers express that in three lines where a scroll-progress
 * mapping in Framer would need manual range arithmetic for every frame.
 *
 * This is not scroll-jacking — the scrollbar tracks the page 1:1 throughout,
 * and stopping anywhere in the section leaves a legible frame.
 */
export function LongLook() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 64rem)").matches) return;

    let ctx: gsap.Context;
    let cancelled = false;

    // Loaded on demand: GSAP is ~70kb and only this section and the typology
    // wall need it, so it stays out of the initial bundle.
    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
        const captions = gsap.utils.toArray<HTMLElement>("[data-caption]");

        captions.forEach((caption, i) => {
          ScrollTrigger.create({
            trigger: caption,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: ({ isActive }) => {
              if (!isActive) return;
              frames.forEach((frame, j) => {
                gsap.to(frame, {
                  // The incoming frame's clip opens over the outgoing one.
                  // No dissolve between photographs, ever.
                  clipPath:
                    j <= i ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                  duration: 0.9,
                  ease: "expo.out",
                  overwrite: "auto",
                });
              });
            },
          });
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative z-10 bg-ground section-y">
      <div className="gutter mb-12 lg:mb-20">
        <Eyebrow>The long look</Eyebrow>
      </div>

      <div className="lg:grid lg:grid-cols-12">
        {/* Sticky on desktop; a plain stack on mobile, where sticky on a short
            viewport traps the reader. */}
        <div className="lg:col-span-7 lg:h-dvh lg:sticky lg:top-0 lg:flex lg:items-center">
          <div className="relative hidden aspect-[4/5] w-full lg:block">
            {FRAMES.map((frame, i) => (
              <div
                key={frame.heading}
                data-frame
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
              >
                <Image
                  src={img.longLook((i + 1) as 1 | 2 | 3)}
                  alt={frame.alt}
                  fill
                  loading="lazy"
                  sizes="58vw"
                  placeholder="blur"
                  blurDataURL={BLUR.dark}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          {FRAMES.map((frame, i) => (
            <div
              key={frame.heading}
              data-caption
              className="flex flex-col justify-center gap-5 lg:h-[66dvh]"
            >
              {/* Mobile carries its own image inline; desktop hides it. */}
              <div className="relative mb-2 aspect-[4/5] w-full lg:hidden">
                <Image
                  src={img.longLook((i + 1) as 1 | 2 | 3)}
                  alt={frame.alt}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={BLUR.dark}
                  className="object-cover"
                />
              </div>
              <div className="gutter lg:px-0">
                <MasonLine
                  as="h3"
                  lines={[frame.heading]}
                  className="font-display text-h3-fluid text-ink"
                />
                <Body className="mt-4">{frame.body}</Body>
              </div>
            </div>
          ))}

          <div className="gutter lg:px-0 lg:pb-[20dvh]">
            <Body className="mt-10 max-w-[34ch] text-ink">
              Then we take it, or we leave it on the bench. There is no third
              answer.
            </Body>
          </div>
        </div>
      </div>
    </section>
  );
}
