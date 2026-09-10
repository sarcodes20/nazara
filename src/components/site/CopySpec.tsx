"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Paste-ready schedule line. Label swaps to COPIED for two seconds and the
 *  block's baseline rule ignites once. No toast — the system has none. */
export function CopySpec({ line }: { line: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(line);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; the line is selectable on the page regardless */
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-4">
      <pre
        className={cn(
          "overflow-x-auto border-b bg-surface p-5 font-mono text-data leading-[1.9] text-ink transition-colors duration-rule ease-stone",
          copied ? "border-accent" : "border-line",
        )}
      >
        {line}
      </pre>
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
  );
}
