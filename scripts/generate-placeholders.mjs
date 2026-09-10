/**
 * Procedural placeholder photography.
 *
 * There is no real imagery yet, and grey boxes would have made every layout
 * decision in this build unverifiable — you cannot judge a typology wall
 * without something in the frames. So each image is generated: a seeded
 * pseudo-random vein field rendered as SVG, rasterised to JPEG through sharp
 * at the exact five ratios the design system allows.
 *
 * Everything is deterministic from the seeds in src/data, so the same stone
 * produces the same slab on every machine and in every CI run.
 *
 * DELETE THIS FILE, its output directory and its postinstall hook the day the
 * real photography lands. Nothing else in the codebase depends on it: the
 * paths are resolved in src/lib/images.ts and nowhere else.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "generated");

/* ---------------------------------------------------------------- random */

/** Mulberry32 — small, fast, and identical across Node versions. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* --------------------------------------------------------------- palettes */

const PALETTES = {
  white: { base: ["#E4E2DA", "#F2F1EB", "#D6D5CC"], vein: "#8E9086", veinAlt: "#B9BAB1" },
  grey: { base: ["#C9CAC2", "#E1E1DA", "#A8A9A1"], vein: "#6E7069", veinAlt: "#8F918A" },
  green: { base: ["#2A362E", "#3E4C42", "#1C251F"], vein: "#C9CFC4", veinAlt: "#7E8A80" },
  amber: { base: ["#C6A575", "#E3C79C", "#A98A5E"], vein: "#F0DDBE", veinAlt: "#8A6E48" },
  black: { base: ["#1A1C1A", "#2A2D2A", "#101210"], vein: "#D8D9D2", veinAlt: "#6E706A" },
  red: { base: ["#5C2C28", "#7A3B33", "#3E1E1B"], vein: "#D9CFC4", veinAlt: "#9A6A5C" },
  brown: { base: ["#7A6B58", "#9C8C76", "#5C5044"], vein: "#2A241E", veinAlt: "#C4B69E" },
  room: { base: ["#1E211D", "#3A3E36", "#141714"], vein: "#C8C4B4", veinAlt: "#6A6E62" },
};

/* ------------------------------------------------------------------- draw */

function veinPath(r, w, h, drift) {
  const steps = 5 + Math.floor(r() * 4);
  let x = -w * 0.05;
  let y = r() * h;
  let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
  for (let i = 0; i < steps; i++) {
    const nx = x + (w * 1.1) / steps;
    const ny = y + (r() - 0.5) * h * drift;
    const cx = x + (nx - x) * 0.5 + (r() - 0.5) * w * 0.08;
    const cy = y + (r() - 0.5) * h * drift * 0.8;
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`;
    x = nx;
    y = ny;
  }
  return d;
}

function slabSvg({ seed, w, h, palette, veins = 14, drift = 0.5, raking = true }) {
  const r = rng(seed);
  const p = PALETTES[palette] ?? PALETTES.white;

  const strokes = Array.from({ length: veins }, () => {
    const heavy = r() > 0.72;
    return `<path d="${veinPath(r, w, h, drift)}" stroke="${
      heavy ? p.vein : p.veinAlt
    }" stroke-width="${(heavy ? 1.6 + r() * 5 : 0.5 + r() * 1.6).toFixed(2)}" fill="none" opacity="${(
      0.18 +
      r() * 0.5
    ).toFixed(2)}" stroke-linecap="round"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.base[0]}"/>
      <stop offset="46%" stop-color="${p.base[1]}"/>
      <stop offset="100%" stop-color="${p.base[2]}"/>
    </linearGradient>
    <!-- Fine grain. Without it the render reads as CGI rather than as a
         photograph, which is exactly the failure Volume One §08 forbids. -->
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${
      seed % 100
    }"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.09"/></feComponentTransfer></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="${(w / 900).toFixed(2)}"/></filter>
    ${
      raking
        ? `<linearGradient id="rake" x1="0" y1="0" x2="1" y2="0.3">
      <stop offset="0%" stop-color="#000" stop-opacity="0.16"/>
      <stop offset="42%" stop-color="#fff" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.30"/>
    </linearGradient>`
        : ""
    }
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#soft)">${strokes}</g>
  ${raking ? `<rect width="${w}" height="${h}" fill="url(#rake)"/>` : ""}
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.55"/>
</svg>`;
}

/* ------------------------------------------------------------------ write */

async function render(name, svg) {
  const file = join(OUT, `${name}.jpg`);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 78, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(file);
}

const STONES = [
  ["makrana-albeta", 412, "white"],
  ["makrana-kumari", 388, "white"],
  ["statuario-venato", 401, "grey"],
  ["calacatta-viola", 377, "red"],
  ["verde-guatemala", 356, "green"],
  ["onice-miele", 409, "amber"],
  ["nero-marquina", 394, "black"],
  ["rosso-levanto", 341, "red"],
  ["rain-forest-brown", 368, "brown"],
  ["absolute-black", 405, "black"],
];

const WORKS = [
  ["private-residence-jodhpur", 71],
  ["hotel-udaipur", 34],
  ["apartment-malabar-hill", 58],
  ["house-by-the-water-alibaug", 22],
  ["flagship-colaba", 89],
  ["private-residence-zurich", 15],
];

const FINISHES = ["polished", "honed", "leathered", "sandblasted"];

/** Slab 1.684:1 · block 1:1 · plane 4:5 · bench 21:9 — the five ratios only. */
const R = {
  slab: [1600, 950],
  block: [1000, 1000],
  plane: [1000, 1250],
  bench: [1800, 771],
  og: [1200, 628],
};

async function main() {
  try {
    await access(join(OUT, "home-hero.jpg"));
    // Already generated. postinstall runs on every CI build; regenerating
    // ~90 images each time is wasted minutes.
    return;
  } catch {
    /* first run */
  }

  await mkdir(OUT, { recursive: true });
  const jobs = [];

  for (const [slug, seed, palette] of STONES) {
    jobs.push(
      render(`stone-${slug}-typology`, slabSvg({ seed, w: R.slab[0], h: R.slab[1], palette, veins: 16 })),
      render(`stone-${slug}-bookmatch`, slabSvg({ seed: seed + 1, w: R.bench[0], h: R.bench[1], palette, veins: 20, drift: 0.7 })),
    );
    FINISHES.forEach((finish, i) =>
      jobs.push(
        render(
          `stone-${slug}-${finish}`,
          // Macro: fewer, larger veins and a heavier rake, because a macro is
          // shot at f/11 with one light almost flat against the face.
          slabSvg({ seed: seed + 10 + i, w: R.block[0], h: R.block[1], palette, veins: 6, drift: 0.9 }),
        ),
      ),
    );
  }

  for (const [slug, seed] of WORKS) {
    jobs.push(render(`work-${slug}-hero`, slabSvg({ seed, w: R.bench[0], h: R.bench[1], palette: "room", veins: 10, drift: 0.3 })));
    for (let n = 1; n <= 3; n++) {
      const ratio = n === 2 ? R.block : n === 3 ? R.bench : R.plane;
      jobs.push(render(`work-${slug}-${n}`, slabSvg({ seed: seed + n * 7, w: ratio[0], h: ratio[1], palette: "room", veins: 8, drift: 0.35 })));
    }
  }

  jobs.push(
    render("home-hero", slabSvg({ seed: 4120, w: 1800, h: 2000, palette: "white", veins: 18, drift: 0.45 })),
    render("long-look-1", slabSvg({ seed: 511, w: R.plane[0], h: R.plane[1], palette: "grey", veins: 12, drift: 0.6 })),
    render("long-look-2", slabSvg({ seed: 512, w: R.plane[0], h: R.plane[1], palette: "room", veins: 9, drift: 0.4 })),
    render("long-look-3", slabSvg({ seed: 513, w: R.plane[0], h: R.plane[1], palette: "room", veins: 7, drift: 0.5 })),
    render("quarry-makrana", slabSvg({ seed: 900, w: R.bench[0], h: R.bench[1], palette: "white", veins: 6, drift: 0.2 })),
    render("dry-lay", slabSvg({ seed: 901, w: R.plane[0], h: R.plane[1], palette: "white", veins: 14, drift: 0.3 })),
    render("craft-1", slabSvg({ seed: 902, w: R.plane[0], h: R.plane[1], palette: "room", veins: 6, drift: 0.5 })),
    render("craft-2", slabSvg({ seed: 903, w: R.plane[0], h: R.plane[1], palette: "room", veins: 6, drift: 0.5 })),
    render("craft-3", slabSvg({ seed: 904, w: R.plane[0], h: R.plane[1], palette: "room", veins: 6, drift: 0.5 })),
  );

  await Promise.all(jobs);

  // og-default lives one level up, beside the favicon.
  await sharp(Buffer.from(slabSvg({ seed: 412, w: R.og[0], h: R.og[1], palette: "white", veins: 14 })))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, "..", "og-default.jpg"));

  console.info(`[placeholders] ${jobs.length + 1} images written to public/images/generated`);
}

await main().catch((error) => {
  // A failure here must not break `npm install` on a machine without sharp's
  // native binary; the site still builds, it simply has no imagery.
  console.warn("[placeholders] skipped:", error.message);
});

/* Keep writeFile imported for the favicon step below. */
await writeFile(
  join(OUT, "..", "..", "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0F1411"/><rect x="6.5" y="10.5" width="19" height="11" fill="none" stroke="#E0B278" stroke-width="1.25"/><path d="M9 21c2.5-4.5 5-7 9-8" fill="none" stroke="#E0B278" stroke-width="1.25"/></svg>`,
).catch(() => {});
