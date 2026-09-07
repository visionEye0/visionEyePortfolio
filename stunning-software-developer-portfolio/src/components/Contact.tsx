const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-8 15v-7h-2v7h2zm-1-8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zM15.5 18v-3.85c0-1.34-.62-2.15-1.75-2.15-.92 0-1.45.62-1.7 1.2l-.07.18V18h-2v-7h2v1.06c.4-.6 1.05-1.3 2.05-1.3 1.8 0 3.47 1.2 3.47 3.9V18h-2z" />
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L6.8 3.9H5l12.8 16.1z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@alexcarter.dev",
    icon: (
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2 8 5 8-5H4zm0 2.5V18h16V8.5l-8 5-8-5z" />
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-16 pt-28">
      <div className="gradient-border relative overflow-hidden rounded-3xl bg-surface/60 px-6 py-16 text-center backdrop-blur sm:px-16">
        {/* glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[100px]" />

        <span className="reveal font-mono text-sm text-violet-400">[ 04 / Let's Connect ]</span>
        <h2 className="reveal mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Let's build something<br className="hidden sm:block" />{" "}
          <span className="text-gradient">extraordinary</span> together
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-zinc-400">
          Have a project in mind, a role to fill, or just want to say hi? My
          inbox is always open — I usually reply within 24 hours.
        </p>

        <div className="reveal mt-9 flex justify-center">
          <a
            href="mailto:hello@alexcarter.dev"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/40"
          >
            Say hello
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="reveal mt-10 flex items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:-translate-y-1 hover:text-white hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/20"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Alex Carter. Crafted with{" "}
          <span className="text-rose-400">♥</span> and lots of coffee.
        </p>
        <p className="font-mono text-xs">Built with React · Tailwind · Go</p>
      </footer>
    </section>
  );
}
