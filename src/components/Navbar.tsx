"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass "
    >
      <div className="container mx-auto flex items-center justify-between max-w-4xl px-6">
        <div className="text-xl font-bold tracking-widest uppercase">Bang Tran</div>
        <div className="flex items-center gap-6 text-sm text-zinc-400 text-xl">
          <Link href="#experience" className="hover:text-white transition-colors">
            Work Experience
          </Link>
          <Link href="#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
