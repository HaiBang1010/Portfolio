"use client";

import { useEffect, useState } from "react";

type MouseState = {
  x: number;
  y: number;
};

/**
 * Viewport-relative cursor position.
 *
 * Pass `enabled: false` to skip the listener entirely — used to keep the
 * handler off touch devices, where there is no cursor to track.
 */
export function useMouse({ enabled = true }: { enabled?: boolean } = {}) {
  const [position, setPosition] = useState<MouseState>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (event: MouseEvent) =>
      setPosition({ x: event.clientX, y: event.clientY });

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [enabled]);

  return position;
}
