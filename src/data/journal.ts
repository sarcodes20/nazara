export interface JournalEntry {
  slug: string;
  /** The recurring column this belongs to. Shown as the eyebrow. */
  column: "The Long Look" | "Specifying" | "From the bench";
  title: string;
  /** Two lines maximum, in Slate, on the index card. */
  standfirst: string;
  published: string;
  body: string[];
  /** Pull quote, set in Bodoni between two paragraphs. Optional. */
  pull?: { text: string; after: number };
  /** Stones the piece refers to, linked at the foot. */
  stoneSlugs: string[];
}

/**
 * Volume Three §11: the search strategy is the specifier's own vocabulary, not
 * "marble supplier india". The stone pages are finite — forty-one and that is
 * the ceiling — so the Journal is the only part of the architecture that
 * generates indexable pages indefinitely. Every piece here answers a question
 * an architect actually types.
 */
export const JOURNAL: JournalEntry[] = [
  {
    slug: "vein-cut-and-cross-cut",
    column: "Specifying",
    title: "Vein-cut and cross-cut are two different stones.",
    standfirst:
      "The same block, sawn on two axes, gives two materials that behave nothing alike. Most specifications name the stone and forget the cut.",
    published: "2026-08-14",
    body: [
      "A block of marble is a stack of sediment that has been folded, heated and compressed. It has a grain, in the way timber has a grain, and the gangsaw can enter it on either axis.",
      "Cut along the bedding and you have vein-cut: the strata read as long horizontal drift. The lines run the length of the slab. Stand it vertically on a wall and the room acquires a horizon; the eye travels sideways and the wall gets wider.",
      "Cut across it and you have cross-cut, also called fleuri: the same strata are sectioned rather than followed. The drift closes into a bloom: rounded, cloudy, roughly concentric. The eye stops rather than travels, and the surface reads as a field rather than as a landscape.",
      "Neither is better. But they are not interchangeable, and a schedule that says only 'Makrana Albeta, honed, 20 mm' has left the most consequential decision to whoever loads the block onto the saw.",
      "Two practical consequences. First, yield: vein-cut typically returns fewer usable slabs from the same block, because the long lines expose every fissure across the full length. Expect to pay for that in availability rather than in rate. Second, matching: vein-cut bookmatches into a symmetrical butterfly that most people recognise. Cross-cut bookmatches into something closer to a Rorschach: striking, harder to control, and much harder to repeat on a second wall.",
      "Decide the cut before you decide the quantity. It changes both.",
    ],
    pull: {
      text: "Vein-cut is a landscape. Cross-cut is a bloom. The block does not care which one you wanted.",
      after: 3,
    },
    stoneSlugs: ["makrana-albeta", "makrana-kumari"],
  },
  {
    slug: "how-thick-backlit-onyx",
    column: "Specifying",
    title: "How thick should backlit onyx be?",
    standfirst:
      "Twenty millimetres, resin-backed, with the fittings at least eighty millimetres off the face. The reasons are worth knowing before the mock-up.",
    published: "2026-06-27",
    body: [
      "Onyx transmits because it is banded calcite laid down by water in caves, and the bands are thin enough that light passes through them. That is the whole effect, and it is unusually easy to lose.",
      "Twenty millimetres is the working thickness. Thinner and the slab will not survive handling or its own weight over a span; thicker and transmission falls away quickly. At thirty millimetres most honey onyx has stopped glowing and started merely looking pale.",
      "Every backlit slab should be resin-backed with a fibreglass mesh. This is not a quality compromise; it is what makes a 4-metre plane of a soft, fissured stone structurally sane. Ask for it in writing, and ask what resin, because a yellowing resin will show through a transmitting stone within a few years.",
      "The fittings are where most installations fail. At the eighty-millimetre minimum you will get an even wash on a well-behaved slab. On a slab with thin bands, which is to say on a good slab, eighty is not enough, and the LED pitch reads through as a row of hot spots. On the Malabar Hill apartment we ended at a hundred and ten, and the first mock-up at eighty is the reason we know.",
      "Colour temperature: 2700–3000 K. Above that the amber goes green. Use a diffuser, run the LEDs at partial output rather than choosing a dimmer strip, and build the cavity so a failed driver can be reached without removing the stone.",
      "Finally: mock it up. A 600 mm square of the actual slab, lit at the actual distance, with the actual fitting. Onyx is the one material where a sample tells you almost nothing.",
    ],
    stoneSlugs: ["onice-miele"],
  },
  {
    slug: "buy-the-block",
    column: "Specifying",
    title: "Buy the block, not the slab.",
    standfirst:
      "It is almost always cheaper than a matched re-order, and usually the only way one exists. This is advice against our own short-term interest.",
    published: "2026-04-09",
    body: [
      "A block gives between eight and twenty-four slabs, depending on its size and the thickness you cut. Those slabs are consecutive: slab four and slab five were touching an hour before they were sawn, and their drawings continue into one another. Slab four and a slab from the next block along the same bench have nothing to do with each other.",
      "Most projects buy what they need. Then the scheme changes, or a slab breaks on site, or the client adds a bathroom, and someone rings us in March asking for two more of the marble they bought in November.",
      "Sometimes we can help. The block may still be here, and if it is, the match is exact. More often it has gone, and then the honest answer is that there is no such thing as two more. There is only something similar, which in a room where the vein is supposed to run through is worse than something obviously different.",
      "So: work out the area, add the wastage your fabricator actually uses rather than the one they quote, add a slab for breakage, and buy the block. We will hold it. Twenty-eight days without payment, longer with a deposit, and we have held stone for eleven months while a hotel caught up with itself.",
      "The commercial argument is straightforward. A whole block bought once is cheaper per square metre than the same quantity bought twice, and it removes the single most expensive risk in a stone package. The argument against is that it ties up money earlier. That is real, and it is the trade.",
    ],
    pull: {
      text: "There is no such thing as two more. There is only something similar.",
      after: 2,
    },
    stoneSlugs: ["rosso-levanto", "statuario-venato"],
  },
  {
    slug: "what-a-wet-slab-tells-you",
    column: "The Long Look",
    title: "What a wet slab tells you.",
    standfirst:
      "Water is the oldest instrument in this trade and still the most reliable. It shows a stone the colour it will be in a finished room.",
    published: "2026-02-21",
    body: [
      "Dry stone flatters itself. A sawn face is covered in a fine pale dust that lifts the value of everything and mutes the contrast, and in a yard full of dry slabs almost anything looks acceptable.",
      "Pour water down it and the dust goes. What you are left with is close to the polished colour: the true depth of the ground, the actual contrast of the vein, and every fissure the saw opened. That last one is the part that matters, because water sits in them and draws them as dark lines.",
      "So a wet slab is a test in two directions at once. It tells you what the stone will look like, and it tells you what is wrong with it. A hairline that is invisible dry becomes a definite mark wet, and if it runs across the short dimension it will very likely become a break during handling.",
      "The reason we do it at the bench rather than at the yard is that the answer is different in daylight. Under a shed roof a wet slab reads darker and colder than it will in a room with north light. Under an overcast sky it reads almost exactly right.",
      "It takes a bucket and about four minutes, and it is the single step most reliably skipped between a quarry and a specification. Every slab in this library has had it done, in daylight, by someone who was allowed to say no.",
    ],
    stoneSlugs: ["makrana-albeta", "verde-guatemala"],
  },
];

export const JOURNAL_MAP = new Map(JOURNAL.map((j) => [j.slug, j]));

export function getEntry(slug: string) {
  return JOURNAL_MAP.get(slug);
}

/** Newest first. The index never paginates below a dozen pieces. */
export const JOURNAL_SORTED = [...JOURNAL].sort((a, b) =>
  b.published.localeCompare(a.published),
);
