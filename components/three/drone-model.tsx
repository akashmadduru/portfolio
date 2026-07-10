"use client";

import { RoundedBox, useGLTF } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";

/**
 * Hero drone model.
 *
 * Drop an OPTIMIZED drone glTF/GLB into /public/models (see README for the
 * gltf-transform + gltfpack + KTX2 pipeline) and it is loaded automatically.
 * Until then, a lightweight PROCEDURAL drone (built from primitives, a few KB,
 * near-zero GPU cost) is shown so the hero is never empty.
 *
 * NOTE: files in /public are served from the site ROOT — do NOT include
 * "/public" in the URL. public/models/drone.glb → URL /models/drone.glb.
 */
export const MODEL_CANDIDATES = [
  "/models/drone.glb",
  "/models/drone/scene.gltf",
  "/models/drone.gltf",
] as const;
export const MODEL_URL = MODEL_CANDIDATES[0];

const DEG = Math.PI / 180;

/** Resting orientation — tune for the model's most flattering angle. */
export const REST_ROTATION: [number, number, number] = [0, 0, 0];
/** Base scale after normalize-to-unit (Resize) + centering — tune to fit the hero. */
export const REST_SCALE = 1;

/** Scroll-end rotation DELTA — Y-AXIS ONLY (X and Z stay at REST_ROTATION). */
export const SCROLL_END_ROTATION: [number, number, number] = [0, 0, 0];
/**
 * Scroll-end scale as a PERCENTAGE zoom delta (negative = zoom out).
 * Consumed as `REST_SCALE * (1 + SCROLL_END_SCALE_MULT / 100)`.
 */
export const SCROLL_END_SCALE_MULT = 1;

/**
 * Resolve which candidate path actually exists (HEAD probe). Returns `null`
 * while probing, then the winning URL, or "" when no drone asset is present
 * (→ the procedural drone is shown).
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
      if (!cancelled) setUrl(""); // none found → procedural drone
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return url;
}

/**
 * Loads an optimized glTF/GLB. drei's useGLTF wires DRACO + Meshopt decoders
 * (and KTX2 via the renderer) automatically, so meshopt/KTX2-compressed assets
 * from the optimization pipeline load without extra setup.
 */
export function HeroModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

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

// No useGLTF.preload — URL is resolved at runtime; <Suspense> + the error
// boundary below handle loading and any failure gracefully.

/* --------------------------------------------------------------------- */
/*  Error boundary: fall back to the procedural drone on load failure.    */
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

/* --------------------------------------------------------------------- */
/*  Procedural drone — clean futuristic quadcopter from primitives.       */
/*  Anodized-aluminium body, matte polymer arms, amber signal accents.    */
/*  Lightweight (~30 low-poly meshes), still (no auto motion).            */
/* --------------------------------------------------------------------- */
const ARMS: { x: number; z: number }[] = [
  { x: 0.82, z: 0.6 },
  { x: -0.82, z: 0.6 },
  { x: 0.82, z: -0.6 },
  { x: -0.82, z: -0.6 },
];

function Rotor({ x, z }: { x: number; z: number }) {
  const angle = Math.atan2(z, x);
  const length = Math.hypot(x, z);
  return (
    <group>
      {/* arm */}
      <mesh
        position={[x / 2, -0.02, z / 2]}
        rotation={[0, -angle, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[length, 0.055, 0.11]} />
        <meshStandardMaterial color="#17181c" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* motor housing */}
      <mesh position={[x, 0.02, z]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 22]} />
        <meshStandardMaterial color="#26292f" metalness={0.9} roughness={0.28} />
      </mesh>
      {/* amber cap */}
      <mesh position={[x, 0.13, z]}>
        <cylinderGeometry args={[0.11, 0.12, 0.03, 22]} />
        <meshStandardMaterial
          color="#ff8a3d"
          emissive="#ff6a1f"
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>
      {/* propeller — two crossed blades, static */}
      <group position={[x, 0.17, z]} rotation={[0, angle, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.012, 0.07]} />
          <meshStandardMaterial
            color="#0e0f13"
            metalness={0.3}
            roughness={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.7, 0.012, 0.07]} />
          <meshStandardMaterial
            color="#0e0f13"
            metalness={0.3}
            roughness={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}

export function ProceduralDrone() {
  return (
    <group>
      {/* central hull */}
      <RoundedBox args={[1.5, 0.26, 1.0]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2d33" metalness={0.92} roughness={0.3} />
      </RoundedBox>
      {/* upper deck */}
      <RoundedBox
        args={[1.0, 0.1, 0.66]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.17, -0.02]}
        castShadow
      >
        <meshStandardMaterial color="#1c1e23" metalness={0.7} roughness={0.45} />
      </RoundedBox>
      {/* glossy canopy */}
      <mesh position={[0, 0.16, 0.2]} scale={[0.46, 0.3, 0.5]} castShadow>
        <sphereGeometry args={[0.5, 24, 20]} />
        <meshStandardMaterial color="#0b0c10" metalness={0.2} roughness={0.06} />
      </mesh>
      {/* amber signal strip */}
      <mesh position={[0, 0.05, 0.52]}>
        <boxGeometry args={[0.5, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#ff8a3d"
          emissive="#ff6a1f"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

      {/* gimbal camera under the nose */}
      <mesh position={[0, -0.16, 0.4]} castShadow>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color="#101216" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.16, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.04, 20]} />
        <meshStandardMaterial color="#ffb27a" emissive="#ff6a1f" emissiveIntensity={0.7} toneMapped={false} />
      </mesh>

      {/* rotors */}
      {ARMS.map((a) => (
        <Rotor key={`${a.x}-${a.z}`} x={a.x} z={a.z} />
      ))}

      {/* landing skids */}
      {[0.42, -0.42].map((z) => (
        <group key={z}>
          <mesh position={[0, -0.32, z]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.045, 0.05]} />
            <meshStandardMaterial color="#17181c" metalness={0.6} roughness={0.5} />
          </mesh>
          {[0.42, -0.42].map((x) => (
            <mesh key={x} position={[x, -0.2, z]} castShadow>
              <boxGeometry args={[0.045, 0.22, 0.045]} />
              <meshStandardMaterial color="#17181c" metalness={0.6} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Back-compat alias: hero-scene renders this as the model / fallback. */
export const PlaceholderObject = ProceduralDrone;
