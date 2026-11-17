"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { Building2, CreditCard, LogOut, Mail, Plus, Sparkles, User, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { OptionsMenu } from "@/components/ui/pop";
import { toast } from "@/components/ui/toaster";
import { ConfirmDialog } from "@/components/popups/common-popups";
import { RoleMenu, UpgradeDialog } from "@/components/popups/page-popups";
import { LogoMark } from "@/components/brand/logo";
import { GoogleMark } from "@/components/auth/google-mark";
import { user, workspace } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { Roll } from "@/components/ui/fx";

const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";
const input = "mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] outline-none focus:border-gray-300 focus:bg-white";

const sections = [
  { key: "profile", label: "Profile", icon: User },
  { key: "workspace", label: "Workspace", icon: Building2 },
  { key: "email", label: "Email account", icon: Mail },
  { key: "members", label: "Team members", icon: Users },
  { key: "plan", label: "Plan & usage", icon: CreditCard },
] as const;
type Key = (typeof sections)[number]["key"];

const members = [
  { name: "Alex Morgan", email: "alex@northwind.com", role: "Owner", initials: "AM", status: "Active" },
  { name: "Priya Shah", email: "priya@northwind.com", role: "Recruiter", initials: "PS", status: "Active" },
  { name: "Sam Lee", email: "sam@northwind.com", role: "Hiring manager", initials: "SL", status: "Invited" },
];

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-black/[0.06] py-4 first:border-t-0 first:pt-0 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
      <div>
        <div className="text-[13px] font-medium">{label}</div>
        {hint && <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Panel({ title, desc, children, footer }: { title: string; desc: string; children: React.ReactNode; footer?: boolean }) {
  return (
    <section className={cn(card, "p-5 sm:p-6")}>
      <h2 className="text-[16px] font-medium">{title}</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      <div className="mt-5">{children}</div>
      {footer !== false && (
        <div className="mt-2 flex justify-end gap-2 border-t border-black/[0.06] pt-4">
          <button data-toast="Changes discarded" onClick={() => toast("Changes discarded")} className="inline-flex h-9 items-center rounded-full px-4 text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
          <button data-save data-toast="Changes saved" onClick={() => toast("Changes saved")} className="fx-btn inline-flex h-9 items-center rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"><Roll>Save changes</Roll></button>
        </div>
      )}
    </section>
  );
}

function Usage({ label, used, total, unit }: { label: string; used: number; total: number; unit: string }) {
  const pct = Math.round((used / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-gray-600">{label}</span>
        <span className="tabular"><span className="font-medium">{used}</span> <span className="text-muted-foreground">of {total} {unit}</span></span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className={cn("h-full rounded-full", pct >= 80 ? "bg-brand-500" : "bg-ink-900")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function SettingsView({ initial = "profile" }: { initial?: Key }) {
  const [active, setActive] = useState<Key>(initial);
  const [t, setT] = useState({ warm: true, track: true, unsub: false });

  return (
    <div className="mx-auto w-full max-w-[1684px] px-4 pb-10 pt-4 lg:px-8">
      <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">Settings</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">Manage your profile, workspace, email account and plan.</p>

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className={cn(card, "flex gap-1 overflow-x-auto p-2 lg:flex-col")}>
          {sections.map((s) => (
            <button
              key={s.key}
              data-snav={s.key}
              onClick={() => setActive(s.key)}
              className={cn("flex h-9 shrink-0 items-center gap-2.5 rounded-xl px-3 text-[13px] transition-colors", active === s.key ? "bg-gray-100 font-medium text-foreground" : "text-gray-600 hover:bg-gray-50 hover:text-foreground")}
            >
              <s.icon className="size-4 text-gray-500" strokeWidth={1.75} />{s.label}
            </button>
          ))}
          <Link href="/login" className="flex h-9 shrink-0 items-center gap-2.5 rounded-xl px-3 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-foreground lg:mt-2 lg:border-t lg:border-black/[0.06] lg:pt-2">
            <LogOut className="size-4 text-gray-500" strokeWidth={1.75} />Sign out
          </Link>
        </nav>

        <div className="min-w-0">
          <div data-sset="profile" className={cn(active !== "profile" && "hidden")}>
            <Panel title="Profile" desc="How you appear to your team and in the emails you send.">
              <Row label="Photo">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt="" className="size-12 rounded-full object-cover ring-1 ring-black/5" />
                  <button data-toast="Photo picker opens here" onClick={() => toast("Photo picker opens here")} className="inline-flex h-8 items-center rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25">Change photo</button>
                </div>
              </Row>
              <Row label="Name and role">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input id="set-name" aria-label="Full name" defaultValue={user.name} className={input} />
                  <input id="set-role" aria-label="Role" defaultValue={user.role} className={input} />
                </div>
              </Row>
              <Row label="Email" hint="Used to sign in.">
                <input id="set-email" aria-label="Email" defaultValue="alex@northwind.com" readOnly className={cn(input, "text-gray-500")} />
              </Row>
              <Row label="Email signature" hint="Added to every outreach email.">
                <textarea id="set-signature" rows={3} defaultValue={"Alex Morgan\nHead of Talent, Northwind"} className="mt-1 w-full resize-none rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 py-2.5 text-[13px] outline-none focus:border-gray-300 focus:bg-white" />
              </Row>
            </Panel>
          </div>

          <div data-sset="workspace" className={cn(active !== "workspace" && "hidden")}>
            <Panel title="Workspace" desc="Shared by everyone on your team.">
              <Row label="Logo">
                <div className="flex items-center gap-3">
                  <LogoMark className="size-12" />
                  <button data-toast="Logo picker opens here" onClick={() => toast("Logo picker opens here")} className="inline-flex h-8 items-center rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25">Replace</button>
                </div>
              </Row>
              <Row label="Workspace name"><input id="set-ws" aria-label="Workspace name" defaultValue={workspace.name} className={input} /></Row>
              <Row label="Default location" hint="Pre-filled on new searches.">
                <OptionsMenu width={260} rootClassName="w-full" value="United States" options={["United States", "United Kingdom", "Canada", "Germany", "Remote, anywhere"]} triggerClassName="mt-1 flex h-10 w-full items-center justify-between rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] hover:border-gray-300" />
              </Row>
              <Row label="Time zone"><OptionsMenu width={280} rootClassName="w-full" value="Pacific Time (US & Canada)" options={["Pacific Time (US & Canada)", "Mountain Time (US & Canada)", "Central Time (US & Canada)", "Eastern Time (US & Canada)", "London (GMT)", "Berlin (CET)"]} triggerClassName="mt-1 flex h-10 w-full items-center justify-between rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] hover:border-gray-300" /></Row>
            </Panel>
          </div>

          <div data-sset="email" className={cn(active !== "email" && "hidden")}>
            <Panel title="Email account" desc="Outreach is sent from this account. Replies come back to your inbox.">
              <Row label="Connected account">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-25 p-3 ring-1 ring-inset ring-black/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-white shadow-xs"><GoogleMark /></span>
                    <div className="leading-tight">
                      <div className="text-[13px] font-medium">alex@northwind.com</div>
                      <div className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-brand-700"><span className="size-1.5 rounded-full bg-brand-500" />Connected</div>
                    </div>
                  </div>
                  <ConfirmDialog title="Disconnect Gmail?" description="Active sequences pause until you connect an account again. Nothing already sent is affected." confirm="Disconnect" toastMsg="Gmail disconnected · sequences paused" danger triggerClassName="inline-flex h-8 items-center rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25" trigger="Disconnect" />
                </div>
              </Row>
              <Row label="Daily sending limit" hint="Keeps your domain healthy.">
                <div className="flex items-center gap-2 text-[13px]"><span className="inline-flex h-9 items-center rounded-xl bg-gray-25 px-3 font-medium tabular ring-1 ring-inset ring-black/[0.08]">50</span>emails per day</div>
              </Row>
              <Row label="Gradual warm-up" hint="Starts low and raises the limit over two weeks.">
                <Switch label="Gradual warm-up" checked={t.warm} onChange={(v) => setT({ ...t, warm: v })} />
              </Row>
              <Row label="Track opens">
                <Switch label="Track opens" checked={t.track} onChange={(v) => setT({ ...t, track: v })} />
              </Row>
              <Row label="Unsubscribe link" hint="Adds a short opt-out line to each email.">
                <Switch label="Unsubscribe link" checked={t.unsub} onChange={(v) => setT({ ...t, unsub: v })} />
              </Row>
            </Panel>
          </div>

          <div data-sset="members" className={cn(active !== "members" && "hidden")}>
            <Panel title="Team members" desc="Everyone here can search, shortlist and send outreach." footer={false}>
              <form className="flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
                <input id="invite-email" type="email" placeholder="name@northwind.com" className="h-10 min-w-0 flex-1 rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] outline-none focus:border-gray-300 focus:bg-white" />
                <button data-toast="Invite sent" onClick={() => toast("Invite sent")} className="fx-btn inline-flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"><Plus className="size-3.5" /><Roll>Invite</Roll></button>
              </form>
              <ul className="mt-4 divide-y divide-black/[0.06]">
                {members.map((m) => (
                  <li key={m.email} className="flex items-center gap-3 py-3">
                    <span className="grid size-9 place-items-center rounded-full bg-gray-100 text-[11px] font-medium text-gray-600">{m.initials}</span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block text-[13px] font-medium">{m.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{m.email}</span>
                    </span>
                    {m.status === "Invited" && <span className="rounded-full border border-dashed border-black/[0.14] px-2 py-0.5 text-[11px] text-gray-500">Invite sent</span>}
                    {m.role === "Owner" ? (
                      <span className="inline-flex h-8 items-center rounded-full bg-gray-50 px-3 text-xs text-gray-500">Owner</span>
                    ) : (
                      <RoleMenu role={m.role} />
                    )}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <div data-sset="plan" className={cn(active !== "plan" && "hidden")}>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
              <Panel title="Plan & usage" desc={`${workspace.plan} plan · trial ends in ${workspace.trialDaysLeft} days`} footer={false}>
                <div className="space-y-5">
                  <Usage label="Searches" used={workspace.searchesUsed} total={workspace.searchesLimit} unit="this month" />
                  <Usage label="Email lookups" used={162} total={200} unit="this month" />
                  <Usage label="Emails sent" used={84} total={500} unit="this month" />
                  <Usage label="Seats" used={3} total={5} unit="members" />
                </div>
                <p className="mt-5 text-xs text-muted-foreground">Usage resets on December 1.</p>
              </Panel>
              <section className="relative overflow-hidden rounded-2xl bg-ink-900 p-5 text-white">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-500/30 blur-3xl" />
                <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs"><Sparkles className="size-3.5 text-brand-400" />Growth</span>
                <div className="relative mt-4 text-[28px] font-medium leading-none tracking-[-0.02em]">$149<span className="text-sm font-normal text-ink-300"> / month</span></div>
                <ul className="relative mt-4 space-y-2 text-xs text-ink-100">
                  <li>100 searches a month</li><li>1,000 email lookups</li><li>Unlimited sequences</li><li>10 seats</li>
                </ul>
                <div className="relative mt-5"><UpgradeDialog triggerClassName="inline-flex h-9 w-full items-center justify-center rounded-full bg-white text-xs font-medium text-ink-900 hover:bg-white/90" trigger="Upgrade plan" /></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
