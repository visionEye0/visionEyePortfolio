import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import { useReveal } from "./hooks/useReveal";
import { useSpotlight } from "./hooks/useSpotlight";

export default function App() {
  const wrapperRef = useReveal<HTMLDivElement>();
  useSpotlight();

  return (
    <div ref={wrapperRef} className="noise relative min-h-screen">
      <Background />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
    </div>
  );
}
