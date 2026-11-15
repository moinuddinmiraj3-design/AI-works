"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FolderPlus, Pencil } from "lucide-react";
import { OptionsMenu } from "@/components/ui/pop";
import { CollectionPicker } from "@/components/popups/common-popups";
import { LimitDialog, MatchPopover } from "@/components/popups/page-popups";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssistantPane } from "./assistant-pane";
import { CandidateCard } from "./candidate-card";
import { ProfilePane } from "./profile-pane";
import { candidates as initial, pool } from "@/lib/search-mock";

type View = "all" | "shortlisted" | "hidden";

export function SearchWorkspace({ title, description, progress }: { title: string; description: string; progress: number }) {
  const [list, setList] = useState(initial);
  const [view, setView] = useState<View>("all");
  const [selectedId, setSelectedId] = useState(initial[0].id);

  const counts = useMemo(
    () => ({
      all: list.filter((c) => c.status !== "hidden").length,
      shortlisted: list.filter((c) => c.status === "shortlisted").length,
      hidden: list.filter((c) => c.status === "hidden").length,
    }),
    [list]
  );
  const shown = list.filter((c) => (view === "all" ? c.status !== "hidden" : c.status === view));
  const selected = list.find((c) => c.id === selectedId) ?? list[0];

  const setStatus = (id: string, next: (s: (typeof list)[number]["status"]) => (typeof list)[number]["status"]) =>
    setList((l) => l.map((c) => (c.id === id ? { ...c, status: next(c.status) } : c)));

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">{title}</h1>
            <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-brand-50 px-2.5 text-xs font-medium text-brand-700">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-500" />
              Searching · {Math.round(progress * 100)}%
            </span>
          </div>
          <p className="mt-1 max-w-2xl truncate text-[13px] text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/search/new" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25">
            <Pencil className="size-3.5 text-gray-500" />Edit search
          </Link>
          <CollectionPicker
            align="end"
            triggerClassName="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"
            trigger={<><FolderPlus className="size-3.5" />Add <span data-count="shortlisted">{counts.shortlisted}</span> to collection</>}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <Tabs value={view} onValueChange={(v) => setView(v as View)}>
          <TabsList>
            <TabsTrigger value="all" data-tab="all">Matches <span className="text-gray-400 tabular">{pool.excellent}</span></TabsTrigger>
            <TabsTrigger value="shortlisted" data-tab="shortlisted">Shortlisted <span data-count="shortlisted" className="text-gray-400 tabular">{counts.shortlisted}</span></TabsTrigger>
            <TabsTrigger value="hidden" data-tab="hidden">Hidden <span data-count="hidden" className="text-gray-400 tabular">{counts.hidden}</span></TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <MatchPopover />
          <OptionsMenu align="end" width={210} value="Best match" options={["Best match", "Newest first", "Most experience", "Open to work first"]} />
        </div>
      </div>

      {/* Panes */}
      <div className="mt-3 grid min-h-0 grid-cols-1 gap-3 lg:h-[calc(100dvh-202px)] lg:min-h-[560px] lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[288px_minmax(0,1fr)_340px]">
        <div className="hidden min-h-0 lg:flex lg:flex-col">
          <AssistantPane />
        </div>

        <div data-card-list className="min-h-0 space-y-3 lg:overflow-y-auto lg:pr-1">
          {shown.length === 0 && (
            <div data-empty className="grid h-48 place-items-center rounded-2xl border border-dashed border-gray-300 text-center text-xs text-muted-foreground">
              <div>
                <div className="text-[13px] font-medium text-foreground">Nothing here yet</div>
                {view === "shortlisted" ? "Shortlist candidates from Matches to collect them here." : "Candidates you hide show up here."}
              </div>
            </div>
          )}
          {shown.map((c) => (
            <CandidateCard
              key={c.id}
              c={c}
              selected={c.id === selected.id}
              onSelect={() => setSelectedId(c.id)}
              onShortlist={() => setStatus(c.id, (s) => (s === "shortlisted" ? "new" : "shortlisted"))}
              onHide={() => setStatus(c.id, (s) => (s === "hidden" ? "new" : "hidden"))}
            />
          ))}
          {view === "all" && shown.length > 0 && (
            <div data-load-more>
              <LimitDialog
                triggerClassName="h-10 w-full rounded-2xl border border-dashed border-gray-300 text-xs text-gray-500 hover:border-gray-400 hover:text-foreground"
                trigger={<>Load more matches · {pool.excellent - shown.length} more</>}
              />
            </div>
          )}
        </div>

        <div className="hidden min-h-0 xl:flex xl:flex-col">
          <ProfilePane c={selected} />
        </div>
      </div>
    </div>
  );
}
