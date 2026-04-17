"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass"
    >
      <div className="text-sm font-bold tracking-widest uppercase">
        Hai Bang
      </div>
      <div className="flex items-center gap-6 text-sm text-zinc-400">
        <Link href="#experience" className="hover:text-white transition-colors">Work Experience</Link>
        <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
        <Link href="mailto:tphbang.dev@gmail.com" className="hover:text-white transition-colors">Contact</Link>
      </div>
    </motion.nav>
  );
}
