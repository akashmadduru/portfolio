import { cn } from "@/lib/utils";

/**
 * Ambient morphing aurora gradient blobs used as a section backdrop.
 * Pure CSS animation (GPU-friendly, respects reduced-motion via globals).
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -left-[10%] top-[-10%] size-[45vw] rounded-full opacity-40 blur-[120px] animate-[float_9s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--color-aurora-1), transparent 65%)" }}
      />
      <div
        className="absolute right-[-5%] top-[20%] size-[40vw] rounded-full opacity-30 blur-[120px] animate-[float_11s_ease-in-out_infinite_reverse]"
        style={{ background: "radial-gradient(circle, var(--color-aurora-2), transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] size-[42vw] rounded-full opacity-25 blur-[130px] animate-[float_13s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--color-aurora-4), transparent 65%)" }}
      />
    </div>
  );
}
