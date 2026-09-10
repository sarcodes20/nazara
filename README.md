# Nazara

Luxury Marble & Granite Studio — Kishangarh, Rajasthan.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion · GSAP · Lenis

---

## The one thing to understand before editing anything

**`src/app/globals.css` is the design system.** Every colour, typeface, size,
easing curve and ratio in this project is declared once in that file's
`@theme` block and consumed by name. Tailwind's default palette is switched
off — `--color-*: initial` — so `bg-gray-100` does not resolve to anything and
`rounded-lg` does not exist, because the brand's corner radius is zero on
every rectangle.

What that buys you: a class list in this codebase reads as the brand rather
than as utility CSS.

```tsx
<div className="bg-ground text-ink font-display text-display-l aspect-slab ease-stone">
```

Three consequences worth knowing:

1. **Adding a colour means editing the token block, not a component.** If you
   find yourself reaching for an arbitrary value (`bg-[#333]`), the design
   system does not have what you need and the answer is a conversation, not a
   hex code.
2. **`.viewing-room` inverts a whole subtree** by re-pointing the same token
   names. That is how a dark band sits inside a light page with no conditional
   in React, and it is why the theme works in all three states — explicit
   light, explicit dark, and the un-stamped system default.
3. **`src/lib/motion.ts` owns every duration and curve.** A hard-coded `ms`
   value anywhere outside it is a bug.

---

## Getting started

```bash
pnpm install
pnpm dev
```

`postinstall` generates the placeholder photography (see below). First install
takes about a minute longer than you expect; subsequent ones skip it.

| Script              | Does                                              |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Dev server on :3000 with Turbopack                |
| `pnpm build`        | Production build                                  |
| `pnpm typecheck`    | `tsc --noEmit`                                    |
| `pnpm lint`         | ESLint, Next core-web-vitals + TypeScript         |
| `pnpm placeholders` | Regenerate placeholder imagery                    |

Copy `.env.example` to `.env.local`. Nothing is required for the site to run;
`NEXT_PUBLIC_SITE_URL` matters for canonical URLs, sitemap and JSON-LD, and
`RESEND_API_KEY` switches the viewing form from logging to sending.

---

## Structure

```
src/
├─ app/
│  ├─ layout.tsx              fonts, providers, Organization schema
│  ├─ page.tsx                Home — seven sections, ~720vh
│  ├─ globals.css             THE DESIGN SYSTEM
│  ├─ library/                index + LibraryBrowser (client)
│  │  └─ [slug]/              stone detail, generateStaticParams
│  ├─ works/                  index + WorksIndex (client)
│  │  └─ [slug]/              work detail
│  ├─ provenance/             About — what the studio chooses
│  ├─ atelier/                what the studio makes; owns the finishes
│  ├─ journal/                editorial index
│  │  └─ [slug]/              article template, Article schema
│  ├─ architects/             trade door
│  │  └─ downloads/           The Index + IndexTable (client)
│  ├─ viewing/                Contact
│  ├─ selection/              shared selection, state lives in the URL
│  ├─ api/viewing/            route handler, Zod-validated
│  ├─ api/journal/            newsletter; takes JSON *and* a native form POST,
│  │                          so the footer still works without JS
│  ├─ sitemap.ts, robots.ts, not-found.tsx
│
├─ components/
│  ├─ ui/                     Button, Field, primitives, icons
│  ├─ motion/                 Curtain, MasonLine, SmoothScroll, Cursor, PageTransition
│  ├─ site/                   Header, MegaMenu, MobileDrawer, Footer, SlabCard,
│  │                          BookmatchViewer, DrawnMap, ViewingForm, CopySpec
│  ├─ home/                   the seven homepage sections
│  └─ selection/              provider + tray
│
├─ data/                      stones, works, quarries, downloads, site
└─ lib/                       motion, seo, schema, images, types, utils
```

**Server by default.** Only components that need scroll position, pointer
state or form state carry `"use client"`. Every headline, every stone
description and the entire footer are in the first HTML response.

---

## Where the animations live

The motion spec is implemented in five places and nowhere else.

| Behaviour | File | Notes |
| --- | --- | --- |
| Image reveal (the curtain) | `components/motion/Curtain.tsx` | clip-path wipe + 1.06→1.00 counter-scale on an inner node, so no frame repaints |
| Headline reveal (the mason's line) | `components/motion/MasonLine.tsx` | per-line mask, 60ms stagger capped at eight |
| Smooth scroll | `components/motion/SmoothScroll.tsx` | Lenis driven from the GSAP ticker — see the comment there before changing it |
| Sticky triptych | `components/home/LongLook.tsx` | the only GSAP ScrollTrigger on the site, dynamically imported |
| Cursor | `components/motion/Cursor.tsx` | reads `data-cursor` from the closest ancestor |

`prefers-reduced-motion` is handled globally in `globals.css` (every reveal
becomes a 200ms fade) and per-component through `useReducedMotion`. Sticky
positioning is deliberately left alone — it is layout, not motion.

### Why GSAP at all

Framer Motion does everything on this site except one thing: the long-look
cross-wipe has to be driven by each caption's own position in the scroll.
ScrollTrigger expresses that in three lines. It is dynamically imported inside
that component, so GSAP is not in the initial bundle for any other route.

---

## Placeholder photography

`scripts/generate-placeholders.mjs` renders ~90 seeded SVG vein fields through
sharp into JPEGs at the five permitted ratios. Deterministic, so the same
stone produces the same slab on every machine and in CI.

**This is scaffolding.** When the real shoot lands:

1. Drop the files into `public/images/`.
2. Point the resolvers in `src/lib/images.ts` at them — that file is the only
   place in the codebase that constructs an image path.
3. Delete `scripts/`, the `postinstall` hook, and the ignore entry for
   `public/images/generated`.

Nothing else changes.

---

## Content

All copy is Volume Three, verbatim, and lives in `src/data/`.

**The Journal is the only part of the architecture that grows.** The stone
pages are finite — forty-one is the ceiling — so `src/data/journal.ts` is where
the site earns search traffic over time, and every piece is written to answer a
question an architect actually types. Keep the cadence honest: the footer
promises four or five letters a year, and a journal that visibly stalls costs
more credibility than it ever bought.

**Provenance and Atelier must not drift back together.** Provenance is what the
studio chooses; Atelier is what it makes. The finishes, the dry-lay and the
tolerances live on Atelier and are referenced from Provenance, not repeated —
they were duplicated once already.

Two flags carried over from Volume Three and still outstanding:

- **Technical values need verification.** Origins, Ra figures, coordinates and
  lead times are structurally correct and idiomatic but are not confirmed
  against test reports. The Makrana provenance claim and any origin
  declaration for Iranian onyx need documentary backing before launch.
- **Testimonials are absent by design.** `Work.quote` is `null` on every entry
  and the component renders nothing when it is. Populate only with a real,
  signed-off quotation — never with the specimens from Volume Three §10.

---

## Deploying to Vercel

```bash
pnpm dlx vercel link
pnpm dlx vercel env add NEXT_PUBLIC_SITE_URL production
pnpm dlx vercel --prod
```

Or import the repository at [vercel.com/new](https://vercel.com/new) — the
framework preset, build command and output directory are all detected.

**Set these environment variables in the Vercel dashboard:**

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | all | `https://nazara.in`. Without it, canonicals and JSON-LD point at the fallback. |
| `RESEND_API_KEY` | production | Omit and the viewing form logs instead of sending. |
| `VIEWING_INBOX` | production | Defaults to `viewings@nazara.in`. |

**After the first deploy:**

- Add the apex domain and set `www` to redirect to it.
- Confirm `/sitemap.xml` and `/robots.txt` resolve, then submit the sitemap.
- Check the Open Graph card with a real share — `og:image` is the page's own
  stone, not a logo card, and that is intentional.

Everything except `/api/viewing` and `/selection` is statically rendered.
Stone and work pages are pre-rendered through `generateStaticParams`; stones
revalidate hourly.

---

## Performance and accessibility

Built to hold 95+ on all four Lighthouse categories. What is doing the work:

- **Fonts** self-hosted via `next/font` — no third-party request, no layout
  shift, and Bodoni's optical-size axis survives.
- **Images** AVIF/WebP through `next/image`, every one with an explicit
  `sizes` from `lib/images.ts`, inline blur placeholders, and a trimmed
  `deviceSizes` list in `next.config.ts`.
- **Bundle** GSAP dynamically imported; `optimizePackageImports` on
  lucide-react and framer-motion; Radix used only for the three primitives
  that genuinely need focus management (dialog, checkbox, slot).
- **Accessibility** skip link; visible 1px Backlight focus ring at 3px offset
  on every interactive element; 44px minimum targets; colour never the only
  carrier of meaning (`StatusTag` ships the word alongside the hue); form
  errors are `role="alert"` and say what to do rather than what went wrong;
  the whole Library grid is keyboard-operable.

Two things to watch when you extend it:

- The custom cursor hides the native one on fine pointers. Anything new that
  is clickable needs `data-cursor` or it will look inert.
- `layout` animations in the Library are the most expensive thing on the site.
  If you add a card variant, check it at 41 items on a mid-range laptop.
