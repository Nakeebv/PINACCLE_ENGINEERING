import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mark } from "./Logo";
import { EASE } from "./ui";

export default function Preloader({ done }: { done: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease the counter so it feels mechanical
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="bg-blueprint absolute inset-0 opacity-60 mask-fade-radial" />

          <motion.div
            initial={{ opacity: 0, scale: 0.86, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Mark className="h-24 w-auto md:h-28" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            className="mt-8 flex w-64 flex-col items-center gap-3"
          >
            <div className="flex w-full items-center justify-between font-mono text-[10px] tracking-[0.3em] text-steel">
              <span className="text-pulse">PE—SYS</span>
              <span>
                {count < 100 ? "INITIALIZING" : "NOMINAL"}
              </span>
              <span className="text-mist">{String(count).padStart(3, "0")}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-pulse transition-[width] duration-100 ease-out glow-blue"
                style={{ width: `${count}%` }}
              />
            </div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-10 font-mono text-[10px] uppercase tracking-[0.45em] text-steel/70"
          >
            Precision in every detail
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
