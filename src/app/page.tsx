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
        <div className="w-full max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pb-40 flex flex-col items-center">
          <Hero />

          {/*
            The keyboard belongs to the Tech Stack block and scrolls away with
            it. z-0 keeps it above the particle layer (-z-10); the sections below
            are z-10 so nothing of it can bleed over their text.
          */}
          <div className="relative z-0 w-full mt-8">
            <SkillsKeyboard />
          </div>

          <div className="relative z-10 w-full space-y-32 mt-32">
            <Experience />
            <Projects />
          </div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
