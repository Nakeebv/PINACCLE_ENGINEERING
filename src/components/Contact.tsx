import { ArrowUpRight, ArrowUp, Mail, Phone, Globe } from "lucide-react";
import { SectionHead, Reveal, Magnetic } from "./ui";
import { Lockup } from "./Logo";
import { scrollToId, scrollToTop } from "../lib/lenis";

const CONTACTS = [
  { icon: Mail, label: "Email", value: "hello@pinnacle.engineering" },
  { icon: Phone, label: "Direct", value: "+1 (555) 013-4400" },
  { icon: Globe, label: "Operations", value: "Global — 24/7 response" },
];

const FOOT_LINKS = [
  { label: "About", href: "#about" },
  { label: "Values", href: "#values" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Vision", href: "#vision" },
];

export default function Contact() {
  return (
    <footer id="contact" className="relative border-t border-white/5 bg-coal/30">
      {/* ---------------- CTA ---------------- */}
      <div className="relative mx-auto max-w-[1600px] overflow-hidden px-5 py-24 md:px-10 md:py-36">
        <div className="bg-blueprint absolute inset-0 opacity-40 mask-fade-radial" />
        <SectionHead index="05" label="Contact" />

        <div className="relative mt-12 grid items-center gap-12 md:mt-20 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
                <span className="text-outline">Have an ambitious</span>
                <br />
                <span className="text-outline">idea?</span>{" "}
                <span className="text-chrome">Let's</span>
                <br />
                <span className="text-chrome">engineer</span>{" "}
                <span className="text-pulse">it.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-lg leading-relaxed text-steel">
                From a complex technical challenge to a large-scale industrial
                opportunity — bring us the problem, and we will bring the
                precision.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="justify-self-start lg:justify-self-end">
            <Magnetic strength={0.45}>
              <a
                href="mailto:hello@pinnacle.engineering"
                data-cursor-label="SEND"
                className="group relative flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-full bg-pulse text-ink transition-transform duration-300 glow-blue hover:scale-[1.04] md:h-56 md:w-56"
              >
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-8 md:w-8" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
                  Start a project
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">
                  hello@pinnacle.engineering
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="relative mt-20 grid gap-px border border-white/5 bg-white/5 md:grid-cols-3">
            {CONTACTS.map((c) => (
              <div
                key={c.label}
                className="group flex items-center gap-5 bg-coal px-6 py-6 transition-colors duration-300 hover:bg-panel"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-white/10 text-steel transition-colors duration-300 group-hover:border-pulse/50 group-hover:text-pulse">
                  <c.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-steel">
                    {c.label}
                  </div>
                  <div className="mt-1 font-medium text-mist">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---------------- footer ---------------- */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Lockup
              markClass="h-14"
              titleClass="text-2xl"
              subClass="text-[10px]"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">
              An engineering and technology company delivering innovative
              solutions, advancing industrial capabilities, and building what
              comes next.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
              Sitemap
            </div>
            <ul className="mt-5 space-y-3">
              {FOOT_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToId(l.href)}
                    className="group flex items-center gap-2 text-sm text-mist/80 transition-colors hover:text-pulse"
                  >
                    <span className="h-px w-0 bg-pulse transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
              Protocol
            </div>
            <ul className="mt-5 space-y-3 font-mono text-xs text-mist/70">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-steel">EMAIL</span>
                <span>hello@pinnacle.engineering</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-steel">DIRECT</span>
                <span>+1 (555) 013-4400</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-steel">OPS</span>
                <span>GLOBAL / 24-7</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-steel">STATUS</span>
                <span className="flex items-center gap-2 text-pulse">
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-pulse" />
                  ACCEPTING PROJECTS
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-steel md:flex-row md:items-center md:px-10">
            <span>© 2026 Pinnacle Engineering. All systems nominal.</span>
            <span className="text-mist/60">
              Precision in every detail — Progress without limits
            </span>
            <button
              onClick={scrollToTop}
              data-cursor
              className="group flex items-center gap-2 text-pulse"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
