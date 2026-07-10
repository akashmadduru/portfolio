"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { navItems, sectionIds } from "@/lib/data/navigation";
import { profile } from "@/lib/data/profile";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const activeId = useScrollSpy(sectionIds);
  const lenis = useLenis();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = React.useCallback(
    (hash: string) => {
      setMenuOpen(false);
      const target = document.querySelector(hash);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass-strong border border-white/10 py-2.5 shadow-lg"
              : "border border-transparent py-2.5",
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="group flex items-center gap-2.5 pl-1"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-primary/15 font-display text-sm font-bold text-primary ring-1 ring-primary/30">
              AM
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    activeId === item.id
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground",
                  )}
                >
                  {activeId === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="aurora"
              className="hidden sm:inline-flex"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
              >
                Let&apos;s talk
              </a>
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.ul
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-24 space-y-1 rounded-2xl glass-strong border border-white/10 p-3"
            >
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      activeId === item.id
                        ? "bg-white/[0.06] text-foreground"
                        : "text-foreground/70 hover:bg-white/[0.04] hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
