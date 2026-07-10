"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";
import { socials } from "@/lib/data/socials";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
});

function RoleRotator() {
  const [index, setIndex] = React.useState(0);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) return <span className="aurora-text">{profile.roles[0]}</span>;

  return (
    <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="aurora-text whitespace-nowrap"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Small engraved corner registration mark (technical-product detail). */
function Tick({ className }: { className?: string }) {
  return (
    <span aria-hidden className={className}>
      <span className="absolute h-4 w-px bg-white/15" />
      <span className="absolute h-px w-4 bg-white/15" />
    </span>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const lenis = useLenis();
  const heroRef = React.useRef<HTMLElement>(null);
  const progress = React.useRef(0);

  React.useEffect(() => setMounted(true), []);

  // GSAP ScrollTrigger drives the hero scroll progress (scrub: true) into a ref.
  // R3F reads the ref inside useFrame → no React re-renders during the animation.
  React.useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    // Keep ScrollTrigger in sync with Lenis' smoothed scroll.
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis?.off("scroll", onScroll);
      trigger.kill();
    };
  }, [lenis]);

  const goTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Restrained machined backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 dot-matrix opacity-40" />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl grid-rows-[auto_1fr_auto] gap-4 px-5 pt-28 pb-10 sm:px-8">
        {/* ── Top: identity ─────────────────────────────────────── */}
        <header className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55 engraved">
              <span className="size-1.5 rounded-full bg-primary breathe signal-dot" />
              Portfolio · 2026
            </span>
            {profile.availability ? (
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45 sm:inline">
                {profile.availability}
              </span>
            ) : null}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[3.2rem] font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-[5rem]"
          >
            <span className="block text-foreground">{profile.firstName}</span>
            <span className="block text-gradient">{profile.lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-3 font-display text-xl font-medium sm:text-2xl"
          >
            <RoleRotator />
          </motion.p>
        </header>

        {/* ── Stage: the model, content flanking it ─────────────── */}
        <div className="relative min-h-[96svh]">
          {/* 3D model / static fallback */}
          <div className="absolute inset-0">
            {mounted && !reduced ? (
              <HeroCanvas scrollProgress={progress} />
            ) : (
              <div className="grid h-full place-items-center">
                <div className="relative size-56 rounded-full">
                  <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl" />
                  <div className="absolute inset-6 rounded-full border border-white/10 panel" />
                  <div className="absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
                    scene.gltf
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* corner registration ticks */}
          <Tick className="pointer-events-none absolute left-0 top-0 hidden md:block" />
          <Tick className="pointer-events-none absolute right-0 top-0 hidden md:block" />
          <Tick className="pointer-events-none absolute bottom-0 left-0 hidden md:block" />
          <Tick className="pointer-events-none absolute bottom-0 right-0 hidden md:block" />

          {/* left engraved label */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/30 lg:block"
          >
            Full-Stack · Cloud-Native
          </span>

          {/* right spec plate */}
          <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="panel-soft w-40 rounded-lg p-3 font-mono text-[10px] uppercase tracking-wider text-foreground/50">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Exp</span>
                <span className="text-foreground/75">{profile.yearsExperience}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-1.5">
                <span>Base</span>
                <span className="text-foreground/75">Hyderabad</span>
              </div>
              <div className="flex justify-between pt-1.5">
                <span>Status</span>
                <span className="inline-flex items-center gap-1 text-foreground/75">
                  <span className="size-1.5 rounded-full bg-primary breathe" /> Open
                </span>
              </div>
            </div>
          </div>

          {/* pedestal line */}
          <div
            aria-hidden
            className="absolute inset-x-8 bottom-3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>

        {/* ── Bottom: pitch + actions ───────────────────────────── */}
        <footer className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground text-balance"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.4}>
              <Button variant="aurora" size="lg" onClick={() => goTo("#projects")}>
                View Projects
                <ArrowDownRight className="size-4" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button variant="outline" size="lg" asChild>
                <a href={profile.resumeUrl} download>
                  <Download className="size-4" />
                  Résumé
                </a>
              </Button>
            </Magnetic>
            <Button variant="ghost" size="lg" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="size-4" />
                Contact
              </a>
            </Button>

            <div className="ml-auto flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="btn-metal grid size-10 place-items-center rounded-full text-foreground/75"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </footer>
      </div>
    </section>
  );
}
