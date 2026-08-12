"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/*
  Deliberately duplicated from SkillsKeyboard rather than shared: that component
  is working and is not being touched. The import specifier is identical, so
  webpack still emits one runtime chunk for both and `lazy()` memoises the
  promise — whichever scene loads first pays for it, the other gets it free.
*/
const Spline = lazy(() => import("@splinetool/react-spline"));

/*
  The editor `.spline` format carries no compiled shaders, so a scene using
  materials the runtime cannot rebuild renders as an unlit black silhouette.
  This one sticks to gradient/noise/fresnel/matcap, which the runtime handles
  natively, and it renders correctly — verified against the editor. A scene that
  comes out black needs a `.splinecode` export instead.
*/
const SCENE = "/assets/pufferfish.spline";

/** Waited out before mounting, so the hero's own text wins the paint race. */
const DEFER_FALLBACK_MS = 1500;

/** How far to swing the view around the fish. Negative shows its left side. */
const VIEW_ANGLE_RADIANS = (15 * Math.PI) / 180;

/**
 * Orbits the scene camera around the vertical axis.
 *
 * The character itself cannot be turned: the scene's click animation drives it
 * through its transform matrix rather than the `rotation` property the runtime
 * exposes, so anything set there is overridden the moment the fish puffs up —
 * re-asserting it every frame does not win either (both measured). Moving the
 * camera sidesteps that entirely, and unlike a CSS `rotateY` on the canvas it
 * is a real change of viewpoint, with the parallax to match.
 *
 * `_camera` is private API, hence the defensive shape checks: a runtime upgrade
 * that renames it should leave the fish facing forward, not throw.
 */
function orbitCamera(app: Application, radians: number) {
  const camera = (
    app as unknown as { _camera?: { position?: { x: number; y: number; z: number } } }
  )._camera;
  const position = camera?.position;
  if (!position || typeof position.x !== "number" || typeof position.z !== "number") {
    return;
  }

  const radius = Math.hypot(position.x, position.z);
  const current = Math.atan2(position.x, position.z);
  position.x = radius * Math.sin(current + radians);
  position.z = radius * Math.cos(current + radians);
}

/**
 * Skip the scene on connections where a speculative download is a real cost.
 * `navigator.connection` is Chromium-only, so an absent value means "go ahead".
 */
function shouldLoadScene() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return connection.effectiveType !== "2g" && connection.effectiveType !== "slow-2g";
}

/**
 * Stands in for the scene while it loads — roughly the shape that is coming,
 * rather than a spinner, so the column reads as "something is arriving" instead
 * of broken.
 */
function SceneSkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
      {/*
        The pulse is switched off in CSS, not via `useReducedMotion` — that hook
        reports `null` on the first render, which is exactly the render this
        placeholder appears on, so a JS check would leak one animated frame.
      */}
      <div className="w-48 h-48 rounded-full border border-white/10 bg-white/[0.03] animate-pulse motion-reduce:animate-none motion-reduce:opacity-80" />
    </div>
  );
}

export default function HeroScene() {
  const prefersReducedMotion = useReducedMotion();
  /*
    Desktop only. `useMediaQuery` starts false on the server and on the first
    client render, so a phone never reaches the scene at all and a desktop only
    gets there after hydration — never blocking first paint.
  */
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [shouldMount, setShouldMount] = useState(false);
  const [isReady, setIsReady] = useState(false);

  /*
    Held back until the main thread goes quiet. The hero's intro paragraph is
    the LCP element on this page, and the robot must not race it.
  */
  useEffect(() => {
    if (!isDesktop || !shouldLoadScene()) return;

    let timer: number | undefined;
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;

    if (idle) {
      timer = idle(() => setShouldMount(true));
      return () =>
        (
          window as Window & { cancelIdleCallback?: (h: number) => void }
        ).cancelIdleCallback?.(timer as number);
    }

    timer = window.setTimeout(() => setShouldMount(true), DEFER_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [isDesktop]);

  // Nothing at all on phones — not even the reserved box, which would leave a
  // tall empty gap under the intro text.
  if (!isDesktop) return null;

  const onLoad = (app: Application) => {
    /*
      The scene is authored on an opaque backdrop, which lands as a black slab
      over the page's gradient. The canvas context already has an alpha channel,
      so clearing the scene's own background lets the page show through.

      `transparent` rather than `rgba(0,0,0,0)`: the runtime hands the value to
      THREE.Color, which drops the alpha component and warns about it — the
      colour would end up opaque black.
    */
    try {
      app.setBackgroundColor("transparent");
    } catch {
      // Older runtimes may not accept it; a dark box is survivable.
    }

    orbitCamera(app, VIEW_ANGLE_RADIANS);

    // One frame's grace so the renderer has drawn before the fade starts.
    requestAnimationFrame(() => setIsReady(true));
  };

  return (
    <div className="relative w-full h-[60vh] max-h-[560px]">
      {!isReady && <SceneSkeleton />}

      {shouldMount && (
        <Suspense fallback={null}>
          <motion.div
            className="w-[120%] h-[230%] absolute top-[-70%] left-0"
            initial={{ opacity: 0 }}
            animate={
              prefersReducedMotion === true
                ? { opacity: isReady ? 1 : 0 }
                : {
                    opacity: isReady ? 1 : 0,
                    y: isReady ? 0 : 16,
                    scale: isReady ? 1 : 0.96,
                  }
            }
            transition={
              prefersReducedMotion === true
                ? { duration: 0.2 }
                : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <Spline
              scene={SCENE}
              onLoad={onLoad}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </Suspense>
      )}

      {/* A WebGL canvas exposes no text, so describe it for screen readers. */}
      <p className="sr-only">A 3D pufferfish illustration that reacts to the pointer.</p>
    </div>
  );
}
