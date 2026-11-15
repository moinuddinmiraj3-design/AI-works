import { replyBreakdown } from "@/lib/mock";
import { cn } from "@/lib/utils";

/** Segmented bar: share of sent emails by outcome. */
export function ReplyBreakdown() {
  return (
    <div className="mt-auto pt-4">
      <div className="flex gap-1">
        {replyBreakdown.map((s, i) => (
          <div key={s.key} className="relative" style={{ width: `${s.pct}%` }}>
            <div className={cn("mb-1.5 text-[10px] tabular", i === 0 ? "text-primary" : "text-gray-400")}>
              {i === 0 ? (
                <span className="inline-flex h-4 items-center rounded-full bg-primary px-1.5 font-medium text-white">{s.pct}%</span>
              ) : (
                <span className="inline-block h-4 leading-4">{s.pct}%</span>
              )}
            </div>
            <div className={cn("h-1.5 rounded-full", s.color)} />
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
        {replyBreakdown.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
            <span className={cn("size-1.5 rounded-full", s.dot)} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
