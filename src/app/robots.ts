import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/**
 * Set NEXT_PUBLIC_NOINDEX=1 on any deployment that is not the real launch —
 * a client demo, a staging URL, a preview link. A concept site carrying a
 * client's brand name should not be indexable before they have approved it,
 * and de-indexing after the fact is far slower than never being indexed.
 */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The trade area and the personal selection are not index material.
        disallow: ["/api/", "/selection", "/architects/sign-in"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
