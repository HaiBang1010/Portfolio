"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Card, CardContent } from "@/components/ui/card";

export default function Experience() {
  return (
    <section id="experience" className="w-full flex flex-col items-start pt-20">
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
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                    {job.highlights}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
