"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";

import { AuroraBackground } from "@/components/motion/aurora-background";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";
import { socials } from "@/lib/data/socials";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
});

/* Rotating role headline */
function RoleRotator() {
  const [index, setIndex] = React.useState(0);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <span className="text-gradient">{profile.roles[0]}</span>;
  }

  return (
    <span className="relative inline-block h-[1.15em] w-full overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 aurora-text"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const lenis = useLenis();

  React.useEffect(() => setMounted(true), []);

  const scrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <AuroraBackground />
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* 3D scene (desktop, motion-ok) or static glow fallback */}
        <div className="absolute inset-0">
          {mounted && !reduced ? (
            <HeroCanvas />
          ) : (
            <div className="absolute right-0 top-1/2 size-[70vw] max-w-[720px] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary/20 blur-[120px]" />
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-foreground/70 backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.div>

          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl md:text-[5.25rem]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {profile.firstName}{" "}
              <span className="text-gradient">{profile.lastName}</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 block text-3xl font-medium sm:text-5xl md:text-6xl"
            >
              <RoleRotator />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button variant="aurora" size="lg" onClick={scrollToProjects}>
                View Projects
                <ArrowDown className="size-4" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" size="lg" asChild>
                <a href={profile.resumeUrl} download>
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost" size="lg" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  Contact
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-foreground/40">
              Find me
            </span>
            <div className="h-px w-8 bg-white/15" />
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-foreground"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/40 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.22em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-primary"
          />
        </span>
      </motion.a>
    </section>
  );
}
