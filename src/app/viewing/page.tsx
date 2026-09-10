import { Suspense } from "react";
import { SITE, VIEWING_FAQS } from "@/data/site";
import { meta } from "@/lib/seo";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { Body, Eyebrow, Mono } from "@/components/ui/primitives";
import { MasonLine } from "@/components/motion/MasonLine";
import { ViewingForm } from "@/components/site/ViewingForm";
import { DrawnMap } from "@/components/site/DrawnMap";
import { Footer } from "@/components/site/Footer";

export const metadata = meta({
  title: "Request a Viewing",
  ogTitle: "The library is open by appointment.",
  description:
    "Six to twelve blocks, wet, under raking light. Two hours, by appointment, in Kishangarh. Nothing is sold in the room.",
  path: "/viewing",
});

export default function ViewingPage() {
  return (
    <div className="viewing-room bg-ground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(VIEWING_FAQS)) }}
      />

      <section className="gutter pb-14 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col gap-6 lg:max-w-[44rem]">
          <MasonLine
            as="h1"
            immediate
            lines={["The library is open", "by appointment."]}
            className="font-display text-h1-fluid text-ink"
          />
          <Body>
            Tell us about the project. We will write within one working day, and
            we will not put you on a list.
          </Body>
        </div>
      </section>

      <section className="gutter grid gap-14 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:col-start-2">
          {/* useSearchParams needs a Suspense boundary for static rendering. */}
          <Suspense fallback={<div className="min-h-[36rem]" />}>
            <ViewingForm />
          </Suspense>
        </div>

        <aside className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-4">
            <Eyebrow>What happens</Eyebrow>
            <Body size="body-s">
              You will be shown between six and twelve blocks, wet, under raking
              light. Allow two hours. There is no obligation, and nothing is sold
              in the room.
            </Body>
            <Body size="body-s">
              If you are travelling far, tell us and we will hold the morning.
              Most people who come from outside Rajasthan stay in Jaipur the
              night before.
            </Body>
          </div>

          <div className="flex flex-col gap-4">
            <Eyebrow>Arriving</Eyebrow>
            <Mono size="data-s" className="leading-[2]">
              {SITE.address.street}, {SITE.address.locality},{" "}
              {SITE.address.region} {SITE.address.postcode}
              <br />
              {SITE.coordinates.lat}° N &nbsp;{SITE.coordinates.lon}° E
              <br />
              <br />
              Ajmer · 30 minutes
              <br />
              Kishangarh airport · 15 minutes
              <br />
              Jaipur airport · 1 hour 45
              <br />
              Delhi · 7 hours by road
            </Mono>
            <Body size="body-s">
              A car can be sent to any of the four. Say so when you write and it
              will be waiting.
            </Body>
          </div>

          <div className="flex flex-col gap-3">
            <Eyebrow>Other doors</Eyebrow>
            <Mono size="data-s" className="leading-[2]">
              Trade · {SITE.email.trade}
              <br />
              Press · {SITE.email.press}
              <br />
              Work with us · {SITE.email.atelier}
            </Mono>
          </div>
        </aside>
      </section>

      <section className="gutter border-t border-line py-16">
        <h2 className="mb-10 font-display text-h2-fluid text-ink">Questions.</h2>
        <dl className="border-t border-line">
          {VIEWING_FAQS.map((item) => (
            <div
              key={item.q}
              className="grid gap-3 border-b border-line py-6 lg:grid-cols-12 lg:gap-10"
            >
              <dt className="font-ui text-h4 text-ink lg:col-span-4">{item.q}</dt>
              <dd className="text-body text-ink-2 lg:col-span-7 lg:col-start-6">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="gutter py-16">
        <DrawnMap />
      </section>

      <Footer />
    </div>
  );
}
