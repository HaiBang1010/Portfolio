"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">
      <Navbar />
      <div className="w-full max-w-4xl px-4 sm:px-6 py-20 pb-40 space-y-32 flex flex-col items-center">
        <Hero />
        <Experience />
        <Projects />
      </div>
    </main>
  );
}
