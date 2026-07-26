import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { CursorGlow } from "@/components/layout/cursor-glow";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/lib/data/profile";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akashmadduru.in";
const description =
  "Akash Madduru — Software Engineer & Cloud-Native Developer with 5+ years building enterprise systems, crypto DApps, and high-performance eCommerce. Full-stack, backend architecture, and system design.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Akash Madduru",
    "Software Engineer",
    "Full Stack Engineer",
    "Cloud-Native Developer",
    "Backend Architect",
    "System Design",
    "React",
    "Next.js",
    "Spring Boot",
    "Blockchain",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — Software Engineer`,
    description,
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Engineer`,
    description,
    creator: "@akashmadduru",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} noise antialiased`}
      >
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
