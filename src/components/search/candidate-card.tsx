/* eslint-disable @next/next/no-img-element */
import { Check, EyeOff, MapPin, Undo2 } from "lucide-react";
import { MatchRing } from "./match-ring";
import { CriterionIcon } from "./criterion-icon";
import { criteria, type Candidate } from "@/lib/search-mock";
import { cn } from "@/lib/utils";

const short: Record<string, string> = {
  k1: "5+ yrs design", k2: "B2B SaaS", k3: "Figma", k4: "Research", k5: "US based", k6: "Design system",
};

export function CandidateCard({
  c, selected, onSelect, onShortlist, onHide,
}: { c: Candidate; selected: boolean; onSelect: () => void; onShortlist: () => void; onHide: () => void }) {
  return (
    <article
      data-candidate={c.id}
      data-status={c.status}
      onClick={onSelect}
      className={cn(
        "cursor-pointer rounded-2xl border bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-all",
        selected ? "border-brand-400 shadow-md" : "border-black/[0.06] hover:border-black/[0.12] hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        <img src={c.avatar} alt="" className="size-11 shrink-0 rounded-full object-cover ring-1 ring-black/5" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h3 className="text-[14px] font-medium">{c.name}</h3>
            {c.openToWork && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-1.5 py-px text-[10px] font-medium text-gray-600 ring-1 ring-inset ring-black/[0.06]">
                <span className="size-1 rounded-full bg-gray-500" />Open to work
              </span>
            )}
          </div>
          <div className="truncate text-xs text-gray-600">{c.title} · {c.company}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400">
            <MapPin className="size-3" />{c.location} · {c.years} yrs
          </div>
        </div>
        <MatchRing value={c.match} />
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-600">{c.summary}</p>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-x-3 gap-y-2.5">
        <ul className="flex min-w-0 flex-1 flex-wrap gap-1">
          {criteria.map((k) => (
            <li
              key={k.id}
              title={k.label}
              className={cn("inline-flex h-[22px] items-center gap-1 rounded-full bg-gray-25 pl-[3px] pr-2 text-[11px]", c.results[k.id] === "missing" && "text-gray-400")}
            >
              <CriterionIcon result={c.results[k.id]} />
              {short[k.id]}
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button data-action="hide" onClick={onHide} className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-foreground">
            {c.status === "hidden" ? <><Undo2 className="size-3.5" />Restore</> : <><EyeOff className="size-3.5" />Hide</>}
          </button>
          <button
            data-action="shortlist"
            onClick={onShortlist}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition-colors",
              c.status === "shortlisted" ? "bg-gray-100 text-foreground hover:bg-gray-200" : "bg-ink-900 text-white hover:bg-ink-800"
            )}
          >
            {c.status === "shortlisted" ? <><Check className="size-3.5" strokeWidth={2.5} />Shortlisted</> : "Shortlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
