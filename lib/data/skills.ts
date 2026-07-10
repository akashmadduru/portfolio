import {
  Blocks,
  Boxes,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Accent used for the cluster glow — an aurora token key. */
  accent: "aurora-1" | "aurora-2" | "aurora-3" | "aurora-4";
  blurb: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    accent: "aurora-1",
    blurb: "The tools I reach for to model any problem.",
    skills: ["TypeScript", "JavaScript", "Java", "Python", "Dart", "SQL", "Solidity"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: Layers,
    accent: "aurora-3",
    blurb: "Interfaces that are fast, accessible, and delightful.",
    skills: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Boxes,
    accent: "aurora-2",
    blurb: "APIs and services built for correctness and scale.",
    skills: ["Node.js", "Express", "Spring Boot", "Flask", "GraphQL", "REST", "gRPC"],
  },
  {
    id: "cloud",
    title: "Cloud",
    icon: Cloud,
    accent: "aurora-4",
    blurb: "Cloud-native from day one.",
    skills: ["AWS", "GCP", "Serverless", "Lambda", "S3", "CloudFront", "Vercel"],
  },
  {
    id: "devops",
    title: "DevOps",
    icon: GitBranch,
    accent: "aurora-1",
    blurb: "Ship safely, ship often.",
    skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Terraform", "Nginx", "Linux"],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: Smartphone,
    accent: "aurora-3",
    blurb: "Cross-platform apps from a single codebase.",
    skills: ["Flutter", "React Native", "Android", "iOS", "Push / FCM"],
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Blocks,
    accent: "aurora-2",
    blurb: "Systems designed to evolve, not rot.",
    skills: [
      "Microservices",
      "Event-Driven",
      "System Design",
      "DDD",
      "Caching",
      "Observability",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    accent: "aurora-4",
    blurb: "The right store for the right access pattern.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "Prisma"],
  },
];

/** Flat list for the ambient floating-node background graph. */
export const skillNodes = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ skill, category: category.id, accent: category.accent })),
);
