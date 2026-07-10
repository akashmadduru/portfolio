export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Contact", href: "#contact", id: "contact" },
];

/** Ordered ids used by the scroll-spy (includes hero). */
export const sectionIds = ["home", ...navItems.map((item) => item.id)];
