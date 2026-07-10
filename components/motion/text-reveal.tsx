"use client";

import { motion, type Variants } from "framer-motion";

import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before the first word animates in. */
  delay?: number;
  /** Per-word stagger. */
  stagger?: number;
  once?: boolean;
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Animates text in word-by-word with an overflow-clipped upward reveal. */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.6 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="mr-[0.25em] inline-block overflow-hidden py-[0.06em]"
          aria-hidden
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
