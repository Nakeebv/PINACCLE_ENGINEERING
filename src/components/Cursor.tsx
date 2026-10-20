import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHovered(!!t.closest("a, button, [data-cursor]"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* core dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-pulse"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* trailing reticle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[119] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: label ? 76 : hovered ? 52 : 34,
            height: label ? 76 : hovered ? 52 : 34,
            opacity: 1,
            scale: pressed ? 0.82 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className={`flex items-center justify-center rounded-full border ${
            label
              ? "border-pulse bg-pulse/90 glow-blue"
              : hovered
                ? "border-pulse/80 bg-pulse/10"
                : "border-white/30 bg-transparent"
          }`}
        >
          {label && (
            <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-ink">
              {label}
            </span>
          )}
          {!label && hovered && (
            <span className="h-1 w-1 rounded-full bg-pulse" />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
