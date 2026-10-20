import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { EASE } from "./ui";
import { scrollToId } from "../lib/lenis";

const lineWrap: Variants = {
  hidden: {},
  visible: (i: number) => ({
    transition: { staggerChildren: 0.02, delayChildren: 0.12 + i * 0.14 },
  }),
};

const line: Variants = {
  hidden: { y: "115%", rotate: 2 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1.15, ease: EASE },
  },
};

const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 1, ease: EASE } },
});

export default function Hero({ loading }: { loading: boolean }) {
  const state = loading ? "hidden" : "visible";

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* ------- backdrop ------- */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, delay: 2.1, ease: EASE }}
      >
        <img
          src="/images/hero-machine.jpg"
          alt="Precision engineering facility"
          className="h-full w-full object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-ink/60" />
      <div className="bg-blueprint absolute inset-0 opacity-70 mask-fade-radial" />
      {/* scanline sweep */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-pulse/50 to-transparent" />

      {/* rotating reticle */}
      <motion.div
        className="pointer-events-none absolute right-[-14%] top-1/2 hidden -translate-y-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.6 }}
      >
        <div className="animate-spin-slow relative h-[46vw] w-[46vw] rounded-full border border-dashed border-pulse/15">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-pulse/50" />
          <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 border border-white/25" />
        </div>
        <div className="absolute inset-[16%] animate-pulse-glow rounded-full border border-pulse/10" />
      </motion.div>

      {/* HUD labels */}
      <motion.div
        variants={fade(3)}
        initial="hidden"
        animate={state}
        className="pointer-events-none absolute right-6 top-24 hidden font-mono text-[10px] tracking-[0.3em] text-steel/80 md:block md:text-right"
      >
        <p className="text-pulse">SYS.01 // ONLINE</p>
        <p className="mt-1">TOLERANCE ±0.001 MM</p>
        <p className="mt-1">57.40°N — GLOBAL GRID</p>
      </motion.div>
      <motion.span
        variants={fade(3.2)}
        initial="hidden"
        animate={state}
        className="pointer-events-none absolute bottom-40 right-6 hidden font-mono text-[10px] uppercase tracking-[0.5em] text-steel/60 [writing-mode:vertical-rl] lg:block"
      >
        Engineering the future — building what's next
      </motion.span>

      {/* ------- content ------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-24 pt-32 md:px-10 md:pb-28">
        <motion.p
          variants={fade(0)}
          initial="hidden"
          animate={state}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-pulse md:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pulse" />
          </span>
          Pinnacle Engineering — Est. for what's next
        </motion.p>

        <h1 className="font-display font-extrabold uppercase leading-[0.98] tracking-tight text-[clamp(2.5rem,8.6vw,8.6rem)]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="text-chrome block origin-left"
              variants={lineWrap}
              custom={0}
              initial="hidden"
              animate={state}
            >
              <motion.span className="block" variants={line}>
                Engineering
              </motion.span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block origin-left"
              variants={lineWrap}
              custom={1}
              initial="hidden"
              animate={state}
            >
              <motion.span className="block" variants={line}>
                <span className="text-mist">The</span>{" "}
                <span className="text-outline">Future.</span>
              </motion.span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block origin-left"
              variants={lineWrap}
              custom={2}
              initial="hidden"
              animate={state}
            >
              <motion.span className="block" variants={line}>
                <span className="text-mist">Building</span>
              </motion.span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block origin-left"
              variants={lineWrap}
              custom={3}
              initial="hidden"
              animate={state}
            >
              <motion.span className="block" variants={line}>
                <span className="text-outline-blue">What's</span>{" "}
                <span className="text-pulse">Next.</span>
              </motion.span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            variants={fade(0.55)}
            initial="hidden"
            animate={state}
            className="max-w-md text-base leading-relaxed text-steel md:text-lg"
          >
            We transform ambitious ideas into practical solutions — advancing
            industrial capability through innovation, strategic thinking, and
            uncompromising attention to detail.
          </motion.p>

          <motion.div
            variants={fade(0.7)}
            initial="hidden"
            animate={state}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("#capabilities")}
              className="group relative flex items-center gap-3 overflow-hidden bg-pulse px-7 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-ink transition-transform duration-300"
            >
              <span className="absolute inset-0 -translate-x-full bg-mist transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Explore capabilities</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("#contact")}
              className="group flex items-center gap-3 border border-white/15 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.25em] text-mist transition-colors duration-300 hover:border-pulse hover:text-pulse"
            >
              Start a project
            </button>
          </motion.div>
        </div>
      </div>

      {/* ------- bottom telemetry bar ------- */}
      <motion.div
        variants={fade(0.9)}
        initial="hidden"
        animate={state}
        className="relative z-10 border-t border-white/10"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            ["120+", "Projects delivered"],
            ["15", "Industrial sectors"],
            ["99.9%", "Precision standard"],
            ["24/7", "Systems uptime"],
          ].map(([v, l]) => (
            <div key={l} className="flex items-baseline gap-3 px-5 py-5 md:gap-4 md:px-8">
              <span className="font-display text-xl font-bold text-chrome md:text-2xl">
                {v}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-steel md:text-[10px]">
                {l}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollToId("#about")}
          aria-label="Scroll to about"
          className="absolute -top-[52px] right-5 flex h-[52px] w-[52px] items-center justify-center border border-white/10 bg-ink/80 backdrop-blur transition-colors hover:border-pulse md:right-10"
        >
          <ArrowDown className="h-4 w-4 animate-bounce text-pulse" />
        </button>
      </motion.div>
    </section>
  );
}
