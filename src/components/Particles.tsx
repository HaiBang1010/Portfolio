"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  className?: string;
  /** How many circles to scatter across the canvas. */
  quantity?: number;
  /** Higher values make circles react less to the cursor. */
  staticity?: number;
  /** Higher values make the cursor-follow lag longer. */
  ease?: number;
  /** Fill colour as an "r, g, b" triplet. */
  color?: string;
};

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

/** Distance from an edge, in px, over which a circle fades out. */
const EDGE_FADE_PX = 20;

function remapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number,
) {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}

/**
 * Drifting particles that lean toward the cursor — a Canvas 2D effect, no WebGL.
 *
 * Ported from the 3D-portfolio reference with its motion parameters intact, but
 * with three defects fixed: the original never cancelled its rAF loop, tracked
 * the mouse through React state (re-rendering on every mousemove), and hardcoded
 * a white fill.
 */
export default function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  color = "255, 255, 255",
}: ParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const canvasSize = useRef({ w: 0, h: 0 });
  // A ref, not state: this updates on every mousemove and must not re-render.
  const mouse = useRef({ x: 0, y: 0 });
  const dprRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  // Mirrored into a ref so circleParams can read it without taking it as a
  // dependency, which would re-seed the whole field on every change.
  const prefersReducedMotionRef = useRef(false);
  prefersReducedMotionRef.current = prefersReducedMotion === true;

  const circleParams = useCallback((): Circle => {
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    return {
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 0.1,
      // Starts invisible and is faded up by the animation loop. When motion is
      // reduced that loop never runs, so seed the final alpha directly —
      // otherwise the field would be drawn but permanently transparent.
      alpha: prefersReducedMotionRef.current ? targetAlpha : 0,
      targetAlpha,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, []);

  const drawCircle = useCallback(
    (circle: Circle, update = false) => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const { x, y, translateX, translateY, size, alpha } = circle;
      ctx.translate(translateX, translateY);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

      if (!update) circlesRef.current.push(circle);
    },
    [color],
  );

  const clearContext = useCallback(() => {
    contextRef.current?.clearRect(
      0,
      0,
      canvasSize.current.w,
      canvasSize.current.h,
    );
  }, []);

  const initCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!container || !canvas || !ctx) return;

    circlesRef.current.length = 0;
    dprRef.current = window.devicePixelRatio || 1;

    canvasSize.current.w = container.offsetWidth;
    canvasSize.current.h = container.offsetHeight;
    canvas.width = canvasSize.current.w * dprRef.current;
    canvas.height = canvasSize.current.h * dprRef.current;
    canvas.style.width = `${canvasSize.current.w}px`;
    canvas.style.height = `${canvasSize.current.h}px`;
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

    clearContext();
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams());
    }
  }, [circleParams, clearContext, drawCircle, quantity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");
    initCanvas();

    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
    // prefersReducedMotion re-seeds the field so the static branch gets circles
    // at full alpha rather than the invisible ones the loop would have faded up.
  }, [initCanvas, prefersReducedMotion]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = event.clientX - rect.left - w / 2;
      const y = event.clientY - rect.top - h / 2;

      // Ignore positions outside the canvas so particles do not lurch when the
      // pointer leaves and re-enters.
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    // Reduced motion still gets the particle field, just frozen where it was
    // first drawn — the scene stays, the movement does not.
    if (prefersReducedMotion) return;

    const animate = () => {
      clearContext();

      circlesRef.current.forEach((circle, i) => {
        const edges = [
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edges.reduce((a, b) => Math.min(a, b));
        const edgeAlpha = parseFloat(
          remapValue(closestEdge, 0, EDGE_FADE_PX, 0, 1).toFixed(2),
        );

        if (edgeAlpha > 1) {
          circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
        } else {
          circle.alpha = circle.targetAlpha * edgeAlpha;
        }

        circle.x += circle.dx;
        circle.y += circle.dy;
        // Each circle has its own magnetism, so they lean toward the cursor by
        // different amounts — that spread is what reads as depth.
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) -
            circle.translateX) /
          ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) -
            circle.translateY) /
          ease;

        const outOfBounds =
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size;

        if (outOfBounds) {
          circlesRef.current.splice(i, 1);
          drawCircle(circleParams());
        } else {
          drawCircle(circle, true);
        }
      });

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    // The reference implementation omitted this, so its loop outlived the
    // component. Here the canvas remounts on HMR, which would stack loops.
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [circleParams, clearContext, drawCircle, ease, prefersReducedMotion, staticity]);

  return (
    <div ref={containerRef} className={cn(className)} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
