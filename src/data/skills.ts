export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend & DB"
  | "Tools"
  | "Fun";

export type Skill = {
  /**
   * Must match the object name inside `public/assets/keyboard.spline` exactly.
   * Lookups are plain object indexing with no normalisation, so a mismatch
   * silently yields `undefined` and the key goes dead.
   */
  name: string;
  /** Shown in the 3D scene via the `kbd_val` Spline variable. */
  label: string;
  description: string;
  category: SkillCategory;
  /** Keys that are on the board for looks, not part of the actual stack. */
  decorative?: boolean;
};

export const skills: Skill[] = [
  // Languages
  {
    name: "js",
    label: "JavaScript",
    description: "The language that runs everywhere, for better or worse.",
    category: "Languages",
  },
  {
    name: "ts",
    label: "TypeScript",
    description: "JavaScript that tells me I'm wrong before the users do.",
    category: "Languages",
  },
  {
    name: "html",
    label: "HTML",
    description: "The skeleton every framework eventually compiles down to.",
    category: "Languages",
  },
  {
    name: "css",
    label: "CSS",
    description: "Centering things is a solved problem. Mostly.",
    category: "Languages",
  },
  {
    name: "solidity",
    label: "Solidity",
    description: "Code where a typo costs real money. No pressure.",
    category: "Languages",
  },

  // Frontend
  {
    name: "react",
    label: "React",
    description: "Components all the way down.",
    category: "Frontend",
  },
  {
    name: "nextjs",
    label: "Next.js",
    description: "React with opinions about your folder structure.",
    category: "Frontend",
  },
  {
    name: "tailwind",
    label: "Tailwind CSS",
    description: "Long class names, short stylesheets.",
    category: "Frontend",
  },

  // Backend & DB
  {
    name: "nodejs",
    label: "Node.js",
    description: "JavaScript escaped the browser and never looked back.",
    category: "Backend & DB",
  },
  {
    name: "express",
    label: "Express",
    description: "Minimal, unopinionated, and still everywhere.",
    category: "Backend & DB",
  },
  {
    name: "mongodb",
    label: "MongoDB",
    description: "Schemaless until the day you desperately want a schema.",
    category: "Backend & DB",
  },
  {
    name: "postgres",
    label: "PostgreSQL",
    description: "The database that quietly does everything well.",
    category: "Backend & DB",
  },

  // Tools
  {
    name: "docker",
    label: "Docker",
    description: "It works on my machine — and now yours too.",
    category: "Tools",
  },
  {
    name: "git",
    label: "Git",
    description: "Undo button for everything, once you learn the incantations.",
    category: "Tools",
  },
  {
    name: "github",
    label: "GitHub",
    description: "Where the commits live and the history is written.",
    category: "Tools",
  },
  {
    name: "vercel",
    label: "Vercel",
    description: "Push to main, deploy before the coffee cools.",
    category: "Tools",
  },
  {
    name: "figma",
    label: "Figma",
    description: "Where the design exists before the code does.",
    category: "Tools",
  },
  {
    name: "claude",
    label: "Claude",
    description: "Pair programming with someone who never needs coffee.",
    category: "Tools",
  },

  // Decorative keys — on the board for character, not part of the stack.
  {
    name: "mac",
    label: "macOS",
    description: "Where the terminal feels like home.",
    category: "Fun",
    decorative: true,
  },
  {
    name: "window",
    label: "Windows",
    description: "Where this portfolio was actually built.",
    category: "Fun",
    decorative: true,
  },
  {
    name: "space",
    label: "Spacebar",
    description: "The most pressed key in every codebase.",
    category: "Fun",
    decorative: true,
  },
];

/** Indexed by Spline object name for O(1) lookup from hover/key events. */
export const skillsByName: Record<string, Skill> = Object.fromEntries(
  skills.map((skill) => [skill.name, skill]),
);

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend & DB",
  "Tools",
  "Fun",
];
