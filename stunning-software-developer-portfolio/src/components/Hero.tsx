import { useEffect, useState } from "react";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Systems Architect",
  "Open Source Advocate",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 35 : 70;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }

    const t = setTimeout(() => {
      setText(current.slice(0, text.length + (deleting ? -1 : 1)));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Availability badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new opportunities
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          <span className="block text-white">Hi, I'm</span>
          <span className="text-gradient block">Alex Carter</span>
        </h1>

        {/* Typewriter role */}
        <div className="mt-6 flex h-8 items-center font-mono text-lg text-zinc-400 sm:text-xl">
          <span className="mr-1 text-violet-400">&gt;</span>
          <span>{text}</span>
          <span className="cursor-blink ml-0.5 text-violet-400">▊</span>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          I craft high-performance web applications and backend systems that
          scale to millions of users. With 8+ years of experience turning
          ambitious ideas into elegant, production-ready software.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/30 transition-all hover:shadow-violet-500/50 hover:-translate-y-0.5"
          >
            View my work
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-12">
          {[
            { value: "8+", label: "Years Experience" },
            { value: "60+", label: "Projects Shipped" },
            { value: "2M+", label: "Users Impacted" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 text-xs text-zinc-500 sm:text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#work" className="flex flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-white">
          <span className="text-xs tracking-widest">SCROLL</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-zinc-600 p-1">
            <span className="h-2 w-1 animate-bounce rounded-full bg-violet-400" />
          </span>
        </a>
      </div>
    </section>
  );
}
