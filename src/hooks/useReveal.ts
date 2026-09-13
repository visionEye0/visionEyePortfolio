"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches IntersectionObserver to reveal elements on scroll.
 * Elements with class "reveal" will get "is-visible" when scrolled into view.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let observer: IntersectionObserver;

    // Small delay to ensure all child Client Components are fully mounted in Next.js
    const timer = setTimeout(() => {
      const elements = root.querySelectorAll<HTMLElement>(".reveal");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  return ref;
}
