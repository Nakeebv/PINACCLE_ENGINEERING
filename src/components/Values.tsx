import { motion } from "framer-motion";
import {
  Lightbulb,
  Crosshair,
  ShieldCheck,
  Gem,
  Scale,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHead, EASE } from "./ui";

type Value = {
  n: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};

const VALUES: Value[] = [
  {
    n: "01",
    icon: Lightbulb,
    title: "Innovation",
    desc: "Exploring new technologies and smarter solutions to meet the evolving demands of modern industry.",
  },
  {
    n: "02",
    icon: Crosshair,
    title: "Precision",
    desc: "Maintaining the highest standards in every design, process, and solution we develop.",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Building dependable systems and solutions designed for lasting performance.",
  },
  {
    n: "04",
    icon: Gem,
    title: "Excellence",
    desc: "Pursuing continuous improvement and exceptional quality in everything we do.",
  },
  {
    n: "05",
    icon: Scale,
    title: "Integrity",
    desc: "Building lasting relationships through professionalism, accountability, and trust.",
  },
];

export default function Values() {
  return (
    <section id="values" className="relative border-t border-white/5 bg-coal/40">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionHead index="02" label="Core values" />

        <div className="mt-10 flex items-end justify-between md:mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl"
          >
            <span className="text-mist">Five principles.</span>
            <br />
            <span className="text-outline">Zero deviation.</span>
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-2 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-steel md:block"
          >
            The operating code of every Pinnacle system
          </motion.span>
        </div>

        <div className="mt-12 border-t border-white/10 md:mt-16">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.8, ease: EASE }}
              className="group relative border-b border-white/10"
              data-cursor
            >
              {/* hover fill */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-pulse/[0.08] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-pulse transition-all duration-500 group-hover:w-full" />

              <div className="relative grid items-center gap-4 px-2 py-7 md:grid-cols-[90px_1fr_minmax(0,400px)_56px] md:gap-8 md:px-6 md:py-10">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs tracking-[0.2em] text-pulse">
                    {v.n}
                  </span>
                  <span className="hidden h-10 w-10 items-center justify-center border border-white/10 text-steel transition-colors duration-300 group-hover:border-pulse/50 group-hover:text-pulse md:flex">
                    <v.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-mist transition-all duration-400 group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                  <span className="transition-colors duration-300 group-hover:text-chrome">
                    {v.title}
                  </span>
                </h3>

                <p className="max-w-md text-sm leading-relaxed text-steel md:opacity-0 md:transition-all md:duration-500 md:group-hover:opacity-100">
                  {v.desc}
                </p>

                <div className="hidden justify-self-end md:block">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-steel transition-all duration-500 group-hover:rotate-45 group-hover:border-pulse group-hover:text-pulse">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
