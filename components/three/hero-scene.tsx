"use client";

import {
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  Resize,
  Sparkles,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import type { Group } from "three";

import {
  HeroModel,
  ModelErrorBoundary,
  PlaceholderObject,
  REST_ROTATION,
  REST_SCALE,
  SCROLL_END_ROTATION,
  SCROLL_END_SCALE_MULT,
  useResolvedModelUrl,
} from "@/components/three/drone-model";
import { clamp, lerp } from "@/lib/utils";

interface SceneProps {
  /** Live hero scroll progress (0 → 1). */
  scrollProgress: React.MutableRefObject<number>;
}

/* --------------------------------------------------------------------- */
/*  Model rig — idle float + subtle spin (inner) and scroll-driven        */
/*  rotation/scale + gentle mouse parallax (outer).                       */
/* --------------------------------------------------------------------- */
function ModelRig({ scrollProgress }: SceneProps) {
  const outer = React.useRef<Group>(null);
  const inner = React.useRef<Group>(null);
  const url = useResolvedModelUrl();

  // End scale interpreted as a percentage zoom delta (negative = zoom out).
  // e.g. SCROLL_END_SCALE_MULT = -3 → eases to 0.97× (subtle zoom-out).
  const endScale = REST_SCALE * (1 + SCROLL_END_SCALE_MULT / 100);

  useFrame((state) => {
    const p = clamp(scrollProgress.current, 0, 1);
    const t = state.clock.elapsedTime;

    if (inner.current) {
      // Only a whisper of vertical float (~1–2px). NO automatic rotation.
      inner.current.position.y = Math.sin(t * 0.5) * 0.012;
    }

    if (outer.current) {
      // Scroll-driven, Y-AXIS ONLY. X and Z stay fixed at the resting angle.
      // Y eases from REST toward REST + 75° as you scroll; scrubbed + reversible.
      const targetY = REST_ROTATION[1] + p * SCROLL_END_ROTATION[1];
      outer.current.rotation.x = REST_ROTATION[0];
      outer.current.rotation.y = lerp(outer.current.rotation.y, targetY, 0.1);
      outer.current.rotation.z = REST_ROTATION[2];

      const target = lerp(REST_SCALE, endScale, p);
      const s = lerp(outer.current.scale.x, target, 0.1);
      outer.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={outer} scale={REST_SCALE} rotation={REST_ROTATION}>
      <Center>
        <group ref={inner}>
          {/* Resize normalizes any-sized glTF to ~1 unit so REST_SCALE is predictable. */}
          <Resize>
            <ModelErrorBoundary fallback={<PlaceholderObject />}>
              <React.Suspense fallback={<PlaceholderObject />}>
                {url ? <HeroModel url={url} /> : <PlaceholderObject />}
              </React.Suspense>
            </ModelErrorBoundary>
          </Resize>
        </group>
      </Center>
    </group>
  );
}

/* --------------------------------------------------------------------- */
/*  Camera — stable while idle; only a slight scroll-linked dolly.        */
/* --------------------------------------------------------------------- */
function CameraRig({ scrollProgress }: SceneProps) {
  const { camera } = useThree();

  useFrame(() => {
    const p = clamp(scrollProgress.current, 0, 1);
    // Stable, centered on the model at origin. Only a slight dolly-back on scroll.
    camera.position.x = lerp(camera.position.x, 0, 0.08);
    camera.position.y = lerp(camera.position.y, -p * 0.1, 0.08);
    camera.position.z = lerp(camera.position.z, 6 + p * 0.8, 0.08);
    camera.lookAt(0, -p * 0.04, 0);
  });

  return null;
}

/* --------------------------------------------------------------------- */
/*  Premium studio lighting + environment reflections (image-based).      */
/* --------------------------------------------------------------------- */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.26} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.1}
        color="#ffe6c2"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 30]} />
      </directionalLight>
      {/* warm rim from behind */}
      <directionalLight position={[-6, 3, -5]} intensity={0.7} color="#ffcf9a" />

      {/* HDR-equivalent reflections from soft light panels — no external fetch. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#fff3e2"
          position={[0, 5, -7]}
          scale={[12, 5, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#ffd9ab"
          position={[-6, 2, 3]}
          scale={[6, 6, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#cfd6ff"
          position={[6, 1, 2]}
          scale={[6, 6, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          form="circle"
          intensity={1.6}
          color="#ffffff"
          position={[0, 6, 2]}
          scale={4}
        />
      </Environment>
    </>
  );
}

export function HeroScene({ scrollProgress }: SceneProps) {
  return (
    <>
      <StudioLighting />
      <CameraRig scrollProgress={scrollProgress} />
      <ModelRig scrollProgress={scrollProgress} />

      {/* Floating ambient dust — restrained, warm, GPU-cheap. */}
      <Sparkles
        count={34}
        scale={[9, 5, 5]}
        size={1}
        speed={0.22}
        opacity={0.32}
        color="#ffe6c2"
        noise={1}
      />

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.55}
        scale={14}
        blur={2.8}
        far={5}
        resolution={512}
        color="#0a0806"
      />
    </>
  );
}
