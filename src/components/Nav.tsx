import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Lockup } from "./Logo";
import { scrollToId, scrollToTop } from "../lib/lenis";
import { EASE } from "./ui";

const LINKS = [
  { n: "01", label: "About", href: "#about" },
  { n: "02", label: "Values", href: "#values" },
  { n: "03", label: "Capabilities", href: "#capabilities" },
  { n: "04", label: "Vision", href: "#vision" },
  { n: "05", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // let the overlay start closing before we glide
    setTimeout(() => scrollToId(href), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <button onClick={scrollToTop} aria-label="Back to top" data-cursor>
            <Lockup />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.slice(0, 4).map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-steel transition-colors hover:text-mist"
              >
                <span className="text-[8px] text-pulse/80">{l.n}</span>
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-pulse transition-all duration-400 group-hover:w-full" />
                </span>
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              className="group ml-2 flex items-center gap-2 border border-pulse/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-pulse transition-all duration-300 hover:bg-pulse hover:text-ink"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          <button
            className="text-mist lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* ---------------- mobile overlay menu ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[105] flex flex-col bg-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative flex h-16 items-center justify-between px-5">
              <Lockup />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-mist" />
              </button>
            </div>
            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: EASE }}
                  onClick={() => go(l.href)}
                  className="group flex items-baseline gap-4 border-b border-white/5 py-4 text-left"
                >
                  <span className="font-mono text-xs text-pulse">{l.n}</span>
                  <span className="font-display text-3xl font-bold uppercase text-mist transition-colors group-hover:text-pulse">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="relative px-6 pb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
              Precision in every detail — Progress without limits
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
