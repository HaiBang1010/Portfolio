"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Linkedin, Github } from "lucide-react";
import { skills } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="w-full flex flex-col items-start pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-tr from-orange-400 via-pink-500 to-blue-500">
          <Avatar className="w-full h-full border-4 border-background">
            <AvatarImage
              src="/assets/avt1.jpg"
              alt="Tran Phan Hai Bang"
              className="object-cover"
            />
            <AvatarFallback className="bg-zinc-900 text-zinc-500 text-sm">
              TPHB
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gradient mb-6">
          Hey, I&apos;m Hai Bang. I&apos;m a Frontend <br /> Software Developer.
          <Badge
            variant="outline"
            className="ml-4 h-auto px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm border-green-500/20 align-middle"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Open to work
          </Badge>
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            HCMC, Vietnam
          </div>
          <a
            href="https://linkedin.com/in/tphbang"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Linkedin className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/haibang1010"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Github className="size-4" />
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
        <h2 className="text-base md:text-lg font-bold tracking-widest uppercase text-muted-foreground mb-8 font-mono">
          Tech Stack
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={item}>
              <Card className="bg-card/50 hover:border-foreground/20 hover:-translate-y-0.5 transition-all">
                <CardContent className="flex flex-col items-center justify-center p-3">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    {skill.icon ? (
                      <Image
                        src={`/icons/${skill.icon}.svg`}
                        alt={skill.name}
                        className="w-12 h-12 object-contain"
                        width={48}
                        height={48}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-sm font-mono text-muted-foreground">
                        {skill.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-xs md:text-base text-foreground/80">
                    {skill.name}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
