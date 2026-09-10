import type { Quarry } from "@/lib/types";

/**
 * Volume Three §PROV-03. Coordinates are indicative to the quarry district,
 * not to a working face, and must be confirmed against the studio's records
 * before publication.
 *
 * `map` is a normalised position inside the drawn Rajasthan/world outline —
 * the two international quarries sit in an inset, handled by the component.
 */
export const QUARRIES: Quarry[] = [
  {
    name: "Makrana",
    district: "Nagaur, Rajasthan",
    lat: 27.0453,
    lon: 74.7218,
    material: "Calcite marble",
    since: 1994,
    map: [0.44, 0.3],
  },
  {
    name: "Bhainslana",
    district: "Jaipur, Rajasthan",
    lat: 27.12,
    lon: 75.68,
    material: "Dolomitic marble",
    since: 1998,
    map: [0.62, 0.34],
  },
  {
    name: "Rajnagar",
    district: "Rajsamand, Rajasthan",
    lat: 25.08,
    lon: 73.88,
    material: "Serpentinite",
    since: 2004,
    map: [0.34, 0.6],
  },
  {
    name: "Chimakurthy",
    district: "Prakasam, Andhra Pradesh",
    lat: 15.61,
    lon: 79.89,
    material: "Gabbro",
    since: 2009,
    map: [0.78, 0.92],
  },
  {
    name: "Carrara",
    district: "Tuscany, Italy",
    lat: 44.0793,
    lon: 10.0977,
    material: "Calcite marble",
    since: 2012,
    map: [0.12, 0.12],
  },
  {
    name: "Markina",
    district: "Bizkaia, Spain",
    lat: 43.267,
    lon: 2.493,
    material: "Bituminous limestone",
    since: 2016,
    map: [0.06, 0.2],
  },
];

/** The studio itself, shown on the same drawn map on the Viewing page. */
export const STUDIO_MARKER = { name: "Kishangarh", map: [0.5, 0.38] } as const;
