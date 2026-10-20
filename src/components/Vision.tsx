import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHead, Reveal, Diamond } from "./ui";

const STATEMENT =
  "To establish Pinnacle Engineering as a recognized leader in engineering, technology, and industrial innovation — developing forward-thinking solutions that contribute to a more advanced, efficient, and connected future.";

const HIGHLIGHTS = new Set([
  "pinnacle",
  "engineering",
  "leader",
  "technology,",
  "innovation",
  "advanced,",
  "efficient,",
  "connected",
]);

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const hot = HIGHLIGHTS.has(children.toLowerCase());
  return (
    <motion.span
      style={{ opacity }}
      className={hot ? "text-pulse" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = STATEMENT.split(" ");
  const { scrollYProgress: bgProg } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(bgProg, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative overflow-hidden border-t border-white/5"
    >
      {/* backdrop */}
      <motion.img
        style={{ y: bgY }}
        src="/images/vision-bg.jpg"
        alt=""
        className="absolute inset-0 h-[124%] w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      <div className="bg-blueprint-fine absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-44">
        <SectionHead index="04" label="Our vision" />

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-[auto_1fr] md:gap-12">
          <Reveal>
            <span className="font-display text-6xl font-extrabold leading-none text-outline-blue md:text-8xl">
              ∞
            </span>
          </Reveal>
          <p className="max-w-5xl font-display text-2xl font-semibold leading-snug tracking-tight text-mist sm:text-3xl md:text-[2.9rem] md:leading-[1.25]">
            {words.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, Math.min(1, (i + 6) / words.length)]}
              >
                {w}
              </Word>
            ))}
          </p>
        </div>

        <Reveal delay={0.1} className="mt-20 md:mt-28">
          <div className="flex flex-col items-start gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-steel">
              <Diamond className="h-2 w-2 text-pulse" />
              A more advanced, efficient, connected future
            </div>
            <p className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
              <span className="text-chrome">Precision in every detail.</span>{" "}
              <span className="text-pulse">Progress without limits.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
