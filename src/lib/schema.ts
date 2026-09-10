import { SITE } from "@/data/site";
import type { Stone, Work } from "@/lib/types";

/**
 * Structured data. Note the deliberate omission of `offers` everywhere:
 * Volume Three §11 forbids publishing a price or a range in any form,
 * including machine-readable ones.
 */

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description:
      "A library of stone selected block by block in Kishangarh, Rajasthan.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.social.map((s) => s.href),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: `${SITE.url}/viewing`,
    address: organisationSchema().address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.lat,
      longitude: SITE.coordinates.lon,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
  };
}

export function stoneSchema(stone: Stone) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stone.name,
    description: stone.character,
    category: stone.family,
    material: stone.geology,
    url: `${SITE.url}/library/${stone.slug}`,
    image: `${SITE.url}/images/generated/stone-${stone.slug}-typology.jpg`,
    brand: { "@type": "Brand", name: SITE.name },
    width: {
      "@type": "QuantitativeValue",
      value: stone.slabSize[1],
      unitCode: "MMT",
    },
    height: {
      "@type": "QuantitativeValue",
      value: stone.slabSize[0],
      unitCode: "MMT",
    },
    depth: {
      "@type": "QuantitativeValue",
      value: stone.thicknesses,
      unitCode: "MMT",
    },
  };
}

export function workSchema(work: Work) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${work.name}, ${work.city}`,
    dateCreated: String(work.year),
    locationCreated: { "@type": "Place", name: work.city },
    material: work.stoneLine,
    url: `${SITE.url}/works/${work.slug}`,
    image: `${SITE.url}/images/generated/work-${work.slug}-hero.jpg`,
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
