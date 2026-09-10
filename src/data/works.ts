import type { Work } from "@/lib/types";

/**
 * Volume Three §05. Private clients are never named. Hospitality and retail
 * only with written permission held on file with the photographs.
 *
 * `quote` is null on every entry by design: Volume Three §10 marks the
 * specimen pull quotes as unpublishable. Populate only with a real, signed-off
 * quotation — the component renders nothing when this is null.
 */
export const WORKS: Work[] = [
  {
    slug: "private-residence-jodhpur",
    name: "Private Residence",
    city: "Jodhpur",
    year: 2025,
    area: 610,
    stoneSlugs: ["makrana-albeta"],
    stoneLine: "Makrana Albeta, vein-cut",
    architect: "[Practice]",
    photographer: "[Photographer]",
    brief: [
      "A courtyard house on the edge of the old city, built to be closed against forty-six degrees for four months of the year. The architect wanted one stone through the whole ground floor, and wanted the vein to continue across every threshold, so the material had to be resolved before the plan was.",
      "We took a single block. NZ-0412 gave eighteen slabs at 3200 × 1900, of which eleven went to this house. They were cut vein-cut, numbered in the order they came off the gangsaw, and dry-laid on the atelier floor in the sequence they would sit in the building. That layout was photographed and sent before anything was crated, and it is the reason the vein runs unbroken from the entrance court through to the stair.",
      "The remaining seven slabs stayed in the library. They are still here, and they still match.",
    ],
    stonesUsed:
      "Makrana Albeta, vein-cut, honed, 20 mm, block NZ-0412, slabs 1–11.",
    quote: null,
    seed: 71,
  },
  {
    slug: "hotel-udaipur",
    name: "Hotel, 42 keys",
    city: "Udaipur",
    year: 2025,
    area: 2400,
    stoneSlugs: ["verde-guatemala"],
    stoneLine: "Verde Guatemala",
    architect: "[Practice]",
    photographer: "[Photographer]",
    brief: [
      "Verde Guatemala through the arrival sequence and nowhere else. Dark stone at the moment of entry, so that the lake, when the corridor opens, arrives as light.",
      "Four blocks, held for eleven months while the building caught up. Holding stock for a construction programme is not a service most suppliers offer, because it ties up a yard. It is the only way a sequence like this survives a delay.",
    ],
    stonesUsed:
      "Verde Guatemala, honed, 20 mm, blocks NZ-0356 to NZ-0359.",
    quote: null,
    seed: 34,
  },
  {
    slug: "apartment-malabar-hill",
    name: "Apartment, Malabar Hill",
    city: "Mumbai",
    year: 2024,
    area: 340,
    stoneSlugs: ["onice-miele"],
    stoneLine: "Onice Miele, backlit",
    architect: "[Practice]",
    photographer: "[Photographer]",
    brief: [
      "A single backlit Onice Miele plane, 4.2 metres by 2.6, in a room with no window.",
      "The banding was chosen for the way it runs horizontally, so that the wall reads as a horizon rather than as a light box. The fittings sit 110 mm behind the face, thirty more than the minimum, because at 80 mm the first mock-up showed the LED pitch through the thinnest band.",
    ],
    stonesUsed: "Onice Miele, polished, 20 mm resin-backed, block NZ-0409.",
    quote: null,
    seed: 58,
  },
  {
    slug: "house-by-the-water-alibaug",
    name: "House by the water",
    city: "Alibaug",
    year: 2024,
    area: 480,
    stoneSlugs: ["rain-forest-brown"],
    stoneLine: "Rain Forest Brown",
    architect: "[Practice]",
    photographer: "[Photographer]",
    brief: [
      "Rain Forest Brown, leathered, on every vertical surface a hand touches, and nothing on the floors.",
      "Salt air rules out most of what a coastal house wants. This stone was quarried ninety minutes inland from a similar climate and has been tested by it for two centuries in the buildings of the region.",
    ],
    stonesUsed: "Rain Forest Brown, leathered, 20 mm, block NZ-0368.",
    quote: null,
    seed: 22,
  },
  {
    slug: "flagship-colaba",
    name: "Flagship, 380 m²",
    city: "Colaba",
    year: 2023,
    area: 380,
    stoneSlugs: ["nero-marquina"],
    stoneLine: "Nero Marquina, honed",
    architect: "[Practice]",
    photographer: "[Photographer]",
    brief: [
      "Honed Nero Marquina on the floor, sealed twice, with the acceptance written into the brief that it would mark.",
      "Four years on it has, and the client considers the marking the best thing in the room. That agreement was reached before the order, in writing, which is the only way a stone that patinates ever survives a handover.",
    ],
    stonesUsed: "Nero Marquina, honed, 20 mm, blocks NZ-0394 and NZ-0395.",
    quote: null,
    seed: 89,
  },
  {
    slug: "private-residence-zurich",
    name: "Private Residence",
    city: "Zürich",
    year: 2023,
    area: 290,
    stoneSlugs: ["makrana-kumari"],
    stoneLine: "Makrana Kumari",
    architect: "[Practice]",
    photographer: "[Photographer]",
    brief: [
      "Makrana Kumari, shipped nine thousand kilometres to a country with its own quarries, because the client had seen the vein in Jaipur and wanted that bench and no other.",
      "Two blocks, one container, eleven weeks. Freight, crating and documentation were handled here; clearance in Basel took a further nine days, which we now build into every European quotation.",
    ],
    stonesUsed: "Makrana Kumari, honed, 20 mm, blocks NZ-0388 and NZ-0389.",
    quote: null,
    seed: 15,
  },
];

export const WORK_MAP = new Map(WORKS.map((w) => [w.slug, w]));

export function getWork(slug: string) {
  return WORK_MAP.get(slug);
}

export function worksUsingStone(slug: string) {
  return WORKS.filter((w) => w.stoneSlugs.includes(slug));
}
