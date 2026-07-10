"use client";

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as React from "react";

import { HeroScene } from "@/components/three/hero-scene";

/**
 * The R3F <Canvas> host for the hero. Loaded via next/dynamic (ssr:false) so
 * three.js never ships in the initial/server bundle. DPR-capped for 60fps.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.2, 8], fov: 40 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <React.Suspense fallback={null}>
        <HeroScene />
        <Preload all />
      </React.Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
