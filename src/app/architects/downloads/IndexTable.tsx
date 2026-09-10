"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DownloadFile, DownloadGroup } from "@/lib/types";
import { formatBytes, isStale } from "@/data/downloads";
import { cn, shortDate } from "@/lib/utils";
import { DUR, EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Body } from "@/components/ui/primitives";
import { Tick } from "@/components/ui/Field";

/**
 * The one genuinely delightful micro-interaction on a utility page: download
 * progress drawn as a Backlight rule filling the row's own baseline. It is the
 * system's only data-bearing rule, and it is worth the exception precisely
 * because nothing else on this page is trying for delight.
 */
export function IndexTable({
  files,
  groups,
  lines,
}: {
  files: DownloadFile[];
  groups: DownloadGroup[];
  lines: Record<DownloadGroup, string>;
}) {
  const [group, setGroup] = useState<DownloadGroup | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [gateFor, setGateFor] = useState<string | null>(null);

  const shown = useMemo(
    () => (group ? files.filter((f) => f.group === group) : files),
    [files, group],
  );

  const totalBytes = picked.reduce(
    (sum, name) => sum + (files.find((f) => f.file === name)?.bytes ?? 0),
    0,
  );

  /**
   * Simulated because there is no asset server in this build. Swap the body
   * for a fetch with a ReadableStream reader and report `received / total`
   * into the same state — the rule reads true progress unchanged.
   */
  const download = (file: DownloadFile) => {
    if (file.gated && !gateFor) {
      setGateFor(file.file);
      return;
    }
    let pct = 0;
    const timer = setInterval(() => {
      pct = Math.min(100, pct + 100 / (file.bytes / (6 * 1024 * 1024) + 6));
      setProgress((p) => ({ ...p, [file.file]: pct }));
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(
          () => setProgress((p) => ({ ...p, [file.file]: -1 })),
          200,
        );
        setTimeout(() => {
          setProgress((p) => {
            const { [file.file]: _, ...rest } = p;
            return rest;
          });
        }, 2200);
      }
    }, 120);
  };

  return (
    <div className="gutter pb-32">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <aside className="mb-10 lg:col-span-2 lg:mb-0">
          <div className="sticky top-[120px]">
            <Eyebrow className="mb-3">Groups</Eyebrow>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col">
              <li>
                <button
                  onClick={() => setGroup(null)}
                  className={cn(
                    "border-l py-1.5 pl-3 text-body-s transition-colors duration-state",
                    group === null
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-2 hover:text-ink",
                  )}
                >
                  All
                </button>
              </li>
              {groups.map((g) => (
                <li key={g}>
                  <button
                    onClick={() => setGroup(g)}
                    className={cn(
                      "border-l py-1.5 pl-3 text-left text-body-s transition-colors duration-state",
                      group === g
                        ? "border-accent text-ink"
                        : "border-transparent text-ink-2 hover:text-ink",
                    )}
                  >
                    {g}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-9 lg:col-start-4">
          {(group ? [group] : groups).map((g) => {
            const rows = shown.filter((f) => f.group === g);
            if (!rows.length) return null;
            return (
              <section key={g} className="mb-14">
                <h2 className="font-display text-h3-fluid text-ink">{g}</h2>
                <Body size="body-s" className="mt-2">
                  {lines[g]}
                </Body>

                <ul className="mt-6 border-t border-line">
                  {rows.map((file) => {
                    const pct = progress[file.file];
                    const done = pct === -1;
                    return (
                      <li key={file.file} className="relative">
                        <div className="group grid grid-cols-[auto_1fr] items-center gap-4 border-b border-line py-4 transition-colors duration-state ease-cut hover:bg-surface sm:grid-cols-[auto_1fr_auto]">
                          <Tick
                            id={file.file}
                            checked={picked.includes(file.file)}
                            onCheckedChange={(v) =>
                              setPicked((p) =>
                                v
                                  ? [...p, file.file]
                                  : p.filter((x) => x !== file.file),
                              )
                            }
                          >
                            <span className="sr-only">Select {file.name}</span>
                          </Tick>

                          <div className="min-w-0">
                            <p className="truncate text-body-s font-medium text-ink">
                              {file.name}
                            </p>
                            <p
                              data-numeric
                              className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-ink-3"
                            >
                              {file.format} · {formatBytes(file.bytes)} ·{" "}
                              {shortDate(file.updated)}
                              {isStale(file.updated) ? (
                                <span className="text-warning"> · Review due</span>
                              ) : null}
                            </p>
                          </div>

                          <button
                            onClick={() => download(file)}
                            className={cn(
                              "col-start-2 w-fit font-mono text-data-s uppercase transition-colors duration-state sm:col-start-3",
                              done ? "text-success" : "text-ink-3 group-hover:text-ink",
                            )}
                          >
                            {done ? "Saved" : pct !== undefined ? "Downloading" : "Download"}
                          </button>
                        </div>

                        {/* The rule that carries data. */}
                        {pct !== undefined && pct >= 0 ? (
                          <span
                            aria-hidden
                            className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-instant"
                            style={{ width: `${pct}%` }}
                          />
                        ) : null}

                        {gateFor === file.file ? (
                          <div className="border-b border-line bg-surface px-4 py-5">
                            <Body size="body-s" className="mb-3">
                              A work email, so we can tell you when the family is
                              updated.
                            </Body>
                            <form
                              className="flex max-w-md items-end gap-4"
                              onSubmit={(e) => {
                                e.preventDefault();
                                setGateFor("granted");
                                download(file);
                              }}
                            >
                              <label htmlFor={`gate-${file.file}`} className="sr-only">
                                Work email
                              </label>
                              <input
                                id={`gate-${file.file}`}
                                type="email"
                                required
                                placeholder="you@practice.com"
                                className="h-12 flex-1 rounded-none border-0 border-b border-line-strong bg-transparent px-0 text-body text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
                              />
                              <Button type="submit" variant="rule">
                                Download
                              </Button>
                            </form>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      {/* The tray states the total size: a 400MB download over hotel wi-fi is
          a real thing that happens to architects. */}
      <AnimatePresence>
        {picked.length > 0 ? (
          <motion.div
            className="viewing-room fixed inset-x-0 bottom-0 z-[300] border-t border-line bg-ground"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.32, ease: EASE.cut } }}
            transition={{ duration: DUR.element, ease: EASE.lift }}
          >
            <div className="gutter flex flex-wrap items-center justify-between gap-4 py-4">
              <button
                onClick={() => setPicked([])}
                className="font-mono text-data-s uppercase text-ink-3 hover:text-ink"
              >
                Clear
              </button>
              <Button
                variant="ink"
                size="md"
                onClick={() =>
                  picked.forEach((name) => {
                    const f = files.find((x) => x.file === name);
                    if (f) download(f);
                  })
                }
              >
                Download {picked.length} file{picked.length === 1 ? "" : "s"} ·{" "}
                {formatBytes(totalBytes)}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
