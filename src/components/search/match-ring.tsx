import { cn } from "@/lib/utils";

/** Circular match score. */
export function MatchRing({ value, size = 44, className }: { value: number; size?: number; className?: string }) {
  const stroke = size >= 56 ? 5 : 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className={cn("relative grid shrink-0 place-items-center", className)} style={{ width: size, height: size }} aria-label={`${value}% match`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--gray-100)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={value >= 80 ? "var(--ink-900)" : "var(--gray-400)"}
          strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className={cn("absolute font-medium tabular", size >= 56 ? "text-[15px]" : "text-[12px]")}>{value}%</span>
    </span>
  );
}
