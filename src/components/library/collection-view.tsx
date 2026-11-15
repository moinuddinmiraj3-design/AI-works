"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, ChevronRight, Download, Eye, Folder, Link2, Loader2, MailSearch, Plus, Search, Send, Share2, Trash2, Users, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutreachPill } from "./outreach-pill";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogAction } from "@/components/ui/pop";
import { ProfilePane } from "@/components/search/profile-pane";
import { criteriaSets, searchOf } from "@/lib/search-mock";
import { toast } from "@/components/ui/toaster";
import { ShareDialog } from "@/components/popups/common-popups";
import { NewCollectionDialog } from "@/components/popups/shell-popups";
import { CollectionFilterPopover } from "@/components/popups/page-popups";
import { collections } from "@/lib/mock";
import type { Candidate, Member, Outreach } from "@/lib/search-mock";
import { toneClasses } from "@/lib/tone";
import { cn } from "@/lib/utils";

type Row = Member & { c: Candidate };
type View = "all" | Outreach;

const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";

function Box({ checked, onClick, label }: { checked: boolean | "mixed"; onClick: () => void; label: string }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      data-check
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn(
        "grid size-4 place-items-center rounded-[5px] border transition-colors",
        checked ? "border-ink-900 bg-ink-900 text-white" : "border-gray-300 bg-white hover:border-gray-400"
      )}
    >
      {checked === "mixed" ? <span className="h-0.5 w-2 rounded-full bg-white" /> : checked ? <Check className="size-3" strokeWidth={3} /> : null}
    </button>
  );
}

export function CollectionView({ collectionId, rows: initialRows }: { collectionId: string; rows: Row[] }) {
  const col = collections.find((c) => c.id === collectionId)!;
  const [rows, setRows] = useState(initialRows);
  const [view, setView] = useState<View>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [finding, setFinding] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const shown = rows.filter(
    (r) => (view === "all" || r.outreach === view) && (r.c.name + r.c.title + r.c.company).toLowerCase().includes(query.toLowerCase())
  );
  const counts = useMemo(() => {
    const n = (o: Outreach) => rows.filter((r) => r.outreach === o).length;
    return { all: rows.length, "not-contacted": n("not-contacted"), emailed: n("emailed") + n("opened"), replied: n("replied") };
  }, [rows]);
  const withEmail = rows.filter((r) => r.email).length;
  const allChecked = shown.length > 0 && shown.every((r) => selected.includes(r.id));
  const someChecked = shown.some((r) => selected.includes(r.id));

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const findEmail = (ids: string[]) => {
    const targets = ids.filter((id) => !rows.find((r) => r.id === id)?.email);
    if (!targets.length) return;
    setFinding((f) => [...f, ...targets]);
    setTimeout(() => {
      setRows((rs) => rs.map((r) => (targets.includes(r.id) ? { ...r, email: r.c.name.split(" ")[0].toLowerCase() + "@" + r.c.company.toLowerCase().replace(/\s+/g, "") + ".com" } : r)));
      setFinding((f) => f.filter((x) => !targets.includes(x)));
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-24 pt-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={cn("grid size-11 place-items-center rounded-xl", toneClasses[col.tone])}>
            <Folder className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">{col.name}</h1>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {rows.length} candidates · {withEmail} with email · Created by Alex Morgan
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ShareDialog
            title={`Share “${col.name}”`}
            link={`collection-${col.id}`}
            triggerClassName="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25"
            trigger={<><Share2 className="size-3.5 text-gray-500" />Share</>}
          />
          <button
            data-toast={`${col.name}.csv downloaded`}
            onClick={() => toast(`${col.name}.csv downloaded`)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25"
          >
            <Download className="size-3.5 text-gray-500" />Export CSV
          </button>
          <Link href="/outreach/sequences/sq1" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800">
            <Send className="size-3.5" />Add to sequence
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[232px_minmax(0,1fr)]">
        {/* Collections list */}
        <aside className="space-y-3">
          <div className={cn(card, "p-2")}>
            <div className="flex items-center justify-between px-2 pb-1.5 pt-1">
              <span className="text-[13px] font-medium">Collections</span>
              <span className="text-xs text-gray-400 tabular">{collections.length}</span>
            </div>
            <ul className="space-y-0.5">
              {collections.map((c) => {
                const active = c.id === collectionId;
                return (
                  <li key={c.id}>
                    <Link
                      href={`/collections/${c.id}`}
                      aria-current={active ? "page" : undefined}
                      className={cn("flex items-center gap-2.5 rounded-xl px-2 py-2 text-[13px] transition-colors", active ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-foreground")}
                    >
                      <span className={cn("grid size-6 shrink-0 place-items-center rounded-lg", toneClasses[c.tone])}>
                        <Folder className="size-3" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-gray-400 tabular">{c.id === collectionId ? rows.length : c.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <NewCollectionDialog
              triggerClassName="mt-1 flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 text-xs text-gray-500 hover:border-gray-400 hover:text-foreground"
              trigger={<><Plus className="size-3.5" />New collection</>}
            />
          </div>

          <div className={cn(card, "hidden p-4 lg:block")}>
            <div className="text-[13px] font-medium">Email coverage</div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-medium leading-none tracking-[-0.02em] tabular">{withEmail}</span>
              <span className="text-xs text-muted-foreground">of {rows.length} ready to contact</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-ink-900 transition-all" style={{ width: `${rows.length ? (withEmail / rows.length) * 100 : 0}%` }} />
            </div>
            {withEmail < rows.length && (
              <button
                data-find-all
                onClick={() => findEmail(rows.map((r) => r.id))}
                className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full bg-gray-50 text-xs font-medium hover:bg-gray-100"
              >
                <MailSearch className="size-3.5 text-gray-500" />Find {rows.length - withEmail} missing emails
              </button>
            )}
          </div>
        </aside>

        {/* Table */}
        <section className={cn(card, "min-w-0 p-0")}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] p-3">
            <Tabs value={view} onValueChange={(v) => setView(v as View)}>
              <TabsList>
                <TabsTrigger value="all" data-tab="all">All <span className="text-gray-400 tabular">{counts.all}</span></TabsTrigger>
                <TabsTrigger value="not-contacted" data-tab="not-contacted">Not contacted <span className="text-gray-400 tabular">{counts["not-contacted"]}</span></TabsTrigger>
                <TabsTrigger value="emailed" data-tab="emailed">Emailed <span className="text-gray-400 tabular">{counts.emailed}</span></TabsTrigger>
                <TabsTrigger value="replied" data-tab="replied">Replied <span className="text-gray-400 tabular">{counts.replied}</span></TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <label className="flex h-8 items-center gap-2 rounded-full border border-black/[0.08] bg-gray-25 px-3 focus-within:border-gray-300 focus-within:bg-white">
                <Search className="size-3.5 text-gray-400" />
                <input id="collection-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people" className="w-28 bg-transparent text-xs outline-none placeholder:text-gray-400 sm:w-40" />
              </label>
              <CollectionFilterPopover />
            </div>
          </div>

          {rows.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No one in this collection yet"
              description="Shortlist people from a search, or save someone from their profile with “Save to collection”."
            >
              <Link href="/search/new" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"><Search className="size-3.5" />Find people</Link>
              <Link href="/search/s1" className="inline-flex h-9 items-center rounded-full border border-black/[0.06] bg-white px-4 text-xs font-medium shadow-xs hover:bg-gray-25">Open a recent search</Link>
            </EmptyState>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-gray-400">
                  <th className="w-10 py-2.5 pl-4 pr-1 font-normal">
                    <Box checked={allChecked ? true : someChecked ? "mixed" : false} label="Select all" onClick={() => setSelected(allChecked ? [] : shown.map((r) => r.id))} />
                  </th>
                  <th className="px-3 py-2.5 font-normal">Candidate</th>
                  <th className="px-3 py-2.5 font-normal">Email</th>
                  <th className="w-16 px-3 py-2.5 font-normal">Profile</th>
                  <th className="w-40 px-3 py-2.5 font-normal">Match</th>
                  <th className="px-3 py-2.5 font-normal">Status</th>
                  <th className="px-3 py-2.5 font-normal">Added</th>
                  <th className="w-20 px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => {
                  const on = selected.includes(r.id);
                  return (
                    <tr key={r.id} data-row={r.id} data-outreach={r.outreach} className={cn("group border-t border-black/[0.05] transition-colors", on ? "bg-brand-50/50" : "hover:bg-gray-25")}>
                      <td className="py-2.5 pl-4 pr-1"><Box checked={on} label={`Select ${r.c.name}`} onClick={() => toggle(r.id)} /></td>
                      <td className="px-3 py-2.5">
                        <Link href={`/candidates/${r.id}`} className="flex items-center gap-3">
                          <img src={r.c.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover ring-1 ring-black/5" />
                          <span className="min-w-0 leading-tight">
                            <span className="block font-medium group-hover:underline">{r.c.name}</span>
                            <span className="block text-xs text-muted-foreground">{r.c.title} · {r.c.company}</span>
                            <span className="block text-[11px] text-gray-400">{r.c.location}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-2.5" data-email-cell>
                        {r.email ? (
                          <span className="text-xs text-gray-600">{r.email}</span>
                        ) : finding.includes(r.id) ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500"><Loader2 className="size-3.5 animate-spin" />Finding email…</span>
                        ) : (
                          <button data-find-email onClick={() => findEmail([r.id])} className="inline-flex h-7 items-center gap-1.5 rounded-full border border-dashed border-gray-300 px-2.5 text-xs text-gray-600 hover:border-gray-400 hover:text-foreground">
                            <MailSearch className="size-3.5" />Find email
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <button
                          aria-label={`Open ${r.c.name}'s public profile`}
                          data-toast={`Opens ${r.c.name.split(" ")[0]}'s public profile in a new tab`}
                          onClick={() => toast(`Opens ${r.c.name.split(" ")[0]}'s public profile in a new tab`)}
                          className="inline-grid size-7 place-items-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-foreground"
                        >
                          <Link2 className="size-3.5" />
                        </button>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-2.5">
                          <span className="h-1.5 flex-1 rounded-full bg-gray-100">
                            <span className="block h-full rounded-full bg-ink-900" style={{ width: `${r.c.match}%` }} />
                          </span>
                          <span className="w-8 text-right text-xs font-medium tabular">{r.c.match}%</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5"><OutreachPill value={r.outreach} /></td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-xs text-muted-foreground">{r.added}</td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="inline-flex items-center gap-0.5">
                          <Dialog
                            side="right"
                            title={r.c.name}
                            description={`${r.c.title} at ${r.c.company}`}
                            triggerLabel={`Quick view ${r.c.name}`}
                            triggerClassName="inline-grid size-7 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            trigger={<Eye className="size-4" />}
                            footer={<DialogAction primary href={`/candidates/${r.id}`}>Open full profile<ChevronRight className="size-3.5" /></DialogAction>}
                          >
                            <div className="-mx-5 -mb-5">
                              <ProfilePane c={r.c} criteriaList={criteriaSets[searchOf(r.id)].items} flat />
                            </div>
                          </Dialog>
                          <Link href={`/candidates/${r.id}`} aria-label={`Open ${r.c.name}`} className="inline-grid size-7 place-items-center rounded-full text-gray-300 hover:bg-gray-100 hover:text-gray-600">
                            <ChevronRight className="size-4" />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-14 text-center text-xs text-muted-foreground">
                      <div className="text-[13px] font-medium text-foreground">No one here</div>
                      Try another tab or clear the search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </section>
      </div>

      {/* Bulk actions */}
      <div
        data-bulk
        className={cn(
          "fixed inset-x-0 bottom-[calc(20px+env(safe-area-inset-bottom,0px))] z-40 mx-auto flex w-fit max-w-[calc(100vw-32px)] items-center gap-1 rounded-full bg-ink-900 p-1.5 pl-4 text-xs text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] transition-all duration-200",
          selected.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <span className="mr-2 whitespace-nowrap"><span data-selected-count className="font-medium tabular">{selected.length}</span> selected</span>
        <button onClick={() => findEmail(selected)} className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3 hover:bg-white/10"><MailSearch className="size-3.5" />Find emails</button>
        <Link href="/outreach/sequences/sq1" className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 font-medium text-ink-900 hover:bg-white/90"><Send className="size-3.5" />Add to sequence</Link>
        <button onClick={() => { setRows((rs) => rs.filter((r) => !selected.includes(r.id))); setSelected([]); }} className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3 hover:bg-white/10"><Trash2 className="size-3.5" />Remove</button>
        <button aria-label="Clear selection" onClick={() => setSelected([])} className="grid size-8 place-items-center rounded-full text-ink-300 hover:bg-white/10 hover:text-white"><X className="size-3.5" /></button>
      </div>
    </div>
  );
}
