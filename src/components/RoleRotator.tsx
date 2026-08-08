"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROLES = ["Full-stack Developer", "Software Developer"] as const;

const CYCLE_MS = 3000;
const TRANSITION_S = 1.5;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function RoleRotator() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  // Mount gate: the server cannot know the motion preference, so both sides
  // render the animated branch first and the static one is swapped in after
  // hydration. Without this the two trees disagree and React warns.
  useEffect(() => setMounted(true), []);

  const isStatic = mounted && prefersReducedMotion === true;

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const id = setInterval(
      () => setIndex((current) => (current + 1) % ROLES.length),
      CYCLE_MS,
    );

    return () => clearInterval(id);
  }, [mounted, prefersReducedMotion]);

  return (
    <span className="block text-2xl md:text-3xl lg:text-4xl font-medium mt-4">
      {/* Static, uninterrupted text for assistive technology. */}
      <span className="sr-only">
        {ROLES[0]} and {ROLES[1]}
      </span>

      {/*
        Every child occupies the same grid cell, so the track is always sized
        to the widest role and the line below can never move.
      */}
      <span aria-hidden="true" className="grid justify-items-start">
        {ROLES.map((role) => (
          <span
            key={role}
            className="col-start-1 row-start-1 invisible whitespace-nowrap"
          >
            {role}
          </span>
        ))}

        {isStatic ? (
          <span className="col-start-1 row-start-1 relative inline-block whitespace-nowrap text-gradient">
            {ROLES[0]}
            {/* Same className as the animated bar, so SSR and client agree. */}
            <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left bg-foreground/40" />
          </span>
        ) : (
          /*
            mode="sync" keeps the outgoing and incoming strings on screen
            together. mode="wait" left a ~239ms window where neither was
            visible, which reads as disappear-then-reappear rather than a morph.
          */
          <AnimatePresence mode="sync" initial={false}>
            <motion.span
              key={ROLES[index]}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.5 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.5 }}
              transition={{ duration: TRANSITION_S, ease: EASE }}
              /*
                text-gradient must sit on this element, not an ancestor. It owns
                the background it paints, so filter and opacity act on real
                pixels instead of on transparent-filled glyphs.
              */
              className="col-start-1 row-start-1 relative inline-block whitespace-nowrap text-gradient"
            >
              {ROLES[index]}
              {/*
                Absolutely positioned, so it adds no layout box. w-full resolves
                against this span, which shrink-wraps the ACTIVE string — not the
                wider reserved track.
              */}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  );
}
