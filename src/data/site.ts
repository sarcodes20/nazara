export const SITE = {
  name: "Nazara",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nazara.in",
  tagline: "Luxury Marble & Granite Studio",
  address: {
    street: "Madanganj–Kishangarh",
    locality: "Ajmer",
    region: "Rajasthan",
    postcode: "305801",
    country: "IN",
  },
  coordinates: { lat: 26.5877, lon: 74.856 },
  hours: "Monday to Saturday, 10.00–18.00 IST",
  hoursShort: "Mon–Sat 10.00–18.00 IST",
  email: {
    viewings: "viewings@nazara.in",
    trade: "trade@nazara.in",
    press: "press@nazara.in",
    atelier: "atelier@nazara.in",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/nazara" },
    { label: "Pinterest", href: "https://pinterest.com/nazara" },
    { label: "LinkedIn", href: "https://linkedin.com/company/nazara" },
  ],
} as const;

/** Volume Two §01. Architects, Downloads and Viewing are doors, not nav items. */
export const NAV = [
  { label: "Library", href: "/library" },
  { label: "Works", href: "/works" },
  { label: "Provenance", href: "/provenance" },
  { label: "Atelier", href: "/atelier" },
  { label: "Journal", href: "/journal" },
] as const;

/** The refusal. The site's only statistic, and it is an inverted one. */
export const REFUSAL = [
  { year: 2021, seen: 288, kept: 14 },
  { year: 2022, seen: 317, kept: 16 },
  { year: 2023, seen: 341, kept: 12 },
  { year: 2024, seen: 379, kept: 21 },
  { year: 2025, seen: 406, kept: 19 },
] as const;

export const LEAD_TIMES = [
  { origin: "Kishangarh", weeks: "2 weeks" },
  { origin: "Makrana", weeks: "3–4 weeks" },
  { origin: "Bhainslana", weeks: "3 weeks" },
  { origin: "Rajnagar", weeks: "4 weeks" },
  { origin: "Chimakurthy", weeks: "5–6 weeks" },
  { origin: "Carrara", weeks: "9–11 weeks" },
  { origin: "Markina", weeks: "10–12 weeks" },
] as const;

export const LEAD_TIMES_UPDATED = "2026-09-04";

export const FINISH_SPEC = [
  {
    name: "Polished",
    ra: "Ra 0.2 µm",
    note: "Reflective. Shows every joint and every fingerprint. Vertical planes and low light.",
  },
  {
    name: "Honed",
    ra: "Ra 0.8 µm",
    note: "The default. Light sits in the surface rather than on it. Floors, walls, most worktops.",
  },
  {
    name: "Leathered",
    ra: "Ra 3.5 µm",
    note: "Texture without pattern. Wet rooms, handled edges, anywhere bare feet go.",
  },
  {
    name: "Sandblasted",
    ra: "Ra 6.0 µm",
    note: "The only finish with real grip. Thresholds, terraces, pool surrounds.",
  },
] as const;

export const EDGE_PROFILES = [
  "Square",
  "Chamfered 2 mm",
  "Mitred 45°",
  "Bullnose",
  "Shadow gap 12 mm",
  "Waterfall",
] as const;

export const ARCHITECT_FAQS = [
  {
    q: "Can I reserve a block before the client has approved it?",
    a: "Yes, for twenty-eight days, without payment. After that we will either take a deposit or release it, and we will tell you which before the date rather than after.",
  },
  {
    q: "Will the second order match the first?",
    a: "Only if it comes from the same block. Ask us for the whole block at the outset. It is almost always cheaper than a matched re-order, and usually impossible to obtain later at any price.",
  },
  {
    q: "Do you resin or reinforce?",
    a: "Onyx and any slab with a structural fissure is resin-backed, and it is stated on the datasheet. We do not fill or dye colour into a stone to make it look like a better grade, and we do not buy blocks that have had it done to them.",
  },
  {
    q: "Can we see the actual slabs before shipping?",
    a: "You will see them whether you ask or not. Every bookmatch is dry-laid, chalked and photographed on the atelier floor, and that photograph is sent for approval before anything is crated.",
  },
  {
    q: "Do you fabricate, or only supply?",
    a: "Both. Cutting, finishing, edge profiles and dry-lay happen here. Installation is by your contractor, to our detail drawings, and we will attend the first day on site anywhere in India at no charge.",
  },
  {
    q: "What happens if a slab breaks in transit?",
    a: "We replace it from the same block if a slab remains, and from the same bench if one does not. If neither is possible we will tell you immediately, because a fortnight's silence is worse than bad news.",
  },
  {
    q: "Do you work outside India?",
    a: "Yes. Roughly a fifth of the library leaves the country each year. Freight, crating and documentation are handled here; customs clearance is yours or your agent's.",
  },
  {
    q: "Is there a minimum order?",
    a: "No. The smallest thing we have supplied was a single 900 mm threshold. The client came to the viewing for it.",
  },
] as const;

export const VIEWING_FAQS = [
  {
    q: "Do I need to bring anything?",
    a: "Plans, if they exist. A photograph of the room in its own light is more useful than a moodboard.",
  },
  {
    q: "Can I come without a project?",
    a: "Yes. Architects come to look at benches they are not buying from, and it is how most of our long relationships started.",
  },
  {
    q: "Will I be shown everything?",
    a: "No. You will be shown what suits the room you described. Being shown forty-one stones is not a service; it is an abdication.",
  },
  {
    q: "Can I buy on the day?",
    a: "You can reserve on the day. Nothing is invoiced in the viewing room, by policy, and we will not discuss price while you are standing in front of the stone.",
  },
] as const;
