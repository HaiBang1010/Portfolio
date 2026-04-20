export type Skill = {
  name: string;
  category: SkillCategory;
  icon?: string;
};

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend & DB"
  | "Blockchain"
  | "Tools";

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Languages", icon: "js" },
  { name: "TypeScript", category: "Languages", icon: "ts" },
  { name: "Solidity", category: "Languages", icon: "solidity" },
  { name: "HTML", category: "Languages", icon: "html" },
  { name: "CSS", category: "Languages", icon: "css" },

  // Frontend
  { name: "React", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "next" },
  { name: "TailwindCSS", category: "Frontend", icon: "tailwind" },
  { name: "Ant Design", category: "Frontend", icon: "antd" },
  { name: "Shadcn/UI", category: "Frontend", icon: "shadcn" },

  // Backend & DB
  { name: "Node.js", category: "Backend & DB", icon: "node" },
  { name: "PostgreSQL", category: "Backend & DB", icon: "postgres" },
  { name: "MongoDB", category: "Backend & DB", icon: "mongo" },
  { name: "SQL Server", category: "Backend & DB", icon: "sqlserver" },

  // Blockchain
  { name: "ERC-4337", category: "Blockchain", icon: "erc4337" },
  { name: "ERC-721", category: "Blockchain", icon: "erc721" },
  { name: "Smart Contracts", category: "Blockchain", icon: "contract" },
  { name: "Ethers.js", category: "Blockchain", icon: "ethers" },
];

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend & DB",
  "Blockchain",
  "Tools",
];
