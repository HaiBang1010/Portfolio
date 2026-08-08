"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Linkedin, Github, Mail } from "lucide-react";
import { skills } from "@/data/skills";
import { metadata } from "@/data/metadata";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import RoleRotator from "@/components/RoleRotator";

export default function Hero() {
  const { contact } = metadata;

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
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-orange-400 via-pink-500 to-blue-500">
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
          className="w-full md:w-auto max-w-2xl mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block">
              {/*
                The gradient lives on the text itself, not on the h1. On an
                ancestor it inherits -webkit-text-fill-color: transparent down
                to the rotator, which then paints no glyphs of its own and
                cannot be blurred or faded.
              */}
              <span className="text-gradient">Hi, I&apos;m Hai Bang.</span>
              <Badge
                variant="outline"
                className="ml-4 h-auto px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm border-green-500/20 align-middle"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                Open to work
              </Badge>
            </span>
            <RoleRotator />
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            I&apos;m an IT graduate from UIT working across the
            JavaScript/TypeScript stack. My focus is shipping complete products
            end-to-end — React and Next.js on the front end, NestJS and Express
            with Prisma and PostgreSQL behind them.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="size-4" />
              Email
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              HCMC, Vietnam
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full mt-12"
      >
        <h2 className="text-base md:text-lg font-bold tracking-widest uppercase text-muted-foreground mb-8 font-mono">
          Tech Stack
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 lg:gap-8">
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
