"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SpotlightProps extends React.ComponentProps<"div"> {
  /** Radius of the glow in px. */
  radius?: number;
  /** Glow color (any CSS color). */
  color?: string;
}

/**
 * A container whose children are overlaid with a cursor-following radial glow.
 * Pure CSS variables (no re-renders) — cheap and 60fps. Works via `group`.
 */
export function Spotlight({
  className,
  children,
  radius = 340,
  color = "color-mix(in oklch, var(--color-aurora-1) 22%, transparent)",
  ...props
}: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("group/spot relative", className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
