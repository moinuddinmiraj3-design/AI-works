"use client";

import { CalendarDays } from "lucide-react";
import { OptionsMenu } from "@/components/ui/pop";

export function OverviewHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">Hiring overview</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Everything Lasso found, shortlisted and sent for you this month.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden shrink-0 items-center gap-1.5 text-xs text-gray-500 sm:inline-flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Live updates
        </span>
        <OptionsMenu
          align="end"
          icon={CalendarDays}
          value="This month"
          options={["This week", "This month", "Last 30 days", "This quarter"]}
          triggerClassName="inline-flex h-8 items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 text-xs font-medium shadow-xs hover:bg-gray-25"
        />
      </div>
    </div>
  );
}
