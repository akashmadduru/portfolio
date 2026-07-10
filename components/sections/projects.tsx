"use client";

import { ArrowUpRight, CalendarClock, Github, Layers, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { TiltCard } from "@/components/motion/tilt-card";
import { ProjectArtwork } from "@/components/sections/project-artwork";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projects, type Project } from "@/lib/data/projects";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
      {children}
    </h4>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div>
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl sm:h-56">
        <ProjectArtwork project={project} kind="hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </DialogHeader>

        {/* Meta row */}
        <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
          <span className="inset-well rounded-md px-2.5 py-1 text-foreground/70">
            {project.category}
          </span>
          <span className="inset-well rounded-md px-2.5 py-1 text-foreground/70">
            {project.year}
          </span>
          <span className="inset-well inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-foreground/70">
            <CalendarClock className="size-3" />
            {project.timeline}
          </span>
        </div>

        <section className="space-y-2">
          <SectionLabel>Overview</SectionLabel>
          <p className="text-sm leading-relaxed text-foreground/75">{project.overview}</p>
        </section>

        <section className="space-y-2">
          <SectionLabel>Architecture</SectionLabel>
          <p className="text-sm leading-relaxed text-foreground/75">{project.architecture}</p>
        </section>

        {/* Supporting gallery */}
        <section className="space-y-3">
          <SectionLabel>Gallery</SectionLabel>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="inset-well aspect-[4/3] overflow-hidden rounded-lg">
                <ProjectArtwork project={project} kind="tile" seed={s} />
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-7 sm:grid-cols-2">
          <section className="space-y-3">
            <SectionLabel>Key Challenges</SectionLabel>
            <ul className="space-y-2">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <SectionLabel>Key Achievements</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              {project.results.map((r) => (
                <div key={r.label} className="inset-well rounded-xl p-3 text-center">
                  <div className="font-display text-lg font-semibold text-gradient">{r.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Business impact */}
        <section className="space-y-3">
          <SectionLabel>Business Impact</SectionLabel>
          <div className="panel flex items-start gap-3 rounded-xl p-4">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
              <TrendingUp className="size-4" />
            </span>
            <p className="text-sm leading-relaxed text-foreground/80">{project.impact}</p>
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pt-1">
          {project.liveUrl && (
            <Button asChild variant="aurora">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          )}
          <Button asChild variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              View Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08} amount={0.15} className="h-full">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group h-full w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Open case study: ${project.title}`}
          >
            <TiltCard max={6} className="h-full">
              <Spotlight className="h-full rounded-2xl">
                <article className="panel lift flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="relative h-40 overflow-hidden">
                    <ProjectArtwork
                      project={project}
                      kind="tile"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    {project.featured && (
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/85">
                        Featured
                      </span>
                    )}
                    <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 transition-all group-hover:bg-white/15 group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Layers className="size-3.5" />
                      {project.category}
                      <span className="ml-auto">{project.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-foreground/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded-md px-2 py-0.5 font-mono text-[11px] text-foreground/40">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      View case study
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              </Spotlight>
            </TiltCard>
          </button>
        </DialogTrigger>
        <DialogContent>
          <ProjectDetail project={project} />
        </DialogContent>
      </Dialog>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Selected work, <span className="text-gradient">from concept to production.</span>
            </>
          }
          description="Deep-dive case studies — architecture decisions, the hard parts, and the outcomes that mattered."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
