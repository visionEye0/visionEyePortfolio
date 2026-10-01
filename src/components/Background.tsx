"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* Background image from original portfolio */}
      <div className="hero-image" aria-hidden="true" />
      
      {/* Base radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1030_0%,#06060a_55%)] opacity-80" />

      {/* Animated blobs — wrapped in an isolation container so all three
          are composited together, reducing the number of GPU layers. 
          Blur reduced from 120px → 80px to cut texture memory. */}
      <div style={{ contain: "strict", isolation: "isolate" }} className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-violet-600/25 blur-[80px] animate-blob" style={{ contain: "strict" }} />
        <div
          className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[80px] animate-blob"
          style={{ animationDelay: "-6s", contain: "strict" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/15 blur-[80px] animate-blob"
          style={{ animationDelay: "-12s", contain: "strict" }}
        />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.15) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
          contain: "strict",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
