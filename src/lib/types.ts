export type Family =
  | "Marble"
  | "Granite"
  | "Onyx"
  | "Quartzite"
  | "Limestone"
  | "Semi-precious";

export type Finish =
  | "Polished"
  | "Honed"
  | "Leathered"
  | "Sandblasted"
  | "Brushed"
  | "Flamed";

export type SlabStatus = "available" | "hold" | "reserved";

export interface Slab {
  id: string;
  length: number;
  width: number;
  thickness: number;
  finish: Finish;
  status: SlabStatus;
}

export interface Stone {
  slug: string;
  name: string;
  family: Family;
  /** One sentence, max fourteen words, containing a fact or an admission. */
  character: string;
  /** Two paragraphs. The second always names the difficult thing. */
  body: [string, string];
  geology: string;
  origin: string;
  originShort: string;
  slabSize: [number, number];
  thicknesses: number[];
  finishes: Finish[];
  /** Instruction, not options. The studio has a view. */
  finishNote: string;
  /** Two stones and the technical reason. Never "you may also like". */
  adjacent: { slug: string; reason: string }[];
  block: {
    id: string;
    bench: string;
    quarriedOn: string;
    cutOn: string;
    slabsTotal: number;
    siblings: string[];
  };
  slabs: Slab[];
  colour: string[];
  /** Deterministic seed for the procedural placeholder. Delete with the shoot. */
  seed: number;
}

export interface Work {
  slug: string;
  name: string;
  city: string;
  year: number;
  area: number;
  stoneSlugs: string[];
  stoneLine: string;
  architect: string;
  photographer: string;
  /** Leads with the constraint, not the glamour. */
  brief: string[];
  stonesUsed: string;
  /** Attributed pull quote. Null until a real one is signed off. */
  quote: { text: string; attribution: string } | null;
  seed: number;
}

export interface Quarry {
  name: string;
  district: string;
  lat: number;
  lon: number;
  material: string;
  since: number;
  /** Position on the drawn map, 0–1 within the viewBox. */
  map: [number, number];
}

export interface DownloadFile {
  group: DownloadGroup;
  name: string;
  file: string;
  format: string;
  bytes: number;
  updated: string;
  gated: boolean;
}

export type DownloadGroup =
  | "The Library"
  | "Technical"
  | "CAD & BIM"
  | "3D"
  | "Care"
  | "Certificates";
