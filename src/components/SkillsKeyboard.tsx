"use client";

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import type { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { skillsByName, type Skill } from "@/data/skills";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// Code-split: the Spline runtime ships its own WebGL renderer and is over 1MB.
const Spline = lazy(() => import("@splinetool/react-spline"));

/** Spline variables the scene's text objects are bound to. */
const LABEL_VARIABLE = "kbd_val";
const DESCRIPTION_VARIABLE = "desc";
/** Surfaces that mean "not pointing at a key" rather than a skill. */
const DESELECT_TARGETS = new Set(["body", "platform"]);

const SCENE = "/assets/keyboard.spline";

/**
 * How far the board turns once it stops being the subject. A quarter turn reads
 * as "moving aside"; a full rotation would spend half its time showing the back,
 * where every legend is mirrored and upside down.
 */
const TURN_RADIANS = Math.PI / 2;
const TURN_DURATION_S = 1.2;

/**
 * Absolute scale for the board — authored at 0.5, which crops the outer keys.
 * The scene's camera is fixed (neither `setZoom` nor moving the camera object
 * changes the framing), so scaling the model is the only way to fit it.
 */
const BOARD_SCALE = 0.31;

/** Absolute scale for the text plates. Authored at 2×, which overflows the canvas. */
const TEXT_PLATE_SCALE = 1.15;

export default function SkillsKeyboard() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [app, setApp] = useState<Application | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [isFocusArea, setIsFocusArea] = useState(true);
  const turnRef = useRef<gsap.core.Tween | null>(null);
  /** The authored pose, captured once so the return trip lands exactly on it. */
  const restRotationRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

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

    const onHover = (event: SplineEvent) =>
      selectByTargetName(event.target?.name);
    const onKeyDown = (event: SplineEvent) =>
      selectByTargetName(event.target?.name);
    const onKeyUp = () => {
      setActiveSkill(null);
      setSceneText("", "");
    };

    app.addEventListener("mouseHover", onHover);
    app.addEventListener("keyDown", onKeyDown);
    app.addEventListener("keyUp", onKeyUp);

    // Start blank rather than showing whatever the scene was authored with.
    setSceneText("", "");
  }, [app, selectByTargetName, setSceneText]);

  /*
    The board sits square while the reader is looking at it, and turns aside
    once they scroll on into Experience. Scrolling back up squares it again.
  */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // A third on screen is enough to count as "being looked at". Set this much
    // higher and the block never qualifies — it is taller than the space left
    // below the fold — so the board would start already turned.
    const observer = new IntersectionObserver(
      ([entry]) => setIsFocusArea(entry.intersectionRatio > 0.3),
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

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
    <div ref={rootRef} className="w-full flex flex-col items-center">
      <h2 className="w-full text-base md:text-lg font-bold tracking-widest uppercase text-muted-foreground mb-8 font-mono">
        Tech Stack
      </h2>

      {/*
        Full-bleed canvas sized in viewport units so it grows with the screen it
        is centred in. The scene frames itself to whatever size the canvas is, so
        a larger canvas crops in on the board — BOARD_SCALE pulls the outer keys
        back into view.
      */}
      <div
        className={cn(
          "relative w-full",
          isMobile ? "h-[45vh]" : "h-[60vh] max-h-[640px]",
        )}
      >
        <Suspense fallback={null}>
          <Spline
            scene={SCENE}
            onLoad={setApp}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>

      {/*
        Mirrors the in-scene text. The 3D label is the primary readout, but this
        keeps the description readable and gives assistive tech something real —
        a WebGL canvas exposes nothing to a screen reader.
      */}
      <div className="min-h-16 mt-2 text-center px-4" aria-live="polite">
        {activeSkill ? (
          <>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              {activeSkill.label}
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              {activeSkill.description}
            </p>
          </>
        ) : (
          <p className="text-sm md:text-base text-muted-foreground">
            Hover a key to see what it is.
          </p>
        )}
      </div>
    </div>
  );
}
