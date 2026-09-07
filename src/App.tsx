import { useState, type CSSProperties, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CodeXml,
  Network,
  Menu,
  X,
} from "lucide-react";
import HeroScene from "./components/HeroScene";
import TechStack from "./components/TechStack";

const projects = [
  {
    number: "01",
    title: "Ashan AI",
    type: "AI Assistant / Cross-platform",
    year: "2024",
    color: "#d9ff54",
    note: "Multimodal AI assistant providing real-time support in 10+ regional languages.",
  },
  {
    number: "02",
    title: "Delulu-Dex",
    type: "Decentralized Exchange / Web3",
    year: "2023",
    color: "#ae8dff",
    note: "Automated market maker DEX built from scratch using Solidity.",
  },
  {
    number: "03",
    title: "Vendor Heatmap",
    type: "Data Analytics / MapLibre",
    year: "2025",
    color: "#ff8c6a",
    note: "Real-time order analytics and vendor heatmap system for high-demand zones.",
  },
];

const skills = ["React", "TypeScript", "Motion", "WebGL", "Node", "Figma"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const moveGlow = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
  };

  return (
    <main className="bg-[#101112] text-[#f4f1ea]">
      <section
        className="hero-shell relative min-h-[100svh] overflow-hidden"
        onMouseMove={moveGlow}
      >
        <div className="hero-image" aria-hidden="true" />
        <HeroScene animate={true} />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <nav className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8 md:px-12 md:py-7">
          <button
            onClick={() => scrollTo("top")}
            className="group flex items-center gap-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            aria-label="Back to top"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#d9ff54] shadow-[0_0_18px_#d9ff54]" />
            PK / 2025
          </button>

          <div className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 md:flex">
            <button onClick={() => scrollTo("work")} className="nav-link">Selected work</button>
            <button onClick={() => scrollTo("about")} className="nav-link">About</button>
            <button onClick={() => scrollTo("contact")} className="nav-link">Contact</button>
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center border border-white/20 bg-black/10 text-white backdrop-blur-sm md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="absolute inset-x-5 top-[76px] z-30 border border-white/15 bg-[#131415]/95 p-5 backdrop-blur-xl md:hidden"
            >
              {["Selected work", "About", "Contact"].map((label, index) => (
                <button
                  key={label}
                  onClick={() => scrollTo(["work", "about", "contact"][index])}
                  className="block w-full border-b border-white/10 py-4 text-left font-mono text-xs uppercase tracking-[0.16em] last:border-0"
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div id="top" className="relative z-10 flex min-h-[calc(100svh-80px)] flex-col justify-end px-5 pb-8 pt-24 sm:px-8 sm:pb-12 md:px-12 md:pb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mb-5 max-w-sm font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9ff54] sm:mb-7"
          >
            Full-Stack Developer / based in Calicut, Kerala
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display max-w-[1200px] text-[clamp(4.4rem,14.3vw,14.4rem)] font-medium leading-[0.75] tracking-[-0.075em]"
          >
            PRANAV<br />
            <span className="pl-[0.47em] text-[#d9ff54]">KRISHNA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.75 }}
            className="mt-8 flex flex-col gap-6 sm:mt-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              I turn ambitious ideas into expressive, useful digital experiences.
            </p>
            <div className="flex items-center gap-5">
              <button onClick={() => scrollTo("work")} className="arrow-button group">
                <span>View projects</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d9ff54] text-[#101112] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowDownRight size={17} strokeWidth={2.3} />
                </span>
              </button>
              <a href="mailto:pranavsayshii@gmail.com" className="text-link">Let&apos;s talk</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="border-b border-white/10 px-5 py-24 sm:px-8 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.74fr_1.26fr] md:gap-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9ff54]">01 / Point of view</p>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75 }}
              className="font-display max-w-4xl text-5xl leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-8xl"
            >
              Code is the material.<br />
              <span className="text-white/35">Feeling is the feature.</span>
            </motion.h2>
            <div className="mt-12 grid gap-9 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
              <p className="max-w-lg text-lg leading-relaxed text-white/70">
                I&apos;m a Full-Stack Developer specializing in high-performance applications, AI-powered tools, and automated workflows. I engineer solutions that accelerate business velocity and enhance user experiences.
              </p>
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Working with</p>
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {skills.map((skill) => <span key={skill} className="font-mono text-xs uppercase tracking-[0.1em]">{skill}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="px-5 py-24 sm:px-8 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between border-b border-white/15 pb-5 sm:mb-20">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9ff54]">02 / Selected work</p>
              <h2 className="font-display text-5xl tracking-[-0.065em] sm:text-7xl">Recent signals.</h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 sm:block">Click to expand</span>
          </div>

          <div>
            {projects.map((project, index) => {
              const isActive = activeProject === index;
              return (
                <motion.button
                  layout
                  key={project.title}
                  onClick={() => setActiveProject(isActive ? null : index)}
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                  className="project-row group relative block w-full overflow-hidden border-b border-white/15 text-left"
                  style={{ "--project-color": project.color } as CSSProperties}
                >
                  <motion.div layout className="relative z-10 grid grid-cols-[34px_1fr_auto] items-center gap-4 py-7 sm:grid-cols-[70px_1fr_auto] sm:gap-6 sm:py-9">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-white/45">{project.number}</span>
                    <div>
                      <h3 className="font-display text-4xl leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">{project.title}</h3>
                      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.13em] text-white/55 sm:text-[10px]">{project.type}</p>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className="hidden font-mono text-[10px] text-white/45 sm:block">{project.year}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#101112] group-hover:text-[var(--project-color)]">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </motion.div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32 }}
                        className="relative z-10 overflow-hidden"
                      >
                        <div className="grid pb-8 pl-[50px] sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8 sm:pl-[94px] sm:pb-10">
                          <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base">{project.note}</p>
                          <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#101112] sm:mt-0">Case study coming soon</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <TechStack />

      <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#d9ff54] px-5 py-24 text-[#101112] sm:px-8 md:px-12 md:py-32">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-9 font-mono text-[10px] uppercase tracking-[0.18em]">03 / Open for select collaborations</p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="font-display max-w-5xl text-[clamp(3.8rem,10vw,9rem)] leading-[0.82] tracking-[-0.075em]"
          >
            Have a good<br />
            <span className="pl-[0.32em]">one in mind?</span>
          </motion.h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-14">
            <a className="contact-link" href="mailto:pranavsayshii@gmail.com">pranavsayshii@gmail.com <ArrowUpRight size={18} /></a>
            <a aria-label="GitHub profile" href="https://github.com/visionEye0" target="_blank" rel="noreferrer" className="social-link"><CodeXml size={18} /></a>
            <a aria-label="LinkedIn profile" href="https://linkedin.com/in/happy-coder" target="_blank" rel="noreferrer" className="social-link"><Network size={18} /></a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12">
        <span>Pranav Krishna / Full-Stack Developer</span>
        <span>Built with intent, 2025</span>
      </footer>
    </main>
  );
}