import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: LucideIcon;
}

/**
 * ─────────────────────────────────────────────────────────────
 *  CONTACT / SOCIAL LINKS  —  EDIT ME
 *  These are placeholders. Replace the URLs, email, and phone
 *  with your real details. Everything on the site reads from here.
 * ─────────────────────────────────────────────────────────────
 */
export const contact = {
  email: "akashmadduru@gmail.com",
  phone: "+91 9494535327",
  phoneHref: "tel:+919494535327",
  location: "Hyderabad, India",
  // TODO: replace with your real profile URLs
  githubUrl: "https://github.com/akashmadduru",
  linkedinUrl: "https://www.linkedin.com/in/akashmrc98",
} as const;

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: contact.linkedinUrl,
    handle: "in/akashmrc98",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: contact.githubUrl,
    handle: "@akashmrc98",
    icon: Github,
  },
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    handle: contact.email,
    icon: Mail,
  },
];
