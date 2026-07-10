import { GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { education } from "@/lib/data/education";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              The <span className="text-gradient">foundations</span> beneath the work.
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.1}>
              <Spotlight className="h-full rounded-2xl">
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-card/40 p-7 backdrop-blur-xl transition-colors hover:border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25">
                      <GraduationCap className="size-6" />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-sm font-medium text-foreground/75">{item.field}</p>
                    <p className="mt-1 text-sm text-primary/90">{item.institution}</p>
                  </div>
                  <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </article>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
