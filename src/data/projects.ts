export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  period: string;
  role?: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
  tags?: string[];
};

export const projects: Project[] = [
  {
    id: "gub",
    title: "GuB",
    subtitle: "E-Commerce Platform",
    period: "May 2026 — Jun 2026",
    role: "Full-stack Developer",
    description:
      "A full-stack e-commerce platform with a customer storefront and admin dashboard — product catalog, search, cart, Stripe payments, realtime chat, and bilingual (EN/VI) support.",
    highlights: [
      "Built a modular-monolith backend (NestJS) with PostgreSQL multi-schema isolation and clean module boundaries.",
      "Storefront with full-text search (pg_trgm), cart, Stripe checkout, i18n (EN/VI), and SEO (per-product metadata + JSON-LD).",
      "Admin dashboard with analytics, product/order CRUD, and realtime chat via Supabase Broadcast.",
      "Deployed on a $0 free tier (Vercel + Render + Neon) with Cloudinary image optimization and Google OAuth.",
    ],
    techStack: [
      "Next.js",
      "React",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "TanStack Query",
      "Stripe",
      "Supabase",
      "Tailwind CSS",
    ],
    image: "/assets/gub.jpg",
    github: "https://github.com/HaiBang1010/GuB-ECommerce",
    live: "https://gu-b-e.vercel.app",
    featured: true,
    tags: ["E-Commerce", "Full-stack", "Real-time"],
  },
  {
    id: "beng",
    title: "Beng",
    subtitle: "Social Media Platform",
    period: "May 2026 — Jun 2026",
    role: "Full-stack Developer",
    description:
      "Production-grade, Instagram-style social platform built end-to-end. Real-time messaging with voice notes & GIFs, audio/video calls via LiveKit, Instagram-style Stories with music stickers (iTunes API), a mixed-source feed algorithm, and secure JWT auth with httpOnly cookies. Deployed to production on Vercel + Railway with Cloudflare (S3-compatible) media storage.",
    highlights: [
      "Real-time messaging with voice notes & GIFs, plus 1:1 audio/video calls powered by LiveKit Cloud.",
      "Instagram-style Stories with music stickers (iTunes API) and a mixed-source feed algorithm.",
      "Secure JWT auth via httpOnly cookies across a fully typed React + Node/Express/Prisma stack.",
      "Shipped to production on Vercel + Railway with Cloudflare (S3-compatible) media storage.",
    ],
    techStack: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind v4",
      "Zustand",
      "TanStack Query",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Socket.io",
      "LiveKit",
      "Cloudflare",
      "Vercel",
      "Railway",
    ],
    image: "/assets/beng.jpg",
    github: "https://github.com/Beng-SocialMedia",
    live: "https://social-media-blush-theta.vercel.app",
    featured: true,
    tags: ["Real-time", "Full-stack", "Social"],
  },
  {
    id: "charity-nft",
    title: "Charity NFT Marketplace",
    subtitle: "Graduation Thesis",
    period: "Oct 2025 — Jan 2026",
    role: "Full-stack & Blockchain Developer",
    description:
      "A decentralized NFT fundraising platform that removes Web3 friction — no private keys, no gas fees — so everyday users can donate with a single social login.",
    highlights: [
      "Developed a decentralized NFT fundraising platform leveraging Account Abstraction to eliminate private-key management and gas fees for Web2 users.",
      "Implemented ERC-4337 architecture (Bundlers, Paymasters) with Web3Auth (Social Login / MPC) to enable seamless 2-step onboarding via Google and Facebook.",
      "Built a hybrid indexer syncing on-chain data to PostgreSQL for real-time querying, and authored ERC-721 contracts with automated revenue splitting.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Solidity",
      "ERC-4337",
      "ERC-721",
      "Web3Auth",
      "PostgreSQL",
    ],
    image: "/assets/project1.jpg",
    github: "https://github.com/ArtChain-NFT",
    live: "#",
    featured: true,
    tags: ["Blockchain", "Full-stack", "Thesis"],
  },
];
