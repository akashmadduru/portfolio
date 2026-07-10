import { ImageResponse } from "next/og";

import { profile } from "@/lib/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "radial-gradient(120% 90% at 50% 0%, #262019 0%, #14120f 55%, #0e0c0a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(124,92,255,0.18)",
              border: "1px solid rgba(124,92,255,0.4)",
              fontSize: 28,
              fontWeight: 700,
              color: "#b9a9ff",
            }}
          >
            AM
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
            {profile.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              marginTop: 12,
              background: "linear-gradient(90deg, #22d3ee, #7c5cff, #ff5ca8)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Software Engineer · Cloud-Native Developer
          </div>
        </div>

        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
          {profile.yearsExperience} yrs · Enterprise · Crypto · eCommerce · System Design
        </div>
      </div>
    ),
    { ...size },
  );
}
