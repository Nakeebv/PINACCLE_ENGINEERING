import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}

export const getLenis = () => lenis;

export function scrollToId(target: string) {
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
