"use client";

import { motion } from "framer-motion";
import { MapPin, Linkedin, Github, Mail } from "lucide-react";
import { metadata } from "@/data/metadata";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RoleRotator from "@/components/RoleRotator";
import HeroScene from "@/components/HeroScene";
import ScrollDownIcon from "@/components/ScrollDownIcon";

export default function Hero() {
  const { contact } = metadata;

  return (
    <section className="w-full flex flex-col items-start">
      {/*
        Two columns from lg up: the avatar and the intro stack down the left,
        the robot holds the right. Below lg it collapses to one column and the
        robot does not render at all.
      */}
      <div className="w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 mb-8"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-orange-400 via-pink-500 to-blue-500">
              <Avatar className="w-full h-full border-4 border-background">
                <AvatarImage
                  src="/assets/avt1.jpg"
                  alt="Tran Phan Hai Bang"
                  className="object-cover"
                />
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  TPHB
                </AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl text-center lg:text-left"
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
              I&apos;m an IT graduate from UIT working across the JavaScript/TypeScript
              stack. My focus is shipping complete products end-to-end — React and Next.js
              on the front end, NestJS and Express with Prisma and PostgreSQL behind them.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-muted-foreground text-sm">
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="cursor-can-hover flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="size-4" />
                Email
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="cursor-can-hover flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="cursor-can-hover flex items-center gap-2 hover:text-foreground transition-colors"
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

        {/* Right column. Renders nothing below lg, or on a metered connection. */}
        <HeroScene />
      </div>

      {/*
        Pinned to the bottom of the screen-height section in page.tsx, which is
        `relative` for exactly this. Escaping that section's `py-24` is the
        point — the hint belongs at the edge of the viewport, not above the
        padding. `pointer-events-none` so it never eats a click meant for the
        content behind it.
      */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
        <ScrollDownIcon />
      </div>
    </section>
  );
}
