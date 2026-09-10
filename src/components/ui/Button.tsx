"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Volume One §06. Four variants, three sizes, radius 0 on every rectangle.
 * The Backlight rule on the primary is a pseudo-element, never a border —
 * Backlight is never a fill and never a full-perimeter stroke.
 *
 * Built on Radix's Slot so a button can render as a Next Link without
 * duplicating the class list; that is the whole of what shadcn contributes
 * here, and everything visual below is ours.
 */
const button = cva(
  [
    "relative inline-flex items-center justify-center rounded-none",
    "font-ui text-button font-medium uppercase",
    "transition-[background-color,color,border-color,letter-spacing]",
    "duration-state ease-cut",
    "disabled:pointer-events-none disabled:opacity-[0.32]",
    "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-accent",
    // The rule that sweeps the bottom edge. width:0 → 100% over 400ms.
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent",
    "after:transition-[width] after:duration-rule after:ease-stone",
    "hover:after:w-full",
  ],
  {
    variants: {
      variant: {
        /** One per view, maximum. */
        ink: "bg-ink text-ground hover:bg-ink-hover hover:tracking-[0.145em] active:scale-[0.99]",
        /** The default button of the system. */
        line: "border border-line-strong text-ink hover:border-ink hover:bg-ink/5",
        /** Also the treatment for every inline text link. */
        rule: [
          "h-auto border-0 px-0 pb-1.5 text-ink tracking-[0.1em]",
          "before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-line-strong",
        ],
        /** The only circular rectangle-replacement in the system. */
        icon: "size-11 rounded-circle border border-line-strong p-0 text-ink hover:border-ink after:hidden",
      },
      size: {
        lg: "h-14 px-8",
        md: "h-12 px-7",
        sm: "h-10 px-6",
      },
    },
    compoundVariants: [
      { variant: "rule", class: "h-auto px-0" },
      { variant: "icon", class: "h-11 w-11 px-0" },
    ],
    defaultVariants: { variant: "line", size: "lg" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(button({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

/** The most-used control on the site: a label with a rule that ignites. */
export function RuleLink({
  href,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Button asChild variant="rule" className={cn("w-fit", className)}>
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  );
}
