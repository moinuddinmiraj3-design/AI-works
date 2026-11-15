"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { Bell, ChevronsUpDown, CircleHelp, CirclePause, CreditCard, Folder, LogOut, MailSearch, MessageSquareReply, Plus, Radar, Search, Send, Settings, UserPlus, UserRound } from "lucide-react";
import { Dialog, DialogAction, Field, PopHeading, PopItem, PopSeparator, Popover, inputCls, textareaCls, useClose } from "@/components/ui/pop";
import { LogoMark } from "@/components/brand/logo";
import { collections, user, workspace } from "@/lib/mock";
import { allCandidates } from "@/lib/search-mock";
import { sequences } from "@/lib/outreach-mock";
import { toneClasses } from "@/lib/tone";
import { cn } from "@/lib/utils";

/* ---------- Notifications ---------- */
const notes = [
  { icon: MessageSquareReply, title: "Maya Chen replied", detail: "“Happy to chat this week. Thursday works.”", when: "8m", href: "/candidates/p1", unread: true },
  { icon: Radar, title: "Data Scientist search finished", detail: "41 strong matches out of 300 reviewed", when: "1h", href: "/search/s3", unread: true },
  { icon: CirclePause, title: "Growth leads sequence paused", detail: "Hit today's sending limit, resumes tomorrow", when: "3h", href: "/outreach/sequences/sq3", unread: false },
  { icon: MailSearch, title: "2 candidates have no email", detail: "Product Designers — SF", when: "Yesterday", href: "/collections/c1", unread: false },
];

export function NotificationsPopover() {
  return (
    <Popover
      align="end"
      width={340}
      triggerLabel="Notifications"
      triggerClassName="relative grid size-8 place-items-center rounded-md text-gray-500 hover:bg-white/70 hover:text-foreground"
      trigger={<><Bell className="size-4" strokeWidth={1.75} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand-500 ring-2 ring-[var(--canvas)]" /></>}
    >
      <PopHeading action={<NotifRead />}>Notifications</PopHeading>
      <ul className="space-y-0.5">
        {notes.map((n) => (
          <li key={n.title}>
            <Link href={n.href} data-pop-item className="flex gap-3 rounded-lg px-2.5 py-2 hover:bg-gray-50">
              <span className="relative mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600">
                <n.icon className="size-4" strokeWidth={1.75} />
                {n.unread && <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-brand-500 ring-2 ring-white" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-medium">{n.title}</span>
                  <span className="shrink-0 text-[11px] text-gray-400">{n.when}</span>
                </span>
                <span className="block truncate text-xs text-muted-foreground">{n.detail}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Popover>
  );
}
function NotifRead() {
  return <button type="button" data-pop-item data-toast="All caught up" className="text-[11px] text-gray-500 hover:text-foreground">Mark all read</button>;
}

/* ---------- Workspace menu ---------- */
export function WorkspaceMenu() {
  return (
    <Popover
      width={232}
      triggerClassName="flex h-8 items-center gap-2 rounded-md px-1.5 hover:bg-black/[0.04]"
      trigger={<><LogoMark className="size-5" /><span className="side-hide text-[13px] font-semibold">{workspace.name}</span><ChevronsUpDown className="side-hide size-3 text-gray-400" /></>}
    >
      <PopHeading>Workspaces</PopHeading>
      <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-2.5 py-2">
        <LogoMark className="size-6" />
        <span className="min-w-0 flex-1 leading-tight"><span className="block text-[13px] font-medium">{workspace.name}</span><span className="block text-[11px] text-gray-500">{workspace.plan} trial · 3 members</span></span>
      </div>
      <PopSeparator />
      <PopItem icon={Settings} href="/settings">Workspace settings</PopItem>
      <PopItem icon={Plus} toast="New workspaces arrive with team billing">Create workspace</PopItem>
      <PopSeparator />
      <PopItem icon={LogOut} href="/login">Sign out</PopItem>
    </Popover>
  );
}

/* ---------- Command palette ---------- */
const pages = [
  { label: "Dashboard", href: "/" }, { label: "New search", href: "/search/new" }, { label: "Library", href: "/collections/c1" },
  { label: "Outreach", href: "/outreach" }, { label: "Settings", href: "/settings" },
];

export function CommandPalette({ triggerClassName, trigger }: { triggerClassName: string; trigger: React.ReactNode }) {
  const [q, setQ] = useState("");
  const match = (s: string) => s.toLowerCase().includes(q.toLowerCase());
  const people = allCandidates.filter((c) => match(c.name + c.title + c.company));
  const cols = collections.filter((c) => match(c.name));
  const seqs = sequences.filter((s) => match(s.name));
  const pgs = pages.filter((p) => match(p.label));
  const Row = ({ href, children }: { href: string; children: React.ReactNode }) => <PaletteLink href={href}>{children}</PaletteLink>;

  return (
    <Dialog title="Find anything" description="People, collections, sequences and pages." width={560} triggerLabel="Find anything" triggerClassName={triggerClassName} trigger={trigger}>
      <div data-filter-scope>
        <label className="flex h-11 items-center gap-2.5 rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 focus-within:border-gray-300 focus-within:bg-white">
          <Search className="size-4 text-gray-400" />
          <input id="palette-q" data-filter-input autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a name, company or list…" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" />
        </label>
        <div className="mt-3 space-y-3">
          <Group label="People">{people.map((c) => (
            <Row key={c.id} href={`/candidates/${c.id}`}>
              <img src={c.avatar} alt="" className="size-6 rounded-full object-cover" />
              <span className="min-w-0 flex-1 truncate">{c.name} <span className="text-gray-400">· {c.title}, {c.company}</span></span>
              <span className="text-[11px] tabular text-gray-400">{c.match}%</span>
            </Row>
          ))}</Group>
          <Group label="Collections">{cols.map((c) => (
            <Row key={c.id} href={`/collections/${c.id}`}>
              <span className={cn("grid size-6 place-items-center rounded-md", toneClasses[c.tone])}><Folder className="size-3" /></span>
              <span className="flex-1 truncate">{c.name}</span><span className="text-[11px] text-gray-400 tabular">{c.count}</span>
            </Row>
          ))}</Group>
          <Group label="Sequences">{seqs.map((s) => (
            <Row key={s.id} href={`/outreach/sequences/${s.id}`}>
              <span className="grid size-6 place-items-center rounded-md bg-gray-100 text-gray-500"><Send className="size-3" /></span>
              <span className="flex-1 truncate">{s.name}</span><span className="text-[11px] capitalize text-gray-400">{s.status}</span>
            </Row>
          ))}</Group>
          <Group label="Pages">{pgs.map((p) => (
            <Row key={p.href} href={p.href}>
              <span className="grid size-6 place-items-center rounded-md bg-gray-100 text-gray-500"><Search className="size-3" /></span>
              <span className="flex-1">{p.label}</span>
            </Row>
          ))}</Group>
        </div>
      </div>
    </Dialog>
  );
}
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-filter-group>
      <div className="px-1 pb-1 text-[11px] font-medium text-gray-500">{label}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
function PaletteLink({ href, children }: { href: string; children: React.ReactNode }) {
  const close = useClose();
  return (
    <Link href={href} data-filter-item data-dialog-close onClick={close} className="flex h-10 items-center gap-2.5 rounded-lg px-2 text-[13px] hover:bg-gray-50">
      {children}
    </Link>
  );
}

/* ---------- New collection ---------- */
const tones = ["blue", "violet", "amber", "green", "rose", "slate"] as const;
export function NewCollectionDialog({ triggerClassName, trigger, triggerLabel }: { triggerClassName: string; trigger: React.ReactNode; triggerLabel?: string }) {
  const [tone, setTone] = useState<(typeof tones)[number]>("blue");
  return (
    <Dialog
      title="New collection"
      description="A saved list of candidates you can email together."
      triggerLabel={triggerLabel ?? "New collection"}
      triggerClassName={triggerClassName}
      trigger={trigger}
      footer={<><DialogAction>Cancel</DialogAction><DialogAction primary toast="Collection created">Create collection</DialogAction></>}
    >
      <div className="space-y-4">
        <Field label="Name"><input id="newcol-name" placeholder="e.g. Staff designers — NYC" className={inputCls} /></Field>
        <Field label="Description" hint="Optional. Only your team sees this.">
          <textarea id="newcol-desc" rows={2} placeholder="What this list is for" className={textareaCls} />
        </Field>
        <div>
          <span className="text-xs text-gray-600">Colour</span>
          <div className="mt-2 flex gap-2">
            {tones.map((t) => (
              <button
                key={t}
                type="button"
                data-swatch
                data-selected={tone === t}
                aria-label={`${t} colour`}
                onClick={() => setTone(t)}
                className={cn("grid size-8 place-items-center rounded-lg ring-2 ring-offset-2 transition-shadow data-[selected=false]:ring-transparent data-[selected=true]:ring-ink-900", toneClasses[t])}
              >
                <Folder className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------- Account menu (profile photo) ---------- */
export function AccountMenu() {
  return (
    <Popover
      align="end"
      width={260}
      triggerLabel="Account menu"
      triggerClassName="rounded-full outline-none ring-offset-2 ring-offset-[var(--canvas)] transition-shadow hover:ring-2 hover:ring-black/10 focus-visible:ring-2 focus-visible:ring-ink-900"
      trigger={<img src={user.avatar} alt="" className="size-7 rounded-full object-cover ring-1 ring-black/5" />}
    >
      <div className="flex items-center gap-3 px-2.5 pb-2.5 pt-2">
        <img src={user.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-black/5" />
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[13px] font-medium">{user.name}</div>
          <div className="truncate text-xs text-muted-foreground">alex@northwind.com</div>
          <div className="mt-0.5 truncate text-[11px] text-gray-400">{user.role} · {workspace.name}</div>
        </div>
      </div>
      <PopSeparator />
      <PopItem icon={UserRound} href="/settings">Profile &amp; settings</PopItem>
      <PopItem icon={CreditCard} href="/settings/plan" hint={`${workspace.searchesLimit - workspace.searchesUsed} searches left`}>Plan &amp; usage</PopItem>
      <PopItem icon={UserPlus} href="/settings/members">Invite team</PopItem>
      <PopItem icon={CircleHelp} href="/help">Help center</PopItem>
      <PopSeparator />
      <PopItem icon={LogOut} href="/login">Sign out</PopItem>
    </Popover>
  );
}
