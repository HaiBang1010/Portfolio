"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
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
    <section id="projects" className="w-full flex flex-col items-start pt-20">
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
            <Card className="bg-card/40 hover:border-foreground/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-bold font-mono tracking-wide">
                  {project.title.toUpperCase()}
                </CardTitle>
                <CardDescription className="text-base md:text-lg leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
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

                <div className="flex items-center gap-4">
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github /> Source Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
