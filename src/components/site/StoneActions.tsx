"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSelection } from "@/components/selection/SelectionProvider";
import { cn } from "@/lib/utils";

/**
 * The block panel's controls, plus the mobile sticky bar.
 *
 * "Copy specification" puts a paste-ready schedule line on the clipboard —
 * architects will use it more than any button on the site, and it costs
 * nothing to build.
 */
export function StoneActions({
  slug,
  specLine,
}: {
  slug: string;
  specLine: string;
}) {
  const { has, toggle } = useSelection();
  const [copied, setCopied] = useState(false);
  const inSelection = has(slug);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(specLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; the spec is visible on the page regardless */
    }
  };

  return (
    <>
      <div className="mt-7 hidden flex-col gap-4 lg:flex">
        <Button asChild variant="ink" className="w-full">
          <Link href="/viewing">Request a viewing</Link>
        </Button>
        <button
          onClick={() => toggle(slug)}
          aria-pressed={inSelection}
          className={cn(
            "w-fit font-mono text-data-s uppercase transition-colors duration-state",
            inSelection ? "text-success" : "text-ink-3 hover:text-ink",
          )}
        >
          {inSelection ? "In selection" : "Add to selection"}
        </button>
        <button
          onClick={copy}
          className={cn(
            "w-fit font-mono text-data-s uppercase transition-colors duration-state",
            copied ? "text-success" : "text-ink-3 hover:text-ink",
          )}
        >
          {copied ? "Copied" : "Copy specification"}
        </button>
      </div>

      {/* Mobile: the block panel is read first, and the actions follow the
          reader down the page. Two controls, 52px, split evenly. */}
      <div className="fixed inset-x-0 bottom-0 z-[200] flex border-t border-line bg-ground lg:hidden">
        <button
          onClick={() => toggle(slug)}
          className={cn(
            "h-[52px] flex-1 border-r border-line font-ui text-button font-medium uppercase transition-colors duration-state",
            inSelection ? "text-success" : "text-ink",
          )}
        >
          {inSelection ? "In selection" : "Add to selection"}
        </button>
        <Link
          href="/viewing"
          className="flex h-[52px] flex-1 items-center justify-center bg-ink font-ui text-button font-medium uppercase text-ground"
        >
          Request a viewing
        </Link>
      </div>
      <div aria-hidden className="h-[52px] lg:hidden" />
    </>
  );
}
