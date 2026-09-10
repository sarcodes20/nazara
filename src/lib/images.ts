/**
 * Placeholder image resolution. Every path here points at the procedural
 * output of `scripts/generate-placeholders.mjs`.
 *
 * When real photography arrives, replace the bodies of these functions with
 * a CDN or CMS lookup. Nothing else in the codebase constructs an image path.
 */

const DIR = "/images/generated";

export const img = {
  stoneTypology: (slug: string) => `${DIR}/stone-${slug}-typology.jpg`,
  stoneMacro: (slug: string, finish: string) =>
    `${DIR}/stone-${slug}-${finish.toLowerCase()}.jpg`,
  stoneBookmatch: (slug: string) => `${DIR}/stone-${slug}-bookmatch.jpg`,
  workHero: (slug: string) => `${DIR}/work-${slug}-hero.jpg`,
  workPlane: (slug: string, n: number) => `${DIR}/work-${slug}-${n}.jpg`,
  homeHero: () => `${DIR}/home-hero.jpg`,
  longLook: (n: 1 | 2 | 3) => `${DIR}/long-look-${n}.jpg`,
  quarry: (name: string) => `${DIR}/quarry-${name.toLowerCase()}.jpg`,
  craft: (n: 1 | 2 | 3) => `${DIR}/craft-${n}.jpg`,
  dryLay: () => `${DIR}/dry-lay.jpg`,
} as const;

/**
 * A 12px inline blur, generated at build time by the placeholder script and
 * inlined here so next/image never waits on a network round trip for it.
 * Two variants: light stone and dark stone.
 */
export const BLUR = {
  light:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4Ij48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iOCIgZmlsbD0iIzk4OWI5MiIvPjwvc3ZnPg==",
  dark:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4Ij48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iOCIgZmlsbD0iIzFiMjIxYyIvPjwvc3ZnPg==",
} as const;

/** Sizes strings, written once so the Library grid never over-fetches. */
export const SIZES = {
  /** 3-up desktop, 2-up tablet, 1-up mobile. */
  card: "(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw",
  /** 6-up typology wall, 3-up mobile. */
  tile: "(min-width: 64rem) 16vw, (min-width: 48rem) 25vw, 33vw",
  full: "100vw",
  half: "(min-width: 64rem) 58vw, 100vw",
} as const;
