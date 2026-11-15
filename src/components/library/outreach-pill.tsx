import type { Outreach } from "@/lib/search-mock";
import { outreachLabel } from "@/lib/search-mock";
import { cn } from "@/lib/utils";

const style: Record<Outreach, string> = {
  replied: "border-transparent bg-brand-50 text-brand-700",
  opened: "border-transparent bg-gray-100 text-foreground",
  emailed: "border-black/[0.08] bg-white text-gray-600",
  "not-contacted": "border-dashed border-black/[0.14] bg-white text-gray-400",
};

export function OutreachPill({ value, className }: { value: Outreach; className?: string }) {
  return (
    <span className={cn("inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-xs font-medium", style[value], className)}>
      {value === "replied" && <span className="size-1.5 rounded-full bg-brand-500" />}
      {outreachLabel[value]}
    </span>
  );
}
