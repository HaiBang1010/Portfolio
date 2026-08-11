"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ElasticCursor from "@/components/ElasticCursor";

export default function Home() {
  return (
    <SmoothScroll>
      <ElasticCursor />
      <main className="flex min-h-screen flex-col items-center overflow-hidden">
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
