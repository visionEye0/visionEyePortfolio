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
    title: "Nebula Analytics",
    description:
      "Real-time observability platform processing 2M+ events per second with sub-second query latency.",
    tags: ["React", "Go", "ClickHouse", "Kafka"],
    accent: "from-violet-500 to-indigo-600",
    year: "2025",
    link: "#",
    glow: "group-hover:shadow-violet-500/30",
  },
  {
    title: "Pulse API Gateway",
    description:
      "Edge-native API gateway with automatic rate limiting, auth, and 99.99% uptime across 30 regions.",
    tags: ["Rust", "gRPC", "Redis", "K8s"],
    accent: "from-sky-500 to-cyan-400",
    year: "2024",
    link: "#",
    glow: "group-hover:shadow-sky-500/30",
  },
  {
    title: "Aurora IDE",
    description:
      "Collaborative cloud IDE with AI pair-programming, built for speed with a WebGL renderer.",
    tags: ["TypeScript", "WebGL", "WebRTC", "CRDTs"],
    accent: "from-emerald-500 to-teal-400",
    year: "2024",
    link: "#",
    glow: "group-hover:shadow-emerald-500/30",
  },
  {
    title: "Hyperledger Pay",
    description:
      "Zero-fee crypto payment rails using layer-2 rollups, settling 50k transactions per minute.",
    tags: ["Solidity", "Node.js", "Postgres", "AWS"],
    accent: "from-amber-500 to-orange-500",
    year: "2023",
    link: "#",
    glow: "group-hover:shadow-amber-500/30",
  },
  {
    title: "Synth Voice",
    description:
      "Ultra-low-latency neural TTS engine serving natural-sounding speech in 40+ languages.",
    tags: ["Python", "PyTorch", "Triton", "CUDA"],
    accent: "from-fuchsia-500 to-pink-500",
    year: "2023",
    link: "#",
    glow: "group-hover:shadow-fuchsia-500/30",
  },
  {
    title: "Orbit CI/CD",
    description:
      "Deterministic build pipeline with remote caching that cut deploy times by 94%.",
    tags: ["Go", "Bazel", "gRPC", "Docker"],
    accent: "from-rose-500 to-red-500",
    year: "2022",
    link: "#",
    glow: "group-hover:shadow-rose-500/30",
  },
];

export type Skill = {
  name: string;
  level: number;
  color: string;
};

export const skills: Skill[] = [
  { name: "TypeScript / JavaScript", level: 95, color: "from-violet-400 to-indigo-400" },
  { name: "React / Next.js", level: 92, color: "from-sky-400 to-cyan-400" },
  { name: "Go", level: 88, color: "from-emerald-400 to-teal-400" },
  { name: "Rust", level: 80, color: "from-amber-400 to-orange-400" },
  { name: "Node.js / GraphQL", level: 90, color: "from-fuchsia-400 to-pink-400" },
  { name: "PostgreSQL / Redis", level: 85, color: "from-blue-400 to-indigo-400" },
  { name: "Docker / Kubernetes", level: 87, color: "from-cyan-400 to-blue-400" },
  { name: "Python / ML", level: 78, color: "from-rose-400 to-red-400" },
];

export const marqueeItems = [
  "TypeScript", "React", "Next.js", "Node.js", "Go", "Rust",
  "PostgreSQL", "GraphQL", "Docker", "Kubernetes", "Redis", "Tailwind",
  "AWS", "Terraform", "Python", "WebGL",
];
