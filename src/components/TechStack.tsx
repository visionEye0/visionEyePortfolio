import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "AI APIs / RAG", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI / Python", level: 92 },
      { name: "Node.js / Express", level: 88 },
      { name: "Microservices", level: 85 },
      { name: "Django", level: 80 },
    ],
  },
  {
    title: "DevOps & Security",
    skills: [
      { name: "Docker / CI/CD", level: 85 },
      { name: "Linux / VPS", level: 80 },
      { name: "Penetration Testing", level: 85 },
      { name: "Git / Agile", level: 90 },
    ],
  },
];

const techLogos = [
  "React",
  "Next.js",
  "TypeScript",
  "FastAPI",
  "Node.js",
  "Django",
  "Tailwind",
  "Docker",
  "Security",
  "CI/CD",
  "Linux",
  "Git",
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="techstack"
      className="border-b border-white/10 px-5 py-24 sm:px-8 md:px-12 md:py-36 overflow-hidden"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-16 sm:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9ff54] mb-3">
            04 / Tech Stack
          </p>
          <h2 className="font-display text-5xl tracking-[-0.065em] sm:text-7xl">
            My <span className="text-white/35">toolset.</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base mt-6">
            Technologies I work with daily to bring ideas to life.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.15 }}
              className="p-8 border border-white/15 bg-[#131415]/95 backdrop-blur-xl"
            >
              <h3 className="text-xl font-display text-[#f4f1ea] mb-8 flex items-center gap-3 tracking-[-0.03em]">
                <span className="w-2 h-2 rounded-full bg-[#d9ff54]" />
                {cat.title}
              </h3>
              <div className="space-y-6">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] text-white/45">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#d9ff54]"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.4 + catIdx * 0.15 + skillIdx * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden w-full -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          <div className="flex w-max animate-marquee gap-4">
            {[...techLogos, ...techLogos, ...techLogos].map((tech, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 border border-white/20 bg-black/10 backdrop-blur-sm text-[#f4f1ea] font-mono text-[11px] uppercase tracking-[0.16em]"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
