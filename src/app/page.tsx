"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ElasticCursor from "@/components/ElasticCursor";
import Particles from "@/components/Particles";

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
      <main className="relative flex min-h-screen flex-col items-center overflow-hidden">
        <Navbar />
        <div className="w-full max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 py-20 pb-40 space-y-32 flex flex-col items-center">
          <Hero />
          <Experience />
          <Projects />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
