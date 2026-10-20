import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/*  Diamond separator — echoes the peak of the mark                    */
/* ------------------------------------------------------------------ */
export function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 ${className}`} aria-hidden>
      <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal wrapper                                              */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section header — technical drawing style label                     */
/* ------------------------------------------------------------------ */
export function SectionHead({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex items-center gap-4 ${className}`} y={16}>
      <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-pulse">
        <Diamond className="h-1.5 w-1.5" />
        PE—{index}
      </span>
      <span className="h-px flex-1 bg-white/10" />
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">
        {label}
      </span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic wrapper — physics-based pull toward the cursor            */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner ticks — technical drawing registration marks                */
/* ------------------------------------------------------------------ */
export function CornerTicks({ className = "" }: { className?: string }) {
  const base = "pointer-events-none absolute h-3.5 w-3.5 border-pulse/70";
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
