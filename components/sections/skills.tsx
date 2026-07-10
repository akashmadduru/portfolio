"use client";

import * as React from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SkillConstellation } from "@/components/sections/skill-constellation";
import { skillCategories } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <SkillConstellation />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          align="center"
          title={
            <>
              A connected <span className="text-gradient">web of capabilities.</span>
            </>
          }
          description="Not a checklist — an interconnected toolkit spanning the whole stack, from silicon-adjacent backends to pixel-perfect frontends."
          className="items-center"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            const accentVar = `var(--color-${category.accent})`;
            const isActive = active === category.id;
            return (
              <Reveal key={category.id} delay={(i % 4) * 0.06} amount={0.15}>
                <div
                  onMouseEnter={() => setActive(category.id)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "panel group relative h-full cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-300",
                    "hover:-translate-y-1 hover:border-white/20",
                  )}
                  style={
                    isActive
                      ? {
                          boxShadow: `0 0 0 1px ${accentVar}, 0 22px 60px -24px ${accentVar}`,
                        }
                      : undefined
                  }
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: accentVar }}
                  />

                  <div
                    className="grid size-11 place-items-center rounded-xl border border-white/10 transition-colors"
                    style={{
                      background: `color-mix(in oklch, ${accentVar} 14%, transparent)`,
                      color: accentVar,
                    }}
                  >
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold">{category.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{category.blurb}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/70 transition-colors group-hover:text-foreground/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
