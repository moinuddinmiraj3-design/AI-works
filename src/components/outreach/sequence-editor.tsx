"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, Bold, ChevronDown, Clock, Italic, Link2, List, Mail, Minus, Pause, Play, Plus, Send, Trash2, Underline, UserPlus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { SeqPill } from "./pills";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/components/ui/toaster";
import { ConfirmDialog } from "@/components/popups/common-popups";
import { EnrollDialog, SendTestDialog, TemplatePicker } from "@/components/popups/page-popups";
import { fill, previewPeople, recipients, type Sequence } from "@/lib/outreach-mock";
import { applyFormat, richHtml } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";
const vars = ["First name", "Company", "Role"];

export function SequenceEditor({ seq }: { seq: Sequence }) {
  const [steps, setSteps] = useState(seq.steps);
  const [open, setOpen] = useState<number[]>([0]);
  const [active, setActive] = useState(0);
  const [person, setPerson] = useState(previewPeople[0].id);
  const [status, setStatus] = useState(seq.status);
  const [toggles, setToggles] = useState({ business: true, reply: true, meeting: true, thread: true });

  const update = (i: number, patch: Partial<(typeof steps)[number]>) => setSteps((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const toggleOpen = (i: number) => { setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i])); setActive(i); };
  const totalDays = steps.reduce((n, s) => n + s.waitDays, 0);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-4 lg:px-6">
      <Link href="/outreach" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-foreground">
        <ArrowLeft className="size-4" />Outreach
      </Link>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">{seq.name}</h1>
            <span data-pill="active" className={cn(status !== "active" && "hidden")}><SeqPill status="active" /></span>
            <span data-pill="paused" className={cn(status !== "paused" && "hidden")}><SeqPill status="paused" /></span>
            <span data-pill="draft" className={cn(status !== "draft" && "hidden")}><SeqPill status="draft" /></span>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {seq.collection} · {seq.recipients} recipients · {steps.length} emails over {totalDays} days
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SendTestDialog
            triggerClassName="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25"
            trigger={<><Send className="size-3.5 text-gray-500" />Send test</>}
          />
          <EnrollDialog
            triggerClassName="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25"
            trigger={<><UserPlus className="size-3.5 text-gray-500" />Enroll recipients</>}
          />
          <button
            data-toggle-status
            onClick={() => setStatus((s) => (s === "active" ? "paused" : "active"))}
            className="inline-flex h-9 min-w-[132px] items-center justify-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"
          >
            <span data-when="active" className={cn("inline-flex items-center gap-1.5", status !== "active" && "hidden")}><Pause className="size-3.5" />Pause sequence</span>
            <span data-when="inactive" className={cn("inline-flex items-center gap-1.5", status === "active" && "hidden")}><Play className="size-3.5" />Activate sequence</span>
          </button>
        </div>
      </div>

      <Tabs defaultValue="steps" className="mt-5 gap-3">
        <TabsList>
          <TabsTrigger value="steps" data-stab="steps">Steps <span className="text-gray-400 tabular">{steps.length}</span></TabsTrigger>
          <TabsTrigger value="recipients" data-stab="recipients">Recipients <span className="text-gray-400 tabular">{seq.recipients === 0 ? 0 : recipients.length}</span></TabsTrigger>
        </TabsList>

        <TabsContent value="steps" forceMount data-spanel="steps" className="data-[state=inactive]:hidden">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* Steps */}
            <div className="min-w-0">
              {steps.map((s, i) => {
                const isOpen = open.includes(i);
                return (
                  <div key={s.id}>
                    {i > 0 && (
                      <div className="flex items-center gap-3 py-2 pl-[22px]" data-wait={i}>
                        <span className="h-10 w-px bg-black/[0.12]" />
                        <span className="inline-flex items-center gap-1 rounded-full border border-black/[0.06] bg-white py-1 pl-2.5 pr-1 text-xs shadow-xs">
                          <Clock className="size-3.5 text-gray-400" />
                          Wait
                          <button data-wait-dec aria-label="One day less" onClick={() => update(i, { waitDays: Math.max(1, s.waitDays - 1) })} className="ml-1 grid size-5 place-items-center rounded-full hover:bg-gray-100"><Minus className="size-3" /></button>
                          <span data-wait-value className="w-4 text-center font-medium tabular">{s.waitDays}</span>
                          <button data-wait-inc aria-label="One day more" onClick={() => update(i, { waitDays: Math.min(14, s.waitDays + 1) })} className="grid size-5 place-items-center rounded-full hover:bg-gray-100"><Plus className="size-3" /></button>
                          <span className="pr-1.5">days, then send if no reply</span>
                        </span>
                      </div>
                    )}

                    <section data-step={i} className={cn(card, "transition-shadow", active === i && isOpen && "border-black/[0.14]")}>
                      <button data-step-toggle onClick={() => toggleOpen(i)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink-900 text-xs font-medium text-white">{i + 1}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-medium">{i === 0 ? "First email" : i === steps.length - 1 ? "Last note" : "Follow-up"}</span>
                          <span className="block truncate text-xs text-muted-foreground">{s.subject}</span>
                        </span>
                        <span className="hidden items-center gap-3 text-[11px] text-gray-500 sm:flex">
                          <span><span className="font-medium text-foreground tabular">{s.sent}</span> sent</span>
                          <span><span className="font-medium text-foreground tabular">{s.opened}</span> opened</span>
                          <span><span className="font-medium text-foreground tabular">{s.replied}</span> replied</span>
                        </span>
                        <ChevronDown data-chev className={cn("size-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
                      </button>

                      <div data-step-body className={cn("border-t border-black/[0.06] px-4 pb-4 pt-3", !isOpen && "hidden")}>
                        <label className="block text-[11px] text-gray-500" htmlFor={`subj-${s.id}`}>Subject</label>
                        <input
                          id={`subj-${s.id}`}
                          value={s.subject}
                          onFocus={() => setActive(i)}
                          onChange={(e) => update(i, { subject: e.target.value })}
                          className="mt-1 h-9 w-full rounded-lg border border-black/[0.08] bg-gray-25 px-3 text-[13px] outline-none focus:border-gray-300 focus:bg-white"
                        />
                        <div className="mt-3 rounded-xl border border-black/[0.08] bg-gray-25 focus-within:border-gray-300 focus-within:bg-white">
                          <div className="flex flex-wrap items-center gap-0.5 border-b border-black/[0.06] px-2 py-1.5">
                            {([["bold", Bold, "Bold"], ["italic", Italic, "Italic"], ["underline", Underline, "Underline"], ["link", Link2, "Add link"], ["list", List, "Bulleted list"]] as const).map(([kind, Icon, label]) => (
                              <button
                                key={kind}
                                type="button"
                                data-format={kind}
                                aria-label={label}
                                title={label}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => {
                                  const ta = (e.currentTarget.closest("[data-step-body]") as HTMLElement).querySelector("textarea")!;
                                  const r = applyFormat(ta.value, ta.selectionStart, ta.selectionEnd, kind);
                                  update(i, { body: r.value });
                                  setActive(i);
                                  requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(r.start, r.end); });
                                }}
                                className="grid size-7 place-items-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-foreground"
                              >
                                <Icon className="size-3.5" />
                              </button>
                            ))}
                            <span className="mx-1 h-4 w-px bg-black/[0.08]" />
                            <span className="text-[11px] text-gray-400">Insert</span>
                            {vars.map((v) => (
                              <button
                                key={v}
                                data-insert-var={v}
                                onClick={() => update(i, { body: s.body + ` {${v}}` })}
                                className="ml-1 h-6 rounded-[6px] bg-white px-2 text-[11px] font-medium text-gray-700 ring-1 ring-inset ring-black/[0.08] hover:bg-gray-50"
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                          <textarea
                            id={`body-${s.id}`}
                            rows={11}
                            value={s.body}
                            onFocus={() => setActive(i)}
                            onChange={(e) => update(i, { body: e.target.value })}
                            className="block w-full resize-none bg-transparent px-3 py-2.5 text-[13px] leading-relaxed outline-none"
                          />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <TemplatePicker onPick={(t) => update(i, { subject: t.subject.replace("{Subject}", steps[0].subject), body: t.body })} />
                          {i > 0 && (
                            <ConfirmDialog
                              title={`Delete step ${i + 1}?`}
                              description="People who haven't reached this step won't get it. Emails already sent stay in their inbox."
                              confirm="Delete step"
                              toastMsg={`Step ${i + 1} deleted`}
                              danger
                              triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-foreground"
                              trigger={<><Trash2 className="size-3.5" />Delete step</>}
                            />
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                );
              })}

              <div className="flex items-center gap-3 py-2 pl-[22px]"><span className="h-6 w-px bg-black/[0.12]" /></div>
              <button
                data-toast="Step added"
                onClick={() => {
                  setSteps((st) => [...st, { id: "new" + st.length, subject: "Re: " + st[0].subject, body: "Hi {First name},\n\n", waitDays: 3, sent: 0, opened: 0, replied: 0 }]);
                  setOpen((o) => [...o, steps.length]);
                  setActive(steps.length);
                  toast("Step added");
                }}
                className="flex h-11 w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-gray-300 text-xs text-gray-500 hover:border-gray-400 hover:text-foreground"
              >
                <Plus className="size-3.5" />Add step
              </button>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <section className={cn(card, "p-4")}>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium">Preview</span>
                  <span className="text-[11px] text-gray-400">Step <span data-preview-step className="tabular">{active + 1}</span></span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">As</span>
                  {previewPeople.map((p) => (
                    <button
                      key={p.id}
                      data-preview-person={p.id}
                      onClick={() => setPerson(p.id)}
                      title={p.name}
                      className={cn("rounded-full p-0.5 ring-2 transition-shadow", person === p.id ? "ring-brand-500" : "ring-transparent hover:ring-gray-200")}
                    >
                      <img src={p.avatar} alt={p.name} className="size-7 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
                {steps.map((s, i) =>
                  previewPeople.map((p) => (
                    <article key={s.id + p.id} data-preview={`${i}-${p.id}`} data-first={p.first} data-company={p.company} data-role={p.role} className={cn("mt-3 rounded-xl bg-gray-25 p-3.5 ring-1 ring-inset ring-black/[0.05]", !(active === i && person === p.id) && "hidden")}>
                      <dl className="space-y-1 border-b border-black/[0.06] pb-2.5 text-[11px]">
                        <div className="flex gap-2"><dt className="w-12 text-gray-400">From</dt><dd>Alex Morgan &lt;alex@northwind.com&gt;</dd></div>
                        <div className="flex gap-2"><dt className="w-12 text-gray-400">To</dt><dd>{p.name} &lt;{p.email}&gt;</dd></div>
                        <div className="flex gap-2"><dt className="w-12 text-gray-400">Subject</dt><dd data-psubject className="font-medium">{fill(s.subject, p)}</dd></div>
                      </dl>
                      <p data-pbody className="rich whitespace-pre-line pt-2.5 text-xs leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: richHtml(fill(s.body, p)) }} />
                    </article>
                  ))
                )}
              </section>

              <section className={cn(card, "p-4")}>
                <div className="text-[13px] font-medium">Delivery</div>
                <dl className="mt-3 space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-gray-500">Send between</dt>
                    <dd className="flex items-center gap-1.5">
                      <span className="rounded-full bg-gray-50 px-2.5 py-1 tabular">09:00</span>–<span className="rounded-full bg-gray-50 px-2.5 py-1 tabular">17:00</span>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-gray-500">Time zone</dt><dd>Recipient&apos;s local time</dd></div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-gray-500">Business days only</dt><dd><Switch label="Business days only" checked={toggles.business} onChange={(v) => setToggles({ ...toggles, business: v })} /></dd></div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-gray-500">Send follow-ups in same thread</dt><dd><Switch label="Same thread" checked={toggles.thread} onChange={(v) => setToggles({ ...toggles, thread: v })} /></dd></div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-gray-500">Daily limit</dt><dd><span className="font-medium tabular">50</span> emails a day</dd></div>
                  <div className="flex items-center justify-between gap-3"><dt className="text-gray-500">Send from</dt><dd className="truncate">alex@northwind.com</dd></div>
                </dl>
              </section>

              <section className={cn(card, "p-4")}>
                <div className="text-[13px] font-medium">Stop the sequence when</div>
                <div className="mt-3 space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-3"><span className="text-gray-500">They reply</span><Switch label="Stop when they reply" checked={toggles.reply} onChange={(v) => setToggles({ ...toggles, reply: v })} /></div>
                  <div className="flex items-center justify-between gap-3"><span className="text-gray-500">They book a meeting</span><Switch label="Stop when they book a meeting" checked={toggles.meeting} onChange={(v) => setToggles({ ...toggles, meeting: v })} /></div>
                </div>
              </section>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recipients" forceMount data-spanel="recipients" className="data-[state=inactive]:hidden">
          {seq.recipients === 0 ? (
            <div className={card}>
              <EmptyState icon={UserPlus} title="No one enrolled yet" description="Enroll a collection and everyone with an email starts at step 1 on the next send window.">
                <EnrollDialog triggerClassName="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800" trigger={<><UserPlus className="size-3.5" />Enroll recipients</>} />
              </EmptyState>
            </div>
          ) : (
          <div className={cn(card, "overflow-x-auto")}>
            <table className="w-full min-w-[640px] text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-gray-400">
                  <th className="px-4 py-3 font-normal">Recipient</th>
                  <th className="px-3 py-3 font-normal">Progress</th>
                  <th className="px-3 py-3 font-normal">Status</th>
                  <th className="px-3 py-3 font-normal">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((r) => (
                  <tr key={r.id} className="border-t border-black/[0.05] hover:bg-gray-25">
                    <td className="px-4 py-3">
                      <Link href={`/candidates/${r.id}`} className="flex items-center gap-3">
                        <img src={r.avatar} alt="" className="size-8 rounded-full object-cover ring-1 ring-black/5" />
                        <span className="leading-tight"><span className="block font-medium">{r.name}</span><span className="block text-xs text-muted-foreground">{r.company}</span></span>
                      </Link>
                    </td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-1">
                        {steps.map((_, k) => (
                          <span key={k} className={cn("grid size-5 place-items-center rounded-md", k < r.step ? "bg-ink-900 text-white" : "bg-gray-100 text-gray-400")}><Mail className="size-3" /></span>
                        ))}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn("text-xs", r.state === "Replied" ? "font-medium text-brand-700" : "text-gray-600")}>{r.state}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
