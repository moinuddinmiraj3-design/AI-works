import { Check, Minus, X } from "lucide-react";
import type { CriterionResult } from "@/lib/search-mock";
import { cn } from "@/lib/utils";

export const resultStyle: Record<CriterionResult, string> = {
  met: "bg-ink-900 text-white",
  partial: "bg-white text-gray-500 ring-1 ring-inset ring-gray-300",
  missing: "bg-gray-100 text-gray-300",
};

export function CriterionIcon({ result, className }: { result: CriterionResult; className?: string }) {
  const Icon = result === "met" ? Check : result === "partial" ? Minus : X;
  return (
    <span className={cn("grid size-4 shrink-0 place-items-center rounded-full", resultStyle[result], className)}>
      <Icon className="size-2.5" strokeWidth={3} />
    </span>
  );
}
