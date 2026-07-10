export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid size-16 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-primary" />
          <span className="font-display text-sm font-bold text-primary">AM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-[float_1s_ease-in-out_infinite] rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 animate-[float_1s_ease-in-out_infinite_0.15s] rounded-full bg-primary/70" />
          <span className="h-1.5 w-1.5 animate-[float_1s_ease-in-out_infinite_0.3s] rounded-full bg-primary/40" />
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-foreground/40">Loading</p>
      </div>
    </div>
  );
}
