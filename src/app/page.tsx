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
        {/*
          Each block gets a screen of its own. `min-h-screen` rather than
          `h-screen`: Projects runs taller than a viewport on a laptop, and a
          fixed height would crop it. Short sections still fill the screen;
          long ones grow instead of clipping.
        */}
        <div className="w-full max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <section className="w-full min-h-screen flex flex-col justify-center py-24">
            <Hero />
          </section>

          {/*
            One track spanning Tech Stack through Projects. The keyboard sticks
            to the middle of it, so it stays on screen — and keeps typing — while
            Experience and Projects scroll over the top.

            The sticky element lives in its own absolutely-positioned layer so it
            reserves no height of its own; in the normal flow it would push the
            sections down by a full screen. z-0 keeps it above the particle layer
            (-z-10) and below the content, which is z-10.
          */}
          <div className="relative w-full">
            <div className="absolute inset-0 z-0">
              <div className="sticky top-1/2 -translate-y-1/2">
                <SkillsKeyboard />
              </div>
            </div>

            {/*
              The runway the board is centred against: it gets a screen to
              itself before the sections start scrolling over it. The heading
              lives here rather than inside the sticky component, which would
              otherwise carry it down the whole page.
            */}
            <section
              id="skills"
              className="relative z-10 w-full min-h-screen pt-24 pointer-events-none"
            >
              {/*
                The section spans a full screen directly over the keyboard, so
                it must not swallow pointer events — hovering a key has to reach
                the canvas underneath. Only the heading takes them back.
              */}
              <h2 className="pointer-events-auto text-base md:text-lg font-bold tracking-widest uppercase text-muted-foreground font-mono">
                Tech Stack
              </h2>
            </section>

            <div className="relative z-10 w-full">
              <section className="w-full min-h-screen flex flex-col justify-center py-24">
                <Experience />
              </section>

              <section className="w-full min-h-screen flex flex-col justify-center py-24">
                <Projects />
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
