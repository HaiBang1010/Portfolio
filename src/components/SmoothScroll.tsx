"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  // Lenis replaces native scrolling with an interpolated one. That is exactly
  // the motion a reduced-motion user asked not to get, so hand back the
  // browser's own scrolling instead of mounting it at all.
  if (prefersReducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        // Anything inside an element marked `data-lenis-prevent` keeps native
        // scrolling — needed for modals and any independently scrolling pane.
        prevent: (node) => node.hasAttribute("data-lenis-prevent"),
      }}
    >
      {children}
    </ReactLenis>
  );
}
