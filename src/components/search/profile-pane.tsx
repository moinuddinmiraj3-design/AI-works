"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight, FolderPlus, GraduationCap, Link2, Mail, MapPin } from "lucide-react";
import { MatchRing } from "./match-ring";
import { CollectionPicker, ComposeDialog } from "@/components/popups/common-popups";
import { toast } from "@/components/ui/toaster";
import { CriterionIcon } from "./criterion-icon";
import { criteria, importanceLabel, type Candidate } from "@/lib/search-mock";
import { Roll } from "@/components/ui/fx";

const verdict = (m: number) => (m >= 90 ? "Excellent match" : m >= 80 ? "Strong match" : "Partial match");

export function ProfilePane({ c, criteriaList = criteria, flat }: { c: Candidate; criteriaList?: typeof criteria; flat?: boolean }) {
  return (
    <aside data-profile className={flat ? "flex min-h-0 flex-col" : "flex min-h-0 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]"}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-black/[0.06] p-4">
          <div className="flex items-start gap-3">
            <img src={c.avatar} alt="" className="size-14 rounded-full object-cover ring-1 ring-black/5" />
            <div className="min-w-0 flex-1 pt-0.5">
              <Link href={`/candidates/${c.id}`} className="text-[16px] font-medium leading-tight hover:underline">{c.name}</Link>
              <div className="mt-0.5 text-xs text-gray-600">{c.title} at {c.company}</div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="size-3" />{c.location}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-1.5">
            <CollectionPicker
              rootClassName="flex-1"
              triggerClassName="fx-btn inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full bg-ink-900 text-xs font-medium text-white hover:bg-ink-800"
              trigger={<><FolderPlus className="size-3.5" /><Roll>Add to collection</Roll></>}
            />
            <ComposeDialog
              to={c.name}
              first={c.name.split(" ")[0]}
              company={c.company}
              triggerLabel={`Email ${c.name}`}
              triggerClassName="grid size-8 place-items-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              trigger={<Mail className="size-3.5" />}
            />
            <button aria-label="Open profile link" data-toast="Opens their public profile in a new tab" onClick={() => toast("Opens their public profile in a new tab")} className="grid size-8 place-items-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"><Link2 className="size-3.5" /></button>
          </div>
        </div>

        {/* Match breakdown */}
        <section className="border-b border-black/[0.06] p-4">
          <div className="flex items-center gap-3">
            <MatchRing value={c.match} size={56} />
            <div>
              <div className="text-[14px] font-medium">{verdict(c.match)}</div>
              <div className="text-xs text-muted-foreground">
                Meets {Object.values(c.results).filter((r) => r === "met").length} of {criteriaList.length} criteria
              </div>
            </div>
          </div>
          <ul className="mt-3 space-y-2">
            {criteriaList.map((k) => (
              <li key={k.id} className="flex items-center gap-2 text-xs">
                <CriterionIcon result={c.results[k.id] ?? "missing"} />
                <span className="min-w-0 flex-1 truncate">{k.label}</span>
                <span className="shrink-0 text-[10px] text-gray-400">{importanceLabel[k.importance]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section className="border-b border-black/[0.06] p-4">
          <h3 className="flex items-center justify-between text-xs font-medium text-gray-500">
            Why Lasso picked them
            <Link href={`/candidates/${c.id}`} className="inline-flex items-center gap-0.5 font-normal text-foreground hover:underline">
              View full profile<ArrowUpRight className="size-3" />
            </Link>
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-gray-700">{c.summary}</p>
        </section>

        {/* Experience */}
        <section className="border-b border-black/[0.06] p-4">
          <h3 className="text-xs font-medium text-gray-500">Experience</h3>
          <ol className="relative mt-3 space-y-3.5 before:absolute before:bottom-2 before:left-[13px] before:top-2 before:w-px before:bg-black/[0.07]">
            {c.experience.map((e) => (
              <li key={e.company} className="relative flex gap-3">
                <span className={`z-10 grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-semibold ring-4 ring-white ${e.tone}`}>{e.company[0]}</span>
                <div className="min-w-0">
                  <div className="text-xs font-medium">{e.title}</div>
                  <div className="text-[11px] text-gray-500">{e.company} · {e.period}</div>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-600">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills + education */}
        <section className="p-4">
          <h3 className="text-xs font-medium text-gray-500">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {c.skills.map((s) => (
              <span key={s} className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] text-gray-600">{s}</span>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 text-xs text-gray-600">
            <GraduationCap className="mt-px size-3.5 shrink-0 text-gray-400" />
            {c.education}
          </div>
        </section>
      </div>
    </aside>
  );
}
