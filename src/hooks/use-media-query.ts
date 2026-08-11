"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query.
 *
 * Starts as `false` on the server and on the first client render, so callers
 * that gate an expensive effect stay on the cheap path until the real value is
 * known after hydration.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener("change", onChange);

    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
