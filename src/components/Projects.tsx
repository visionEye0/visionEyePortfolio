import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="reveal font-mono text-sm text-violet-400">[ 01 / Featured Work ]</span>
        <h2 className="reveal mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Things I've <span className="text-gradient">built</span>
        </h2>
        <p className="reveal mt-4 max-w-xl text-zinc-400">
          A selection of projects I've designed, engineered, and shipped to
          production.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.link}
            className={`spotlight glass group relative flex flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 ${project.glow} reveal`}
            style={{ transitionDelay: `${(i % 3) * 60}ms` }}
          >
            {/* Glow orb */}
            <div
              className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${project.accent} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50`}
            />

            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.accent} text-white shadow-lg`}
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-mono text-xs text-zinc-500">{project.year}</span>
            </div>

            <h3 className="mt-5 font-display text-xl font-bold text-white transition-colors group-hover:text-violet-300">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
              View project
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
