import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be taught this design system or it silently destroys
 * it. Out of the box it parses `text-display-l` as a *text-colour* class,
 * because `text-{colour}` is its catch-all; it then treats a later `text-ink`
 * in the same call as a conflict and drops the font size. Every heading on the
 * site loses its type scale and falls back to 17px body — which is exactly
 * what happened on the first build.
 *
 * Registering the real groups below is the fix. Anything added to the
 * `@theme` block in globals.css must be added here too.
 */
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl", "display-l", "display-m",
            "h1", "h2", "h3", "h4",
            "lead", "body-l", "body", "body-s", "caption",
            "label", "label-xs", "button",
            "data-l", "data", "data-s",
            // The fluid clamps, declared as @utility rather than as tokens.
            "display-fluid-l", "display-fluid-m",
            "h1-fluid", "h2-fluid", "h3-fluid",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "ground", "surface", "raised",
            "ink", "ink-2", "ink-3", "ink-hover",
            "line", "line-strong",
            "accent", "accent-ink",
            "success", "error", "warning",
          ],
        },
      ],
      "bg-color": [
        {
          bg: [
            "ground", "surface", "raised",
            "ink", "ink-2", "ink-3", "ink-hover",
            "accent", "accent-ink",
            "success", "error", "warning",
          ],
        },
      ],
      "border-color": [
        { border: ["line", "line-strong", "ink", "accent", "error", "success", "warning"] },
      ],
      rounded: [{ rounded: ["circle"] }],
      duration: ["instant", "state", "rule", "element", "image", "reveal", "curtain"],
      ease: ["stone", "cut", "lift"],
      aspect: ["slab", "block", "plane", "bench"],
      shadow: [{ shadow: ["lift", "modal"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return merge(clsx(inputs));
}

/**
 * House style, Volume Three §13: numerals are words in display type and
 * figures in every technical context. This handles the display half.
 */
const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen",
];
const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty",
  "ninety",
];

export function spellOut(n: number): string {
  if (n < 0 || n > 99 || !Number.isInteger(n)) return String(n);
  if (n < 20) return WORDS[n]!;
  const tens = TENS[Math.floor(n / 10)]!;
  const unit = n % 10;
  return unit ? `${tens}-${WORDS[unit]}` : tens;
}

export function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** 3200 × 1900 × 20 mm — thin spaces around ×, unit once at the end. */
export function dimensions(l: number, w: number, t?: number) {
  const parts = [l, w, ...(t ? [t] : [])].join(" × ");
  return `${parts} mm`;
}

/** DD.MM.YY in mono contexts. */
export function shortDate(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`;
}

/** 18 March 2026 in prose. */
export function longDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
