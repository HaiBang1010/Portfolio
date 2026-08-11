"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ElasticCursor from "@/components/ElasticCursor";
import Particles from "@/components/Particles";
import SkillsKeyboard from "@/components/SkillsKeyboard";

export default function Home() {
  return (
    <SmoothScroll>
      <ElasticCursor />
      {/*
        Sits behind the page as a fixed layer. The diagonal gradient is what
        reads as a soft band across the background; the canvas draws the drifting
        particles on top of it. Both are dark-mode only.
      */}
      <Particles
        className="fixed inset-0 -z-10 dark:bg-gradient-to-tl dark:from-background dark:via-slate-600/20 dark:to-background"
        quantity={100}
      />
      {/*
        No `overflow-hidden` on <main>: it would clip the particle halo and,
        more importantly, `overflow` on any ancestor silently disables
        `position: sticky` on the keyboard below.
      */}
      <main className="relative flex min-h-screen flex-col items-center">
        <Navbar />
        <div className="w-full max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 py-20 pb-40 flex flex-col items-center">
          <Hero />

          {/*
            The keyboard sticks to the middle of the viewport for as long as
            this wrapper is on screen, so it stays put while Experience and
            Projects scroll over the top of it. z-0 keeps it above the particle
            layer (-z-10) but below the content, which is z-10.

            The sticky element is absolutely positioned inside a zero-height
            track so it reserves no space of its own — otherwise it would push
            the sections down by its full height.
          */}
          <div className="relative w-full">
            <div className="absolute inset-0 z-0">
              <div className="sticky top-1/2 -translate-y-1/2">
                <SkillsKeyboard />
              </div>
            </div>

            {/*
              Empty runway so the keyboard gets a stretch of screen to itself,
              at full opacity, before Experience scrolls up and turns it into a
              backdrop. Its height is what sets how long that moment lasts.
            */}
            <div className="h-[75vh] md:h-screen" aria-hidden="true" />

            <div className="relative z-10 space-y-32">
              <Experience />
              <Projects />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
