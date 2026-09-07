import { useEffect, useRef, useState } from "react";
import { skills } from "../data/portfolio";

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-200">{name}</span>
        <span className="font-mono text-xs text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="reveal font-mono text-sm text-violet-400">[ 02 / Expertise ]</span>
        <h2 className="reveal mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          My <span className="text-gradient">toolbox</span>
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          {skills.slice(0, 4).map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>
        <div className="space-y-6">
          {skills.slice(4).map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
