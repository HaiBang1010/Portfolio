"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

/** How far down the page the bar stops being transparent. */
const SOLID_AFTER_PX = 24;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Reading the motion value rather than a scroll listener: Lenis drives the
  // scroll position, and this stays in step with it without a second listener.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SOLID_AFTER_PX);
  });

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
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#experience"
                  className="cursor-can-hover text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  Work Experience
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#projects"
                  className="cursor-can-hover text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  Projects
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.nav>
  );
}
