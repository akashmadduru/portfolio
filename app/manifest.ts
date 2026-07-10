import type { MetadataRoute } from "next";

import { profile } from "@/lib/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Software Engineer`,
    short_name: profile.name,
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a12",
    theme_color: "#0a0a12",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
