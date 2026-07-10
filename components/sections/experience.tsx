"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import * as React from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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

        <div ref={containerRef} className="relative mt-16 pl-2">
          {/* Rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[9px]" />
          <motion.div
            className="absolute left-[7px] top-2 w-px origin-top sm:left-[9px]"
            style={{
              scaleY: lineScale,
              height: "calc(100% - 1rem)",
              background:
                "linear-gradient(to bottom, var(--color-aurora-3), var(--color-aurora-1), var(--color-aurora-4))",
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.05} amount={0.2}>
                <div className="relative pl-10 sm:pl-14">
                  {/* Node */}
                  <span className="absolute left-0 top-1.5 grid size-[18px] place-items-center rounded-full border border-white/20 bg-background sm:size-[22px]">
                    <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--color-aurora-1)] sm:size-2.5" />
                  </span>

                  <Spotlight className="rounded-2xl">
                    <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-colors hover:border-white/20 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-9 place-items-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/25">
                              <Briefcase className="size-4" />
                            </span>
                            <h3 className="font-display text-xl font-semibold">{exp.company}</h3>
                          </div>
                          <p className="mt-2 text-base font-medium text-foreground/80">
                            {exp.role}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="border-primary/25 bg-primary/10 text-primary">
                            {exp.period}
                          </Badge>
                          <p className="mt-2 text-xs text-muted-foreground">{exp.location}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {exp.summary}
                      </p>

                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {exp.highlights.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5 text-sm leading-relaxed text-foreground/70"
                          >
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
