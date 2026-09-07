import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink/70 backdrop-blur-xl border-b border-white/5 py-3"
          : "py-6"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-mono text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-110">
            PK
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-white">
            pranav<span className="text-violet-400">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-all hover:bg-violet-200 hover:shadow-lg hover:shadow-violet-500/30"
          >
            Hire me
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-6 bg-white transition-all", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-white transition-all", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-white transition-all", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="mx-6 mt-2 rounded-2xl border border-white/10 bg-surface/95 p-4 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
