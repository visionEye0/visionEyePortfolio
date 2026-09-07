import { marqueeItems } from "../data/portfolio";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative border-y border-white/5 bg-white/[0.02] py-6 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent z-10"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent z-10"
      />
      <div className="flex w-max animate-marquee gap-12">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 whitespace-nowrap font-mono text-sm text-zinc-500"
          >
            {item}
            <span className="text-violet-500/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
