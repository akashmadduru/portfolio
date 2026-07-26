import { profile } from "@/lib/data/profile";
import { contact } from "@/lib/data/socials";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akashmadduru.in";

/** Person + ProfilePage structured data for rich search results. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.roles[0],
      description: profile.tagline,
      email: `mailto:${contact.email}`,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressCountry: "IN",
      },
      sameAs: [contact.linkedinUrl, contact.githubUrl],
      knowsAbout: [
        "Software Engineering",
        "Cloud-Native Development",
        "Backend Architecture",
        "System Design",
        "Full Stack Development",
        "Blockchain",
      ],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Andhra Loyola College" },
        { "@type": "CollegeOrUniversity", name: "P.B. Siddhartha Arts & Science College" },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
