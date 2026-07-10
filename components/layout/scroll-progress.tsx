"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin aurora progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-aurora-3), var(--color-aurora-1), var(--color-aurora-4))",
      }}
    />
  );
}
