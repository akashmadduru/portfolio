import { contact } from "./socials";

export const profile = {
  name: "Akash Madduru",
  firstName: "Akash",
  lastName: "Madduru",
  roles: ["Full Stack Engineer", "Software Engineer II"],
  tagline:
    "I build resilient systems and interfaces that feel effortless — across enterprise, eCommerce, AI, blockchain, and fintech.",
  // Path to your resume in /public. Replace public/resume.pdf with your real file.
  resumeUrl: "/akash_madduru_resume.pdf",
  location: contact.location,
  email: contact.email,
  // availability: "Open to senior & staff engineering roles",
  availability: "",
  yearsExperience: "5+",

  /** Narrative intro (About section) — story, not a bio. */
  narrative: [
    "For the past 5+ years I've lived at the seam where reliability meets craft — designing and building scalable web and mobile products across enterprise, eCommerce, AI, blockchain, and fintech domains.",
    "I've worked on production financial software at FactSet, led secure backend systems for a national-infrastructure airport program, and modernized legacy systems for performance gains of up to 60% — while championing Test-Driven Development and mentoring engineers along the way.",
    "My motto is simple — engineer systems that are correct, observable, and fast, then wrap them in experiences people actually enjoy using.",
  ],

  /** Headline metrics for the About section. */
  stats: [
    { value: "5+", label: "Years of experience", suffix: "" },
    { value: "60", label: "Legacy performance improvement", suffix: "%" },
    { value: "72", label: "Unit test coverage achieved", suffix: "%" },
    { value: "90", label: "Deployment success rate", suffix: "%+" },
  ],

  /** Domains / focus chips used across About. */
  focus: [
    "Enterprise Systems",
    "Fintech",
    "eCommerce",
    "AI-Assisted Engineering",
    "Blockchain & Web3",
    "Backend Engineering",
    "Frontend Architecture",
    "System Design",
  ],
} as const;

export type Profile = typeof profile;
