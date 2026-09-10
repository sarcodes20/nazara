import { type LucideProps, ArrowRight, X, Menu, Search, Check, Minus, Plus } from "lucide-react";

/**
 * Volume One §09: outline only, 1.25px, butt caps, mitre joins, sharp corners.
 *
 * Lucide covers the generic vocabulary and is forced to obey the brand by the
 * props below — `absoluteStrokeWidth` is the important one, because without it
 * a 32px icon renders a heavier stroke than a 24px one and the set stops
 * reading as a single drawing.
 *
 * The stone vocabulary has no library equivalent (no icon set has a glyph for
 * a bookmatch or a vein-cut) so those are drawn here on the same 24×24 grid.
 */
export const iconProps: LucideProps = {
  strokeWidth: 1.25,
  absoluteStrokeWidth: true,
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
  size: 24,
};

export { ArrowRight, X, Menu, Search, Check, Minus, Plus };

type Props = { size?: number; className?: string };

function Svg({ size = 24, className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const Slab = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" />
    <path d="M5 18.5c2-4 4-6 6.5-7.5 2.5-1.5 5-2 7.5-1.8" />
  </Svg>
);

export const Block = (p: Props) => (
  <Svg {...p}>
    <path d="M3.5 8.5l8.5-4 8.5 4v9l-8.5 4-8.5-4z" />
    <path d="M3.5 8.5l8.5 4 8.5-4M12 12.5v9" />
  </Svg>
);

export const Bookmatch = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="8.5" height="15" />
    <rect x="13" y="4.5" width="8.5" height="15" />
    <path d="M4.5 18c1.5-4 3.5-6.5 6-8M19.5 18c-1.5-4-3.5-6.5-6-8" />
  </Svg>
);

export const VeinCut = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" />
    <path d="M2.5 9h19M2.5 12h19M2.5 15h19" />
  </Svg>
);

export const CrossCut = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" />
    <path d="M12 7.5a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 1 0-9" />
    <path d="M12 5a7 7 0 0 1 0 14 7 7 0 0 1 0-14" />
  </Svg>
);

export const Thickness = (p: Props) => (
  <Svg {...p}>
    <path d="M6 4.5v15M18 4.5v15" />
    <rect x="9.5" y="7.5" width="5" height="9" />
    <path d="M6 12h3.5M14.5 12H18" />
  </Svg>
);

export const Quarry = (p: Props) => (
  <Svg {...p}>
    <path d="M2 19.5h20M2 19.5V15h5v-3.5h5V8h5V4.5h5" />
  </Svg>
);

export const FinishIcon = (p: Props) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" />
    <path d="M3.5 20.5l17-17" />
    <path d="M6 17l3-3M6 13l6-6M10 17l7-7" />
  </Svg>
);

export const WetLook = (p: Props) => (
  <Svg {...p}>
    <path d="M12 3.5l5 6.5a5.9 5.9 0 1 1-10 0z" />
    <path d="M3 21h18" />
  </Svg>
);

export const Crate = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="7.5" width="19" height="10" />
    <path d="M6 7.5v10M9.5 7.5v10M13 7.5v10M16.5 7.5v10" />
  </Svg>
);

export const Viewing = (p: Props) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" />
    <path d="M8 4.5l4 15 4-15" />
  </Svg>
);

export const Inspect = (p: Props) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M15.5 15.5l6 6" />
  </Svg>
);
