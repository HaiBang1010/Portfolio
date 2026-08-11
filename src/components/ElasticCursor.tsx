"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const CURSOR_DIAMETER = 50;
const DOT_DIAMETER = 8;
/** How far up the tree to look for a hover target. */
const HOVER_ANCESTOR_DEPTH = 3;

type QuickSetters = {
  x: gsap.QuickToFunc;
  y: gsap.QuickToFunc;
  rotate: gsap.QuickToFunc;
  scaleX: gsap.QuickToFunc;
  scaleY: gsap.QuickToFunc;
  width: gsap.QuickToFunc;
};

/** Squash amount derived from cursor velocity, capped so it stays legible. */
function getScale(velocityX: number, velocityY: number) {
  const distance = Math.sqrt(velocityX ** 2 + velocityY ** 2);
  return Math.min(distance / 735, 0.35);
}

/** Direction of travel, in degrees, so the blob stretches along its path. */
function getAngle(velocityX: number, velocityY: number) {
  return (Math.atan2(velocityY, velocityX) * 180) / Math.PI;
}

/**
 * Walks up a few levels looking for something the cursor should wrap around.
 * Returns the element itself, not its rect, so callers read layout once.
 */
function findHoverTarget(target: EventTarget | null): HTMLElement | null {
  // Not every event target is an Element — `document` and `window` both fire
  // mousemove, and synthetic events can carry a null target.
  let current = target instanceof Element ? target : null;

  for (let depth = 0; current && depth < HOVER_ANCESTOR_DEPTH; depth++) {
    if (current.classList.contains("cursor-can-hover")) {
      return current as HTMLElement;
    }
    current = current.parentElement;
  }

  return null;
}

export default function ElasticCursor() {
  const prefersReducedMotion = useReducedMotion();
  // `pointer: fine` is the real question — a narrow viewport is a proxy for it.
  // A tablet with a stylus should get the cursor; a wide touchscreen should not.
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const setters = useRef<QuickSetters | null>(null);
  const dotSetters = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(
    null,
  );
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const enabled = hasFinePointer && !prefersReducedMotion;

  useLayoutEffect(() => {
    const blob = blobRef.current;
    const dot = dotRef.current;
    if (!blob || !dot || !enabled) return;

    setters.current = {
      x: gsap.quickSetter(blob, "x", "px") as gsap.QuickToFunc,
      y: gsap.quickSetter(blob, "y", "px") as gsap.QuickToFunc,
      rotate: gsap.quickSetter(blob, "rotate", "deg") as gsap.QuickToFunc,
      scaleX: gsap.quickSetter(blob, "scaleX") as gsap.QuickToFunc,
      scaleY: gsap.quickSetter(blob, "scaleY") as gsap.QuickToFunc,
      width: gsap.quickSetter(blob, "width", "px") as gsap.QuickToFunc,
    };

    dotSetters.current = {
      x: gsap.quickSetter(dot, "x", "px") as gsap.QuickToFunc,
      y: gsap.quickSetter(dot, "y", "px") as gsap.QuickToFunc,
    };

    // Centre both on their own coordinates. xPercent/yPercent are resolved by
    // GSAP against each element's CURRENT size, so the ring stays centred as it
    // grows to wrap a target — a fixed negative margin could not, since it is
    // frozen at half the idle diameter.
    gsap.set([blob, dot], { xPercent: -50, yPercent: -50 });

    return () => {
      setters.current = null;
      dotSetters.current = null;
    };
  }, [enabled]);

  // Runs once per frame off GSAP's ticker. quickSetter writes straight to the
  // element and skips the tween machinery, which matters at 60fps.
  const loop = useCallback(() => {
    const set = setters.current;
    if (!set) return;

    if (isHovering) {
      // While wrapped around a target, width/height are tweened directly. The
      // squash scale would multiply on top of those and distort the box, so
      // reset every transform the free-moving branch applied — not just the
      // rotation. Leaving scaleX/scaleY set is what stretches the wrap.
      set.rotate(0);
      set.scaleX(1);
      set.scaleY(1);
      return;
    }

    const scale = getScale(velocity.current.x, velocity.current.y);

    set.x(position.current.x);
    set.y(position.current.y);
    set.width(CURSOR_DIAMETER + scale * 300);
    set.rotate(getAngle(velocity.current.x, velocity.current.y));
    set.scaleX(1 + scale);
    set.scaleY(1 - scale * 2);
  }, [isHovering]);

  useEffect(() => {
    if (!enabled || !hasMoved) return;

    gsap.ticker.add(loop);
    return () => gsap.ticker.remove(loop);
  }, [enabled, hasMoved, loop]);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (event: MouseEvent) => {
      const blob = blobRef.current;
      if (!blob) return;

      setHasMoved(true);

      const target = findHoverTarget(event.target);

      if (target) {
        const rect = target.getBoundingClientRect();
        setIsHovering(true);

        gsap.to(blob, { rotate: 0, duration: 0 });
        gsap.to(blob, {
          width: rect.width + 20,
          height: rect.height + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          scaleX: 1,
          scaleY: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        setIsHovering(false);
        // Deliberately no `width` here: once free, `loop` writes width every
        // frame from the current velocity. Tweening it too would mean two
        // writers fighting over one property, which leaves it wherever the
        // loser last landed. Height has no such owner, so it is restored here.
        gsap.to(blob, {
          height: CURSOR_DIAMETER,
          borderRadius: 999,
          duration: 0.3,
        });
      }

      const { clientX, clientY } = event;

      // The dot is the anchor: it sits exactly under the pointer with no
      // easing, so the lagging blob always reads as trailing something.
      dotSetters.current?.x(clientX);
      dotSetters.current?.y(clientY);

      // The tween drives `position`; the gap between it and the true cursor
      // position IS the velocity. That lag is what produces the squash.
      gsap.to(position.current, {
        x: clientX,
        y: clientY,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          velocity.current.x = (clientX - position.current.x) * 1.2;
          velocity.current.y = (clientY - position.current.y) * 1.2;
        },
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/*
        The trailing ring. Centring is done with GSAP's xPercent/yPercent (see
        the layout effect) rather than a Tailwind translate class, so it shares
        the single transform GSAP owns instead of competing for it.
      */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className={cn(
          "fixed left-0 top-0 z-[100] rounded-full",
          "pointer-events-none will-change-transform",
          // Hidden until the first real mouse move, so it never flashes at 0,0.
          "transition-opacity duration-200",
          hasMoved ? "opacity-100" : "opacity-0",
        )}
        style={{
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          // Inverts whatever is behind it instead of painting over it, so text
          // stays readable through the cursor and flips colour as it passes.
          // Requires a transparent background — any fill would hide the effect.
          backdropFilter: "invert(100%)",
          WebkitBackdropFilter: "invert(100%)",
        }}
      />

      {/* The anchor dot, pinned to the pointer with no easing. */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={cn(
          "fixed left-0 top-0 z-[101] rounded-full",
          "pointer-events-none will-change-transform",
          "transition-opacity duration-200",
          hasMoved ? "opacity-100" : "opacity-0",
        )}
        style={{
          // Inverted too, so over the ring it reads dark and over the bare page
          // it reads light — visible against either.
          backdropFilter: "invert(100%)",
          WebkitBackdropFilter: "invert(100%)",
          width: DOT_DIAMETER,
          height: DOT_DIAMETER,
        }}
      />
    </>
  );
}
