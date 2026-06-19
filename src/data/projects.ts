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
    github: "#",
    live: "#",
    featured: true,
    tags: ["Blockchain", "Full-stack", "Thesis"],
  },
  {
    id: "good-things",
    title: "Good Things",
    subtitle: "Social Network — MERN Stack",
    period: "Jul 2025 — Sep 2025",
    role: "Full-stack Developer",
    description:
      "A full-stack social network mirroring Facebook's core experience — feed, posts, likes, comments, and smart search — engineered end-to-end with the MERN stack.",
    highlights: [
      "Engineered a full-stack social network mirroring Facebook's core features: interactive News Feed, post creation, likes, and comments.",
      "Optimized search functionality using debounce techniques for responsive, low-latency queries.",
      "Designed complex relational database schemas for user profiles and social relationships.",
    ],
    techStack: ["MongoDB", "Express", "React", "Node.js", "TailwindCSS"],
    image: "/assets/project2.jpg",
    github: "#",
    live: "#",
    featured: true,
    tags: ["Full-stack", "Social"],
  },
];
