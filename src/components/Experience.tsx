"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  return (
    <section id="experience" className="w-full flex flex-col items-start">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-base md:text-lg font-bold tracking-widest uppercase text-muted-foreground mb-12 font-mono"
      >
        Work Experience
      </motion.h2>

      <div className="w-full flex flex-col gap-6">
        {experience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card/40 hover:border-foreground/20 transition-colors">
              <CardContent className="flex flex-col md:flex-row gap-4 md:gap-16 p-6">
                <div className="md:w-36 shrink-0 text-muted-foreground text-base font-mono mt-1">
                  {job.period}
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {job.role}
                  </h3>
                  <div className="text-muted-foreground text-base mb-4">
                    {job.company} • {job.type}
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                    {job.summary}
                  </p>

                  <ul className="mt-4 flex flex-col gap-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                    {job.highlights.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {job.stack && job.stack.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="h-auto px-4 py-1.5 rounded-full bg-card/50 text-sm font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
