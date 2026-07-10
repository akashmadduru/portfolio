import { ArrowUpRight } from "lucide-react";

import { navItems } from "@/lib/data/navigation";
import { profile } from "@/lib/data/profile";
import { socials } from "@/lib/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm space-y-3">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary/15 font-display text-sm font-bold text-primary ring-1 ring-primary/30">
                AM
              </span>
              <span className="font-display text-base font-semibold">{profile.name}</span>
            </a>
            <p className="text-sm leading-relaxed text-muted-foreground">{profile.tagline}</p>
          </div>

          <div className="flex gap-14">
            <nav className="flex flex-col gap-2.5">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/40">
                Navigate
              </span>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/40">
                Connect
              </span>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. Crafted with Next.js, Three.js & care.
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
