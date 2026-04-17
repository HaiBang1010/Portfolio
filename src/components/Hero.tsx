"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

const MapPinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const LinkedinIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const GithubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="w-full flex flex-col items-start pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-orange-400 via-pink-500 to-blue-500">
          <div className="w-full h-full rounded-full bg-zinc-900 border-4 border-black overflow-hidden flex items-center justify-center text-zinc-500 text-sm">
            Avatar
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gradient mb-6">
          Hey, I'm Hai Bang. I'm a Frontend <br/> Software Developer. 
          <span className="inline-flex items-center ml-4 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm border border-green-500/20 align-middle">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Open to work
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <MapPinIcon />
            HCMC, Vietnam
          </div>
          <a href="https://linkedin.com/in/tphbang" className="flex items-center gap-2 hover:text-white transition-colors">
            <LinkedinIcon />
            LinkedIn
          </a>
          <a href="https://github.com/haibang1010" className="flex items-center gap-2 hover:text-white transition-colors">
            <GithubIcon />
            GitHub
          </a>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full mt-12"
      >
        <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-6 font-mono">Tech Stack</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <motion.div 
              key={skill.name}
              variants={item}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 card-hover"
            >
              <div className="w-8 h-8 rounded bg-zinc-800 mb-3 flex items-center justify-center text-xs font-mono text-zinc-500">
                {skill.name.charAt(0)}
              </div>
              <span className="text-xs text-zinc-400">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
