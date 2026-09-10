import type { Metadata } from "next";
import { RuleLink } from "@/components/ui/Button";
import { Body } from "@/components/ui/primitives";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Nothing here",
  description: "This page does not exist. The library does.",
};

export default function NotFound() {
  return (
    <>
      <section className="gutter flex min-h-[70dvh] flex-col justify-center gap-6 pt-32">
        <h1 className="font-display text-h1-fluid text-ink">Nothing here.</h1>
        <Body>The library is this way.</Body>
        <RuleLink href="/library">The library</RuleLink>
      </section>
      <Footer />
    </>
  );
}
