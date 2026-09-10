import type { DownloadFile, DownloadGroup } from "@/lib/types";

export const GROUP_LINES: Record<DownloadGroup, string> = {
  "The Library":
    "The full index as a printed document, single stone sheets, and your own selection as a PDF.",
  Technical:
    "Density, porosity, flexural strength, Ra values, slip resistance and frost resistance, per stone.",
  "CAD & BIM":
    "Edge profiles and fixing details in DWG. Material families for Revit and IFC.",
  "3D": "Scanned 8K textures from the actual slabs, Substance files, and presets for V-Ray and Corona.",
  Care: "Sealing, cleaning and repair by finish. Site protection during build, which is where most damage happens.",
  Certificates:
    "Origin declarations, test reports, packing and freight specifications.",
};

export const GROUP_ORDER: DownloadGroup[] = [
  "The Library",
  "Technical",
  "CAD & BIM",
  "3D",
  "Care",
  "Certificates",
];

const MB = 1024 * 1024;

export const DOWNLOADS: DownloadFile[] = [
  { group: "The Library", name: "The library index", file: "nazara_library-index_2026-09.pdf", format: "PDF", bytes: 42 * MB, updated: "2026-09-04", gated: false },
  { group: "The Library", name: "Stone sheets, all forty-one", file: "nazara_stone-sheets_v4_2026-09.zip", format: "ZIP", bytes: 96 * MB, updated: "2026-09-04", gated: false },
  { group: "The Library", name: "Availability, this week", file: "nazara_availability_2026-09.pdf", format: "PDF", bytes: 1.2 * MB, updated: "2026-09-08", gated: false },

  { group: "Technical", name: "Makrana Albeta datasheet", file: "nazara_makrana-albeta_datasheet_v3_2026-09.pdf", format: "PDF", bytes: 0.9 * MB, updated: "2026-09-02", gated: false },
  { group: "Technical", name: "Verde Guatemala datasheet", file: "nazara_verde-guatemala_datasheet_v2_2026-06.pdf", format: "PDF", bytes: 0.9 * MB, updated: "2026-06-18", gated: false },
  { group: "Technical", name: "Onice Miele datasheet", file: "nazara_onice-miele_datasheet_v2_2026-05.pdf", format: "PDF", bytes: 1.1 * MB, updated: "2026-05-21", gated: false },
  { group: "Technical", name: "Slip resistance, all finishes", file: "nazara_slip-resistance_2026-03.pdf", format: "PDF", bytes: 2.4 * MB, updated: "2026-03-11", gated: false },
  { group: "Technical", name: "Tolerances and formats", file: "nazara_tolerances_v2_2026-01.pdf", format: "PDF", bytes: 0.6 * MB, updated: "2026-01-09", gated: false },

  { group: "CAD & BIM", name: "Edge profiles", file: "nazara_edge-profiles_dwg_v2_2026-06.zip", format: "DWG", bytes: 3.8 * MB, updated: "2026-06-02", gated: true },
  { group: "CAD & BIM", name: "Fixing details, vertical", file: "nazara_fixing-vertical_dwg_v3_2026-07.zip", format: "DWG", bytes: 5.1 * MB, updated: "2026-07-14", gated: true },
  { group: "CAD & BIM", name: "Revit material family", file: "nazara_materials_rvt_v2_2026-08.rvt", format: "RVT", bytes: 28 * MB, updated: "2026-08-19", gated: true },
  { group: "CAD & BIM", name: "IFC material set", file: "nazara_materials_ifc_v1_2026-08.ifc", format: "IFC", bytes: 14 * MB, updated: "2026-08-19", gated: true },

  { group: "3D", name: "Scanned textures, 8K", file: "nazara_textures-8k_2026-08.zip", format: "ZIP", bytes: 1840 * MB, updated: "2026-08-30", gated: true },
  { group: "3D", name: "Substance materials", file: "nazara_substances_sbsar_2026-08.zip", format: "SBSAR", bytes: 220 * MB, updated: "2026-08-30", gated: true },
  { group: "3D", name: "V-Ray and Corona presets", file: "nazara_render-presets_2026-04.zip", format: "ZIP", bytes: 6.2 * MB, updated: "2026-04-07", gated: true },

  { group: "Care", name: "Sealing and cleaning by finish", file: "nazara_care_v4_2026-02.pdf", format: "PDF", bytes: 1.8 * MB, updated: "2026-02-16", gated: false },
  { group: "Care", name: "Site protection during build", file: "nazara_site-protection_v2_2025-11.pdf", format: "PDF", bytes: 1.1 * MB, updated: "2025-11-04", gated: false },

  { group: "Certificates", name: "Origin declarations", file: "nazara_origin-declarations_2026-07.pdf", format: "PDF", bytes: 3.2 * MB, updated: "2026-07-01", gated: false },
  { group: "Certificates", name: "Test reports, current", file: "nazara_test-reports_2026-07.zip", format: "ZIP", bytes: 18 * MB, updated: "2026-07-01", gated: false },
  { group: "Certificates", name: "Packing and freight specification", file: "nazara_freight-spec_v2_2026-05.pdf", format: "PDF", bytes: 0.8 * MB, updated: "2026-05-12", gated: false },
];

export function formatBytes(bytes: number) {
  const mb = bytes / MB;
  return mb >= 1000 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
}

/** Anything older than twelve months carries a review flag. */
export function isStale(updated: string) {
  const twelveMonths = 1000 * 60 * 60 * 24 * 365;
  return Date.now() - new Date(updated).getTime() > twelveMonths;
}
