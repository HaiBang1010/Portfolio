"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

/** Past this the reader has clearly got the idea, so the hint retires. */
const HIDE_AFTER_PX = 10;

export default function ScrollDownIcon() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);

  /*
    Reading the motion value rather than adding a scroll listener: Lenis drives
    the scroll position, and this stays in step with it. Same reasoning as the
    navbar's scrolled state.
  */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest <= HIDE_AFTER_PX);
  });

  return (
    <AnimatePresence>
      {isAtTop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col items-center gap-3"
        >
          {/* The mouse outline. */}
          <div className="w-7 h-12 rounded-full border-2 border-muted-foreground/60 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
              animate={
                prefersReducedMotion === true
                  ? undefined
                  : { y: [0, 18], opacity: [1, 0] }
              }
              transition={
                prefersReducedMotion === true
                  ? undefined
                  : {
                      duration: 1,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 1,
                    }
              }
            />
          </div>
          <span className="text-sm text-muted-foreground">Scroll Down</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
