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

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS Modules
- **Animation Library:** Framer Motion
- **Scroll Animation:** React Scroll/Lenis (smooth scrolling)
- **Utilities:** clsx, classnames for dynamic classes
- **Deployment:** Vercel
- **Package Manager:** pnpm

## Design Direction

### Visual Style
- **Color Palette:** Monochromatic base (white/light gray/dark gray) with accent colors (vibrant accent on hover/focus)
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

1. **Hero / Home** — Name, title tagline, scroll CTA, subtle animated background
2. **About** — Brief intro, highlights, professional summary (2-3 paragraphs max)
3. **Experience** — Timeline or cards of work experience (Ky Luc, Teky Academy)
4. **Featured Projects** — 2-3 showcase projects with images, tech stack, descriptions
   - Charity NFT Marketplace (NextJS, Solidity, ERC-4337)
   - Good Things (MERN Stack)
   - ChatChit (NextJS, ASP.NET Core 6)
5. **Archive / All Work** — Grid or table of all projects/assignments
6. **Contact** — Simple form or links (email, social, GitHub)

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
├── public/
│   └── assets/
│       ├── TPHB_FE.pdf              # Resume/CV
│       └── www.stefantopalovic.com_.png  # Design reference
├── src/
│   ├── app/
│   │   ├── fonts/                   # Geist font files (VF woff)
│   │   ├── favicon.ico
│   │   ├── globals.css              # Global styles & Tailwind imports
│   │   ├── layout.tsx               # Root layout (metadata, fonts)
│   │   └── page.tsx                 # Home page (assembles all sections)
│   ├── components/
│   │   ├── Experience.tsx           # Work experience section
│   │   ├── Hero.tsx                 # Hero/landing section
│   │   ├── Navbar.tsx               # Sticky navigation bar
│   │   └── Projects.tsx             # Featured projects section
│   └── data/
│       ├── experience.ts            # Work experience entries
│       ├── metadata.ts              # Personal info & social links
│       ├── projects.ts              # Featured project data
│       └── skills.ts                # Technical skills list
├── .eslintrc.json
├── .gitignore
├── CLAUDE.md
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

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

## Animation Best Practices (Custom Hooks)

Create custom hooks for reusable animations:

```typescript
// src/hooks/useScrollAnimation.ts
export const useScrollAnimation = (options) => {
  // IntersectionObserver + animate on enter
}

// src/hooks/useTextSplit.ts
export const useTextSplit = (text) => {
  // Split into chars/words and return animated elements
}

// src/hooks/useMousePosition.ts
export const useMousePosition = () => {
  // Track cursor for interactive effects
}
```

## Commands

```bash
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Optimized production build
pnpm lint         # ESLint check
pnpm type-check   # TypeScript type checking
pnpm preview      # Preview production build locally
```

## Performance & SEO

- **Core Web Vitals:** Optimize LCP, FID, CLS
- **Image Optimization:** Use Next.js Image component, WebP format, lazy loading
- **Metadata:** Dynamic OG tags, canonical URLs, Open Graph
- **Analytics:** Optional — Vercel Analytics or Plausible
- **Sitemap & Robots:** Generate sitemap.xml, robots.txt

## Important Notes

- **Language:** All content and code comments in English (international audience)
- **Visual Priority:** Every pixel matters — prioritize smoothness and impact over feature count
- **No UI Libraries:** Build all components from scratch (no shadcn, MUI) — this demonstrates CSS & component design skills
- **Animation Quality:** Use easing for natural motion, stagger for sequences, respect prefers-reduced-motion
- **Mobile First:** Design responsive from smallest viewport up
- **Type Safety:** Strict TypeScript, no `any` types
- **Assets:** Store in `public/` or optimize with Next.js Image
- **Accessibility:** WCAG 2.1 AA compliant, semantic markup, keyboard navigation
