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
 * The idle motion sways rather than spinning a full turn: a complete rotation
 * spends half its time showing the back of the board, where every legend reads
 * mirrored and upside down.
 */
const SWAY_RADIANS = Math.PI / 5;
const SWAY_DURATION_S = 6;

export default function SkillsKeyboard() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [app, setApp] = useState<Application | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [isFocusArea, setIsFocusArea] = useState(true);
  const spinRef = useRef<gsap.core.Tween | null>(null);
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
    Once Experience reaches the upper half of the viewport the keyboard stops
    being the subject and becomes a backdrop with text scrolling over it — dim
    and shrink it so the copy stays readable.

    This reads scroll position directly rather than using IntersectionObserver:
    the keyboard is sticky and Experience is tall, so both are almost always
    "intersecting" and the observer never flips.
  */
  useEffect(() => {
    const onScroll = () => {
      // Backdrop mode for as long as ANY content section overlaps the keyboard,
      // not just Experience — once Experience scrolls off the top, Projects has
      // taken its place and the text still needs to stay readable.
      const sections = ["#experience", "#projects"]
        .map((id) => document.querySelector(id))
        .filter((el): el is Element => el !== null);
      if (!sections.length) return;

      const threshold = window.innerHeight * 0.55;
      const overlapping = sections.some((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        return top < threshold && bottom > 0;
      });

      setIsFocusArea(!overlapping);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Idle rotation. Paused while a key is selected so reading the label is easy.
  useEffect(() => {
    if (!app || prefersReducedMotion) return;

    const keyboard: SPEObject | undefined = app.findObjectByName("keyboard");
    if (!keyboard) return;

    const restY = keyboard.rotation.y;
    keyboard.rotation.y = restY - SWAY_RADIANS / 2;

    spinRef.current = gsap.to(keyboard.rotation, {
      y: restY + SWAY_RADIANS / 2,
      duration: SWAY_DURATION_S,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      spinRef.current?.kill();
      spinRef.current = null;
    };
  }, [app, prefersReducedMotion]);

  useEffect(() => {
    const spin = spinRef.current;
    if (!spin) return;
    if (activeSkill) spin.pause();
    else spin.resume();
  }, [activeSkill]);

  return (
    <div ref={rootRef} className="w-full flex flex-col items-center">
      <div
        className={cn(
          "relative w-full transition-all duration-700 ease-out",
          isMobile ? "h-[320px]" : "h-[460px] lg:h-[520px]",
          // Backdrop mode: quiet enough for text to sit on top of it.
          isFocusArea ? "opacity-100 scale-100" : "opacity-30 scale-[0.72]",
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
      <div
        className={cn(
          "min-h-16 mt-2 text-center px-4 transition-opacity duration-500",
          // Hidden in backdrop mode so it never collides with section copy.
          isFocusArea ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-live="polite"
      >
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
