import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The typographic primitives. Every piece of text on the site is one of these,
 * which is how the 32px rule from Volume One §04 — Bodoni above, Archivo
 * below, Plex for anything measurable — stays true without anyone remembering
 * it. These are server components: no interactivity, no client bundle.
 */

/** 11px, 0.18em, uppercase, Ash. Never animates; present on arrival. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-ui text-label font-medium uppercase text-ink-3",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** The voice of the stone: dimensions, block numbers, coordinates, dates. */
export function Mono({
  children,
  className,
  size = "data",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "data" | "data-s";
}) {
  return (
    <p
      data-numeric
      className={cn(
        "font-mono uppercase text-ink-3",
        size === "data" ? "text-data" : "text-data-s",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** A specimen frame — hairline border, mono corner label. Never a card. */
export function Plate({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-line bg-surface p-5 md:p-7", className)}>
      {label ? (
        <span className="mb-5 block font-mono text-label-xs uppercase text-ink-3">
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}

/**
 * Section rhythm and the dark-band switch in one place. `viewingRoom` applies
 * the class that re-points the colour tokens for the whole subtree.
 */
export function Section({
  children,
  className,
  viewingRoom = false,
  id,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  viewingRoom?: boolean;
  id?: string;
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag
      id={id}
      className={cn(viewingRoom && "viewing-room", "section-y", className)}
    >
      {children}
    </Tag>
  );
}

/** Flush-left body copy at a 62-character measure. Never full-bleed. */
export function Body({
  children,
  className,
  size = "body",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "lead" | "body" | "body-s";
}) {
  const sizes = {
    lead: "text-lead font-light text-ink-2 max-w-[30em]",
    body: "text-body text-ink-2 max-w-[62ch]",
    "body-s": "text-body-s text-ink-2 max-w-[62ch]",
  } as const;
  return <p className={cn(sizes[size], className)}>{children}</p>;
}

/** Wide content scrolls inside its own container; the body never does. */
export function ScrollArea({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto border border-line", className)}>
      {children}
    </div>
  );
}

/** Colour is never the only carrier of meaning — the word travels with it. */
export function StatusTag({ status }: { status: "available" | "hold" | "reserved" }) {
  const map = {
    available: ["Available", "text-success"],
    hold: ["On hold", "text-warning"],
    reserved: ["Reserved", "text-error"],
  } as const;
  const [label, colour] = map[status];
  return (
    <span className={cn("font-mono text-data-s uppercase", colour)}>{label}</span>
  );
}
