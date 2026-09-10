import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { STONES } from "@/data/stones";
import { WORKS } from "@/data/works";
import { JOURNAL } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed = [
    { path: "", priority: 1 },
    { path: "/library", priority: 0.9 },
    { path: "/works", priority: 0.8 },
    { path: "/provenance", priority: 0.7 },
    { path: "/atelier", priority: 0.7 },
    { path: "/journal", priority: 0.7 },
    { path: "/architects", priority: 0.8 },
    { path: "/architects/downloads", priority: 0.6 },
    { path: "/viewing", priority: 0.9 },
  ];

  return [
    ...fixed.map((p) => ({
      url: `${SITE.url}${p.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p.priority,
    })),
    ...STONES.map((s) => ({
      url: `${SITE.url}/library/${s.slug}`,
      lastModified: new Date(s.block.cutOn),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...WORKS.map((w) => ({
      url: `${SITE.url}/works/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // The Journal is the only part of the architecture that grows, so these
    // are the entries that matter most for indexing over time.
    ...JOURNAL.map((j) => ({
      url: `${SITE.url}/journal/${j.slug}`,
      lastModified: new Date(j.published),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
