import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { initLenis, getLenis } from "./lib/lenis";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Values from "./components/Values";
import Capabilities from "./components/Capabilities";
import Vision from "./components/Vision";
import Contact from "./components/Contact";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-pulse glow-blue"
      style={{ scaleX }}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = initLenis();
    lenis.stop();
    const t = setTimeout(() => {
      setLoading(false);
      lenis.start();
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // keep lenis state authoritative once mounted
    if (!loading) getLenis()?.start();
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-ink font-sans text-mist antialiased">
      <Preloader done={!loading} />
      <Cursor />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero loading={loading} />
        <Marquee
          items={[
            "Precision in every detail",
            "Progress without limits",
            "Engineering the future",
            "Building what's next",
          ]}
        />
        <About />
        <Values />
        <Capabilities />
        <Vision />
        <Marquee
          fast
          items={[
            "Let's engineer it",
            "Pinnacle Engineering",
            "Progress without limits",
            "Pinnacle Engineering",
          ]}
          className="border-b-0"
        />
        <Contact />
      </main>

      {/* global film grain */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[100]" />
    </div>
  );
}
