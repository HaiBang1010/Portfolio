"use client";

import { motion } from "framer-motion";
import { Github, Calendar, User, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Projects() {
  return (
    <section id="projects" className="w-full flex flex-col items-start">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-base md:text-lg font-bold tracking-widest uppercase text-muted-foreground mb-12 font-mono"
      >
        Projects
      </motion.h2>

      <div className="w-full flex flex-col gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-card/40 hover:border-foreground/20 transition-colors overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-1">
                  {/* Hiển thị Subtitle phía trên Title */}
                  <span className="text-primary font-mono text-sm font-semibold tracking-wider">
                    {project.subtitle}
                  </span>

                  <CardTitle className="text-3xl md:text-4xl font-bold font-mono tracking-wide">
                    {project.title.toUpperCase()}
                  </CardTitle>

                  {/* Hiển thị Period và Role */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {project.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {project.role}
                    </span>
                  </div>
                </div>

                <CardDescription className="text-base md:text-lg leading-relaxed mt-4">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                <ul className="flex flex-col gap-2 text-sm md:text-base text-muted-foreground">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-primary mt-1 shrink-0">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="h-auto px-4 py-1.5 rounded-full bg-card/50 text-sm font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild variant="outline" size="lg" className="cursor-can-hover rounded-full">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-5 w-5" /> Source Code
                    </a>
                  </Button>
                  {project.live && project.live !== "#" && (
                    <Button asChild size="lg" className="cursor-can-hover rounded-full">
                      <a href={project.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
