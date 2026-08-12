"use client";

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import type { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import { gsap } from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { skills, skillsByName, type Skill } from "@/data/skills";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// Code-split: the Spline runtime ships its own WebGL renderer and is over 1MB.
const loadSpline = () => import("@splinetool/react-spline");
const Spline = lazy(loadSpline);

/**
 * How long to wait for an idle moment before giving up and warming the chunk
 * anyway. Safari still has no `requestIdleCallback`.
 */
const WARM_UP_FALLBACK_MS = 1500;

/**
 * Skip the warm-up on connections where 1.5MB of speculative JS is a real cost.
 * `navigator.connection` is Chromium-only, so an absent value means "go ahead"
 * rather than "hold back" — most readers are not on a metered link.
 */
function shouldWarmUp() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return connection.effectiveType !== "2g" && connection.effectiveType !== "slow-2g";
}

/** Spline variables the scene's text objects are bound to. */
const LABEL_VARIABLE = "kbd_val";
const DESCRIPTION_VARIABLE = "desc";
/** Surfaces that mean "not pointing at a key" rather than a skill. */
const DESELECT_TARGETS = new Set(["body", "platform"]);

const SCENE = "/assets/keyboard.spline";

const TURN_RADIANS = Math.PI / 2;
const TURN_DURATION_S = 1.2;

/** Two-frame flipbook of the cat's paws, matching the reference project. */
const BONGO_PARENT = "bongo-cat";
const BONGO_FRAMES = ["frame-1", "frame-2"] as const;
const BONGO_FRAME_MS = 100;
/**
 * Absolute placement for the cat. Authored at ~3.5×, which at the board's own
 * 0.34 scale left it towering over the keys and swamping the section text.
 */
const BONGO_SCALE = 3;
const BONGO_OFFSET_Y = 480;
const BONGO_OFFSET_Z = 570;
const BOARD_SCALE = 0.4;
const BOARD_OFFSET_Y = -10;
const TEXT_PLATE_SCALE = 1;

/** Rows of the placeholder board, in keys per row — roughly a real layout. */
const SKELETON_ROWS = [14, 14, 13, 12] as const;

/**
 * Stands in for the board while it loads. Shaped like a keyboard rather than
 * being a spinner, so the space reads as "something is arriving here" instead
 * of "something is broken".
 */
function KeyboardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className={cn(
          "w-[min(70%,560px)] aspect-[16/6] rounded-2xl",
          "border border-white/10 bg-white/[0.03]",
          "flex flex-col justify-center gap-[2.5%] p-[4%]",
          /*
            The pulse is switched off in CSS rather than from `useReducedMotion`,
            which reports `null` on the first render — exactly the render this
            placeholder appears on, so a JS check would let one animated frame
            through before correcting itself.
          */
          "animate-pulse motion-reduce:animate-none motion-reduce:opacity-80",
        )}
      >
        {SKELETON_ROWS.map((keys, row) => (
          // `flex-1` on the row, not just the keys: without a share of the
          // column's height the row collapses and the keys never show.
          <div key={row} className="flex flex-1 gap-[1.5%] justify-center">
            {Array.from({ length: keys }).map((_, key) => (
              <div
                key={key}
                className="flex-1 rounded-[3px] bg-white/[0.07]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsKeyboard() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [app, setApp] = useState<Application | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [isFocusArea, setIsFocusArea] = useState(true);
  /** Gates the 440KB scene and its WebGL runtime until the reader is near it. */
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  /**
   * Set once the board has been posed, not merely loaded — the placeholder
   * stays up until then so the authored pose never flashes. See the effect
   * below for why this cannot be driven by `onLoad`.
   */
  const [isReady, setIsReady] = useState(false);
  /** The cat only plays over the Projects section, as in the reference. */
  const [isTypingSection, setIsTypingSection] = useState(false);
  const turnRef = useRef<gsap.core.Tween | null>(null);
  /** The authored pose, captured once so the return trip lands exactly on it. */
  const restRotationRef = useRef<number | null>(null);

  const setSceneText = useCallback(
    (label: string, description: string) => {
      if (!app) return;
      // Guarded: these only exist because the scene author bound text objects to
      // them. A rename in Spline would otherwise take hover down with it.
      try {
        app.setVariable(LABEL_VARIABLE, label);
        app.setVariable(DESCRIPTION_VARIABLE, description);
      } catch {
        /* scene lacks the variables — the React panel below still shows both */
      }
    },
    [app],
  );

  const selectByTargetName = useCallback(
    (name: string | undefined) => {
      if (!name || DESELECT_TARGETS.has(name)) {
        setActiveSkill(null);
        setSceneText("", "");
        return;
      }

      // The reference implementation read `skill.label` outside its `if (skill)`
      // guard, so pressing any non-skill object threw a TypeError. Resolve first,
      // then bail.
      const skill = skillsByName[name];
      if (!skill) return;

      setActiveSkill(skill);
      setSceneText(skill.label, skill.description);
    },
    [setSceneText],
  );

  // Wire up scene interactions once the runtime hands us the Application.
  useEffect(() => {
    if (!app) return;

    if (process.env.NODE_ENV === "development") {
      // Lets the scene be inspected from the console while wiring up key names.
      (window as unknown as { splineApp?: Application }).splineApp = app;
    }

    /*
      Both scales are assigned absolutely rather than multiplied, so running
      this more than once is harmless — React re-runs the effect on every dep
      change, and Strict Mode mounts twice in development.
    */
    const board = app.findObjectByName("keyboard");
    if (board) {
      board.scale.x = BOARD_SCALE;
      board.scale.y = BOARD_SCALE;
      board.scale.z = BOARD_SCALE;
      board.position.y = BOARD_OFFSET_Y;
    }

    const cat = app.findObjectByName(BONGO_PARENT);
    if (cat) {
      cat.scale.x = BONGO_SCALE;
      cat.scale.y = BONGO_SCALE;
      cat.scale.z = BONGO_SCALE;
      cat.position.y = BONGO_OFFSET_Y;
      cat.position.z = BONGO_OFFSET_Z;
    }

    /*
      The label and description plates are authored at 2× and run off the side
      of the canvas on the longest labels — "Tailwind CSS" lost its last two
      letters. Their geometry width is a baked number and the runtime wraps
      against it rather than clipping, so the box cannot be widened from here;
      shrinking the plates is what brings the text back on screen. Matched on
      their authored scale, since every text object in the scene is named "Text".
    */
    app
      .getAllObjects()
      .filter(
        (obj) =>
          obj.name === "Text" &&
          (Math.abs(obj.scale.x - 2) < 0.01 ||
            Math.abs(obj.scale.x - TEXT_PLATE_SCALE) < 0.01),
      )
      .forEach((plate) => {
        plate.scale.x = TEXT_PLATE_SCALE;
        plate.scale.y = TEXT_PLATE_SCALE;
        plate.scale.z = TEXT_PLATE_SCALE;
      });

    const onHover = (event: SplineEvent) => selectByTargetName(event.target?.name);
    const onKeyDown = (event: SplineEvent) => selectByTargetName(event.target?.name);
    const onKeyUp = () => {
      setActiveSkill(null);
      setSceneText("", "");
    };

    app.addEventListener("mouseHover", onHover);
    app.addEventListener("keyDown", onKeyDown);
    app.addEventListener("keyUp", onKeyUp);

    // Start blank rather than showing whatever the scene was authored with.
    setSceneText("", "");

    /*
      Reveal only now. The runtime flips its own loading flag *before* it calls
      onLoad, so a reveal driven by the canvas appearing would show the board at
      its authored scale for a frame or two before the values above land. One
      rAF further gives the renderer a frame to draw the corrected pose.
    */
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, [app, selectByTargetName, setSceneText]);

  /*
    Clear the label once the board turns aside. Otherwise whatever key was last
    hovered stays painted in the scene, and reads upside-down over the sections
    scrolling past.
  */
  useEffect(() => {
    if (isFocusArea) return;
    setActiveSkill(null);
    setSceneText("", "");
  }, [isFocusArea, setSceneText]);

  /*
    The board sits square while the reader is looking at it, and turns aside
    once they scroll on into Experience. Scrolling back up squares it again.
  */
  useEffect(() => {
    /*
      Watches the Tech Stack runway, not the board itself. The board is sticky
      and never leaves the viewport, so observing it would report "in focus"
      forever and the turn would never fire.
    */
    const runway = document.querySelector("[data-keyboard-runway]");
    if (!runway) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFocusArea(entry.intersectionRatio > 0.3),
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    observer.observe(runway);
    return () => observer.disconnect();
  }, []);

  /*
    Two separate triggers, because the two downloads have very different costs.

    The runtime chunk is ~1.5MB — about three quarters of everything the board
    needs, and the bulk of the wait. It has no visual side effects, so it is
    fetched during an idle moment while the reader is still on the hero.
    `lazy()` memoises the module promise, so by the time <Spline> renders the
    chunk is already there and Suspense resolves without a gap.
  */
  useEffect(() => {
    if (!shouldWarmUp()) return;

    let timer: number | undefined;
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;

    if (idle) {
      timer = idle(() => void loadSpline());
      return () => (window as Window & { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback?.(timer as number);
    }

    timer = window.setTimeout(() => void loadSpline(), WARM_UP_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  /*
    The scene itself stays behind the observer. Mounting it is what creates the
    WebGL context, which is worth deferring until the reader is actually near.
    Once created it stays — tearing a context down and rebuilding it costs far
    more than keeping it around.
  */
  useEffect(() => {
    if (shouldLoadScene) return;

    // Also anchored to the runway rather than the sticky board, which would be
    // permanently intersecting and so would load the scene immediately.
    const runway = document.querySelector("[data-keyboard-runway]");
    if (!runway) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoadScene(true);
      },
      /*
        No margin. The runway starts only ~124px below the fold, so any bottom
        margin worth writing down already intersects on first paint — measured
        at 10% and up — which would create the WebGL context on the hero, the
        exact cost this observer exists to defer. The chunk warm-up above is
        what buys the lead time instead; this trigger only needs to be honest
        about when the board is genuinely near.
      */
      { rootMargin: "0px" },
    );

    observer.observe(runway);
    return () => observer.disconnect();
  }, [shouldLoadScene]);

  /*
    The cat plays for as long as any content section is scrolling over the
    board — that is, from Experience onward. Watching those sections rather than
    the keyboard is deliberate: the board is sticky and never leaves the
    viewport, so it cannot report which section the reader is on.
  */
  useEffect(() => {
    const sections = ["#experience", "#projects"]
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => el !== null);
    if (!sections.length) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setIsTypingSection(visible.size > 0);
      },
      { rootMargin: "-30% 0px -30% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /*
    The cat is a two-frame flipbook: a parent group plus two textured planes,
    one paw down in each. Alternating their visibility every 100ms reads as
    typing. Everything is optional — a scene without these objects simply never
    shows a cat, rather than breaking the board.
  */
  useEffect(() => {
    if (!app) return;

    const parent = app.findObjectByName(BONGO_PARENT);
    const frames = BONGO_FRAMES.map((name) => app.findObjectByName(name));
    if (!parent || frames.some((frame) => !frame)) return;

    const hideAll = () => {
      parent.visible = false;
      frames.forEach((frame) => {
        if (frame) frame.visible = false;
      });
    };

    if (!isTypingSection || prefersReducedMotion) {
      hideAll();
      return;
    }

    parent.visible = true;
    let tick = 0;
    const interval = window.setInterval(() => {
      frames.forEach((frame, index) => {
        if (frame) frame.visible = index === tick % frames.length;
      });
      tick++;
    }, BONGO_FRAME_MS);

    // The reference implementation left this interval running past unmount.
    return () => {
      window.clearInterval(interval);
      hideAll();
    };
  }, [app, isTypingSection, prefersReducedMotion]);

  /*
    The board holds the pose the scene was authored with while it is the subject,
    and turns only on the way out — then returns to that exact pose on the way
    back. Capturing the rest rotation once, on load, is what makes the return
    trip land where it started instead of drifting a little further each pass.
  */
  useEffect(() => {
    if (!app) return;

    const keyboard: SPEObject | undefined = app.findObjectByName("keyboard");
    if (!keyboard) return;

    // Captured before anything animates, so "rest" is the authored pose rather
    // than wherever a half-finished tween happened to leave the board.
    if (restRotationRef.current === null) {
      restRotationRef.current = keyboard.rotation.y;
    }
    const restY = restRotationRef.current;
    const targetY = isFocusArea ? restY : restY + TURN_RADIANS;

    if (prefersReducedMotion) {
      keyboard.rotation.y = targetY;
      return;
    }

    // `overwrite` retargets the in-flight tween, so reversing direction mid-turn
    // eases from the current angle instead of snapping. No cleanup kill here:
    // this effect re-runs on every focus change, and killing on the way out
    // would cancel the very tween it just started.
    turnRef.current = gsap.to(keyboard.rotation, {
      y: targetY,
      duration: TURN_DURATION_S,
      ease: "power2.inOut",
      overwrite: true,
    });
  }, [app, isFocusArea, prefersReducedMotion]);

  // Only tear the tween down when the component itself goes away.
  useEffect(() => {
    return () => {
      turnRef.current?.kill();
      turnRef.current = null;
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/*
        Full-bleed canvas sized in viewport units so it grows with the screen it
        is centred in. The scene frames itself to whatever size the canvas is, so
        a larger canvas crops in on the board — BOARD_SCALE pulls the outer keys
        back into view.
      */}
      <div
        className={cn(
          "relative w-full",
          isMobile ? "h-[45vh]" : "h-[80vh] max-h-[800px]",
        )}
      >
        {/*
          One placeholder covering every stage of the wait: the runtime chunk
          downloading, the scene downloading, and the gap before the board is
          posed. Spline's own `children` slot only covers the middle one.
        */}
        {!isReady && <KeyboardSkeleton />}

        {shouldLoadScene && (
          <Suspense fallback={null}>
            <motion.div
              className="w-full h-full"
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
                onLoad={setApp}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </Suspense>
        )}
      </div>

      {/*
        The scene draws the label and description itself, so nothing is rendered
        here — but a WebGL canvas exposes no text at all, so the same content is
        announced off-screen for anyone using a screen reader.
      */}
      <p className="sr-only" aria-live="polite">
        {activeSkill
          ? `${activeSkill.label}. ${activeSkill.description}`
          : "Hover a key to see what it is."}
      </p>

      {/* Static list of the stack, for assistive tech and for crawlers. */}
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill.name}>
            {skill.label}: {skill.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
