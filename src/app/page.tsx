import { Hero } from "@/components/home/Hero";
import { Threshold } from "@/components/home/Threshold";
import { LongLook } from "@/components/home/LongLook";
import { TypologyWall } from "@/components/home/TypologyWall";
import { OneWork } from "@/components/home/OneWork";
import { Refusal, Viewing } from "@/components/home/Refusal";
import { Footer } from "@/components/site/Footer";

/**
 * Dark → light → dark. The visitor passes through daylight and comes back to
 * the Viewing Room to be invited in. Roughly 720vh, seven sections, and about
 * one hundred and forty words in total.
 *
 * A server component: only the sections that need scroll or pointer state
 * carry "use client", so the page's HTML — including every headline and the
 * whole footer — is in the first response.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Threshold />
      <LongLook />
      <TypologyWall />
      <OneWork />
      <Refusal />
      <Viewing />
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
