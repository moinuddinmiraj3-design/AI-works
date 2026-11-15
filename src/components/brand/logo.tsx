import { cn } from "@/lib/utils";

/** Lasso mark: a wide rope loop with an S-curved rope trailing down, on a cobalt tile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-6", className)} aria-hidden>
      <rect width="32" height="32" rx="8" fill="var(--ink-900)" />
      <rect width="32" height="32" rx="8" fill="url(#lasso-sheen)" />
      <ellipse cx="16" cy="11" rx="9" ry="5" fill="none" stroke="#fff" strokeWidth="2.4" transform="rotate(-10 16 11)" />
      <path d="M10.5 15.2c2.6 2.4 6.6 2.2 7.4 5.2.6 2.3-1.2 3.9-3.4 4.6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="lasso-sheen" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-md font-semibold tracking-tight">Lasso</span>
    </span>
  );
}
