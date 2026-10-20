import { Diamond } from "./ui";

export default function Marquee({
  items,
  className = "",
  fast = false,
}: {
  items: string[];
  className?: string;
  fast?: boolean;
}) {
  const Row = () => (
    <div className="flex w-max shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-display text-2xl font-bold uppercase tracking-tight md:px-10 md:text-4xl ${
              i % 2 === 0 ? "text-chrome" : "text-outline"
            }`}
          >
            {item}
          </span>
          <Diamond className="h-3 w-3 shrink-0 text-pulse" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-white/5 bg-coal/60 py-5 md:py-7 ${className}`}
    >
      <div className={`flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        <Row />
        <Row />
      </div>
    </div>
  );
}
