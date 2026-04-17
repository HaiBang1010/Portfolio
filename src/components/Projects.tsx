"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

const GithubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const ExternalLinkIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;

export default function Projects() {
  return (
    <section id="projects" className="w-full flex flex-col items-start pt-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-12 font-mono"
      >
        Projects
      </motion.h2>

      <div className="w-full flex flex-col gap-24">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col"
          >
            <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8 relative group">
              {/* Placeholder for project image */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-sm">
                Project Preview
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800/80 p-2 rounded-full backdrop-blur-sm cursor-pointer hover:bg-zinc-700 text-zinc-300">
                <ExternalLinkIcon />
              </div>
            </div>

            <div className="flex flex-col max-w-3xl">
              <h3 className="text-2xl font-bold font-mono tracking-wide mb-3">{project.title.toUpperCase()}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a href={project.github} className="flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors text-sm text-zinc-300 font-medium">
                  <GithubIcon /> Source Code
                </a>
                <a href={project.live} className="flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors text-sm text-zinc-300 font-medium">
                  <ExternalLinkIcon /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
