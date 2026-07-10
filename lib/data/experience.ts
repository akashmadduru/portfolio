export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

/**
 * Work history. Copy is written from Akash's real roles; refine the metrics
 * and dates to match your resume exactly.
 */
export const experiences: ExperienceItem[] = [
  {
    company: "FactSet",
    role: "Software Engineer II",
    period: "2023 — Present",
    location: "Hyderabad, India",
    summary:
      "Building and maintaining enterprise-grade financial software used by analysts and portfolio managers worldwide, with a focus on reliability, testability, and clean architecture.",
    highlights: [
      "Own end-to-end feature delivery across enterprise services — from design docs to production rollout.",
      "Drive code quality through rigorous code reviews and by mentoring junior engineers.",
      "Champion automated testing and documentation to keep long-lived systems maintainable.",
      "Operate in a fast-moving Agile team, breaking down ambiguous requirements into shippable increments.",
    ],
    stack: ["Java", "Spring", "TypeScript", "React", "REST", "CI/CD", "Agile"],
  },
  {
    company: "Mivada Technologies",
    role: "Associate IT Consultant",
    period: "2022 — 2023",
    location: "Hyderabad, India",
    summary:
      "Delivered secure backend services for the Western Sydney Airport program, implementing authentication, authorization, and production support for mission-critical systems.",
    highlights: [
      "Engineered secure Spring Boot services for the Western Sydney Airport card-management platform.",
      "Implemented robust authentication & authorization with Spring Security (RBAC, JWT).",
      "Provided production support and incident response for infrastructure-critical services.",
      "Collaborated with cross-functional teams to meet strict compliance and security requirements.",
    ],
    stack: [
      "Spring Boot",
      "Spring Security",
      "Java",
      "PostgreSQL",
      "REST",
      "OAuth2 / JWT",
    ],
  },
  {
    company: "Axlr Data",
    role: "Full Stack Developer",
    period: "2021 — 2022",
    location: "Hyderabad, India",
    summary:
      "Built custom eCommerce experiences end-to-end — from storefront UI to payment integrations — with a relentless focus on conversion and page performance.",
    highlights: [
      "Designed and shipped custom eCommerce platforms tailored to client catalogs and workflows.",
      "Integrated multiple payment gateways with secure, PCI-aware checkout flows.",
      "Cut page load times and improved Core Web Vitals through targeted performance optimization.",
      "Translated design mockups into responsive, accessible, pixel-accurate interfaces.",
    ],
    stack: ["React", "Node.js", "Express", "Stripe", "MongoDB", "Tailwind CSS"],
  },
  {
    company: "Artemis Network",
    role: "Software Engineer",
    period: "2020 — 2021",
    location: "Bangalore, India",
    summary:
      "Full-spectrum product engineering across web, mobile, and blockchain — building DApps and APIs with whichever framework best fit the problem.",
    highlights: [
      "Built web front-ends across React, Vue, and Angular based on product needs.",
      "Developed backend APIs in Flask and Express, including GraphQL schemas.",
      "Shipped cross-platform mobile apps with Flutter.",
      "Implemented blockchain integrations and smart-contract-backed DApp features.",
    ],
    stack: [
      "React",
      "Vue",
      "Angular",
      "Flask",
      "Express",
      "Flutter",
      "GraphQL",
      "Solidity",
    ],
  },
];
