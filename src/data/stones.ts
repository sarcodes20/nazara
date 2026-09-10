import type { Slab, SlabStatus, Stone } from "@/lib/types";

/**
 * Copy is Volume Three §04, verbatim. Technical values are flagged there as
 * requiring confirmation against the studio's own test reports before launch —
 * they are structurally correct but must not be treated as verified.
 */

/** Deterministic slab index so server and client render identically. */
function slabs(
  blockId: string,
  count: number,
  size: [number, number],
  thickness: number,
  finish: Slab["finish"],
  reserved: number,
): Slab[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const status: SlabStatus =
      n <= reserved ? "reserved" : n === reserved + 1 ? "hold" : "available";
    return {
      id: `${blockId}-${String(n).padStart(2, "0")}`,
      length: size[0] - ((i * 7) % 40),
      width: size[1] - ((i * 3) % 20),
      thickness,
      finish,
      status,
    };
  });
}

export const STONES: Stone[] = [
  {
    slug: "makrana-albeta",
    name: "Makrana Albeta",
    family: "Marble",
    character: "The house white. Dense, cold to the hand, almost without pattern.",
    body: [
      "Albeta is the plainest grade Makrana still gives. The field is a warm off-white; the veining, where it appears at all, is a fine grey drift rather than a line. It is a calcite marble, unusually dense and low in porosity, and it takes a honed finish better than a polish. Polished, it can look like a photograph of itself.",
      "The quarries are ninety kilometres from this studio, worked on the same bench system since the seventeenth century. The inlay ground of the Taj Mahal came out of them. We state that once and do not repeat it.",
    ],
    geology: "Calcite",
    origin: "Makrana, Nagaur, Rajasthan",
    originShort: "Makrana",
    slabSize: [3200, 1900],
    thicknesses: [16, 18, 20, 30],
    finishes: ["Polished", "Honed", "Leathered", "Sandblasted"],
    finishNote:
      "Honed for floors and walls. Leathered where hands will touch it daily. Polished only in low light, and never in a bathroom that gets morning sun.",
    adjacent: [
      { slug: "makrana-kumari", reason: "The same body, with movement." },
      { slug: "statuario-venato", reason: "If the vein must be graphic. Neither is cheaper." },
    ],
    block: {
      id: "NZ-0412",
      bench: "Bench 7",
      quarriedOn: "2026-03-02",
      cutOn: "2026-03-18",
      slabsTotal: 18,
      siblings: ["NZ-0413", "NZ-0414"],
    },
    slabs: slabs("NZ-0412", 12, [3200, 1900], 20, "Honed", 3),
    colour: ["White"],
    seed: 412,
  },
  {
    slug: "makrana-kumari",
    name: "Makrana Kumari",
    family: "Marble",
    character: "Warmer than Albeta, and it moves.",
    body: [
      "Kumari carries a soft grey vein that runs in long, unhurried diagonals across the face. Vein-cut it reads as weather. Cross-cut it closes into a still field with the grey pooled rather than drawn. It is the grade to choose when a room needs a white that is not silent.",
      "It is also the grade most often misrepresented, because the name travels further than the bench does. Every slab in this library carries the block it came from and the day it was cut.",
    ],
    geology: "Calcite",
    origin: "Makrana, Nagaur, Rajasthan",
    originShort: "Makrana",
    slabSize: [3200, 1900],
    thicknesses: [18, 20, 30],
    finishes: ["Polished", "Honed", "Leathered"],
    finishNote:
      "Honed. The vein loses its softness under a polish and starts to look printed.",
    adjacent: [
      { slug: "makrana-albeta", reason: "For quiet." },
      { slug: "calacatta-viola", reason: "If the movement should be an event rather than a texture." },
    ],
    block: {
      id: "NZ-0388",
      bench: "Bench 4",
      quarriedOn: "2025-11-14",
      cutOn: "2025-12-02",
      slabsTotal: 16,
      siblings: ["NZ-0389"],
    },
    slabs: slabs("NZ-0388", 9, [3200, 1900], 20, "Honed", 2),
    colour: ["White", "Grey"],
    seed: 388,
  },
  {
    slug: "statuario-venato",
    name: "Statuario Venato",
    family: "Marble",
    character: "The one everyone asks for, and the one we buy least.",
    body: [
      "A cold white with a grey vein that is graphic rather than atmospheric. It draws a line across a room and the room follows it. Quarried in the Apuan Alps above Carrara, in a seam that has been worked out and re-entered for two thousand years.",
      "We buy perhaps two blocks a year, because most of what is offered as Statuario is not. If a slab is sold to you without a block number, it is not Statuario. If the vein is identical on every slab in the bundle, it has been printed.",
    ],
    geology: "Calcite",
    origin: "Carrara, Tuscany, Italy",
    originShort: "Carrara",
    slabSize: [3200, 1900],
    thicknesses: [20, 30],
    finishes: ["Polished", "Honed"],
    finishNote:
      "Polished, if anywhere. This is the one stone in the library that was made for it.",
    adjacent: [
      { slug: "makrana-albeta", reason: "Closest in body; a warmer, quieter room." },
      { slug: "calacatta-viola", reason: "The same seam, if colour is wanted." },
    ],
    block: {
      id: "NZ-0401",
      bench: "Cava 7, Fantiscritti",
      quarriedOn: "2025-09-08",
      cutOn: "2025-10-21",
      slabsTotal: 14,
      siblings: [],
    },
    slabs: slabs("NZ-0401", 5, [3200, 1900], 20, "Polished", 2),
    colour: ["White", "Grey"],
    seed: 401,
  },
  {
    slug: "calacatta-viola",
    name: "Calacatta Viola",
    family: "Marble",
    character: "Oxblood and violet on a white ground. Not a quiet stone.",
    body: [
      "The veining is brecciated: the marble was broken and healed, and the violet is what filled the fractures. No two slabs agree with each other, which is why it is bought in bookmatched pairs or not at all.",
      "It should be used once in a building and never twice. A second Viola surface in the same house does not double the effect; it halves it.",
    ],
    geology: "Brecciated calcite",
    origin: "Apuan Alps, Tuscany, Italy",
    originShort: "Apuan Alps",
    slabSize: [3000, 1800],
    thicknesses: [20],
    finishes: ["Polished", "Honed"],
    finishNote:
      "Polished for a vertical plane. Honed for anything horizontal, or the violet goes purple under artificial light.",
    adjacent: [
      { slug: "rosso-levanto", reason: "The same weight in a darker register." },
      { slug: "rain-forest-brown", reason: "If the drama should come from pattern rather than colour." },
    ],
    block: {
      id: "NZ-0377",
      bench: "Cava Viola",
      quarriedOn: "2025-06-19",
      cutOn: "2025-08-04",
      slabsTotal: 10,
      siblings: ["NZ-0378"],
    },
    slabs: slabs("NZ-0377", 6, [3000, 1800], 20, "Polished", 1),
    colour: ["White", "Red"],
    seed: 377,
  },
  {
    slug: "verde-guatemala",
    name: "Verde Guatemala",
    family: "Marble",
    character: "Named for a country it does not come from.",
    body: [
      "A serpentinite: near-black green, threaded with white calcite that runs like a crack pattern rather than a vein. The blocks in this library are quarried in Rajasthan, four hours south of the studio. The name is a nineteenth-century trade convention the industry has never bothered to correct, and we use it because that is what a specification will say.",
      "It is a serpentine, not a true marble, and it does not want water. Specified dry, it is one of the most permanent surfaces we sell. Specified in a wet room, it will disappoint you within two years.",
    ],
    geology: "Serpentinite",
    origin: "Rajnagar, Rajsamand, Rajasthan",
    originShort: "Rajnagar",
    slabSize: [2900, 1750],
    thicknesses: [18, 20],
    finishes: ["Honed", "Leathered"],
    finishNote:
      "Honed or leathered. Polished serpentine looks like plastic under any light warmer than 3500 K.",
    adjacent: [
      { slug: "nero-marquina", reason: "The same darkness with a cleaner line." },
      { slug: "absolute-black", reason: "If the green is the problem." },
    ],
    block: {
      id: "NZ-0356",
      bench: "Bench 2",
      quarriedOn: "2025-04-11",
      cutOn: "2025-05-06",
      slabsTotal: 12,
      siblings: ["NZ-0357", "NZ-0358"],
    },
    slabs: slabs("NZ-0356", 4, [2900, 1750], 20, "Honed", 1),
    colour: ["Green", "Black"],
    seed: 356,
  },
  {
    slug: "onice-miele",
    name: "Onice Miele",
    family: "Onyx",
    character: "The only stone in the library meant to be lit from behind.",
    body: [
      "Honey onyx is banded calcite laid down by water, layer over layer, in caves. At twenty millimetres it transmits. Backlit, the banding becomes a section drawing of the water that made it, and the wall stops being a wall.",
      "It is not a floor. It is not a worktop. It is soft, it scratches, and it will not survive a kitchen. Used correctly it is the most extraordinary material we hold; used as a surface it is an expensive mistake, and we will say so before you make it.",
    ],
    geology: "Banded calcite, resin-backed",
    origin: "Sistan, Iran",
    originShort: "Sistan",
    slabSize: [2600, 1600],
    thicknesses: [20],
    finishes: ["Polished"],
    finishNote:
      "Polished. Always backlit at 2700–3000 K, at a minimum of 80 mm from the face, or the fittings will read through.",
    adjacent: [
      { slug: "rain-forest-brown", reason: "The nearest effect without translucency, bookmatched." },
      { slug: "calacatta-viola", reason: "If a single dramatic plane is the brief." },
    ],
    block: {
      id: "NZ-0409",
      bench: "Bench 1",
      quarriedOn: "2025-12-03",
      cutOn: "2026-01-15",
      slabsTotal: 8,
      siblings: [],
    },
    slabs: slabs("NZ-0409", 2, [2600, 1600], 20, "Polished", 0),
    colour: ["Amber"],
    seed: 409,
  },
  {
    slug: "nero-marquina",
    name: "Nero Marquina",
    family: "Marble",
    character: "Black, with white running through it like chalk on a board.",
    body: [
      "From Markina in the Basque Country. The ground is a true black limestone-marble and the white is calcite, arriving in irregular fissures that never repeat. A block that promises even veining is a block that has been resined and filled, and we do not buy those.",
      "It marks. Lemon, wine and limescale will all leave a signature on a polished Nero Marquina within a year. That is either unacceptable or it is the point, and the answer is the client's, not ours.",
    ],
    geology: "Bituminous limestone",
    origin: "Markina, Bizkaia, Spain",
    originShort: "Markina",
    slabSize: [3000, 1800],
    thicknesses: [20, 30],
    finishes: ["Polished", "Honed", "Leathered"],
    finishNote:
      "Honed, and sealed twice. Polished only where nothing will be set down.",
    adjacent: [
      { slug: "absolute-black", reason: "If the marking is unacceptable." },
      { slug: "verde-guatemala", reason: "The same weight with warmth." },
    ],
    block: {
      id: "NZ-0394",
      bench: "Bench 3",
      quarriedOn: "2025-08-22",
      cutOn: "2025-09-30",
      slabsTotal: 15,
      siblings: ["NZ-0395"],
    },
    slabs: slabs("NZ-0394", 7, [3000, 1800], 20, "Honed", 2),
    colour: ["Black", "White"],
    seed: 394,
  },
  {
    slug: "rosso-levanto",
    name: "Rosso Levanto",
    family: "Marble",
    character:
      "Deep oxide red, broken by white, from a coast that no longer exports much of it.",
    body: [
      "A brecciated serpentinite from Liguria: the red is iron, the white is calcite that filled the breaks. It reads almost black at a distance and opens into colour as you approach, which makes it a stone for corridors and small rooms rather than for large planes.",
      "The good benches are largely worked out. What remains is bought a block at a time and rarely repeats, so a project that needs Rosso Levanto should buy the whole block at the outset. There will not be a matching second order.",
    ],
    geology: "Brecciated serpentinite",
    origin: "Levanto, Liguria, Italy",
    originShort: "Levanto",
    slabSize: [2800, 1700],
    thicknesses: [20],
    finishes: ["Polished"],
    finishNote: "Polished. Honed, the red goes brown.",
    adjacent: [
      { slug: "calacatta-viola", reason: "The same violence on a light ground." },
      { slug: "verde-guatemala", reason: "The same geology in green." },
    ],
    block: {
      id: "NZ-0341",
      bench: "Cava Rossa",
      quarriedOn: "2025-02-17",
      cutOn: "2025-03-28",
      slabsTotal: 9,
      siblings: [],
    },
    slabs: slabs("NZ-0341", 3, [2800, 1700], 20, "Polished", 1),
    colour: ["Red"],
    seed: 341,
  },
  {
    slug: "rain-forest-brown",
    name: "Rain Forest Brown",
    family: "Marble",
    character: "Quarried an hour from here. Sold everywhere else as something else.",
    body: [
      "A dolomitic marble from the Bhainslana belt in Rajasthan. The pattern is dendritic: iron and manganese that migrated through fractures and dried where they stopped. Every slab is a different weather map, and no two blocks from the same bench agree.",
      "It is the stone that first made this region's name and the one most often sold under an invented Italian one. We use the local name because the provenance is the value.",
    ],
    geology: "Dolomitic marble",
    origin: "Bhainslana, Jaipur, Rajasthan",
    originShort: "Bhainslana",
    slabSize: [3200, 1900],
    thicknesses: [18, 20],
    finishes: ["Honed", "Leathered", "Brushed"],
    finishNote:
      "Honed for floors, leathered for anything vertical that catches light across it.",
    adjacent: [
      { slug: "calacatta-viola", reason: "If the pattern should be violent rather than atmospheric." },
      { slug: "makrana-kumari", reason: "The same drift, without the colour." },
    ],
    block: {
      id: "NZ-0368",
      bench: "Bench 9",
      quarriedOn: "2025-05-30",
      cutOn: "2025-07-12",
      slabsTotal: 20,
      siblings: ["NZ-0369", "NZ-0370"],
    },
    slabs: slabs("NZ-0368", 11, [3200, 1900], 20, "Leathered", 3),
    colour: ["Brown"],
    seed: 368,
  },
  {
    slug: "absolute-black",
    name: "Absolute Black",
    family: "Granite",
    character: "No pattern at all. That is the specification.",
    body: [
      "A gabbro from the Deccan, sold as granite, and the only stone in this library bought for its uniformity rather than its drawing. It is hard, it does not mark, and it will outlive the building.",
      "The correct question about Absolute Black is never which quarry but which finish. Polished it is a mirror and shows every fingerprint. Leathered it is a textile. Flamed it is a pavement. The same slab, three different buildings.",
    ],
    geology: "Gabbro",
    origin: "Chimakurthy, Andhra Pradesh",
    originShort: "Chimakurthy",
    slabSize: [3200, 1900],
    thicknesses: [18, 20, 30],
    finishes: ["Polished", "Honed", "Leathered", "Flamed"],
    finishNote:
      "Leathered, in almost every case. Polished only where reflection is the intention.",
    adjacent: [
      { slug: "nero-marquina", reason: "If a line through the black is wanted." },
      { slug: "verde-guatemala", reason: "The same darkness, with a geology that shows." },
    ],
    block: {
      id: "NZ-0405",
      bench: "Quarry 4",
      quarriedOn: "2025-10-09",
      cutOn: "2025-11-20",
      slabsTotal: 24,
      siblings: ["NZ-0406", "NZ-0407"],
    },
    slabs: slabs("NZ-0405", 14, [3200, 1900], 20, "Leathered", 4),
    colour: ["Black"],
    seed: 405,
  },
];

export const STONE_MAP = new Map(STONES.map((s) => [s.slug, s]));

export function getStone(slug: string) {
  return STONE_MAP.get(slug);
}

/** Counts shown in the mega menu. Live, so a new stone updates the nav. */
export const FAMILY_COUNTS = STONES.reduce<Record<string, number>>((acc, s) => {
  acc[s.family] = (acc[s.family] ?? 0) + 1;
  return acc;
}, {});

export const FILTER_FACETS = {
  Family: [...new Set(STONES.map((s) => s.family))],
  Colour: [...new Set(STONES.flatMap((s) => s.colour))],
  Origin: [...new Set(STONES.map((s) => s.originShort))],
  Finish: [...new Set(STONES.flatMap((s) => s.finishes))],
} as const;
