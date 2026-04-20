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
  {
    id: "chatchit",
    title: "ChatChit",
    subtitle: "Social Media Platform",
    period: "Nov 2023 — Jan 2024",
    role: "Frontend & Architecture",
    description:
      "A full-featured social media application with real-time messaging, video calls, and rich posts — architected from the ground up with a focus on responsive UI and low-latency communication.",
    highlights: [
      "Built a full-featured social media app with messaging, video calls, and posts.",
      "Established project architecture, configured API layers, and designed a responsive UI using TailwindCSS and Shadcn.",
      "Integrated WebSocket for real-time messaging and notifications; used Docker for database management.",
    ],
    techStack: [
      "Next.js",
      "ASP.NET Core 6",
      "TailwindCSS",
      "Shadcn/UI",
      "WebSocket",
      "Docker",
    ],
    image: "/assets/project3.jpg",
    github: "#",
    live: "#",
    featured: true,
    tags: ["Real-time", "Full-stack"],
  },
];
