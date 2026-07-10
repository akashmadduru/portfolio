export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  detail: string;
}

export const education: EducationItem[] = [
  {
    degree: "MCA",
    field: "Master of Computer Applications",
    institution: "Andhra Loyola College",
    period: "2018 — 2021",
    detail:
      "Advanced study of software engineering, distributed systems, databases, and algorithms — the foundation for building production-scale systems.",
  },
  {
    degree: "BCA",
    field: "Bachelor of Computer Applications",
    institution: "P.B. Siddhartha Arts & Science College",
    period: "2015 — 2018",
    detail:
      "Core computer science: data structures, operating systems, networks, and full-stack web development fundamentals.",
  },
];
