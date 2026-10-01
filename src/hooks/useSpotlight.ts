"use client";

import { useEffect } from "react";

/**
 * Tracks mouse position across elements with class "spotlight"
 * and sets CSS custom properties for a radial highlight effect.
 * Only updates cards currently visible in the viewport.
 */
export function useSpotlight() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".spotlight");
    const visibleCards = new Set<HTMLElement>();
    let animationFrameId: number;

    // Only track cards currently in the viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleCards.add(entry.target as HTMLElement);
          } else {
            visibleCards.delete(entry.target as HTMLElement);
          }
        });
      },
      { rootMargin: "100px" }
    );

    cards.forEach((card) => io.observe(card));

    const onMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        visibleCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      io.disconnect();
    };
  }, []);
}
