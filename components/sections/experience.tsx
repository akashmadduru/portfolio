"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import * as React from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { Badge } from "@/components/ui/badge";
import { experiences, type ExperienceItem } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <Spotlight className="rounded-2xl">
      <article className="panel lift rounded-2xl p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/25">
                <Briefcase className="size-4" />
              </span>
              <h3 className="font-display text-xl font-semibold">{exp.company}</h3>
            </div>
            <p className="mt-2 text-base font-medium text-foreground/80">{exp.role}</p>
          </div>
          <div className="text-right">
            <Badge className="border-primary/25 bg-primary/10 text-primary">{exp.period}</Badge>
            <p className="mt-2 text-xs text-muted-foreground">{exp.location}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {exp.highlights.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {exp.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-foreground/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>
    </Spotlight>
  );
}

export function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              A track record across <span className="text-gradient">fintech, cloud & crypto.</span>
            </>
          }
          description="Four roles, one throughline: shipping reliable software that scales — and lifting the teams around me."
        />

        {/* Timeline. Axis: left rail on mobile, dead-center on md+. The rail,
            the animated fill, and every node share one x (left-5 / left-1/2)
            with -translate-x-1/2 so they line up to the pixel. */}
        <div ref={containerRef} className="relative mt-16">
          {/* Static rail */}
          <div className="absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
          {/* Scroll-linked fill (scrub via useScroll → spring) */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-5 w-px -translate-x-1/2 origin-top md:left-1/2"
            style={{
              scaleY: lineScale,
              background:
                "linear-gradient(to bottom, var(--color-aurora-3), var(--color-aurora-1), var(--color-aurora-4))",
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={exp.company} delay={0.04} amount={0.2} direction={left ? "right" : "left"}>
                  <div className="relative md:grid md:grid-cols-2 md:items-center">
                    {/* Node — centered on the axis */}
                    <span className="absolute left-5 top-7 z-10 grid size-[20px] -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-background md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                      <span className="size-2 rounded-full bg-primary signal-dot" />
                    </span>

                    <div
                      className={cn(
                        "pl-12 md:pl-0",
                        left ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14",
                      )}
                    >
                      <ExperienceCard exp={exp} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
