"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Briefcase, Check, Globe, ListChecks, MapPin, Sparkles, X } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/delta";
import { AddCriterionPopover, AddFilterPopover } from "@/components/popups/page-popups";
import { criteria as initialCriteria, importanceLabel, roleTemplates, type Importance } from "@/lib/search-mock";
import { cn } from "@/lib/utils";

const EXAMPLE =
  "Senior product designer with 5+ years in B2B SaaS or dashboard products. Strong in Figma and prototyping, has done their own user research. Based in the US. Bonus if they've built a design system.";

const levels: Importance[] = ["very", "important", "nice"];
const levelStyle: Record<Importance, string> = {
  very: "bg-ink-900 text-white",
  important: "bg-gray-500 text-white",
  nice: "bg-gray-200 text-gray-700",
};

export function NewSearch() {
  const [text, setText] = useState(EXAMPLE);
  const [filters, setFilters] = useState<{ id: string; icon: React.ElementType; label: string }[]>([
    { id: "loc", icon: MapPin, label: "United States" },
    { id: "sen", icon: Briefcase, label: "Senior" },
    { id: "rem", icon: Globe, label: "Remote OK" },
  ]);
  const [crit, setCrit] = useState(initialCriteria.map((c) => ({ ...c, on: true })));

  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
      {/* Composer */}
      <Card className="flex flex-col xl:col-span-7">
        <CardTitle icon={Sparkles}>Describe the person</CardTitle>
        <p className="mt-1.5 text-xs text-muted-foreground">Write it the way you&apos;d brief a recruiter. Lasso turns it into criteria and scores every profile against them.</p>

        <div className="mt-4 rounded-xl border border-black/[0.08] bg-gray-25 p-3 transition-colors focus-within:border-gray-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-black/[0.04]">
          <textarea
            id="search-brief"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Senior product designer with B2B SaaS experience, based in the US"
            className="block w-full resize-none bg-transparent text-[14px] leading-relaxed outline-none placeholder:text-gray-400"
          />
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {filters.map((f) => (
              <span key={f.id} className="inline-flex h-7 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white pl-2.5 pr-1 text-xs shadow-xs">
                <f.icon className="size-3.5 text-gray-500" />
                {f.label}
                <button data-remove-chip aria-label={`Remove ${f.label}`} onClick={() => setFilters(filters.filter((x) => x.id !== f.id))} className="grid size-5 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-foreground">
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <AddFilterPopover onAdd={(f) => setFilters((fs) => [...fs, { id: f.label + fs.length, icon: f.icon, label: f.label }])} />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-muted-foreground">Or start from a role</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {roleTemplates.map((r) => (
              <button key={r} data-role-text={`${r} with 4+ years of experience, based in the US.`} onClick={() => setText(`${r} with 4+ years of experience, based in the US.`)} className="h-8 rounded-full bg-gray-50 px-3 text-[13px] text-gray-600 transition-colors hover:bg-gray-100 hover:text-foreground">
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-4 max-xl:mt-5">
          <span className="text-xs text-muted-foreground">
            Uses <span className="font-medium text-foreground">1</span> of your 16 searches left this month
          </span>
          <Link
            href="/search/searching"
            aria-disabled={!text.trim()}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full bg-ink-900 px-5 text-[13px] font-medium text-white transition-colors hover:bg-ink-800",
              !text.trim() && "pointer-events-none opacity-40"
            )}
          >
            <Sparkles className="size-4" />Find candidates
          </Link>
        </div>
      </Card>

      {/* Criteria preview */}
      <Card className="flex flex-col xl:col-span-5">
        <div className="flex items-center justify-between">
          <CardTitle icon={ListChecks}>Criteria Lasso will score</CardTitle>
          <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-600"><span data-active-count>{crit.filter((c) => c.on).length}</span> active</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">Read from your description. Set how much each one counts.</p>

        <ul className="mt-4 space-y-1.5">
          {crit.map((c, i) => (
            <li key={c.id} data-crit-row className={cn("flex items-center gap-2.5 rounded-xl bg-gray-25 px-2.5 py-2 transition-opacity", !c.on && "opacity-45")}>
              <button
                data-crit-toggle
                aria-label={c.on ? `Turn off ${c.label}` : `Turn on ${c.label}`}
                onClick={() => setCrit(crit.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                className={cn("grid size-5 shrink-0 place-items-center rounded-md border transition-colors", c.on ? "border-ink-900 bg-ink-900 text-white" : "border-gray-300 bg-white")}
              >
                {c.on && <Check className="size-3" strokeWidth={3} />}
              </button>
              <span className="min-w-0 flex-1 truncate text-[13px]">{c.label}</span>
              <div className="flex shrink-0 rounded-full bg-white p-0.5 shadow-[0_0_0_1px_rgba(16,24,40,0.06)]" role="radiogroup" aria-label={`Importance of ${c.label}`}>
                {levels.map((l) => (
                  <button
                    key={l}
                    data-level={l}
                    role="radio"
                    aria-checked={c.importance === l}
                    title={importanceLabel[l]}
                    onClick={() => setCrit(crit.map((x, j) => (j === i ? { ...x, importance: l } : x)))}
                    className={cn("h-6 rounded-full px-2 text-[11px] transition-colors", c.importance === l ? levelStyle[l] : "text-gray-500 hover:text-foreground")}
                  >
                    {l === "very" ? "Must" : l === "important" ? "High" : "Nice"}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <AddCriterionPopover onAdd={(label) => setCrit((c) => [...c, { id: "n" + c.length, label, importance: "important", matched: 0, on: true }])} />

        <div className="mt-auto flex items-center gap-2 pt-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-ink-900" />Must have</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-gray-500" />High</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-gray-300" />Nice to have</span>
          <span className="ml-auto inline-flex items-center gap-1">You can change these later <ArrowRight className="size-3" /></span>
        </div>
      </Card>
    </div>
  );
}
