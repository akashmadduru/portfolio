"use client";

import {
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  Sparkles,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import {
  HeroModel,
  ModelErrorBoundary,
  ProceduralDrone,
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
/*  AutoFit — frames ANY model to the canvas from its bounding sphere.    */
/*  Recomputes camera distance once after load and on viewport resize     */
/*  (never per frame), so the model always fills ~85% with even padding.  */
/* --------------------------------------------------------------------- */
const FitContext = React.createContext<() => void>(() => {});

function AutoFit({
  children,
  fill = 0.85,
}: {
  children: React.ReactNode;
  fill?: number;
}) {
  const group = React.useRef<THREE.Group>(null);
  const { camera, size, invalidate } = useThree();
  const [tick, setTick] = React.useState(0);
  const requestFit = React.useCallback(() => setTick((n) => n + 1), []);

  React.useLayoutEffect(() => {
    const g = group.current;
    if (!g || !(camera as THREE.PerspectiveCamera).isPerspectiveCamera) return;

    const box = new THREE.Box3().setFromObject(g);
    if (box.isEmpty()) return;
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius || 1;

    const cam = camera as THREE.PerspectiveCamera;
    const vFov = (cam.fov * Math.PI) / 180;
    const aspect = size.width / Math.max(1, size.height);
    const hHalf = Math.atan(Math.tan(vFov / 2) * aspect);
    // Fit whichever axis binds, then back off for even padding.
    const dist =
      Math.max(radius / Math.sin(vFov / 2), radius / Math.sin(hHalf)) / fill;

    cam.position.set(0, 0, dist);
    cam.up.set(0, 1, 0);
    cam.lookAt(0, 0, 0);
    cam.near = Math.max(0.01, dist - radius * 2);
    cam.far = dist + radius * 4;
    cam.updateProjectionMatrix();
    invalidate();
  }, [tick, size.width, size.height, camera, fill, invalidate]);

  return (
    <FitContext.Provider value={requestFit}>
      <group ref={group}>{children}</group>
    </FitContext.Provider>
  );
}

/** Re-triggers AutoFit once an async model finishes loading (inside Suspense). */
function FitProbe() {
  const requestFit = React.useContext(FitContext);
  React.useLayoutEffect(() => {
    requestFit();
  }, [requestFit]);
  return null;
}

/* --------------------------------------------------------------------- */
/*  Model rig — idle hover-flight wobble + a slow, smooth hover-in tilt.  */
/* --------------------------------------------------------------------- */
/** Sideways drift/yaw-sway angular frequency, rad/s — unaffected by hover. */
const IDLE_WOBBLE_SPEED = 1;
/** Sideways drift amplitude, world units. */
const IDLE_DRIFT_X = 0.16;
/** Yaw sway amplitude while drifting, in radians. */
const IDLE_YAW_AMPLITUDE = 0.14;
/** Bank/roll tilt amplitude while drifting, in radians (like a real quad banking into a turn). */
const IDLE_BANK_TILT = 0.09;
/** How far the model eases toward the pointer while hovered, in radians. */
const HOVER_TILT = 0.3;
/** Scale pop while hovered, as a fraction of REST_SCALE. */
const HOVER_SCALE_POP = 0.15;
/** Per-frame ease rate (at 60fps) for the hover-in/out amount — low = slow, smooth. */
const HOVER_EASE = 0.035;
/** Per-frame ease rate for the pointer-tilt target itself, so it glides rather than snaps. */
const POINTER_EASE = 0.045;

function ModelRig({ scrollProgress }: SceneProps) {
  const outer = React.useRef<THREE.Group>(null);
  const inner = React.useRef<THREE.Group>(null);
  const url = useResolvedModelUrl();
  const endScale = REST_SCALE * (1 + SCROLL_END_SCALE_MULT / 100);

  const hovered = React.useRef(false);
  const hoverAmount = React.useRef(0);
  const pointer = React.useRef({ x: 0, y: 0 });

  const setHovered = React.useCallback((value: boolean) => {
    hovered.current = value;
    document.body.style.cursor = value ? "pointer" : "auto";
  }, []);

  React.useEffect(() => () => {
    document.body.style.cursor = "auto";
  }, []);

  useFrame((state) => {
    const p = clamp(scrollProgress.current, 0, 1);
    const t = state.clock.elapsedTime;

    hoverAmount.current = lerp(hoverAmount.current, hovered.current ? 1 : 0, HOVER_EASE);
    const hoverT = hoverAmount.current;
    // Ease the raw pointer position too, so the tilt glides instead of snapping
    // to wherever the cursor jumps.
    pointer.current.x = lerp(pointer.current.x, state.pointer.x, POINTER_EASE);
    pointer.current.y = lerp(pointer.current.y, state.pointer.y, POINTER_EASE);

    // A single phase drives drift/yaw/bank together so the idle motion reads
    // as one coherent "flying sideways" gesture — constant regardless of
    // hover, so hovering never makes it wobble harder.
    const phase = t * IDLE_WOBBLE_SPEED;
    const driftX = Math.sin(phase) * IDLE_DRIFT_X;
    const yaw = Math.sin(phase) * IDLE_YAW_AMPLITUDE;
    const bank = Math.cos(phase) * IDLE_BANK_TILT; // leads the drift, like banking into the turn

    if (inner.current) {
      inner.current.position.y = Math.sin(t * 0.5) * 0.012; // ~1–2px float
      inner.current.position.x = driftX;
    }

    if (outer.current) {
      // Idle sway + scroll delta on Y. Pointer-tilt eases in on X/Z while hovered.
      const targetY = REST_ROTATION[1] + p * SCROLL_END_ROTATION[1] + yaw;
      outer.current.rotation.y = lerp(outer.current.rotation.y, targetY, 0.12);
      outer.current.rotation.x =
        REST_ROTATION[0] + hoverT * -pointer.current.y * HOVER_TILT;
      outer.current.rotation.z =
        REST_ROTATION[2] + bank + hoverT * pointer.current.x * HOVER_TILT * 0.6;

      const target = lerp(REST_SCALE, endScale, p) * (1 + hoverT * HOVER_SCALE_POP);
      outer.current.scale.setScalar(lerp(outer.current.scale.x, target, 0.06));
    }
  });

  return (
    <AutoFit fill={1.2}>
      <group
        ref={outer}
        scale={REST_SCALE}
        rotation={REST_ROTATION}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <group ref={inner}>
          {/* drei <Center> centers the model's pivot at the origin via Box3, so
              the scroll Y-rotation spins around the model's true center. */}
          <Center>
            <ModelErrorBoundary fallback={<ProceduralDrone />}>
              <React.Suspense fallback={<ProceduralDrone />}>
                {url ? (
                  <>
                    <HeroModel url={url} />
                    <FitProbe />
                  </>
                ) : (
                  <ProceduralDrone />
                )}
              </React.Suspense>
            </ModelErrorBoundary>
          </Center>
        </group>
      </group>
    </AutoFit>
  );
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
      <directionalLight position={[-6, 3, -5]} intensity={0.7} color="#ffcf9a" />

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
      <ModelRig scrollProgress={scrollProgress} />

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
        position={[0, -0.85, 0]}
        opacity={0.5}
        scale={7}
        blur={2.6}
        far={3}
        resolution={512}
        color="#0a0806"
      />
    </>
  );
}
