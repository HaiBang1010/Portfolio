# CLAUDE.md — Profilio

## Project Overview


**Tran Phan Hai Bang** — Frontend Developer Portfolio. A modern, minimalist showcase of frontend engineering skills with smooth animations and interactive experiences. Design inspired by [stefantopalovic.com](https://www.stefantopalovic.com).

**Key Info:**
- Full Name: Tran Phan Hai Bang
- Title: Software Engineer | Frontend Developer
- Contact: (+84) 355 511 436 | tphbang.dev@gmail.com
- LinkedIn: linkedin.com/in/tphbang
- GitHub: github.com/haibang1010
- Education: UIT - VNU-HCM (Expected 2026), GPA: 8.69/10.0
- Thesis: "Building a Charity NFT Marketplace using Account Abstraction (ERC-4337) and Gasless Transactions"

## Tech Stack

- **Framework:** Next.js 14.2.35 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config` theme) + shadcn/ui
- **Animation Library:** Framer Motion 12
- **Imperative Animation:** GSAP 3 (used only by `ElasticCursor`)
- **Smooth Scroll:** Lenis 1.3 (`lenis/react`)
- **Utilities:** clsx + tailwind-merge via `cn()` in `src/lib/utils.ts`
- **Deployment:** Vercel
- **Package Manager:** npm (repo has `package-lock.json`, despite the pnpm commands below)

## Design Direction

### Visual Style
- **Color Palette:** Deep navy dark theme — `--background: oklch(0.137 0.036 258.5)`,
  ported from the 3D-portfolio reference. Surfaces share that hue at higher lightness;
  text tokens stay neutral. A diagonal gradient plus Canvas 2D particles sit behind
  the page (dark mode only).
- **Typography:** Large, clean headings with generous whitespace — typography as design element
- **Layout:** Clean, grid-based, with asymmetric compositions
- **Aesthetic:** Minimal but impactful, professional yet creative
- **Depth:** Subtle layering, strategic use of negative space

### Navigation & Layout
- **Top navigation bar:** Minimal, sticky (fixed on scroll)
- **Full-width sections:** Hero, About, Experience, Projects, Archive/All Work, Contact
- **Responsive:** Mobile-first, hamburger menu on small screens
- **Navigation Links:** About, Experience, Work, Blog (optional), Contact

## Pages / Sections

Current state — `page.tsx` renders exactly: Navbar, Hero, Experience, Projects, Footer.

| Section | Status |
|---|---|
| **Hero** | Built — avatar, blur-morph role rotator, tech-stack grid |
| **Experience** | Built — cards with bullet highlights + stack badges |
| **Featured Projects** | Built — GuB, Beng, Charity NFT. `image` field exists in `projects.ts` but is **never rendered**, and the files it points to do not exist |
| **Footer / Contact** | Built as links only — no form |
| **About** | Not built |
| **Archive / All Work** | Not built |
| **Mobile hamburger menu** | Not built — navbar shows full links on all sizes |

### Known gaps worth picking up

- No **Download CV** button, though `metadata.resumeUrl` and the PDF both exist.
- `src/data/metadata.ts` holds richer SEO copy (`title`, `description`, `tagline`,
  `education`, `socials`) that `layout.tsx` does not use — its metadata is minimal
  and there are no OG tags, sitemap, or robots.txt.
- `tailwind.config.ts` is a Tailwind v3 leftover; the project is v4 CSS-first, so
  that file's `theme` is effectively dead.

## Critical Animation Features to Implement

These animations define the site's feel — each requires precise implementation:

### 1. **Scroll Tracking**
- Track scroll position globally (useScroll from Framer Motion)
- Use scroll velocity to trigger animations (slow vs fast scroll)
- Reveal elements progressively as user scrolls down

### 2. **Viewport Detection**
- Detect when elements enter/exit viewport using IntersectionObserver
- Fade in/slide up elements when visible
- Stagger animations for lists of items
- Apply to project cards, skill tags, timeline items

### 3. **Sticky Positioning**
- Navigation bar sticky at top (appears after hero scroll)
- Section headers sticky with parallax effect
- Scroll progress indicator on sidebar/top

### 4. **Easing Functions**
- Use custom easing curves for natural motion (ease-out for entrances, ease-in-out for transitions)
- Stagger delays for multi-element animations (150-200ms between items)
- Page transitions with spring physics for smoothness

### 5. **Text Splitting**
- Split headings into characters/words for animated reveals
- Animate hero title letter-by-letter or word-by-word on page load
- Animate section headers on scroll into view
- Use animation library or custom hook for text splitting

## Frontend Techniques to Showcase

The portfolio itself must demonstrate these core skills:

- ✨ **Scroll-driven animations** — Viewport detection, parallax, reveal-on-scroll
- 🎭 **Text animations** — Character/word splitting, typewriter effects, gradient text
- 🎬 **Page transitions** — Smooth route transitions with layout animations
- 🎯 **Micro-interactions** — Hover states, button feedback, active navlinks
- ⚡ **Performance** — Code splitting, lazy loading images, optimized animations (60fps)
- ♿ **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, prefers-reduced-motion
- 📱 **Responsive design** — Fluid typography, mobile-first CSS, touch-friendly interactions
- 🎨 **CSS mastery** — Grid, Flexbox, custom properties, animations without libraries

## Data Structure

Create `src/data/` with:
- `projects.ts` — Featured projects (3-5)
- `all-projects.ts` — Complete project list for archive
- `skills.ts` — Technical skills (Frontend, Backend, Blockchain, Tools)
- `experience.ts` — Work experience entries (Ky Luc, Teky Academy)
- `metadata.ts` — Personal info, social links, taglines

## Project Structure

```
portfolio/
├── 3D-portfolio/                    # Reference project only — NOT part of the build
├── public/
│   ├── assets/                      # CV, avatars, project images
│   └── icons/                       # Tech-stack SVG icons
├── src/
│   ├── app/
│   │   ├── fonts/                   # Geist font files (unused — Inter is active)
│   │   ├── globals.css              # Tailwind v4 imports, theme tokens, .glass, .text-gradient
│   │   ├── layout.tsx               # Root layout (metadata, Inter, forced dark)
│   │   └── page.tsx                 # Home page (assembles all sections)
│   ├── components/
│   │   ├── ElasticCursor.tsx        # GSAP jelly cursor (fine pointer only)
│   │   ├── Experience.tsx           # Work experience section
│   │   ├── Footer.tsx               # Contact links
│   │   ├── Hero.tsx                 # Hero/landing section
│   │   ├── Navbar.tsx               # Sticky navigation bar
│   │   ├── Particles.tsx            # Canvas 2D drifting particles background
│   │   ├── Projects.tsx             # Featured projects section
│   │   ├── RoleRotator.tsx          # Blur-morph job-title rotator
│   │   ├── SmoothScroll.tsx         # Lenis wrapper
│   │   └── ui/                      # shadcn primitives
│   ├── data/                        # experience, metadata, projects, skills
│   ├── hooks/
│   │   ├── use-media-query.ts
│   │   └── use-mouse.ts
│   └── lib/utils.ts                 # cn()
└── (config files at root)
```

## Implemented Effects — hard-won constraints

These were debugged at length. Changing them without reading this will reintroduce
bugs that are expensive to diagnose.

### `.text-gradient` must never sit on an ancestor of animated text

`.text-gradient` (`globals.css`) sets `-webkit-text-fill-color: transparent`, which
**inherits to every descendant**. Put it on `<h1>` and the RoleRotator's invisible
width-reserving spans inherit the transparent fill *without* `background-clip: text`,
so the gradient fills their whole box and paints bright slabs over the live text —
it reads as duplicated, overlapping words.

Rule: apply `.text-gradient` to the exact text span, never to a wrapper.
See `Hero.tsx` — the `<h1>` is plain, only "Hi, I'm Hai Bang." is wrapped.

### RoleRotator uses `AnimatePresence mode="sync"` on purpose

Both roles are mounted at once during the handover (~45% of each cycle). **This is
the effect, not a bug** — the two blurred strings cross-fading is what produces the
morph. Do not "fix" it to `mode="wait"`; that reintroduces a visible blank gap.

### Particles background layering

`Particles` is `fixed inset-0 -z-10`. For it to be visible, the base colour lives on
`html` and `body` is transparent (`globals.css`). Re-adding `bg-background` to `body`
will hide the canvas completely.

Particles seed at `alpha: 0` and are faded up by the rAF loop. Under
`prefers-reduced-motion` that loop never runs, so the component seeds the final alpha
directly — otherwise the field renders but stays invisible.

### Dark mode only

`<html>` has a hard-coded `dark` class and there is no theme toggle. The `:root`
(light) tokens exist but are never exercised. Dark surfaces share the navy hue
`oklch(... 0.036 258.5)`; foreground tokens stay neutral for contrast.

## Testing UI changes — lessons learned

- **Playwright does not render `filter: blur()`** in screenshots. Verified with a red
  `blur(28px)` probe that captured sharp. For blur-related work, trust DOM
  measurements (`getComputedStyle`, element counts), not images.
- **Playwright enables `prefers-reduced-motion` by default.** Always call
  `page.emulateMedia({ reducedMotion: 'no-preference' })` or animations sit frozen and
  every measurement is meaningless.
- **Run only ONE dev server at a time.** Stale `next dev` processes hold the `.next`
  directory and file watchers; a new server then hangs forever at "Starting...". Kill
  node processes before deleting `.next` — deleting while locked leaves a corrupt cache.
- `npx tsc --noEmit` on the repo root also type-checks `3D-portfolio/` and fails.
  Use a tsconfig that excludes it, or expect noise. This is also why `next build`
  fails: it type-checks that folder.

## Code Conventions

- Components in `src/components/` — one folder per component with `index.tsx`
- Pages/routes in `src/app/` (Next.js App Router)
- Shared types in `src/types/`
- Utilities & hooks in `src/lib/` and `src/hooks/`
- Animation configurations in `src/lib/animations.ts`
- CSS Modules for scoped styles (`.module.css`)
- Named exports (except Next.js page components require default export)
- Prefer Server Components, use `"use client"` only when necessary
- File naming: kebab-case (`text-reveal.tsx`), Component naming: PascalCase (`TextReveal`)
- Reusable animation hooks in `src/hooks/` (e.g., `useScrollAnimation`, `useTextSplit`)

## Hooks

Existing (reuse these rather than writing new ones):

```typescript
// src/hooks/use-media-query.ts
useMediaQuery(query: string): boolean
// Starts false on the server and first client render, so effects gated on it
// stay on the cheap path until hydration.

// src/hooks/use-mouse.ts
useMouse({ enabled }): { x, y }
// Viewport-relative cursor position. Pass enabled: false to skip the listener
// entirely on touch devices.
```

Still unbuilt from the original plan: `useScrollAnimation`, `useTextSplit`,
`src/lib/animations.ts`.

**Gating expensive effects:** prefer `useMediaQuery("(pointer: fine)")` over a
width breakpoint — a wide touchscreen should not get cursor effects, a stylus
tablet should. `ElasticCursor` follows this, and `globals.css` mirrors the exact
same condition for `cursor: none` so the two can never disagree and leave the user
with no cursor at all.

## Commands

```bash
npm run dev       # Start dev server on localhost:3000
npm run build     # Production build — currently FAILS, see below
npm run lint      # ESLint check (must be run from the repo root)
npm start         # Serve a production build
```

> **`npm run build` is broken and it is not the app's fault.** `tsconfig.json`
> includes `**/*.ts(x)` and only excludes `node_modules`, so the type-check step
> pulls in `3D-portfolio/` and aborts. Next prints `✓ Compiled successfully` first,
> then fails. Fix by adding `"3D-portfolio"` to `exclude` in `tsconfig.json`.

## Performance & SEO

- **Core Web Vitals:** Optimize LCP, FID, CLS
- **Image Optimization:** Use Next.js Image component, WebP format, lazy loading
- **Metadata:** Dynamic OG tags, canonical URLs, Open Graph
- **Analytics:** Optional — Vercel Analytics or Plausible
- **Sitemap & Robots:** Generate sitemap.xml, robots.txt

## Important Notes

- **Language:** All content and code comments in English (international audience)
- **Visual Priority:** Every pixel matters — prioritize smoothness and impact over feature count
- **Animation Quality:** Use easing for natural motion, stagger for sequences, respect prefers-reduced-motion
- **Mobile First:** Design responsive from smallest viewport up
- **Type Safety:** Strict TypeScript, no `any` types
- **Assets:** Store in `public/` or optimize with Next.js Image
- **Accessibility:** WCAG 2.1 AA compliant, semantic markup, keyboard navigation

---
name: context7-mcp
description: use context7 to check up to date docs when needed for implementing new librearies or frameworks, or adding features using them  
---claud