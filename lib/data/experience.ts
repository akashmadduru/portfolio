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
    period: "2026 May — Present",
    location: "Hyderabad, India",
    summary:
      "Building and maintaining enterprise-grade financial software used by analysts and portfolio managers worldwide, with a focus on reliability, testability, and clean architecture.",
    highlights: [
      "Enhanced and maintained enterprise applications by delivering new features, resolving production defects, and refactoring legacy components to improve stability and performance.",
      "Leveraged AI-assisted development tools to accelerate implementation, debugging, code reviews, and developer productivity.",
      "Built a Vitest-based unit testing PoC and championed Test-Driven Development (TDD), achieving 72% unit test coverage and significantly reducing regression defects.",
      "Mentored engineers through code reviews, promoting clean architecture, coding standards, and maintainable software design.",
      "Partnered with Product Owners and cross-functional teams in a Scrum Agile environment using Jira to ship high-quality features on schedule.",
    ],
    stack: ["Python", "FastAPI", "TypeScript", "Vue", "Vitest", "CI/CD", "Jira", "Agile"],
  },
  {
    company: "Mivada Technologies",
    role: "Associate IT Consultant",
    period: "2024 Sep — 2026 Apr",
    location: "Hyderabad, India",
    summary:
      "Delivered secure backend services and led a major frontend modernization for the Western Sydney Airport program, spanning authentication, authorization, and production support for mission-critical systems.",
    highlights: [
      "Led backend development of the Western Sydney Airport Card Management System using Spring Boot, Spring Security, and OAuth2.",
      "Refactored the legacy codebase, improving application performance by up to 60% while significantly enhancing scalability and maintainability.",
      "Migrated 65% of the frontend from the Vue Options API to the Composition API, improving modularity, code reuse, and developer productivity.",
      "Built a unit testing PoC that increased deployment reliability and contributed to a 90%+ deployment success rate.",
      "Optimized multi-provider OAuth2 authentication, strengthening security and streamlining user authentication.",
      "Resolved critical P1/P2 production incidents, maintaining high system availability and rapid issue resolution.",
    ],
    stack: [
      "Spring Boot",
      "Spring Security",
      "Java",
      "PostgreSQL",
      "REST",
      "OAuth2 / JWT",
      "Vue",
    ],
  },
  {
    company: "Axlr Data",
    role: "Full Stack Developer",
    period: "2024 Mar — 2024 Jul",
    location: "Hyderabad, India",
    summary:
      "Built custom eCommerce experiences end-to-end — from storefront UI to payment integrations — with a relentless focus on conversion and page performance.",
    highlights: [
      "Designed and shipped custom eCommerce platforms tailored to client catalogs and workflows.",
      "Integrated multiple payment gateways with secure, PCI-aware checkout flows.",
      "Cut page load times and improved Core Web Vitals through targeted performance optimization.",
      "Translated design mockups into responsive, accessible, pixel-accurate interfaces.",
    ],
    stack: ["NextJS", "Node.js", "Express", "Razorpay", "MongoDB", "Postgres", "Tailwind CSS"],
  },
  {
    company: "Artemis Network",
    role: "Software Engineer",
    period: "2021 Sep — 2024 Feb",
    location: "Bangalore, India",
    summary:
      "Full-spectrum product engineering across web, mobile, and blockchain — leading AxleGames end-to-end and building RenderVerse, an AI-tools platform, alongside a high-performance Flutter NFT marketplace.",
    highlights: [
      "Led end-to-end development of the AxleGames platform — from architecture through production deployment.",
      "Shipped 5+ interactive games with leaderboards, automated contests, user profiles, and social features, driving user engagement and retention.",
      "Built RenderVerse, an AI-powered platform unifying 6+ AI tools into a single workspace for content generation, automation, and productivity.",
      "Engineered AI-powered chatbots and real-time messaging features that improved customer support and user interaction.",
      "Built a high-performance, cross-platform NFT Marketplace in Flutter, delivering a smooth 60 FPS experience on Android and iOS.",
      "Designed and built scalable RESTful and GraphQL APIs in Python Flask and Express.js, powering web, mobile, and blockchain applications.",
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
