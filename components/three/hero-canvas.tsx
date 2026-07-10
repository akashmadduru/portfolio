"use client";

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as React from "react";

import { HeroScene } from "@/components/three/hero-scene";

interface HeroCanvasProps {
  scrollProgress: React.MutableRefObject<number>;
}

/**
 * R3F <Canvas> host for the hero. Loaded via next/dynamic (ssr:false) so
 * three.js never ships in the initial bundle. Soft shadows, ACES tone mapping
 * (R3F default), and restrained post-processing for a premium finish.
 */
export default function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  return (
    <Canvas
      shadows="soft"
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [100, -200, 100], fov: 100 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <React.Suspense fallback={null}>
        <HeroScene scrollProgress={scrollProgress} />
        <Preload all />
      </React.Suspense>

      <EffectComposer enableNormalPass={false}>
        <Bloom
          intensity={0.42}
          luminanceThreshold={0.72}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.28} darkness={0.72} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
