"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, Check, ChevronLeft, ChevronRight, Eye, Folder, GraduationCap, Link2, Mail, MailSearch,
  MapPin, MessageSquareReply, Plus, Search, Send, Star, UserCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchRing } from "@/components/search/match-ring";
import { CollectionPicker, ComposeDialog } from "@/components/popups/common-popups";
import { CandidateMoreMenu } from "@/components/popups/page-popups";
import { CriterionIcon } from "@/components/search/criterion-icon";
import { importanceLabel, outreachLabel, type Candidate, type Criterion, type Member, type Outreach } from "@/lib/search-mock";
import { toneDot } from "@/lib/tone";
import type { Tone } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";
import { Roll } from "@/components/ui/fx";

const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";
const actIcon: Record<string, React.ElementType> = { found: Search, shortlist: Star, email: Send, open: Eye, reply: MessageSquareReply };
const stages: { key: Outreach | "shortlisted"; label: string }[] = [
  { key: "shortlisted", label: "Shortlisted" },
  { key: "emailed", label: "Emailed" },
  { key: "opened", label: "Opened" },
  { key: "replied", label: "Replied" },
];

type Props = {
  c: Candidate;
  member: Member | null;
  searchTitle: string;
  criteria: Criterion[];
  activity: { kind: string; text: string; when: string }[];
  inCollections: { id: string; name: string; tone: Tone }[];
  back: { href: string; label: string };
  position: { index: number; total: number; prev: string | null; next: string | null };
};

export function CandidatePage({ c, member, searchTitle, criteria, activity, inCollections, back, position }: Props) {
  const [notes, setNotes] = useState([{ by: "Alex Morgan", when: "Nov 10", text: "Strong portfolio. Ask about the billing redesign and how she ran research with enterprise admins." }]);
  const [draft, setDraft] = useState("");
  const outreach: Outreach = member?.outreach ?? "not-contacted";
  const stageIndex = outreach === "not-contacted" ? 0 : stages.findIndex((s) => s.key === outreach);
  const met = Object.values(c.results).filter((r) => r === "met").length;

  return (
    <div className="mx-auto w-full max-w-[1684px] px-4 pb-10 pt-4 lg:px-8" data-swap-root>
      {/* Back + pager */}
      <div className="flex items-center justify-between gap-3">
        <Link href={back.href} className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-foreground">
          <ArrowLeft className="size-4" />{back.label}
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="tabular">{position.index} of {position.total}</span>
          {[{ id: position.prev, Icon: ChevronLeft, label: "Previous candidate" }, { id: position.next, Icon: ChevronRight, label: "Next candidate" }].map(({ id, Icon, label }) =>
            id ? (
              <Link key={label} href={`/candidates/${id}`} aria-label={label} className="grid size-8 place-items-center rounded-full border border-black/[0.06] bg-white shadow-xs hover:bg-gray-25">
                <Icon className="size-4 text-gray-600" />
              </Link>
            ) : (
              <span key={label} className="grid size-8 place-items-center rounded-full border border-black/[0.04] bg-white/60 text-gray-300"><Icon className="size-4" /></span>
            )
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-3">
          {/* Hero */}
          <section className={cn(card, "p-5")}>
            <div className="flex flex-wrap items-start gap-4">
              <img src={c.avatar} alt="" className="size-[72px] rounded-full object-cover ring-1 ring-black/5" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-[24px] font-medium leading-tight tracking-[-0.02em]">{c.name}</h1>
                  {c.openToWork && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-600 ring-1 ring-inset ring-black/[0.06]">
                      <span className="size-1.5 rounded-full bg-gray-500" />Open to work
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[14px] text-gray-600">{c.title} at {c.company}</div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{c.location}</span>
                  <span>{c.years} years experience</span>
                </div>
              </div>
              <div className="flex gap-2">
                <ComposeDialog
                  to={c.name}
                  email={member?.email}
                  first={c.name.split(" ")[0]}
                  company={c.company}
                  triggerClassName="fx-btn inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"
                  trigger={<><Mail className="size-3.5" /><Roll>Email</Roll></>}
                />
                <Link href="/outreach/sequences/sq1" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25">
                  <Send className="size-3.5 text-gray-500" />Add to sequence
                </Link>
                <CandidateMoreMenu name={c.name} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-black/[0.06] pt-4">
              {member?.email ? (
                <span className="inline-flex h-8 items-center gap-2 rounded-full bg-gray-50 px-3 text-xs"><Mail className="size-3.5 text-gray-400" />{member.email}</span>
              ) : (
                <button className="inline-flex h-8 items-center gap-2 rounded-full border border-dashed border-gray-300 px-3 text-xs text-gray-600 hover:border-gray-400 hover:text-foreground">
                  <MailSearch className="size-3.5" />Find email
                </button>
              )}
              <span className="inline-flex h-8 items-center gap-2 rounded-full bg-gray-50 px-3 text-xs"><Link2 className="size-3.5 text-gray-400" />Professional profile</span>
              <span className="inline-flex h-8 items-center gap-2 rounded-full bg-gray-50 px-3 text-xs"><Link2 className="size-3.5 text-gray-400" />Portfolio</span>
            </div>
          </section>

          {/* Tabs */}
          <section className={cn(card, "p-5")}>
            <Tabs defaultValue="overview" className="gap-0">
              <TabsList>
                <TabsTrigger value="overview" data-ptab="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity" data-ptab="activity">Activity <span className="text-gray-400 tabular">{activity.length}</span></TabsTrigger>
                <TabsTrigger value="notes" data-ptab="notes">Notes <span className="text-gray-400 tabular">{notes.length}</span></TabsTrigger>
              </TabsList>

              <TabsContent value="overview" forceMount data-panel="overview" className="mt-5 space-y-6 data-[state=inactive]:hidden">
                <div>
                  <h2 className="text-xs font-medium text-gray-500">Why Lasso picked them</h2>
                  <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-gray-700">{c.summary}</p>
                </div>
                <div>
                  <h2 className="text-xs font-medium text-gray-500">Experience</h2>
                  <ol className="relative mt-3 space-y-4 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-black/[0.07]">
                    {c.experience.map((e) => (
                      <li key={e.company} className="relative flex gap-3.5">
                        <span className={`z-10 grid size-8 shrink-0 place-items-center rounded-lg text-xs font-semibold ring-4 ring-white ${e.tone}`}>{e.company[0]}</span>
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium">{e.title}</div>
                          <div className="text-xs text-gray-500">{e.company} · {e.period}</div>
                          <p className="mt-1 text-xs leading-relaxed text-gray-600">{e.note}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h2 className="text-xs font-medium text-gray-500">Skills</h2>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.skills.map((s) => <span key={s} className="rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-600">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xs font-medium text-gray-500">Education</h2>
                    <div className="mt-2 flex items-start gap-2 text-[13px] text-gray-700">
                      <GraduationCap className="mt-0.5 size-4 shrink-0 text-gray-400" />{c.education}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" forceMount data-panel="activity" className="mt-5 data-[state=inactive]:hidden">
                <ol className="relative space-y-4 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-black/[0.07]">
                  {activity.map((a, i) => {
                    const Icon = actIcon[a.kind] ?? Check;
                    return (
                      <li key={i} className="relative flex gap-3.5">
                        <span className={cn("z-10 grid size-8 shrink-0 place-items-center rounded-full ring-4 ring-white", a.kind === "reply" ? "bg-brand-50 text-brand-600" : "bg-gray-100 text-gray-600")}>
                          <Icon className="size-3.5" />
                        </span>
                        <div className="pt-1.5">
                          <div className="text-[13px]">{a.text}</div>
                          <div className="text-[11px] text-gray-400">{a.when}</div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </TabsContent>

              <TabsContent value="notes" forceMount data-panel="notes" className="mt-5 space-y-3 data-[state=inactive]:hidden">
                <form
                  className="rounded-xl border border-black/[0.08] bg-gray-25 p-3 focus-within:border-gray-300 focus-within:bg-white"
                  onSubmit={(e) => { e.preventDefault(); if (!draft.trim()) return; setNotes([{ by: "Alex Morgan", when: "Just now", text: draft.trim() }, ...notes]); setDraft(""); toast("Note saved"); }}
                >
                  <textarea id="candidate-note" rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a note for your team…" className="block w-full resize-none bg-transparent text-[13px] outline-none placeholder:text-gray-400" />
                  <div className="mt-2 flex justify-end">
                    <button data-save-note disabled={!draft.trim()} className="fx-btn inline-flex h-8 items-center rounded-full bg-ink-900 px-3.5 text-xs font-medium text-white hover:bg-ink-800 disabled:pointer-events-none disabled:opacity-40"><Roll>Save note</Roll></button>
                  </div>
                </form>
                <ul className="space-y-2" data-notes>
                  {notes.map((n, i) => (
                    <li key={i} className="rounded-xl bg-gray-25 p-3">
                      <div className="text-[11px] text-gray-400"><span className="font-medium text-gray-600">{n.by}</span> · {n.when}</div>
                      <p className="mt-1 text-[13px] leading-relaxed text-gray-700">{n.text}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <section className={cn(card, "p-4")}>
            <div className="flex items-center gap-3">
              <MatchRing value={c.match} size={60} />
              <div className="min-w-0">
                <div className="text-[14px] font-medium">{c.match >= 90 ? "Excellent match" : c.match >= 80 ? "Strong match" : "Partial match"}</div>
                <div className="truncate text-xs text-muted-foreground">for {searchTitle} · meets {met} of {criteria.length}</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {criteria.map((k) => (
                <li key={k.id} className="flex items-center gap-2 text-xs">
                  <CriterionIcon result={c.results[k.id] ?? "missing"} />
                  <span className="min-w-0 flex-1 truncate">{k.label}</span>
                  <span className="shrink-0 text-[10px] text-gray-400">{importanceLabel[k.importance]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={cn(card, "p-4")}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium">Pipeline</span>
              <span className="text-xs text-muted-foreground">{member ? outreachLabel[outreach] : "Not saved yet"}</span>
            </div>
            <ol className="mt-3 space-y-0">
              {stages.map((s, i) => {
                const done = i < stageIndex || (i === 0 && !!member);
                const current = i === stageIndex && !!member;
                return (
                  <li key={s.key} className="relative flex items-center gap-3 pb-3 last:pb-0">
                    {i < stages.length - 1 && <span className={cn("absolute left-[9px] top-5 h-[calc(100%-12px)] w-px", i < stageIndex ? "bg-ink-900" : "bg-gray-200")} />}
                    <span className={cn("z-10 grid size-[19px] place-items-center rounded-full border", current ? "border-brand-500 bg-brand-500 text-white" : done ? "border-ink-900 bg-ink-900 text-white" : "border-gray-300 bg-white")}>
                      {(done || current) && <Check className="size-2.5" strokeWidth={3} />}
                    </span>
                    <span className={cn("text-[13px]", current ? "font-medium" : done ? "" : "text-gray-400")}>{s.label}</span>
                    {current && <span className="ml-auto text-[11px] text-brand-700">Current</span>}
                  </li>
                );
              })}
            </ol>
          </section>

          <section className={cn(card, "p-4")}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium">Collections</span>
              <UserCheck className="size-3.5 text-gray-400" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {inCollections.map((col) => (
                <Link key={col.id} href={`/collections/${col.id}`} className="inline-flex h-7 items-center gap-1.5 rounded-full bg-gray-50 px-2.5 text-xs hover:bg-gray-100">
                  <span className={cn("size-1.5 rounded-full", toneDot[col.tone])} />{col.name}
                </Link>
              ))}
              <CollectionPicker
                initial={inCollections.map((x) => x.id)}
                align="end"
                triggerClassName="inline-flex h-7 items-center gap-1 rounded-full border border-dashed border-gray-300 px-2.5 text-xs text-gray-500 hover:border-gray-400 hover:text-foreground"
                trigger={<><Plus className="size-3" />Add</>}
              />
            </div>
            {inCollections.length === 0 && <p className="mt-2 text-xs text-muted-foreground">Not in any collection yet.</p>}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-400"><Folder className="size-3" />Saved lists you can email in one go.</div>
          </section>
        </div>
      </div>
    </div>
  );
}
