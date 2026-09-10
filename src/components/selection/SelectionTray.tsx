"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useSelection } from "./SelectionProvider";
import { STONE_MAP } from "@/data/stones";
import { img, BLUR } from "@/lib/images";
import { dimensions } from "@/lib/utils";
import { DUR, EASE } from "@/lib/motion";
import { Button, RuleLink } from "@/components/ui/Button";
import { Mono } from "@/components/ui/primitives";

/**
 * Slides from the right edge, 440px, Viewing Room. Radix Dialog supplies the
 * focus trap, the scroll lock and the Escape handling; the motion and every
 * pixel of the appearance are ours.
 */
export function SelectionTray() {
  const { slugs, open, setOpen, remove } = useSelection();
  const stones = slugs.map((s) => STONE_MAP.get(s)).filter(Boolean);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[300] bg-[rgb(15_20_17/0.55)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.state }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.aside
                className="viewing-room fixed right-0 top-0 z-[310] flex h-dvh w-full max-w-[440px] flex-col bg-ground"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%", transition: { duration: 0.32, ease: EASE.cut } }}
                transition={{ duration: DUR.element, ease: EASE.lift }}
              >
                <div className="flex items-center justify-between border-b border-line px-6 py-5">
                  <Dialog.Title className="font-ui text-label font-medium uppercase text-ink-3">
                    Selection {slugs.length}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close selection"
                      className="text-ink-3 transition-colors duration-state hover:text-ink"
                    >
                      <X size={18} strokeWidth={1.25} absoluteStrokeWidth />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {stones.length === 0 ? (
                    <p className="text-body-s text-ink-2">
                      Nothing selected yet. Add a stone from the library and it
                      will wait here.
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-8">
                      {stones.map((stone) => (
                        <li key={stone!.slug} className="flex flex-col gap-3">
                          <Link href={`/library/${stone!.slug}`} onClick={() => setOpen(false)}>
                            <div className="relative aspect-[1.684] overflow-hidden">
                              <Image
                                src={img.stoneTypology(stone!.slug)}
                                alt={`${stone!.name}, shot square against a black wall`}
                                fill
                                sizes="440px"
                                placeholder="blur"
                                blurDataURL={BLUR.dark}
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-display text-h4 text-ink">
                                {stone!.name}
                              </p>
                              <Mono size="data-s" className="mt-1">
                                {stone!.family} ·{" "}
                                {dimensions(
                                  stone!.slabSize[0],
                                  stone!.slabSize[1],
                                  stone!.thicknesses[0],
                                )}{" "}
                                · {stone!.block.id}
                              </Mono>
                            </div>
                            <button
                              onClick={() => remove(stone!.slug)}
                              className="shrink-0 font-mono text-data-s uppercase text-ink-3 transition-colors duration-state hover:text-error"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {stones.length > 0 ? (
                  <div className="flex flex-col gap-5 border-t border-line px-6 py-6">
                    <Button asChild variant="ink" size="lg">
                      <Link href="/viewing?from=selection" onClick={() => setOpen(false)}>
                        Request a viewing of these {stones.length}
                      </Link>
                    </Button>
                    <div className="flex gap-6">
                      <RuleLink href="/architects/downloads">Download as PDF</RuleLink>
                      <RuleLink href={`/selection?s=${slugs.join(",")}`}>
                        Share by link
                      </RuleLink>
                    </div>
                  </div>
                ) : null}
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
