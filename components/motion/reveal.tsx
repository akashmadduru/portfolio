"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
}

const offsetFor = (direction: Direction): { x: number; y: number } => {
  switch (direction) {
    case "up":
      return { x: 0, y: 28 };
    case "down":
      return { x: 0, y: -28 };
    case "left":
      return { x: 28, y: 0 };
    case "right":
      return { x: -28, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/** Fade + slide a block into view on scroll, respecting reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  once = true,
  amount = 0.3,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const { x, y } = offsetFor(direction);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for lists of Reveal / motion children. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
