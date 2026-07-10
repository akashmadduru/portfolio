"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import { lerp } from "@/lib/utils";

/* --------------------------------------------------------------------- */
/*  Ambient particle field                                               */
/* --------------------------------------------------------------------- */
function Particles({ count = 1400 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#9db7ff"
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------------------------------------------------- */
/*  Floating developer workspace (abstract)                              */
/* --------------------------------------------------------------------- */
function Monitor() {
  return (
    <group>
      {/* Screen body */}
      <RoundedBox args={[3.1, 1.9, 0.14]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#0e1020" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* Emissive screen face */}
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[2.86, 1.66]} />
        <meshStandardMaterial
          color="#5b6cff"
          emissive="#5b6cff"
          emissiveIntensity={1.15}
          toneMapped={false}
        />
      </mesh>
      {/* Code-line accents on screen */}
      {[0.55, 0.28, 0.01, -0.26, -0.53].map((y, i) => (
        <mesh key={y} position={[-0.55 + (i % 2) * 0.2, y, 0.09]}>
          <planeGeometry args={[1.5 - (i % 3) * 0.4, 0.06]} />
          <meshBasicMaterial color="#cdd7ff" transparent opacity={0.55} toneMapped={false} />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.7, 24]} />
        <meshStandardMaterial color="#171a2e" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.62, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.06, 32]} />
        <meshStandardMaterial color="#171a2e" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

function OrbitingCubes() {
  const group = React.useRef<THREE.Group>(null);
  const cubes = React.useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        radius: 2.8 + (i % 3) * 0.5,
        y: Math.sin(i) * 1.4,
        scale: 0.12 + (i % 3) * 0.06,
        color: ["#7c5cff", "#22d3ee", "#ff5ca8"][i % 3],
        speed: 0.15 + (i % 4) * 0.05,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const c = cubes[i];
      child.position.x = Math.cos(c.angle + t * c.speed) * c.radius;
      child.position.z = Math.sin(c.angle + t * c.speed) * c.radius;
      child.position.y = c.y + Math.sin(t * 0.6 + i) * 0.2;
      child.rotation.x = t * 0.4;
      child.rotation.y = t * 0.3;
    });
  });

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <mesh key={i} scale={c.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.7}
            metalness={0.3}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* --------------------------------------------------------------------- */
/*  Camera + parallax rig                                                 */
/* --------------------------------------------------------------------- */
function Rig({ children }: { children: React.ReactNode }) {
  const group = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Mouse parallax (damped) + gentle idle drift
    group.current.rotation.y = lerp(
      group.current.rotation.y,
      pointer.x * 0.35 + Math.sin(t * 0.15) * 0.05,
      0.05,
    );
    group.current.rotation.x = lerp(
      group.current.rotation.x,
      -pointer.y * 0.22 + Math.cos(t * 0.12) * 0.03,
      0.05,
    );
    group.current.position.y = lerp(group.current.position.y, Math.sin(t * 0.5) * 0.08, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

/* --------------------------------------------------------------------- */
/*  Animated colored lights                                               */
/* --------------------------------------------------------------------- */
function Lights() {
  const light1 = React.useRef<THREE.PointLight>(null);
  const light2 = React.useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.4) * 5;
      light1.current.position.z = Math.cos(t * 0.4) * 5;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.3) * 6;
      light2.current.position.z = Math.sin(t * 0.3) * 6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={light1} position={[4, 3, 4]} intensity={70} color="#7c5cff" distance={20} />
      <pointLight ref={light2} position={[-5, -2, 3]} intensity={55} color="#22d3ee" distance={20} />
      <pointLight position={[0, 4, -6]} intensity={30} color="#ff5ca8" distance={22} />
    </>
  );
}

export function HeroScene() {
  return (
    <>
      <Lights />
      <Rig>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
          <group rotation={[0.05, -0.3, 0]}>
            <Monitor />
          </group>
        </Float>
        <OrbitingCubes />
      </Rig>
      <Particles />
    </>
  );
}
