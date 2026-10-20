import { useRef, useState, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHead, CornerTicks, Diamond, EASE } from "./ui";

type Cap = {
  n: string;
  title: string;
  image: string;
  desc: string;
  tags: string[];
};

const CAPS: Cap[] = [
  {
    n: "01",
    title: "Advanced Manufacturing",
    image: "/images/cap-manufacturing.jpg",
    desc: "High-tolerance production systems engineered for scale, consistency, and speed — from prototype to full-rate manufacturing.",
    tags: ["Precision machining", "Additive manufacturing", "Materials engineering"],
  },
  {
    n: "02",
    title: "Automation & Robotics",
    image: "/images/cap-robotics.jpg",
    desc: "Intelligent machines and control architectures that operate with unwavering reliability, hour after hour, year after year.",
    tags: ["Industrial robotics", "Control systems", "Machine vision"],
  },
  {
    n: "03",
    title: "Energy & Infrastructure",
    image: "/images/cap-energy.jpg",
    desc: "Resilient power and structural systems designed for decades of continuous performance under real-world load.",
    tags: ["Power systems", "Smart grids", "Structural engineering"],
  },
  {
    n: "04",
    title: "Digital Engineering & R&D",
    image: "/images/cap-digital.jpg",
    desc: "From concept to validated prototype — simulation-driven design that removes unknowns before metal is ever cut.",
    tags: ["Digital twins", "Simulation & FEA", "AI-driven design"],
  },
];

export default function Capabilities() {
  const [active, setActive] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.5 });
  const py = useSpring(my, { stiffness: 140, damping: 18, mass: 0.5 });

  function onMove(e: MouseEvent<HTMLElement>) {
    mx.set(e.clientX);
    my.set(e.clientY);
  }

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative border-t border-white/5"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionHead index="03" label="What we build" />

        <div className="mt-10 md:mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-4xl font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl"
          >
            <span className="text-mist">Capabilities engineered</span>{" "}
            <span className="text-chrome">for industrial scale.</span>
          </motion.h2>
        </div>

        <div className="mt-12 border-t border-white/10 md:mt-16">
          {CAPS.map((cap, i) => {
            const open = active === i;
            return (
              <motion.div
                key={cap.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.8, ease: EASE }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setActive(open ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  data-cursor-label="OPEN"
                  className="group grid w-full grid-cols-[52px_1fr_40px] items-center gap-3 py-6 text-left md:grid-cols-[90px_1fr_auto] md:gap-8 md:py-9"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-pulse">
                    {cap.n}
                  </span>
                  <span
                    className={`font-display text-xl font-bold uppercase leading-tight tracking-tight transition-all duration-400 group-hover:translate-x-2 md:text-3xl lg:text-4xl ${
                      open ? "text-chrome" : "text-mist group-hover:text-chrome"
                    }`}
                  >
                    {cap.title}
                  </span>
                  <span
                    className={`flex h-10 w-10 items-center justify-center justify-self-end rounded-full border transition-all duration-500 md:h-12 md:w-12 ${
                      open
                        ? "rotate-45 border-pulse text-pulse"
                        : "border-white/10 text-steel group-hover:border-pulse/60 group-hover:text-pulse"
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 md:grid-cols-[90px_1fr_1fr] md:gap-8 md:pb-12">
                        <span className="hidden md:block" />
                        <div>
                          <p className="max-w-md text-sm leading-relaxed text-steel md:text-base">
                            {cap.desc}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {cap.tags.map((t) => (
                              <span
                                key={t}
                                className="flex items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist/80 transition-colors hover:border-pulse/50 hover:text-pulse"
                              >
                                <Diamond className="h-1.5 w-1.5 text-pulse" />
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* inline image on mobile / small second view on desktop */}
                        <div className="relative h-44 w-full overflow-hidden md:hidden">
                          <CornerTicks className="z-10 m-2" />
                          <img
                            src={cap.image}
                            alt={cap.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* -------- floating cursor-follow preview (desktop) -------- */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden lg:block"
        style={{ x: px, y: py }}
      >
        <motion.div
          animate={{
            opacity: hovered !== null ? 1 : 0,
            scale: hovered !== null ? 1 : 0.82,
            rotate: hovered !== null ? -2 : 0,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative h-[240px] w-[340px] -translate-x-[15%] -translate-y-[110%] overflow-hidden border border-pulse/30 bg-coal glow-blue"
        >
          <CornerTicks className="z-20 m-2" />
          {CAPS.map((cap, i) => (
            <motion.img
              key={cap.n}
              src={cap.image}
              alt=""
              initial={false}
              animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 1.15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          {hovered !== null && (
            <span className="absolute bottom-3 left-3 z-20 font-mono text-[10px] tracking-[0.3em] text-pulse">
              PE—{CAPS[hovered].n} // {CAPS[hovered].title.toUpperCase()}
            </span>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
