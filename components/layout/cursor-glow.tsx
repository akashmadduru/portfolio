"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import * as React from "react";

import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

/**
 * A soft aurora glow that trails the cursor. Desktop + fine-pointer only,
 * and never on reduced-motion.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const finePointer = useMediaQuery("(pointer: fine)");

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  React.useEffect(() => {
    if (reduced || !isDesktop || !finePointer) return;
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduced, isDesktop, finePointer, x, y]);

  if (reduced || !isDesktop || !finePointer) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden lg:block"
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        className="size-[420px] rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-aurora-1) 40%, transparent), transparent 60%)",
        }}
      />
    </motion.div>
  );
}
