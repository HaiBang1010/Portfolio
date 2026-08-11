"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="w-full mx-auto flex items-center justify-between max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
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
