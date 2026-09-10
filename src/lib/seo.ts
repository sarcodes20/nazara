import type { Metadata } from "next";
import { SITE } from "@/data/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** og:image. Defaults to the wordmark card; pages pass their own slab. */
  image?: string;
  /** og:title is the page's h1, not the SEO title — Volume Three §11. */
  ogTitle?: string;
}

export function meta({
  title,
  description,
  path,
  image = "/images/og-default.jpg",
  ogTitle,
}: PageMeta): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: ogTitle ?? title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 628, alt: ogTitle ?? title }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [image],
    },
  };
}

/** Meta descriptions are capped at 155 characters. Trim on a word boundary. */
export function clamp(text: string, max = 155) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}
