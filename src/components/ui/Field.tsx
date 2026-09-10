"use client";

import * as React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * Volume One §06: underline only. No box, no fill, no radius. 56px tall,
 * label above at 11px / 0.18em. Focus thickens the rule to 1.5px and turns it
 * Backlight; error turns it Fissure and the message says what to do.
 */

const base = cn(
  "h-14 w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0",
  "font-ui text-body text-ink placeholder:text-ink-3",
  "transition-colors duration-state ease-cut",
  "focus:border-b-[1.5px] focus:border-accent focus:outline-none",
  "aria-[invalid=true]:border-error",
);

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={3}
    className={cn(base, "h-auto resize-none py-3 leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(base, "appearance-none pr-8", className)}
      {...props}
    >
      {children}
    </select>
    {/* The caret is drawn at 1.25px to the icon rules rather than left native. */}
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className="pointer-events-none absolute right-0 top-1/2 h-1.5 w-2.5 -translate-y-1/2 stroke-ink-3"
      fill="none"
      strokeWidth={1.25}
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      <path d="M0.5 0.5L5 5L9.5 0.5" />
    </svg>
  </div>
));
Select.displayName = "Select";

/** 16×16, 1px, radius 0. The system has no round radio either. */
export function Tick({
  id,
  checked,
  onCheckedChange,
  children,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox.Root
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className={cn(
          "mt-1 flex size-4 shrink-0 items-center justify-center rounded-none border border-line-strong",
          "data-[state=checked]:border-ink data-[state=checked]:bg-ink",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-accent",
        )}
      >
        <Checkbox.Indicator>
          <Check
            size={11}
            strokeWidth={1.5}
            absoluteStrokeWidth
            className="text-ground"
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id} className="text-body-s text-ink-2">
        {children}
      </label>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-ui text-label font-medium uppercase text-ink-3"
      >
        {label}
      </label>
      {children}
      {/* Errors say what to do, not what went wrong, and are never summarised
          at the top of the form. */}
      {error ? (
        <span role="alert" className="text-caption text-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
