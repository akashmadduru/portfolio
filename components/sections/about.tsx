"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";

import { Avatar3D } from "@/components/sections/avatar-3d";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { profile } from "@/lib/data/profile";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const target = parseFloat(value);
  const decimals = value.includes(".") ? 1 : 0;
  const [display, setDisplay] = React.useState(reduced ? value : "0");

  React.useEffect(() => {
    if (!inView || reduced || Number.isNaN(target)) {
      if (Number.isNaN(target)) setDisplay(value);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay((eased * target).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, decimals, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          {/* Section Heading */}
          <div className="flex-1 min-w-0">
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  Engineering systems that are{" "}
                  <span className="text-gradient">correct, fast, and felt.</span>
                </>
              }
            />
          </div>

          {/* Avatar - next to heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="hidden lg:block flex-shrink-0"
          >
            <Spotlight className="rounded-full">
              <div className="panel rounded-full p-1">
                <Avatar3D />
              </div>
            </Spotlight>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            {profile.narrative.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-foreground/75">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-2 pt-3">
                {profile.focus.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {profile.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <Spotlight className="h-full rounded-2xl">
                  <div className="panel flex h-full flex-col justify-between rounded-2xl p-5">
                    <span className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-3 text-sm leading-snug text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
