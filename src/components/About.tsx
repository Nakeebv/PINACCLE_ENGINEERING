import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal, SectionHead, CornerTicks, EASE } from "./ui";

function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 42, damping: 16 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = v.toFixed(decimals) + suffix;
    });
    return unsub;
  }, [spring, suffix, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {"0" + suffix}
    </span>
  );
}

const STATS: [number, string, number, string][] = [
  [120, "+", 0, "Projects delivered"],
  [15, "", 0, "Industrial sectors"],
  [99.9, "%", 1, "Precision standard"],
  [40, "+", 0, "Engineering specialists"],
];

export default function About() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrap,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionHead index="01" label="Who we are" />

      <div className="mt-10 grid gap-14 md:mt-16 lg:grid-cols-12 lg:gap-10">
        {/* left — sticky heading */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
                <span className="text-mist">Engineering</span>
                <br />
                <span className="text-mist">without</span>
                <br />
                <span className="text-chrome">compromise.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
                <span className="h-px w-10 bg-pulse" />
                Innovation · Efficiency · Reliability
              </div>
            </Reveal>
          </div>
        </div>

        {/* right — copy + quote + image */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-mist/90 md:text-xl">
              Pinnacle Engineering is an engineering and technology company
              focused on developing innovative solutions, advancing industrial
              capabilities, and delivering{" "}
              <span className="text-pulse">precision-driven results</span>. We
              combine technical expertise, strategic thinking, and modern
              engineering principles to transform ambitious ideas into practical
              solutions.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-steel">
              Our mission is to push the boundaries of engineering through
              innovation, efficiency, reliability, and uncompromising attention
              to detail. From complex technical challenges to large-scale
              industrial opportunities, Pinnacle Engineering is built around a
              commitment to progress, performance, and long-term value.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <blockquote className="mt-10 border-l-2 border-pulse pl-6 md:pl-8">
              <p className="font-display text-xl font-semibold uppercase leading-snug text-chrome md:text-2xl">
                "Progress, performance, and long-term value — engineered into
                everything we build."
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <div ref={imgWrap} className="relative overflow-hidden">
              <CornerTicks className="z-10 m-3" />
              <motion.img
                style={{ y: imgY }}
                src="/images/about.jpg"
                alt="Engineers reviewing holographic schematics"
                className="h-[300px] w-full scale-[1.22] object-cover md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.3em] text-steel">
                FIG. 01 — DESIGN REVIEW // PE LABS
              </div>
              <div className="absolute right-4 top-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-pulse">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-pulse" />
                LIVE
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* stats */}
      <div className="mt-20 grid grid-cols-2 border border-white/5 md:mt-28 md:grid-cols-4">
        {STATS.map(([to, suffix, decimals, label], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.9, ease: EASE }}
            className="group relative border-white/5 p-6 transition-colors duration-500 hover:bg-white/[0.03] md:p-10 [&:nth-child(odd)]:border-r md:[&:not(:last-child)]:border-r [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0"
          >
            <span className="absolute left-0 top-0 h-0 w-px bg-pulse transition-all duration-500 group-hover:h-full" />
            <div className="font-display text-3xl font-bold text-chrome md:text-5xl">
              <Counter to={to} suffix={suffix} decimals={decimals} />
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-steel">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
