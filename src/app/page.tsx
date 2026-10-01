"use client";

import Background from "../components/Background";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import About from "../components/About";
import Contact from "../components/Contact";
import { useReveal } from "../hooks/useReveal";
import { useSpotlight } from "../hooks/useSpotlight";
import { useEffect } from "react";

export default function App() {
  const wrapperRef = useReveal<HTMLDivElement>();
  useSpotlight();

  // Smooth scroll for anchor links only — replaces CSS scroll-behavior:smooth
  // which was causing jank by forcing interpolated scroll on ALL scroll events
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={wrapperRef} className="noise relative min-h-screen">
      <Background />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <div className="cv-section">
          <Marquee />
        </div>
        <div className="cv-section">
          <Projects />
        </div>
        <div className="cv-section">
          <Skills />
        </div>
        <div className="cv-section">
          <About />
        </div>
        <div className="cv-section">
          <Contact />
        </div>
      </main>
    </div>
  );
}
