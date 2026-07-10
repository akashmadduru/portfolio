"use client";

import { useGLTF } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";

/**
 * The project's existing glTF hero model. The file has been referenced as both
 * `/public/model/scene.gltf` and `/public/models/scene.gltf`, so we probe both
 * at runtime and use whichever exists. Do NOT swap for an external asset.
 */
// NOTE: files in /public are served from the site ROOT — do NOT include "/public"
// in the URL. The asset lives at public/models/geo/scene.gltf → URL /models/geo/scene.gltf.
export const MODEL_CANDIDATES = [
  "/models/geo/scene.gltf",
  "/model/geo/scene.gltf",
  "/models/scene.gltf",
  "/model/scene.gltf",
] as const;
export const MODEL_URL = MODEL_CANDIDATES[0];

const DEG = Math.PI / 180;

/** Resting orientation — tune for the model's most flattering angle. */
export const REST_ROTATION: [number, number, number] = [0, -1, 0];
/** Base scale after normalize-to-unit (Resize) + centering — tune to fit the hero.
 *  Reduced ~3× (was 3) so the model complements the hero copy rather than
 *  dominating it, leaving generous negative space. */
export const REST_SCALE = 1;

/** Scroll-end rotation DELTA — Y-AXIS ONLY (X and Z stay at REST_ROTATION). */
export const SCROLL_END_ROTATION: [number, number, number] = [0, 75 * DEG, 0];
/**
 * Scroll-end scale as a PERCENTAGE zoom delta (negative = subtle zoom-out).
 * Consumed as `REST_SCALE * (1 + SCROLL_END_SCALE_MULT / 100)`.
 * -3 → eases to 0.97× while scrolling. (A raw negative *multiplier* would
 * mirror the mesh and invert its normals, so we treat it as a percentage.)
 */
export const SCROLL_END_SCALE_MULT = 3;

/**
 * Resolve which candidate path actually exists (HEAD probe). Returns `null`
 * until resolved, then the winning URL (or the first candidate as a last
 * resort, which will surface via the error boundary if truly missing).
 */
export function useResolvedModelUrl() {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const candidate of MODEL_CANDIDATES) {
        try {
          const res = await fetch(candidate, { method: "HEAD" });
          if (res.ok) {
            if (!cancelled) setUrl(candidate);
            return;
          }
        } catch {
          // try next candidate
        }
      }
      if (!cancelled) setUrl(MODEL_CANDIDATES[0]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return url;
}

export function HeroModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  // Clone once; enable shadows + crisp anisotropy for the studio lighting.
  const model = React.useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
        if (mat && "envMapIntensity" in mat) {
          mat.envMapIntensity = 1.1;
        }
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

// No useGLTF.preload — the URL is resolved at runtime; <Suspense> + the error
// boundary below handle loading and any failure gracefully.

/* --------------------------------------------------------------------- */
/*  Error boundary: render a fallback if the model is missing/fails.      */
/* --------------------------------------------------------------------- */
interface BoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export class ModelErrorBoundary extends React.Component<
  BoundaryProps,
  { hasError: boolean }
> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Swallow — a missing hero asset shouldn't spam production logs.
  }

  render() {
    if (this.state.hasError) return this.props.fallback as React.ReactElement;
    return this.props.children;
  }
}

/** Tactile machined placeholder shown until scene.gltf resolves. */
export function PlaceholderObject() {
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[0.4, 0.6, 0]}>
        <torusKnotGeometry args={[0.75, 0.26, 40, 5]} />
        <meshStandardMaterial color="#b9812f" metalness={0.85} roughness={0.28} />
      </mesh>
    </group>
  );
}
