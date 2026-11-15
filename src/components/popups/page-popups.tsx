"use client";
 

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase, Building2, Check, ChevronDown, Clock, Copy, EyeOff, FileUp, FolderInput, Globe, GraduationCap, Link2, MapPin, MoreHorizontal, Plus,
  Search, SlidersHorizontal, Sparkles, Trash2, UserMinus, Users,
} from "lucide-react";
import { Dialog, DialogAction, Field, PopHeading, PopItem, PopOption, PopSeparator, Popover, inputCls, useClose } from "@/components/ui/pop";
import { toast } from "@/components/ui/toaster";
import { CloseButton } from "./common-popups";
import { collections, searches } from "@/lib/mock";
import { collectionMembers } from "@/lib/search-mock";
import { templates } from "@/lib/outreach-mock";
import { toneClasses } from "@/lib/tone";
import { cn } from "@/lib/utils";

const segBtn = "h-8 rounded-full px-3 text-xs transition-colors data-[selected=false]:bg-gray-50 data-[selected=false]:text-gray-600 data-[selected=false]:hover:bg-gray-100 data-[selected=true]:bg-ink-900 data-[selected=true]:text-white";

/** Single-choice chips that work in both the app and the prototype. */
function Chips({ options, value: initial }: { options: string[]; value: string }) {
  const [v, setV] = useState(initial);
  return (
    <div className="flex flex-wrap gap-1.5" data-chip-group>
      {options.map((o) => <button key={o} type="button" data-chip data-selected={v === o} onClick={() => setV(o)} className={segBtn}>{o}</button>)}
    </div>
  );
}

/* ---------- Home ---------- */
export function ImportDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  return (
    <Dialog title="Import a list" description="Bring in people from a spreadsheet or another tool. Lasso scores them like any search." triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction>Cancel</DialogAction><DialogAction primary toast="Import started · we'll notify you when it's scored">Import and score</DialogAction></>}>
      <div className="space-y-4">
        <button type="button" data-toast="File picker opens here" onClick={() => toast("File picker opens here")} className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-25 px-4 py-8 text-center hover:border-gray-400">
          <span className="grid size-10 place-items-center rounded-full bg-white shadow-xs"><FileUp className="size-4 text-gray-600" /></span>
          <span className="text-[13px] font-medium">Drop a CSV here or click to browse</span>
          <span className="text-xs text-muted-foreground">Needs a name column. Email, company and profile URL help scoring.</span>
        </button>
        <div>
          <span className="text-xs text-gray-600">Score against</span>
          <div className="mt-2"><Chips options={searches.map((s) => s.title)} value={searches[0].title} /></div>
        </div>
        <div>
          <span className="text-xs text-gray-600">Save to</span>
          <div className="mt-2"><Chips options={collections.map((c) => c.name)} value={collections[0].name} /></div>
        </div>
      </div>
    </Dialog>
  );
}

export function AddRoleDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  return (
    <Dialog title="Add a role" description="Track a hire from first search to shortlist." triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction toast="Role added">Save role</DialogAction><DialogAction primary href="/search/new" toast="Role added">Save and start a search</DialogAction></>}>
      <div className="space-y-4">
        <Field label="Role title"><input id="role-title" placeholder="e.g. Senior Product Designer" className={inputCls} /></Field>
        <div><span className="text-xs text-gray-600">Team</span><div className="mt-2"><Chips options={["Design", "Engineering", "Growth", "Sales", "Operations"]} value="Design" /></div></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Shortlist target" hint="How many people you want to talk to"><input id="role-target" type="number" defaultValue={15} className={inputCls} /></Field>
          <Field label="Location"><input id="role-location" defaultValue="United States, remote" className={inputCls} /></Field>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------- New Search ---------- */
export function SearchHistoryDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  const [q, setQ] = useState("");
  return (
    <Dialog side="right" title="Search history" description="Every brief you've run, newest first." triggerClassName={triggerClassName} trigger={trigger}>
      <ul className="space-y-2" data-filter-scope>
        <label className="mb-3 flex h-10 items-center gap-2 rounded-xl border border-black/[0.08] bg-gray-25 px-3 focus-within:border-gray-300 focus-within:bg-white">
          <Search className="size-4 text-gray-400" />
          <input id="history-q" data-filter-input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search briefs" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400" />
        </label>
        {searches.map((s) => (
          <li key={s.id} data-filter-item className={cn(!(s.title + s.description).toLowerCase().includes(q.toLowerCase()) && "hidden")}>
            <HistoryLink href={`/search/${s.id}`}>
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium">{s.title}</span>
                <span className="shrink-0 text-[11px] text-gray-400">{s.updated}</span>
              </span>
              <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">{s.description}</span>
              <span className="mt-2 flex gap-3 text-[11px] text-gray-500">
                <span><span className="font-medium text-foreground tabular">{s.strong}</span> strong</span>
                <span><span className="font-medium text-foreground tabular">{s.reviewed}</span> reviewed</span>
                <span><span className="font-medium text-foreground tabular">{s.shortlisted}</span> shortlisted</span>
              </span>
            </HistoryLink>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
function HistoryLink({ href, children }: { href: string; children: React.ReactNode }) {
  const close = useClose();
  return <Link href={href} data-dialog-close onClick={close} className="block rounded-xl bg-gray-25 p-3 ring-1 ring-inset ring-black/[0.04] hover:bg-gray-50">{children}</Link>;
}

export const filterChoices = [
  { icon: MapPin, label: "Location", value: "Canada" },
  { icon: Briefcase, label: "Seniority", value: "Lead" },
  { icon: Clock, label: "Years of experience", value: "5+ years" },
  { icon: Building2, label: "Company size", value: "50–500 people" },
  { icon: Globe, label: "Industry", value: "SaaS" },
  { icon: GraduationCap, label: "Education", value: "Design degree" },
];
export function AddFilterPopover({ onAdd }: { onAdd: (f: { icon: React.ElementType; label: string }) => void }) {
  return (
    <Popover width={240} triggerClassName="inline-flex h-7 items-center gap-1 rounded-full border border-dashed border-gray-300 px-2.5 text-xs text-gray-500 hover:border-gray-400 hover:text-foreground" trigger={<><Plus className="size-3.5" />Add filter</>}>
      <PopHeading>Filter by</PopHeading>
      {filterChoices.map((f) => (
        <PopItem key={f.label} icon={f.icon} hint={f.value} toast={`${f.label}: ${f.value} added`} onSelect={() => onAdd({ icon: f.icon, label: f.value })}>{f.label}</PopItem>
      ))}
    </Popover>
  );
}

export function AddCriterionPopover({ onAdd }: { onAdd: (label: string) => void }) {
  const [label, setLabel] = useState("");
  return (
    <Popover width={320} side="top" rootClassName="w-full" triggerClassName="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 text-[13px] text-gray-500 hover:border-gray-400 hover:text-foreground" trigger={<><Plus className="size-3.5" />Add a criterion</>}>
      <div className="p-2">
        <Field label="What should Lasso look for?"><input id="new-criterion" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Has shipped a mobile app" className={inputCls} /></Field>
        <div className="mt-3"><span className="text-xs text-gray-600">How much it counts</span><div className="mt-2"><Chips options={["Must", "High", "Nice"]} value="High" /></div></div>
        <div className="mt-3 flex justify-end">
          <CloseButton toastMsg="Criterion added" onClick={() => { onAdd(label.trim() || "Has shipped a mobile app"); setLabel(""); }} className="inline-flex h-8 items-center rounded-full bg-ink-900 px-3.5 text-xs font-medium text-white hover:bg-ink-800">
            Add criterion
          </CloseButton>
        </div>
      </div>
    </Popover>
  );
}

/* ---------- Search Results ---------- */
export function MatchPopover() {
  const [min, setMin] = useState(80);
  return (
    <Popover align="end" width={260} triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25"
      trigger={<><SlidersHorizontal className="size-3.5 text-gray-500" />Match <span data-pop-label>{min}%+</span></>}>
      <div className="p-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] font-medium">Minimum match</span>
          <span className="text-[13px] font-medium tabular" data-range-out>{min}%</span>
        </div>
        <input id="min-match" data-range type="range" min={50} max={100} step={5} value={min} onChange={(e) => setMin(+e.target.value)} className="mt-3 w-full accent-[var(--ink-900)]" />
        <div className="mt-1 flex justify-between text-[10px] text-gray-400"><span>50%</span><span>75%</span><span>100%</span></div>
        <div className="mt-3 flex gap-1.5">
          {[70, 80, 90].map((v) => <PopOption key={v} label={`${v}%+`} selected={min === v} onSelect={() => setMin(v)} />)}
        </div>
      </div>
    </Popover>
  );
}

/* ---------- Collections ---------- */
export function CollectionFilterPopover() {
  const opts = ["Has an email", "Open to work", "Match 90% or more", "Added this week"];
  const [on, setOn] = useState<string[]>([]);
  return (
    <Popover align="end" width={240} triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25"
      trigger={<><SlidersHorizontal className="size-3.5 text-gray-500" />Filter</>}>
      <PopHeading>Show only</PopHeading>
      {opts.map((o) => {
        const sel = on.includes(o);
        return (
          <button key={o} type="button" data-pick-toggle data-selected={sel} onClick={() => setOn((s) => (sel ? s.filter((x) => x !== o) : [...s, o]))}
            className="group flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] hover:bg-gray-50">
            <span className="grid size-4 place-items-center rounded-[5px] border border-gray-300 group-data-[selected=true]:border-ink-900 group-data-[selected=true]:bg-ink-900 group-data-[selected=true]:text-white">
              <Check className="hidden size-3 group-data-[selected=true]:block" strokeWidth={3} />
            </span>
            {o}
          </button>
        );
      })}
      <PopSeparator />
      <div className="flex justify-end gap-1 p-1">
        <CloseButton className="h-7 rounded-full px-2.5 text-xs text-gray-500 hover:bg-gray-50">Clear</CloseButton>
        <CloseButton toastMsg="Filters applied" className="h-7 rounded-full bg-ink-900 px-3 text-xs font-medium text-white hover:bg-ink-800">Apply</CloseButton>
      </div>
    </Popover>
  );
}

/* ---------- Candidate ---------- */
export function CandidateMoreMenu({ name }: { name: string }) {
  return (
    <Popover align="end" width={220} triggerLabel="More actions" triggerClassName="grid size-9 place-items-center rounded-full border border-black/[0.06] bg-white shadow-xs hover:bg-gray-25" trigger={<MoreHorizontal className="size-4 text-gray-500" />}>
      <PopItem icon={FolderInput} toast={`${name} moved to Backend · Go`}>Move to another collection</PopItem>
      <PopItem icon={Copy} toast="Profile link copied">Copy profile link</PopItem>
      <PopItem icon={Link2} toast="Opens their public profile">Open source profile</PopItem>
      <PopItem icon={EyeOff} toast={`${name} hidden from future searches`}>Hide from searches</PopItem>
      <PopSeparator />
      <PopItem icon={Trash2} danger toast={`${name} removed from collection`}>Remove from collection</PopItem>
    </Popover>
  );
}

/* ---------- Sequence editor ---------- */
export function SendTestDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  return (
    <Dialog title="Send a test" description="See exactly what recipients get, sent to your own inbox." width={440} triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction>Cancel</DialogAction><DialogAction primary toast="Test email sent to alex@northwind.com">Send test</DialogAction></>}>
      <div className="space-y-4">
        <Field label="Send to"><input id="test-to" type="email" defaultValue="alex@northwind.com" className={inputCls} /></Field>
        <div><span className="text-xs text-gray-600">Fill variables as</span><div className="mt-2"><Chips options={["Maya Chen", "Daniel Reyes", "Robert Hale"]} value="Maya Chen" /></div></div>
        <div><span className="text-xs text-gray-600">Steps</span><div className="mt-2"><Chips options={["All 3 steps", "Current step only"]} value="All 3 steps" /></div></div>
      </div>
    </Dialog>
  );
}

export function EnrollDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  const [pick, setPick] = useState("c1");
  return (
    <Dialog title="Enroll recipients" description="Everyone with an email starts at step 1. People already enrolled are skipped." triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction>Cancel</DialogAction><DialogAction primary toast="5 people enrolled · first emails go out at 09:00"><Users className="size-3.5" />Enroll people</DialogAction></>}>
      <div className="space-y-2">
        {collections.map((c) => {
          const total = collectionMembers[c.id]?.length ?? c.count;
          const ready = collectionMembers[c.id]?.filter((m) => m.email).length ?? 0;
          return (
            <button key={c.id} type="button" data-chip data-selected={pick === c.id} onClick={() => setPick(c.id)}
              className="group flex w-full items-center gap-3 rounded-xl p-3 text-left ring-1 ring-inset ring-black/[0.06] transition-shadow data-[selected=true]:ring-2 data-[selected=true]:ring-ink-900">
              <span className={cn("grid size-9 place-items-center rounded-lg", toneClasses[c.tone])}><Users className="size-4" /></span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[13px] font-medium">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{ready} of {total} have an email</span>
              </span>
              <span className="grid size-4 place-items-center rounded-full border border-gray-300 group-data-[selected=true]:border-[5px] group-data-[selected=true]:border-ink-900" />
            </button>
          );
        })}
        <p className="pt-1 text-xs text-muted-foreground">People without an email can be found from the collection first.</p>
      </div>
    </Dialog>
  );
}

export function TemplatePicker({ onPick }: { onPick: (t: (typeof templates)[number]) => void }) {
  return (
    <Popover width={300} side="top" triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-foreground"
      trigger={<><svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>Use a template</>}>
      <PopHeading>Templates</PopHeading>
      {templates.map((t) => (
        <PopItem key={t.id} toast={`“${t.name}” applied`} onSelect={() => onPick(t)} hint={`${t.used}×`}>{t.name}</PopItem>
      ))}
    </Popover>
  );
}

/* ---------- Settings ---------- */
export function RoleMenu({ role }: { role: string }) {
  const [r, setR] = useState(role);
  return (
    <Popover align="end" width={220} triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25"
      trigger={<><span data-pop-label>{r}</span><ChevronDown className="size-3.5 text-gray-400" /></>}>
      {[["Admin", "Manage billing and members"], ["Recruiter", "Search and send outreach"], ["Hiring manager", "Review shortlists"]].map(([k, hint]) => (
        <PopOption key={k} label={k} selected={r === k} onSelect={() => setR(k)} hint={hint.split(" ")[0]} />
      ))}
      <PopSeparator />
      <PopItem icon={UserMinus} danger toast="Member removed">Remove from workspace</PopItem>
    </Popover>
  );
}

export function UpgradeDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  return (
    <Dialog title="Upgrade to Growth" description="More searches, more lookups and unlimited sequences." width={460} triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction>Not now</DialogAction><DialogAction primary toast="Checkout opens here once billing is connected">Continue to checkout</DialogAction></>}>
      <div className="space-y-3">
        <PlanChoices />
        <ul className="space-y-2 rounded-xl bg-gray-25 p-3 text-xs text-gray-700 ring-1 ring-inset ring-black/[0.05]">
          {["100 searches a month", "1,000 email lookups", "Unlimited sequences and templates", "10 seats with roles"].map((f) => (
            <li key={f} className="flex items-center gap-2"><Check className="size-3.5 text-gray-500" strokeWidth={2.5} />{f}</li>
          ))}
        </ul>
        <p className="text-[11px] text-gray-400">Your trial keeps running until you confirm. Cancel any time.</p>
      </div>
    </Dialog>
  );
}
function PlanChoices() {
  const [plan, setPlan] = useState("Yearly");
  return (
    <div className="flex gap-2" data-chip-group>
      {[["Monthly", "$149 / month"], ["Yearly", "$119 / month · save 20%"]].map(([k, v]) => (
        <button key={k} type="button" data-chip data-selected={plan === k} onClick={() => setPlan(k)} className="flex-1 rounded-xl p-3 text-left ring-1 ring-inset ring-black/[0.08] data-[selected=true]:ring-2 data-[selected=true]:ring-ink-900">
          <span className="block text-[13px] font-medium">{k}</span>
          <span className="block text-xs text-muted-foreground">{v}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Plan limits ---------- */
function UsageBar({ label, used, total }: { label: string; used: number; total: number }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-gray-600">{label}</span>
        <span className="tabular"><span className="font-medium">{used}</span><span className="text-muted-foreground"> / {total}</span></span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className={cn("h-full rounded-full", pct >= 80 ? "bg-brand-500" : "bg-ink-900")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function LimitDialog({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  return (
    <Dialog
      title="You've reached the Starter limit"
      description="Starter shows the top 40 matches per search. Upgrade to see every profile Lasso reviewed."
      width={460}
      triggerClassName={triggerClassName}
      trigger={trigger}
      footer={<><DialogAction>Keep the top 40</DialogAction><DialogAction primary href="/settings/plan">See Growth plan</DialogAction></>}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl bg-brand-50 p-3 text-xs text-brand-700 ring-1 ring-inset ring-brand-100">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-brand-600"><Users className="size-4" /></span>
          <span><span className="font-medium">33 more strong matches</span> are waiting in this search.</span>
        </div>
        <div className="space-y-3">
          <UsageBar label="Matches shown in this search" used={40} total={40} />
          <UsageBar label="Searches this month" used={9} total={25} />
          <UsageBar label="Email lookups this month" used={162} total={200} />
        </div>
        <p className="text-[11px] text-gray-400">Growth shows up to 500 matches per search, with 100 searches and 1,000 lookups a month.</p>
      </div>
    </Dialog>
  );
}

export function UsagePopover({ left }: { left: number }) {
  return (
    <Popover
      align="end"
      width={280}
      triggerLabel="Plan usage"
      triggerClassName="hidden h-7 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-2.5 text-xs shadow-xs hover:bg-gray-25 sm:inline-flex"
      trigger={<><Sparkles className="size-3.5 text-primary" /><span className="tabular">{left}</span><span className="text-muted-foreground">searches left</span></>}
    >
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium">Starter trial</span>
          <span className="text-[11px] text-muted-foreground">7 days left</span>
        </div>
        <div className="mt-3 space-y-3">
          <UsageBar label="Searches" used={9} total={25} />
          <UsageBar label="Email lookups" used={162} total={200} />
          <UsageBar label="Emails sent" used={84} total={500} />
        </div>
        <p className="mt-3 text-[11px] text-gray-400">Usage resets on December 1.</p>
      </div>
      <PopSeparator />
      <PopItem icon={Sparkles} href="/settings/plan">See plans and upgrade</PopItem>
    </Popover>
  );
}
