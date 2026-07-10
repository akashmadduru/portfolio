import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

type Motif =
  | "security"
  | "auth"
  | "ecommerce"
  | "blockchain"
  | "mobile"
  | "microservices"
  | "creative";

const MOTIF_BY_ID: Record<string, Motif> = {
  "airport-card-management": "security",
  "enterprise-auth-platform": "auth",
  "custom-ecommerce": "ecommerce",
  "crypto-dapp": "blockchain",
  "flutter-app": "mobile",
  "microservices-platform": "microservices",
  portfolio: "creative",
};

const CHAMPAGNE = "var(--color-aurora-3)";
const AMBER = "var(--color-primary)";
const stroke = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function MotifGraphic({ motif }: { motif: Motif }) {
  switch (motif) {
    case "security":
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          <path d="M200 66 L242 84 V120 C242 150 224 170 200 182 C176 170 158 150 158 120 V84 Z" />
          <path d="M182 122 l12 12 24 -26" stroke={AMBER} strokeWidth={2} />
          <rect x="120" y="150" width="60" height="40" rx="6" opacity="0.5" />
          <line x1="120" y1="163" x2="180" y2="163" opacity="0.5" />
          <circle cx="272" cy="118" r="34" opacity="0.28" />
          <circle cx="272" cy="118" r="22" opacity="0.4" />
        </g>
      );
    case "auth":
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          <circle cx="168" cy="118" r="20" stroke={AMBER} strokeWidth={2} />
          <path d="M186 124 L246 124 L246 140 M226 124 L226 138" stroke={AMBER} strokeWidth={2} />
          <path d="M150 108 l6 6 M150 128 l6 -6" opacity="0.6" />
          <rect x="120" y="164" width="160" height="14" rx="7" opacity="0.4" />
          <circle cx="128" cy="171" r="3" fill={AMBER} stroke="none" />
          <circle cx="272" cy="86" r="4" fill={CHAMPAGNE} stroke="none" opacity="0.6" />
        </g>
      );
    case "ecommerce":
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          <path d="M140 96 h120 l-8 20 h-104 Z" opacity="0.6" />
          <rect x="146" y="116" width="108" height="70" rx="6" />
          <path d="M162 150 h30 M162 164 h48" opacity="0.5" />
          <path d="M210 132 l18 0 6 40 h-40 Z" stroke={AMBER} strokeWidth={1.8} />
          <circle cx="204" cy="182" r="4" fill={AMBER} stroke="none" />
          <circle cx="230" cy="182" r="4" fill={AMBER} stroke="none" />
        </g>
      );
    case "blockchain":
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          {[130, 190, 250].map((x, i) => (
            <rect key={x} x={x} y={110 - (i % 2) * 22} width="34" height="34" rx="5" />
          ))}
          <line x1="164" y1="127" x2="190" y2="105" stroke={AMBER} strokeWidth={1.8} />
          <line x1="224" y1="105" x2="250" y2="127" stroke={AMBER} strokeWidth={1.8} />
          <circle cx="147" cy="127" r="4" fill={AMBER} stroke="none" />
          <circle cx="207" cy="105" r="4" fill={AMBER} stroke="none" />
          <circle cx="267" cy="127" r="4" fill={AMBER} stroke="none" />
          <rect x="176" y="158" width="48" height="28" rx="6" opacity="0.45" />
        </g>
      );
    case "mobile":
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          <rect x="150" y="70" width="52" height="104" rx="10" />
          <rect x="206" y="86" width="46" height="92" rx="9" opacity="0.55" />
          <line x1="164" y1="86" x2="188" y2="86" opacity="0.6" />
          <rect x="160" y="98" width="32" height="40" rx="4" stroke={AMBER} strokeWidth={1.8} />
          <path d="M160 150 h32 M160 160 h20" opacity="0.5" />
        </g>
      );
    case "microservices":
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          <rect x="182" y="104" width="36" height="32" rx="6" stroke={AMBER} strokeWidth={1.9} />
          {[
            [110, 78],
            [290, 78],
            [104, 160],
            [296, 160],
            [200, 190],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line x1="200" y1="120" x2={x + 14} y2={y + 12} opacity="0.4" />
              <rect x={x} y={y} width="28" height="24" rx="5" opacity="0.7" />
            </g>
          ))}
        </g>
      );
    case "creative":
    default:
      return (
        <g stroke={CHAMPAGNE} strokeWidth={1.4} {...stroke}>
          <circle cx="200" cy="126" r="46" opacity="0.35" />
          <circle cx="200" cy="126" r="30" opacity="0.55" />
          <path d="M176 108 l24 -14 24 14 v28 l-24 14 -24 -14 Z" stroke={AMBER} strokeWidth={1.8} />
          <path d="M176 108 l24 14 24 -14 M200 122 v28" stroke={AMBER} strokeWidth={1.4} opacity="0.7" />
          <circle cx="250" cy="92" r="3" fill={CHAMPAGNE} stroke="none" />
          <circle cx="150" cy="160" r="3" fill={AMBER} stroke="none" />
        </g>
      );
  }
}

interface ProjectArtworkProps {
  project: Project;
  /** card/hero add device chrome; tile is a bare framed thumbnail. */
  kind?: "card" | "hero" | "tile";
  /** Varies the composition slightly for gallery variety. */
  seed?: number;
  className?: string;
}

export function ProjectArtwork({
  project,
  kind = "card",
  seed = 0,
  className,
}: ProjectArtworkProps) {
  const motif = MOTIF_BY_ID[project.id] ?? "creative";
  const [c1, c2] = project.gradient;
  const ax = 15 + ((seed * 27) % 70);
  const bx = 88 - ((seed * 23) % 60);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 90% at ${ax}% 0%, ${c1}26, transparent 55%), radial-gradient(120% 110% at ${bx}% 100%, ${c2}22, transparent 55%), linear-gradient(180deg, #17140f, #0f0d0b)`,
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-40" />

      <svg
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <MotifGraphic motif={motif} />
      </svg>

      {/* cinematic grade + top light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% -10%, rgba(255,231,190,0.08), transparent 60%), radial-gradient(120% 90% at 50% 120%, rgba(0,0,0,0.55), transparent 55%)",
        }}
      />

      {kind !== "tile" && (
        <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-4 py-3">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/10" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            {project.category}
          </span>
        </div>
      )}
    </div>
  );
}
