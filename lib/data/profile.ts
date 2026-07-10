import { contact } from "./socials";

export const profile = {
  name: "Akash Madduru",
  firstName: "Akash",
  lastName: "Madduru",
  roles: [
    "Software Engineer",
    "Full Stack Engineer",
    "Cloud-Native Developer",
    "Backend Architect",
  ],
  tagline:
    "I build resilient, cloud-native systems and interfaces that feel effortless — from enterprise platforms to crypto and eCommerce.",
  // Path to your resume in /public. Replace public/resume.pdf with your real file.
  resumeUrl: "/resume.pdf",
  location: contact.location,
  email: contact.email,
  availability: "Open to senior & staff engineering roles",
  yearsExperience: "4.5+",

  /** Narrative intro (About section) — story, not a bio. */
  narrative: [
    "For the past 4.5+ years I've lived at the seam where reliability meets craft — designing enterprise systems that thousands depend on, then obsessing over the millisecond details that make them feel instant.",
    "I've shipped across the stack and across domains: production financial software at scale, secure authentication for critical infrastructure, custom eCommerce with real payment flows, and blockchain DApps at the frontier of crypto.",
    "My north star is simple — engineer systems that are correct, observable, and fast, then wrap them in experiences people actually enjoy using.",
  ],

  /** Headline metrics for the About section. */
  stats: [
    { value: "4.5+", label: "Years of experience", suffix: "" },
    { value: "20", label: "Production systems shipped", suffix: "+" },
    { value: "40", label: "Avg. latency reduction", suffix: "%" },
    { value: "4", label: "Domains: fintech, crypto, cloud, retail", suffix: "" },
  ],

  /** Domains / focus chips used across About. */
  focus: [
    "Enterprise Systems",
    "Crypto & Blockchain",
    "eCommerce",
    "Cloud-Native Development",
    "Backend Engineering",
    "Frontend Architecture",
    "Mobile Development",
    "Performance Optimization",
    "System Design",
  ],
} as const;

export type Profile = typeof profile;
