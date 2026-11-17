"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp, Briefcase, Check, Clock, Code, Database, FileText, FolderOpen, Globe, History, MapPin, Megaphone, Paperclip, PenTool,
  Search, SlidersHorizontal, Sparkles, X,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { OptionsMenu, PopHeading, Popover } from "@/components/ui/pop";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toaster";
import { AddCriterionPopover, AddFilterPopover } from "@/components/popups/page-popups";
import { searches } from "@/lib/mock";
import { criteria as initialCriteria, importanceLabel, type Importance } from "@/lib/search-mock";
import { cn } from "@/lib/utils";
import { Roll, Beam } from "@/components/ui/fx";

const levels: Importance[] = ["very", "important", "nice"];
const levelStyle: Record<Importance, string> = { very: "bg-ink-900 text-white", important: "bg-gray-500 text-white", nice: "bg-gray-200 text-gray-700" };
const roles = [
  { icon: Code, label: "Software Engineer", text: "Senior software engineer, 5+ years with TypeScript and React, has shipped B2B SaaS, based in the US." },
  { icon: PenTool, label: "Product Designer", text: "Senior product designer with 5+ years in B2B SaaS, strong Figma and research skills, based in the US." },
  { icon: Megaphone, label: "Marketing Lead", text: "Growth marketing lead who scaled a PLG funnel from seed to Series B, strong in paid and lifecycle." },
  { icon: Database, label: "Data Scientist", text: "Data scientist with Python and experimentation experience, worked on product analytics, NYC or remote." },
];
const suggestions = ["Must know Figma", "Only people open to work", "Exclude agencies", "Add design systems experience"];

/** Turn a refinement message into a criterion label (the real AI does this in the backend). */
export function criterionFrom(text: string) {
  const t = text.toLowerCase();
  if (t.includes("figma")) return "Expert in Figma";
  if (t.includes("open to work")) return "Open to new roles";
  if (t.includes("agenc")) return "Not currently at an agency";
  if (t.includes("design system")) return "Built or owned a design system";
  if (t.includes("us only") || t.includes("united states")) return "Based in the US";
  if (t.startsWith("yes")) return "Includes people at competitors";
  if (t.startsWith("no")) return "Excludes current competitors";
  const clean = text.trim().replace(/[.!?]+$/, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
export const aiReply = (label: string) => `Done. I added “${label}” as a High criterion. About 240 profiles still match.`;

type Msg = { from: "user" | "ai"; text: string };

function Composer({
  id, value, onChange, onSubmit, placeholder, rows, big, attached, onAttach, onDetach, submitAttr,
}: {
  id: string; value: string; onChange: (v: string) => void; onSubmit: () => void; placeholder: string; rows: number; big?: boolean;
  attached: boolean; onAttach: () => void; onDetach: () => void; submitAttr: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-black/[0.08] bg-white transition-shadow focus-within:border-black/[0.16] focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]", big ? "p-3 shadow-[0_8px_30px_-12px_rgba(16,24,40,0.18)]" : "p-2.5 shadow-[0_4px_16px_-8px_rgba(16,24,40,0.15)]")}>
      <div data-attach-chip className={cn("mb-2 inline-flex items-center gap-2 rounded-xl bg-gray-50 py-1.5 pl-2 pr-1 text-xs ring-1 ring-inset ring-black/[0.06]", !attached && "hidden")}>
        <span className="grid size-6 place-items-center rounded-md bg-white text-gray-500 shadow-xs"><FileText className="size-3.5" /></span>
        <span className="leading-tight"><span className="block font-medium">senior-product-designer.pdf</span><span className="block text-[10px] text-gray-500">Job description · 2 pages</span></span>
        <button type="button" data-attach-remove aria-label="Remove attachment" onClick={onDetach} className="grid size-5 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-foreground"><X className="size-3" /></button>
      </div>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); } }}
        placeholder={placeholder}
        className={cn("block w-full resize-none bg-transparent px-1.5 leading-relaxed outline-none placeholder:text-gray-400", big ? "text-[15px]" : "text-[14px]")}
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" data-attach onClick={onAttach} aria-label="Attach a job description" title="Attach a job description" className="grid size-8 place-items-center rounded-full text-gray-500 hover:bg-gray-50 hover:text-foreground">
            <Paperclip className="size-4" />
          </button>
          {big && (
            <OptionsMenu
              width={230}
              prefix="Sourcing over: "
              value="Lasso profiles"
              options={["Lasso profiles", "Your collections", "Imported list"]}
              triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-gray-25 px-3 text-xs text-gray-600 hover:bg-gray-50"
            />
          )}
        </div>
        <button
          type="button"
          {...{ [submitAttr]: "" }}
          onClick={onSubmit}
          aria-label="Send"
          className="fx-btn inline-flex h-8 items-center gap-1.5 rounded-full bg-ink-900 pl-3 pr-2 text-xs font-medium text-white hover:bg-ink-800"
        >
          {big && <Beam />}<Roll>{big ? "Start" : "Send"}</Roll>
          <span className="grid size-5 place-items-center rounded-full bg-white/15"><ArrowUp className="size-3" strokeWidth={2.5} /></span>
        </button>
      </div>
    </div>
  );
}

function Thinking({ label, hidden, attr }: { label: string; hidden: boolean; attr: string }) {
  return (
    <div {...{ [attr]: "" }} className={cn("flex items-center gap-3", hidden && "hidden")}>
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-900"><LogoMark className="size-5" /></span>
      <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-xs text-gray-500 ring-1 ring-inset ring-black/[0.06]">
        <span className="flex gap-1">{[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: `${d * 120}ms` }} />)}</span>
        {label}
      </span>
    </div>
  );
}

const UserBubble = ({ text, attr }: { text: string; attr?: string }) => (
  <div className="flex justify-end" {...(attr ? { [attr]: "" } : {})}>
    <p data-msg-text className="max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-md bg-ink-900 px-4 py-2.5 text-[14px] leading-relaxed text-white">{text}</p>
  </div>
);
const AiBubble = ({ children, attr }: { children: React.ReactNode; attr?: string }) => (
  <div className="flex gap-3" {...(attr ? { [attr]: "" } : {})}>
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-900"><LogoMark className="size-5" /></span>
    <div className="min-w-0 flex-1 space-y-3 pt-1 text-[14px] leading-relaxed text-gray-700">{children}</div>
  </div>
);

export function AiSourcing() {
  const [phase, setPhase] = useState<"empty" | "thinking" | "refine">("empty");
  const [brief, setBrief] = useState("");
  const [sent, setSent] = useState("");
  const [reply, setReply] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [replying, setReplying] = useState(false);
  const [attached, setAttached] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [hq, setHq] = useState("");
  const [crit, setCrit] = useState(initialCriteria.map((c) => ({ ...c, on: true })));
  const [filters, setFilters] = useState<{ id: string; icon: React.ElementType; label: string }[]>([
    { id: "loc", icon: MapPin, label: "United States" },
    { id: "sen", icon: Briefcase, label: "Senior" },
    { id: "rem", icon: Globe, label: "Remote OK" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, replying, phase]);

  const attach = () => { setAttached(true); toast("Job description attached"); };
  const start = () => {
    const text = brief.trim() || (attached ? "Find candidates for the attached job description." : "");
    if (!text) { toast("Describe who you're hiring, or attach a job description"); return; }
    setSent(text);
    setPhase("thinking");
    setTimeout(() => setPhase("refine"), 1100);
  };
  const send = (text: string) => {
    const t = text.trim();
    if (!t || replying) return;
    setMsgs((m) => [...m, { from: "user", text: t }]);
    setReply("");
    setReplying(true);
    setTimeout(() => {
      const label = criterionFrom(t);
      setCrit((c) => [...c, { id: "n" + c.length, label, importance: "important", matched: 0, on: true }]);
      setMsgs((m) => [...m, { from: "ai", text: aiReply(label) }]);
      setReplying(false);
    }, 800);
  };

  return (
    <div data-ai-root data-phase={phase} className="flex min-h-0 flex-1 flex-col">
      {/* Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-black/[0.05] px-4 lg:px-6">
        <button data-history-toggle onClick={() => setHistoryOpen((o) => !o)} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs font-medium shadow-xs hover:bg-gray-25">
          <History className="size-3.5 text-gray-500" />History
        </button>
        <ol className="hidden items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-xs shadow-xs sm:flex" aria-label="Progress">
          <li data-stepper="jd" data-active={phase === "empty"} className="font-medium text-foreground data-[active=false]:font-normal data-[active=false]:text-gray-500">
            <span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-ink-900 text-[9px] text-white">1</span>Job description
          </li>
          <li aria-hidden className="h-px w-6 bg-black/[0.12]" />
          <li data-stepper="refine" data-active={phase !== "empty"} className="text-gray-400 data-[active=true]:font-medium data-[active=true]:text-foreground">
            <span className="mr-1.5 inline-grid size-4 place-items-center rounded-full bg-gray-200 text-[9px] text-gray-500">2</span>Refine search
          </li>
        </ol>
        <Popover
          align="end"
          width={290}
          triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs font-medium shadow-xs hover:bg-gray-25"
          trigger={<><SlidersHorizontal className="size-3.5 text-gray-500" />Preferences</>}
        >
          <PopHeading>Search preferences</PopHeading>
          <div className="space-y-3 px-2.5 py-2 text-xs">
            {[["Show people open to work first", true], ["Hide people I've already contacted", true], ["Exclude current employees", true], ["Include profiles without an email", false]].map(([l, v]) => (
              <PrefRow key={l as string} label={l as string} initial={v as boolean} />
            ))}
          </div>
          <div className="border-t border-black/[0.06] px-2.5 py-2 text-[11px] text-gray-500">Applied to every new search in this workspace.</div>
        </Popover>
      </div>

      <div className="relative flex min-h-0 flex-1">
        {/* History panel */}
        <aside data-history-panel className={cn("absolute inset-y-0 left-0 z-20 flex w-[min(340px,100%)] flex-col border-r border-black/[0.06] bg-white shadow-[8px_0_24px_-12px_rgba(16,24,40,0.15)]", !historyOpen && "hidden")}>
          <div className="flex items-center justify-between px-4 pb-2 pt-3">
            <span className="text-[13px] font-medium">Search history</span>
            <button data-history-toggle aria-label="Close history" onClick={() => setHistoryOpen(false)} className="grid size-7 place-items-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-foreground"><X className="size-4" /></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3" data-filter-scope>
            <label className="mb-2 flex h-9 items-center gap-2 rounded-xl border border-black/[0.08] bg-gray-25 px-3 focus-within:border-gray-300 focus-within:bg-white">
              <Search className="size-3.5 text-gray-400" />
              <input id="ai-history-q" data-filter-input value={hq} onChange={(e) => setHq(e.target.value)} placeholder="Search projects…" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400" />
            </label>
            <ul className="space-y-0.5">
              {searches.map((s) => (
                <li key={s.id} data-filter-item className={cn(!(s.title + s.description).toLowerCase().includes(hq.toLowerCase()) && "hidden")}>
                  <Link href={`/search/${s.id}`} className="flex items-start gap-3 rounded-xl px-2.5 py-2.5 hover:bg-gray-50">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500"><FolderOpen className="size-3.5" /></span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-[13px] font-medium">{s.title}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">{s.strong} strong · {s.reviewed} reviewed</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] text-gray-400"><Clock className="size-3" />{s.updated}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <button data-history-toggle aria-label="Close history" tabIndex={-1} onClick={() => setHistoryOpen(false)} className={cn("absolute inset-0 z-10 bg-black/[0.04]", !historyOpen && "hidden")} />

        {/* Start */}
        <section data-ai-empty className={cn("relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10", phase !== "empty" && "hidden")}>
          <div aria-hidden className="fx-aura left-1/2 top-1/2 -z-10 h-[340px] w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="w-full max-w-[720px]">
            <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-ink-900 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]"><LogoMark className="size-7" /></span>
              <h1 className="text-[26px] font-medium tracking-[-0.025em]">Hey Alex, who can I help you find?</h1>
            </div>
            <p className="mt-2 text-center text-[13px] text-muted-foreground">Describe the person like you&apos;d brief a recruiter, or attach a job description.</p>
            <div className="mt-6">
              <Composer
                id="search-brief" big rows={3} value={brief} onChange={setBrief} onSubmit={start}
                placeholder="e.g. Senior product designer with B2B SaaS experience, strong in Figma, based in the US"
                attached={attached} onAttach={attach} onDetach={() => setAttached(false)} submitAttr="data-ai-submit"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {roles.map((r) => (
                <button key={r.label} data-role-text={r.text} onClick={() => setBrief(r.text)} className="inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 text-[13px] text-gray-600 shadow-xs hover:bg-gray-25 hover:text-foreground">
                  <r.icon className="size-3.5 text-gray-500" />{r.label}
                </button>
              ))}
            </div>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-400"><Sparkles className="size-3" />Uses 1 of your 16 searches left this month</p>
          </div>
        </section>

        {/* Conversation */}
        <section data-ai-convo className={cn("flex min-h-0 flex-1 flex-col", phase === "empty" && "hidden")}>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto w-full max-w-[760px] space-y-6" data-ai-thread>
              <UserBubble text={sent} attr="data-user-brief" />
              <Thinking label="Reading your brief and building criteria…" hidden={phase !== "thinking"} attr="data-ai-thinking" />

              <div data-ai-reply className={cn("space-y-6", phase !== "refine" && "hidden")}>
                <AiBubble>
                  <p>Here&apos;s how I read your brief. I&apos;ll score every profile against these criteria. Tell me how much each one counts, or ask me to change anything.</p>
                  <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-foreground">Criteria</span>
                      <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-600"><span data-active-count>{crit.filter((c) => c.on).length}</span> active</span>
                    </div>
                    <ul className="mt-3 space-y-1.5" data-crit-list>
                      {crit.map((c, i) => (
                        <li key={c.id} data-crit-row className={cn("flex items-center gap-2.5 rounded-xl bg-gray-25 px-2.5 py-2 transition-opacity", !c.on && "opacity-45")}>
                          <button data-crit-toggle aria-label={c.on ? `Turn off ${c.label}` : `Turn on ${c.label}`} onClick={() => setCrit(crit.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                            className={cn("grid size-5 shrink-0 place-items-center rounded-md border transition-colors", c.on ? "border-ink-900 bg-ink-900 text-white" : "border-gray-300 bg-white")}>
                            {c.on && <Check className="size-3" strokeWidth={3} />}
                          </button>
                          <span data-crit-label className="min-w-0 flex-1 truncate text-[13px] text-foreground">{c.label}</span>
                          <div className="flex shrink-0 rounded-full bg-white p-0.5 shadow-[0_0_0_1px_rgba(16,24,40,0.06)]" role="radiogroup" aria-label={`Importance of ${c.label}`}>
                            {levels.map((l) => (
                              <button key={l} data-level={l} role="radio" aria-checked={c.importance === l} title={importanceLabel[l]} onClick={() => setCrit(crit.map((x, j) => (j === i ? { ...x, importance: l } : x)))}
                                className={cn("h-6 rounded-full px-2 text-[11px] transition-colors", c.importance === l ? levelStyle[l] : "text-gray-500 hover:text-foreground")}>
                                {l === "very" ? "Must" : l === "important" ? "High" : "Nice"}
                              </button>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <AddCriterionPopover onAdd={(label) => setCrit((c) => [...c, { id: "n" + c.length, label, importance: "important", matched: 0, on: true }])} />
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-black/[0.06] pt-3">
                      <span className="mr-1 text-xs text-gray-500">Filters</span>
                      {filters.map((f) => (
                        <span key={f.id} className="inline-flex h-7 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white pl-2.5 pr-1 text-xs shadow-xs">
                          <f.icon className="size-3.5 text-gray-500" />{f.label}
                          <button data-remove-chip aria-label={`Remove ${f.label}`} onClick={() => setFilters(filters.filter((x) => x.id !== f.id))} className="grid size-5 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-foreground"><X className="size-3" /></button>
                        </span>
                      ))}
                      <AddFilterPopover onAdd={(f) => setFilters((fs) => [...fs, { id: f.label + fs.length, icon: f.icon, label: f.label }])} />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-25 px-3 py-2.5 ring-1 ring-inset ring-black/[0.04]">
                      <span className="text-xs text-gray-600">About <span className="font-medium text-foreground">260 profiles</span> match these filters</span>
                      <Link href="/search/searching" className="fx-btn inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800">
                        <Beam /><Sparkles className="size-3.5" /><Roll>Find candidates</Roll>
                      </Link>
                    </div>
                  </div>
                  <p>One question: should I include people who currently work at your direct competitors?</p>
                  <div className="flex flex-wrap gap-2">
                    {["Yes, include them", "No, skip competitors"].map((q) => (
                      <button key={q} data-ai-quick={q} onClick={() => send(q)} className="h-8 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs text-foreground shadow-xs hover:bg-gray-25">{q}</button>
                    ))}
                  </div>
                </AiBubble>
              </div>

              <div data-ai-extra className="space-y-6">
                {msgs.map((m, i) => (m.from === "user" ? <UserBubble key={i} text={m.text} /> : <AiBubble key={i}><p data-msg-text>{m.text}</p></AiBubble>))}
              </div>
              <Thinking label="Updating criteria…" hidden={!replying} attr="data-ai-replying" />
              <div ref={endRef} />

              {/* Templates the static prototype clones; never shown */}
              <div hidden data-tpl-user><UserBubble text="" /></div>
              <div hidden data-tpl-ai><AiBubble><p data-msg-text /></AiBubble></div>
            </div>
          </div>

          <div className="shrink-0 px-4 pb-4">
            <div className="mx-auto w-full max-w-[760px]">
              <div className={cn("mb-2 flex gap-1.5 overflow-x-auto", phase !== "refine" && "invisible")} data-ai-suggestions>
                {suggestions.map((s) => (
                  <button key={s} data-ai-quick={s} onClick={() => send(s)} className="h-7 shrink-0 rounded-full bg-white px-3 text-xs text-gray-600 ring-1 ring-inset ring-black/[0.06] hover:bg-gray-25 hover:text-foreground">{s}</button>
                ))}
              </div>
              <Composer
                id="ai-reply" rows={1} value={reply} onChange={setReply} onSubmit={() => send(reply)}
                placeholder="Ask Lasso to refine the search…"
                attached={false} onAttach={attach} onDetach={() => {}} submitAttr="data-ai-send"
              />
              <p className="mt-2 text-center text-[11px] text-gray-400">Lasso can make mistakes. Check the criteria before you search.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PrefRow({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-700">{label}</span>
      <Switch label={label} checked={on} onChange={setOn} />
    </div>
  );
}
