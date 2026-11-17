"use client";

import { useState } from "react";
import { Card, Delta } from "@/components/ui/delta";
import { OptionsMenu } from "@/components/ui/pop";
import { pipelineDays } from "@/lib/mock";
import { cn } from "@/lib/utils";

// Rows follow the busiest day so the grid never has a tall empty band.
const legend = [
  { key: "replied", label: "Replied", className: "bg-primary" },
  { key: "contacted", label: "Contacted", className: "bg-ink-900" },
  { key: "shortlisted", label: "Shortlisted", className: "bg-gray-300" },
] as const;

const totalOf = (d: (typeof pipelineDays)[number]) => d.shortlisted + d.contacted + d.replied;
const ROWS = Math.max(...pipelineDays.map(totalOf));

/**
 * Square-grid chart: one column per day, one square per candidate,
 * stacked replied → contacted → shortlisted from the bottom.
 * Square size follows the card width (container query units), so cells stay square.
 */
export function ActivityChart() {
  const today = pipelineDays.length - 1;
  const [active, setActive] = useState(today);
  const sum = pipelineDays.reduce(
    (a, d) => ({ s: a.s + d.shortlisted, c: a.c + d.contacted, r: a.r + d.replied }),
    { s: 0, c: 0, r: 0 }
  );
  const d = pipelineDays[active];

  return (
    <Card className="flex w-full flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[13px] font-medium">Pipeline activity</div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="text-[24px] font-medium leading-none tracking-[-0.02em] tabular">{sum.c + sum.r}</span>
            <span className="text-xs text-muted-foreground">contacted</span>
            <Delta value={8.6} suffix="vs last 14 days" className="rounded-full bg-gray-50 py-0.5 pl-0.5 pr-2" />
          </div>
        </div>
        <OptionsMenu
          align="end"
          width={160}
          value="14 days"
          options={["7 days", "14 days", "30 days"]}
          triggerClassName="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border bg-white px-2.5 text-xs text-gray-600 hover:bg-gray-25"
        />
      </div>

      <div className="@container mt-auto pt-5" title="Each square is one candidate">
        <div
          className="flex justify-center gap-1"
          style={{ ["--cell" as string]: "clamp(12px, calc((100cqw - 13 * 4px) / 14), 38px)" }}
          onMouseLeave={() => setActive(today)}
        >
          {pipelineDays.map((day, i) => {
            const cells = [
              ...Array(day.replied).fill("bg-primary"),
              ...Array(day.contacted).fill("bg-ink-900"),
              ...Array(day.shortlisted).fill("bg-gray-300"),
            ];
            const on = i === active;
            const total = totalOf(day);
            return (
              <button
                key={day.day}
                data-col={i}
                data-day={day.day}
                data-s={day.shortlisted}
                data-c={day.contacted}
                data-r={day.replied}
                aria-label={`${day.day}: ${day.shortlisted} shortlisted, ${day.contacted} contacted, ${day.replied} replied`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative flex flex-col items-center"
              >
                <div className="flex flex-col-reverse gap-1">
                  {Array.from({ length: ROWS }).map((_, r) => (
                    <span
                      key={r}
                      className={cn("rounded-[4px]", cells[r] ?? "bg-gray-50 [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,.045)_0_1.5px,transparent_1.5px_5px)]")}
                      style={{ width: "var(--cell)", height: "var(--cell)" }}
                    />
                  ))}
                </div>
                {on && (
                  <span
                    data-tag
                    className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm"
                    style={{ bottom: `calc(${total} * (var(--cell) + 4px) + 28px)` }}
                  >
                    {total}
                  </span>
                )}
                <span data-label className={cn("mt-2 text-[10px] tabular", on ? "font-medium text-foreground" : "text-gray-400", i % 2 === 1 && !on && "max-sm:invisible")}>
                  {day.day.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t pt-2.5 text-xs">
          <span className="flex flex-wrap gap-x-3 gap-y-1 tabular">
            {legend.map((l) => (
              <span key={l.key} className="inline-flex items-center gap-1.5">
                <span className={cn("size-2 rounded-[2px]", l.className)} />
                <span data-f={l.key} className="font-medium">{d[l.key]}</span>
                <span className="text-muted-foreground">{l.label.toLowerCase()}</span>
              </span>
            ))}
          </span>
          <span data-f="day" className="text-muted-foreground">{d.day}</span>
        </div>
      </div>
    </Card>
  );
}
