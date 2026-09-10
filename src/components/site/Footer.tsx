import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import { RuleLink } from "@/components/ui/Button";
import { Eyebrow, Mono } from "@/components/ui/primitives";

/**
 * Identical on every page (Volume Two §01). The only permitted variation is a
 * single contextual link above the wordmark. A server component — the footer
 * ships no JavaScript at all.
 */
export function Footer({
  contextual,
}: {
  contextual?: { label: string; href: string };
}) {
  return (
    <footer className="viewing-room bg-ground pb-14 pt-24 md:pt-32 lg:pt-[200px]">
      <div className="gutter">
        {contextual ? (
          <div className="mb-16">
            <RuleLink href={contextual.href}>{contextual.label}</RuleLink>
          </div>
        ) : null}

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1fr_auto]">
          <div className="flex max-w-[34ch] flex-col gap-7">
            <span className="font-display text-[2.75rem] uppercase leading-none tracking-[0.32em] text-ink">
              Nazara
            </span>
            <p className="text-body-s text-ink-2">
              The library is open by appointment. Kishangarh, Rajasthan, the
              largest marble market in Asia, ninety kilometres from Makrana.
            </p>

            <div className="flex flex-col gap-3">
              <Eyebrow>Receive the Journal</Eyebrow>
              <p className="text-body-s text-ink-2">
                Four or five letters a year. New blocks, finished rooms, and the
                occasional argument about stone.
              </p>
              <form
                className="flex max-w-[340px] items-end gap-3"
                action="/api/journal"
                method="post"
              >
                <label htmlFor="journal-email" className="sr-only">
                  Email
                </label>
                <input
                  id="journal-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="h-12 flex-1 rounded-none border-0 border-b border-line-strong bg-transparent px-0 text-body text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the Journal"
                  className="pb-3 font-mono text-data text-accent"
                >
                  →
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:gap-20">
            <div>
              <Eyebrow className="mb-4">Navigate</Eyebrow>
              <ul className="flex flex-col gap-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-s text-ink-2 transition-colors duration-state hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/architects"
                    className="text-body-s text-ink-2 transition-colors duration-state hover:text-ink"
                  >
                    For architects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Eyebrow className="mb-4">Studio</Eyebrow>
              <address className="flex flex-col gap-5 not-italic text-body-s text-ink-2">
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.locality}, {SITE.address.region}{" "}
                  {SITE.address.postcode}
                </span>
                <span>
                  By appointment
                  <br />
                  {SITE.hours}
                </span>
                <span className="flex flex-wrap gap-x-2">
                  {SITE.social.map((s, i) => (
                    <span key={s.href}>
                      <a
                        href={s.href}
                        className="transition-colors duration-state hover:text-ink"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.label}
                      </a>
                      {i < SITE.social.length - 1 ? " ·" : ""}
                    </span>
                  ))}
                </span>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-5 border-t border-line pt-5">
          <Mono size="data-s">
            {SITE.coordinates.lat}° N &nbsp;{SITE.coordinates.lon}° E · Est.
            Kishangarh
          </Mono>
          <Mono size="data-s">© 2026 Nazara · Terms · Privacy</Mono>
        </div>
      </div>
    </footer>
  );
}
