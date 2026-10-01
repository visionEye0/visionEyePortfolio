"use client";

import { useEffect, useRef } from "react";

/**
 * Custom dot + trailing-ring cursor.
 *
 * Perf notes vs. the original:
 * - rAF loop self-pauses once the ring converges (< 0.5 px delta),
 *   so it runs 0 frames when the mouse is idle instead of 60.
 * - Removed `mix-blend-screen` — that forced the browser to composite
 *   every layer beneath the cursor on every frame.
 * - `passive: true` on mousemove avoids blocking scroll.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;
    let running = false;

    const lerp = 0.16;
    const threshold = 0.5; // px — close enough to stop the loop

    const tick = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;

      ringX += dx * lerp;
      ringY += dy * lerp;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // Keep looping only while the ring is still catching up
      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Snap to final position and stop
        ringX = mouseX;
        ringY = mouseY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        running = false;
      }
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly (GPU-only, no layout)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      startLoop();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/50 hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
