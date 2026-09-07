import { useEffect } from "react";

/**
 * Tracks mouse position across elements with class "spotlight"
 * and sets CSS custom properties for a radial highlight effect.
 */
export function useSpotlight() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".spotlight");

    const onMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
