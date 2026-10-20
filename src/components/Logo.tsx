import { useId } from "react";

/* ------------------------------------------------------------------ */
/*  Pinnacle mark — geometric recreation of the brand symbol           */
/*  Peak chevron + inner blue accent + italic P + blue delta wings     */
/* ------------------------------------------------------------------ */
export function Mark({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const silver = `pe-silver-${uid}`;
  const blue = `pe-blue-${uid}`;
  return (
    <svg viewBox="0 0 200 132" className={className} aria-hidden>
      <defs>
        <linearGradient id={silver} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5F8FA" />
          <stop offset="0.42" stopColor="#AFBAC5" />
          <stop offset="0.52" stopColor="#E9EFF4" />
          <stop offset="0.78" stopColor="#8B99A6" />
          <stop offset="1" stopColor="#54616D" />
        </linearGradient>
        <linearGradient id={blue} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#62B6FF" />
          <stop offset="1" stopColor="#1666C2" />
        </linearGradient>
      </defs>

      {/* outer peak */}
      <path
        fill={`url(#${silver})`}
        d="M100 6 L172 106 L150 106 L100 34 L50 106 L28 106 Z"
      />
      {/* inner blue chevron */}
      <path
        fill={`url(#${blue})`}
        d="M100 44 L128 80 L116 80 L100 58 L84 80 L72 80 Z"
      />
      {/* P — stem */}
      <path fill={`url(#${silver})`} d="M72 122 L82 60 H94 L84 122 Z" />
      {/* P — bowl */}
      <path
        fill={`url(#${silver})`}
        fillRule="evenodd"
        d="M92 58 H134 L149 71 L134 84 H92 Q82 84 82 71 Q82 58 92 58 Z M99 66 H129 L137 71 L129 76 H99 Q93 76 93 71 Q93 66 99 66 Z"
      />
      {/* delta wings */}
      <path fill={`url(#${blue})`} d="M6 125 L50 88 L72 88 L34 107 L26 125 Z" />
      <path fill={`url(#${blue})`} d="M194 125 L150 88 L128 88 L166 107 L174 125 Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Full lockup — mark + PINNACLE chrome + ENGINEERING blue            */
/* ------------------------------------------------------------------ */
export function Lockup({
  className = "",
  markClass = "h-9",
  titleClass = "text-sm",
  subClass = "text-[8px]",
}: {
  className?: string;
  markClass?: string;
  titleClass?: string;
  subClass?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Mark className={`${markClass} w-auto shrink-0`} />
      <div className="flex flex-col leading-none">
        <span className={`font-display italic font-extrabold tracking-wide text-chrome ${titleClass}`}>
          PINNACLE
        </span>
        <span
          className={`mt-1 flex items-center gap-1.5 font-display font-medium tracking-[0.42em] text-pulse ${subClass}`}
        >
          <span className="h-px flex-1 bg-pulse/60" />
          ENGINEERING
          <span className="h-px flex-1 bg-pulse/60" />
        </span>
      </div>
    </div>
  );
}
