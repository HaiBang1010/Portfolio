"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="w-full flex flex-col items-start pt-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-12 font-mono"
      >
        Work Experience
      </motion.h2>

      <div className="w-full flex flex-col gap-12">
        {experience.map((job, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-4 md:gap-16 w-full"
          >
            <div className="md:w-32 shrink-0 text-zinc-500 text-sm font-mono mt-1">
              {job.period}
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-zinc-100">{job.role}</h3>
              <div className="text-zinc-400 text-sm mb-4">{job.company} • {job.type}</div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                {job.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
