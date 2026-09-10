"use client";

import { useState } from "react";
import { QUARRIES, STUDIO_MARKER } from "@/data/quarries";
import { cn } from "@/lib/utils";
import { Mono, Eyebrow } from "@/components/ui/primitives";

/**
 * A drawn map, never an embedded satellite tile — a Google tile would be the
 * only piece of another company's design language on the whole site.
 *
 * Hairline outline, 4px dots, drawn to the icon rules: lines and circles only,
 * currentColor, no fill. Hovering a list row grows its dot and ignites a
 * connecting hairline.
 */
export function DrawnMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <svg
          viewBox="0 0 400 320"
          className="w-full text-line-strong"
          role="img"
          aria-label="An outline map with six marked quarry locations"
        >
          {/* Indicative outline of the working region. Not survey data. */}
          <path
            d="M120 40 L182 26 L246 52 L292 44 L318 82 L300 128 L322 168 L292 214 L246 236 L210 288 L168 274 L138 232 L104 214 L92 166 L112 118 L100 78 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="miter"
          />

          {QUARRIES.map((q) => {
            const cx = q.map[0] * 400;
            const cy = q.map[1] * 320;
            const on = active === q.name;
            return (
              <g key={q.name}>
                {on ? (
                  <line
                    x1={cx}
                    y1={cy}
                    x2={400}
                    y2={cy}
                    stroke="var(--nz-accent)"
                    strokeWidth="1"
                  />
                ) : null}
                <circle
                  cx={cx}
                  cy={cy}
                  r={on ? 4 : 2}
                  fill="var(--nz-accent)"
                  className="transition-all duration-rule ease-stone"
                />
              </g>
            );
          })}

          <circle
            cx={STUDIO_MARKER.map[0] * 400}
            cy={STUDIO_MARKER.map[1] * 320}
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <text
            x={STUDIO_MARKER.map[0] * 400 + 12}
            y={STUDIO_MARKER.map[1] * 320 + 4}
            className="fill-ink-3 font-mono text-[9px] uppercase tracking-[0.1em]"
          >
            Kishangarh
          </text>
        </svg>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <Eyebrow className="mb-4">Six quarries</Eyebrow>
        <ul>
          {QUARRIES.map((q) => (
            <li
              key={q.name}
              onMouseEnter={() => setActive(q.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(q.name)}
              className={cn(
                "border-b border-line py-3 transition-colors duration-state ease-cut",
                active === q.name && "text-ink",
              )}
            >
              <Mono size="data-s" className={cn(active === q.name && "text-ink")}>
                {q.name}, {q.district} · {q.lat}° N {q.lon}° E · {q.material} ·
                since {q.since}
              </Mono>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
