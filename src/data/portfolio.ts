export type Project = {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  year: string;
  link: string;
  glow: string;
};

export const projects: Project[] = [
  {
    title: "Ashan AI",
    description: "Multimodal AI assistant providing real-time support in 10+ regional languages. Uses Gemini 2.5 Flash-Lite.",
    tags: ["React Native", "Python", "Flask", "Gemini AI"],
    accent: "from-violet-500 to-indigo-600",
    year: "2024",
    link: "#",
    glow: "group-hover:shadow-violet-500/30",
  },
  {
    title: "Delulu-Dex",
    description: "Automated market maker DEX built from scratch with Solidity implementing the x*y=k formula.",
    tags: ["Solidity", "Web3", "OpenZeppelin", "React"],
    accent: "from-sky-500 to-cyan-400",
    year: "2023",
    link: "https://github.com/visionEye0/Delulu-Dex",
    glow: "group-hover:shadow-sky-500/30",
  },
  {
    title: "Vendor Heatmap (Potafo)",
    description: "Real-time order analytics and vendor heatmap system for high-demand zones.",
    tags: ["FastAPI", "MapLibre GL JS", "React", "Python"],
    accent: "from-emerald-500 to-teal-400",
    year: "2025",
    link: "#",
    glow: "group-hover:shadow-emerald-500/30",
  }
];

export type Skill = {
  name: string;
  level: number;
  color: string;
};

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95, color: "from-sky-400 to-cyan-400" },
  { name: "FastAPI / Python", level: 92, color: "from-emerald-400 to-teal-400" },
  { name: "TypeScript / JavaScript", level: 90, color: "from-violet-400 to-indigo-400" },
  { name: "Node.js / Express", level: 88, color: "from-fuchsia-400 to-pink-400" },
  { name: "Docker / CI/CD", level: 85, color: "from-blue-400 to-indigo-400" },
  { name: "Penetration Testing", level: 85, color: "from-rose-400 to-red-400" },
  { name: "Django", level: 80, color: "from-amber-400 to-orange-400" },
  { name: "Linux / VPS", level: 80, color: "from-cyan-400 to-blue-400" },
];

export const marqueeItems = [
  "TypeScript", "React", "Next.js", "Node.js", "FastAPI", "Python",
  "Tailwind", "Docker", "CI/CD", "Security", "Pen Testing",
  "AI", "Gemini", "MapLibre", "Git", "Agile"
];
