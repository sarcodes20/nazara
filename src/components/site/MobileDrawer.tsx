"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { DUR, EASE, STAGGER } from "@/lib/motion";
import { Mono } from "@/components/ui/primitives";

/**
 * Full-screen Viewing Room drawer. Items in Bodoni 34, flush left, entering on
 * a 60ms stagger. Closing reverses the stagger.
 */
export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = [...NAV, { label: "Request a viewing", href: "/viewing" }];

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild>
              <motion.div
                className="viewing-room fixed inset-0 z-[300] flex flex-col bg-ground lg:hidden"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%", transition: { duration: 0.32, ease: EASE.cut } }}
                transition={{ duration: DUR.element, ease: EASE.lift }}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>

                <div className="gutter flex h-16 items-center justify-between">
                  <span className="font-display text-[1.375rem] uppercase tracking-[0.32em] text-ink">
                    Nazara
                  </span>
                  <Dialog.Close asChild>
                    <button aria-label="Close menu" className="text-ink">
                      <X size={22} strokeWidth={1.25} absoluteStrokeWidth />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="gutter flex flex-1 flex-col justify-center gap-1">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: 14,
                        transition: { delay: (items.length - 1 - i) * 0.03 },
                      }}
                      transition={{
                        duration: DUR.rule,
                        ease: EASE.stone,
                        delay: 0.1 + i * STAGGER,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-2 font-display text-[2.125rem] leading-tight text-ink"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="gutter pb-10">
                  <Mono size="data-s">
                    {SITE.address.street} · By appointment
                  </Mono>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
