export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  overview: string;
  architecture: string;
  techStack: string[];
  challenges: string[];
  results: ProjectMetric[];
  /** Delivery timeline for the case study. */
  timeline: string;
  /** Business impact statement. */
  impact: string;
  /** Two CSS colors used to tint the art-directed project artwork. */
  gradient: [string, string];
  featured?: boolean;
  githubUrl: string; // TODO: replace with real repo
  liveUrl: string; // TODO: replace with real demo (or "" to hide)
}

/**
 * Case studies. Architecture write-ups and metrics are realistic placeholders
 * drawn from Akash's experience — tune the numbers and links to reality.
 */
export const projects: Project[] = [
  {
    id: "airport-card-management",
    title: "Airport Card Management System",
    category: "Enterprise · Infrastructure",
    year: "2023",
    tagline:
      "Secure access-card lifecycle platform for the Western Sydney Airport program.",
    overview:
      "A mission-critical system for issuing, provisioning, and revoking secure access cards across airport zones. Built for strict compliance, full auditability, and 24/7 availability for infrastructure-critical operations.",
    architecture:
      "Spring Boot microservices behind an API gateway, with Spring Security (OAuth2 + RBAC) guarding every endpoint. PostgreSQL as the system of record with an append-only audit log; role-scoped workflows for issuance and revocation; and health checks wired into production monitoring for rapid incident response.",
    techStack: [
      "Spring Boot",
      "Spring Security",
      "Java",
      "PostgreSQL",
      "OAuth2 / JWT",
      "REST",
      "Docker",
    ],
    challenges: [
      "Meeting airport-grade security & compliance without slowing down operators.",
      "Designing an immutable audit trail for every card lifecycle event.",
      "Guaranteeing availability for infrastructure-critical access control.",
    ],
    results: [
      { value: "100%", label: "Auditable card events" },
      { value: "RBAC", label: "Fine-grained access control" },
      { value: "24/7", label: "Production availability" },
    ],
    timeline: "8 months · 2023",
    impact:
      "Delivered compliant, fully auditable access control for a national-infrastructure airport program — trusted for round-the-clock operations.",
    gradient: ["#c9962f", "#6f7bd6"],
    featured: true,
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
  {
    id: "enterprise-auth-platform",
    title: "Enterprise Authentication Platform",
    category: "Backend · Security",
    year: "2023",
    tagline: "Centralized identity, SSO, and authorization for enterprise services.",
    overview:
      "A reusable authentication & authorization layer that standardizes login, token issuance, and role management across a suite of enterprise applications — removing bespoke, error-prone auth code from every service.",
    architecture:
      "A dedicated auth service issuing short-lived JWTs with refresh rotation, backed by Spring Security. Centralized RBAC/ABAC policy evaluation, stateless verification at the edge, and Redis-backed token/session caching for low-latency checks. Clean, documented client SDKs for downstream teams.",
    techStack: ["Spring Security", "Java", "JWT", "Redis", "PostgreSQL", "OAuth2", "REST"],
    challenges: [
      "Unifying inconsistent auth patterns across many legacy services.",
      "Balancing token security (short TTLs) with a smooth user experience.",
      "Keeping authorization checks sub-millisecond under load.",
    ],
    results: [
      { value: "-60%", label: "Auth-related boilerplate" },
      { value: "<5ms", label: "Token verification" },
      { value: "SSO", label: "Across all services" },
    ],
    timeline: "6 months · 2023",
    impact:
      "Standardized identity across the enterprise, cutting auth-related defects and letting new services ship secure login in days, not weeks.",
    gradient: ["#b98a37", "#7c5cff"],
    featured: true,
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
  {
    id: "custom-ecommerce",
    title: "Custom eCommerce Platform",
    category: "Full Stack · Retail",
    year: "2022",
    tagline: "Bespoke storefront with real payment flows and performance-first UX.",
    overview:
      "An end-to-end eCommerce platform tailored to a client's catalog and fulfillment workflow — product discovery, cart, secure checkout, and order management — engineered to convert and to load fast on any device.",
    architecture:
      "React storefront with a Node/Express API and MongoDB catalog. Multiple payment gateways integrated behind a unified checkout abstraction, server-side rendering for SEO-critical pages, image optimization, and aggressive caching to keep Core Web Vitals green.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
    challenges: [
      "Integrating several payment providers behind one secure checkout flow.",
      "Hitting green Core Web Vitals on image-heavy catalog pages.",
      "Modeling flexible product/variant data for diverse client catalogs.",
    ],
    results: [
      { value: "+35%", label: "Faster page loads" },
      { value: "3+", label: "Payment gateways" },
      { value: "95+", label: "Lighthouse performance" },
    ],
    timeline: "5 months · 2022",
    impact:
      "Lifted conversion and repeat purchases through a faster, smoother checkout that performs on any device.",
    gradient: ["#cf9a3a", "#3fb6c9"],
    featured: true,
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
  {
    id: "crypto-dapp",
    title: "Crypto DApp",
    category: "Web3 · Blockchain",
    year: "2021",
    tagline: "Smart-contract-backed decentralized app with a polished Web3 UX.",
    overview:
      "A decentralized application connecting a modern web front-end to on-chain smart contracts — wallet auth, transaction flows, and live on-chain state — making crypto interactions approachable and trustworthy.",
    architecture:
      "React + ethers.js front-end talking to Solidity smart contracts, with wallet-based authentication and optimistic UI for pending transactions. An indexer/subgraph surfaces on-chain events, and a thin API caches read-heavy queries for responsiveness.",
    techStack: ["React", "Solidity", "ethers.js", "Web3", "GraphQL", "Node.js"],
    challenges: [
      "Designing UX around irreversible, latency-prone on-chain transactions.",
      "Handling wallet connection edge cases and network switching.",
      "Indexing on-chain events for fast, readable UI state.",
    ],
    results: [
      { value: "On-chain", label: "Wallet-native auth" },
      { value: "Real-time", label: "Transaction status UX" },
      { value: "0", label: "Custody of user funds" },
    ],
    timeline: "4 months · 2021",
    impact:
      "Made on-chain interactions approachable and trustworthy, growing active wallets with zero custody of user funds.",
    gradient: ["#d98a4e", "#a15cff"],
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
  {
    id: "flutter-app",
    title: "Cross-Platform Flutter App",
    category: "Mobile",
    year: "2021",
    tagline: "One codebase, native-feeling apps on iOS and Android.",
    overview:
      "A cross-platform mobile application delivering a single, polished experience across iOS and Android — with offline support, push notifications, and smooth 60fps interactions.",
    architecture:
      "Flutter with a clean, layered architecture (presentation / domain / data), state management for predictable UI, REST integration with local caching for offline-first behavior, and push notifications via FCM.",
    techStack: ["Flutter", "Dart", "REST", "FCM", "SQLite"],
    challenges: [
      "Achieving native look-and-feel on both platforms from one codebase.",
      "Building reliable offline-first sync.",
      "Keeping interactions at a smooth 60fps.",
    ],
    results: [
      { value: "1", label: "Codebase, 2 platforms" },
      { value: "60fps", label: "Smooth interactions" },
      { value: "Offline", label: "First-class support" },
    ],
    timeline: "4 months · 2021",
    impact:
      "Reached both app stores from a single codebase, roughly halving mobile delivery time and maintenance cost.",
    gradient: ["#c9962f", "#3fb6c9"],
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
  {
    id: "microservices-platform",
    title: "Microservices Platform",
    category: "Architecture · Cloud-Native",
    year: "2023",
    tagline: "Event-driven services with observability and safe, frequent deploys.",
    overview:
      "A cloud-native platform decomposing a monolith into independently deployable, event-driven services — improving scalability, team autonomy, and deploy frequency without sacrificing reliability.",
    architecture:
      "Containerized services orchestrated on Kubernetes, communicating via REST and an async message bus. An API gateway handles routing and auth; centralized logging, metrics, and tracing provide observability; and CI/CD pipelines enable safe, frequent releases with health-gated rollouts.",
    techStack: [
      "Kubernetes",
      "Docker",
      "Spring Boot",
      "Node.js",
      "Kafka",
      "CI/CD",
      "Observability",
    ],
    challenges: [
      "Decomposing a monolith without a big-bang rewrite.",
      "Maintaining data consistency across service boundaries.",
      "Making the distributed system observable and debuggable.",
    ],
    results: [
      { value: "+40%", label: "Deploy frequency" },
      { value: "Independent", label: "Service scaling" },
      { value: "Traced", label: "End-to-end requests" },
    ],
    timeline: "7 months · 2023",
    impact:
      "Unlocked independent team velocity and safer, more frequent releases — scaling delivery without scaling risk.",
    gradient: ["#b98a37", "#6f7bd6"],
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    category: "Creative · Frontend",
    year: "2026",
    tagline: "An immersive 3D portfolio engineered for 60fps and Lighthouse 95+.",
    overview:
      "The site you're looking at — a cinematic, accessibility-first portfolio built to feel like a product, not a résumé. Interactive 3D, premium motion, and performance budgets held throughout.",
    architecture:
      "Next.js 15 App Router with React 19 and TypeScript. React Three Fiber powers the hero scene (lazy-loaded, DPR-capped, reduced-motion aware). Framer Motion + GSAP drive interactions, Lenis handles smooth scroll, and Tailwind v4 provides the design system — all code-split for a fast LCP.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "React Three Fiber",
      "Framer Motion",
      "Tailwind CSS v4",
    ],
    challenges: [
      "Delivering rich 3D while keeping Lighthouse ≥ 95 and CLS ~0.",
      "Making every animation degrade gracefully under reduced-motion.",
      "Keeping the whole experience keyboard-accessible and WCAG AA.",
    ],
    results: [
      { value: "95+", label: "Target Lighthouse" },
      { value: "60fps", label: "Animation budget" },
      { value: "WCAG AA", label: "Accessibility" },
    ],
    timeline: "2026 · ongoing",
    impact:
      "A living proof-of-craft that turns recruiter visits into conversations — the medium is the case study.",
    gradient: ["#cf9a3a", "#d98aa8"],
    githubUrl: "https://github.com/akashmadduru",
    liveUrl: "",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
