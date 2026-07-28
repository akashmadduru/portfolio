"use client";
import * as React from "react";

export function Avatar3D() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!innerRef.current) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 1;
      const centerY = rect.height / 1;

      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((centerX - x) / centerX) * 8;

      innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative h-42 w-42 perspective"
      style={{ perspective: "1000px" }}
    >
      {/* Decorative ring */}
      <div
        className="absolute inset-0 rounded-full border border-orange-400/20"
        style={{
          boxShadow: "inset 0 0 20px rgba(255, 140, 0, 0.05)",
        }}
      />

      {/* Glow halo */}
      <div
        className="absolute -inset-3 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 140, 0, 0.2), transparent)",
        }}
      />

      {/* 3D transform container */}
      <div
        ref={innerRef}
        className="absolute inset-0 transition-transform duration-300"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Image wrapper */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            transform: "translateZ(20px)",
            boxShadow:
              "0 10px 30px rgba(255, 140, 0, 0.1), 0 0 40px rgba(255, 140, 0, 0.05)",
          }}
        >
          <img src="./akash.png" alt="Akash Madduru" draggable="true" />
          {/* Glossy shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Inner highlight ring */}
        <div
          className="absolute inset-1 rounded-full border border-white/10"
          style={{
            transform: "translateZ(25px)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes subtle-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
