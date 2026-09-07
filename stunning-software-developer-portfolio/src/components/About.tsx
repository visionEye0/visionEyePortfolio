const highlights = [
  {
    icon: "M12 8v4l3 3M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
    title: "Performance First",
    desc: "Every millisecond counts. I obsess over latency budgets and Core Web Vitals.",
  },
  {
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
    title: "Scalable Systems",
    desc: "Architecture designed for 10x growth — horizontally scalable from day one.",
  },
  {
    icon: "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    title: "Clean Code",
    desc: "Readable, testable, and maintainable. Code that future-you will thank you for.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left: text */}
        <div>
          <span className="reveal font-mono text-sm text-violet-400">[ 03 / About Me ]</span>
          <h2 className="reveal mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Engineering with <span className="text-gradient">purpose</span>
          </h2>
          <p className="reveal mt-6 text-zinc-400 leading-relaxed">
            I'm a software engineer based in San Francisco who loves building at the
            intersection of design and technology. My journey started with a
            Commodore 64 in my parents' basement and evolved into a career
            crafting systems used by millions.
          </p>
          <p className="reveal mt-4 text-zinc-400 leading-relaxed">
            Today, I lead engineering at a fast-growing startup, where I balance
            hands-on coding with mentoring a team of brilliant developers. When
            I'm not shipping code, you'll find me contributing to open source,
            speaking at conferences, or exploring the Sierra Nevada.
          </p>

          <div className="reveal mt-8 flex flex-wrap gap-3">
            {["Clean Code", "TDD", "CI/CD", "Agile", "System Design", "Mentoring"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right: cards */}
        <div className="grid gap-4 sm:grid-cols-1">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="reveal glass spotlight flex items-start gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-400">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d={h.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">{h.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
