"use client";

import { useCallback, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

/** How far down the page the bar stops being transparent. */
const SOLID_AFTER_PX = 24;
/** Clears the fixed bar (~60px tall) so section headings are not tucked under it. */
const SCROLL_OFFSET_PX = -80;
/** Matches the wheel-scroll feel configured in SmoothScroll. */
const SCROLL_DURATION_S = 1.2;

const LINKS = [
  { label: "Work Experience", target: "#experience" },
  { label: "Projects", target: "#projects" },
] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const lenis = useLenis();

  // Reading the motion value rather than a scroll listener: Lenis drives the
  // scroll position, and this stays in step with it without a second listener.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SOLID_AFTER_PX);
  });

  const scrollToSection = useCallback(
    (target: string) => {
      /*
        Driving Lenis directly. A plain `href="#id"` hands the jump to the
        browser, which sets the scroll position in one step — Lenis never sees
        it, so none of the easing applies and the page snaps.
      */
      if (lenis) {
        lenis.scrollTo(target, {
          offset: SCROLL_OFFSET_PX,
          duration: SCROLL_DURATION_S,
        });
        return;
      }

      // Lenis is absent on the first render, and stays absent entirely when the
      // reader prefers reduced motion — without this the links would do nothing.
      // `scrollIntoView` takes no offset, so the heading would land under the
      // fixed bar; `scroll-margin-top` on the section is what holds it clear.
      const element = document.querySelector<HTMLElement>(target);
      if (!element) return;
      element.style.scrollMarginTop = `${-SCROLL_OFFSET_PX}px`;
      element.scrollIntoView({ block: "start", behavior: "auto" });
    },
    [lenis],
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-[background-color,backdrop-filter,border-color] duration-300",
        // Transparent over the hero, frosted once the page moves under it.
        // Not reusing `.glass`: its all-round border would draw verticals down
        // the sides of a full-width bar, and only the bottom edge belongs here.
        isScrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="w-full mx-auto flex items-center justify-between max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-xl font-bold tracking-widest uppercase">
          Tran Phan Hai Bang
        </div>
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {LINKS.map(({ label, target }) => (
              <NavigationMenuItem key={target}>
                {/*
                  A button, not an anchor: this scrolls within the page rather
                  than navigating anywhere, and the href would re-introduce the
                  browser's own instant jump.
                */}
                <button
                  type="button"
                  onClick={() => scrollToSection(target)}
                  className="cursor-can-hover text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  {label}
                </button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.nav>
  );
}
