"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, CircleX, FileText, Mail, MailOpen, MessageSquareReply, Pencil, Plus, Send, Timer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardTitle, Delta } from "@/components/ui/delta";
import { MailPill, SeqPill } from "./pills";
import { ComposeDialog, ConfirmDialog, TemplateDialog } from "@/components/popups/common-popups";
import { VarText } from "./var-text";
import { fill, mails, sequences, templates } from "@/lib/outreach-mock";
import { cn } from "@/lib/utils";
import { Roll, Beam } from "@/components/ui/fx";

const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";

function Rate({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-16 rounded-full bg-gray-100"><span className="block h-full rounded-full bg-ink-900" style={{ width: `${value}%` }} /></span>
      <span className="w-8 text-xs font-medium tabular">{value}%</span>
    </span>
  );
}

function mailBody(m: (typeof mails)[number]) {
  const seq = sequences.find((s) => s.name === m.sequence) ?? sequences[0];
  const step = seq.steps[m.step - 1] ?? seq.steps[0];
  return fill(step.body, { first: m.to.split(" ")[0], company: m.company, role: m.role });
}

export function OutreachView() {
  const [mailFilter, setMailFilter] = useState<"sent" | "scheduled">("sent");
  const [selected, setSelected] = useState("m1");
  const list = mails.filter((m) => (mailFilter === "scheduled" ? m.status === "scheduled" : m.status !== "scheduled"));

  return (
    <div className="mx-auto w-full max-w-[1684px] px-4 pb-10 pt-4 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">Outreach</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">Sequences, emails and templates sent from alex@northwind.com.</p>
        </div>
        <div className="flex gap-2">
          <TemplateDialog
            triggerClassName="fx-btn inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3.5 text-xs font-medium shadow-xs hover:bg-gray-25"
            trigger={<><FileText className="size-3.5 text-gray-500" /><Roll>New template</Roll></>}
          />
          <Link href="/outreach/sequences/sq4" className="fx-btn inline-flex h-9 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800">
            <Beam /><Plus className="size-3.5" /><Roll>New sequence</Roll>
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { icon: Send, label: "Sent this week", value: "84", delta: 12.4 },
          { icon: MailOpen, label: "Open rate", value: "61%", delta: 4.1 },
          { icon: MessageSquareReply, label: "Reply rate", value: "18%", delta: 6.0 },
          { icon: Timer, label: "Scheduled", value: "36", delta: -2.5 },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <CardTitle icon={s.icon}>{s.label}</CardTitle>
            <div className="mt-3 text-[24px] font-medium leading-none tracking-[-0.02em] tabular">{s.value}</div>
            <Delta value={s.delta} className="mt-2 flex-wrap" />
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sequences" className="mt-5 gap-3">
        <TabsList>
          <TabsTrigger value="sequences" data-otab="sequences">Sequences <span className="text-gray-400 tabular">{sequences.length}</span></TabsTrigger>
          <TabsTrigger value="emails" data-otab="emails">Emails <span className="text-gray-400 tabular">{mails.length}</span></TabsTrigger>
          <TabsTrigger value="templates" data-otab="templates">Templates <span className="text-gray-400 tabular">{templates.length}</span></TabsTrigger>
        </TabsList>

        {/* Sequences */}
        <TabsContent value="sequences" forceMount data-opanel="sequences" className="data-[state=inactive]:hidden">
          <div className={cn(card, "overflow-x-auto")}>
            <table className="w-full min-w-[820px] text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-gray-400">
                  <th className="px-4 py-3 font-normal">Sequence</th>
                  <th className="px-3 py-3 font-normal">Status</th>
                  <th className="px-3 py-3 font-normal">Steps</th>
                  <th className="px-3 py-3 font-normal">Recipients</th>
                  <th className="px-3 py-3 font-normal">Open rate</th>
                  <th className="px-3 py-3 font-normal">Reply rate</th>
                  <th className="px-3 py-3 font-normal">Updated</th>
                  <th className="w-10 px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {sequences.map((s) => (
                  <tr key={s.id} className="group border-t border-black/[0.05] hover:bg-gray-25">
                    <td className="px-4 py-3">
                      <Link href={`/outreach/sequences/${s.id}`} className="block leading-tight">
                        <span className="block font-medium group-hover:underline">{s.name}</span>
                        <span className="block text-xs text-muted-foreground">{s.note ?? s.collection}</span>
                      </Link>
                    </td>
                    <td className="px-3 py-3"><SeqPill status={s.status} /></td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-1">
                        {s.steps.map((st) => <span key={st.id} className="grid size-5 place-items-center rounded-md bg-gray-100 text-gray-500"><Mail className="size-3" /></span>)}
                      </span>
                    </td>
                    <td className="px-3 py-3 tabular">{s.recipients}</td>
                    <td className="px-3 py-3">{s.sent ? <Rate value={s.openRate} /> : <span className="text-xs text-gray-400">No data yet</span>}</td>
                    <td className="px-3 py-3">{s.sent ? <Rate value={s.replyRate} /> : <span className="text-xs text-gray-400">No data yet</span>}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">{s.updated}</td>
                    <td className="px-3 py-3 text-right">
                      <Link href={`/outreach/sequences/${s.id}`} aria-label={`Open ${s.name}`} className="inline-grid size-7 place-items-center rounded-full text-gray-300 hover:bg-gray-100 hover:text-gray-600">
                        <ChevronRight className="size-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Emails */}
        <TabsContent value="emails" forceMount data-opanel="emails" className="data-[state=inactive]:hidden">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className={cn(card, "p-2")}>
              <div className="flex gap-1 p-1">
                {(["sent", "scheduled"] as const).map((f) => (
                  <button
                    key={f}
                    data-mfilter={f}
                    onClick={() => { setMailFilter(f); setSelected(mails.find((m) => (f === "scheduled" ? m.status === "scheduled" : m.status !== "scheduled"))!.id); }}
                    className={cn("h-7 rounded-full px-3 text-xs capitalize transition-colors", mailFilter === f ? "bg-ink-900 font-medium text-white" : "text-gray-500 hover:bg-gray-50 hover:text-foreground")}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <ul className="mt-1 space-y-0.5">
                {mails.map((m) => {
                  const inList = list.includes(m);
                  return (
                    <li key={m.id} data-mail={m.id} data-mkind={m.status === "scheduled" ? "scheduled" : "sent"} className={cn(!inList && "hidden")}>
                      <button
                        onClick={() => setSelected(m.id)}
                        className={cn("flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors", selected === m.id ? "bg-gray-100" : "hover:bg-gray-50")}
                      >
                        <img src={m.avatar} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-black/5" />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="truncate text-[13px] font-medium">{m.to}</span>
                            <span className="shrink-0 text-[11px] text-gray-400">{m.when}</span>
                          </span>
                          <span className="block truncate text-xs text-gray-600">{m.subject}</span>
                          <span className="mt-1.5 block"><MailPill status={m.status} when={m.when} /></span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={cn(card, "min-w-0 p-5")}>
              {mails.map((m) => (
                <article key={m.id} data-mail-preview={m.id} className={cn(selected !== m.id && "hidden")}>
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-black/[0.06] pb-4">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt="" className="size-10 rounded-full object-cover ring-1 ring-black/5" />
                      <div className="leading-tight">
                        <div className="text-[14px] font-medium">{m.subject}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">To {m.to} · {m.sequence}, step {m.step}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailPill status={m.status} when={m.when} />
                      {m.status === "scheduled" && (
                        <>
                          <ComposeDialog
                            to={m.to}
                            first={m.to.split(" ")[0]}
                            company={m.company}
                            triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25"
                            trigger={<><Pencil className="size-3.5 text-gray-500" />Edit</>}
                          />
                          <ConfirmDialog
                            title="Cancel this email?"
                            description={`It won't be sent to ${m.to}. They stay in the sequence for later steps.`}
                            confirm="Cancel email"
                            toastMsg="Scheduled email cancelled"
                            danger
                            triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25"
                            trigger={<><CircleX className="size-3.5 text-gray-500" />Cancel</>}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="whitespace-pre-line pt-4 text-[13px] leading-relaxed text-gray-700">{mailBody(m)}</div>
                  {m.status === "replied" && (
                    <div className="mt-5 rounded-xl bg-gray-25 p-4 ring-1 ring-inset ring-black/[0.05]">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <img src={m.avatar} alt="" className="size-5 rounded-full object-cover" />
                        <span className="font-medium text-foreground">{m.to}</span> replied · {m.when}
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-gray-700">Thanks for reaching out, Alex. Happy to chat this week. Thursday afternoon works for me.</p>
                      <div className="mt-3">
                        <ComposeDialog
                          to={m.to}
                          first={m.to.split(" ")[0]}
                          company={m.company}
                          reply={m.subject}
                          triggerClassName="fx-btn inline-flex h-8 items-center gap-1.5 rounded-full bg-ink-900 px-3.5 text-xs font-medium text-white hover:bg-ink-800"
                          trigger={<><MessageSquareReply className="size-3.5" /><Roll>Reply</Roll></>}
                        />
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" forceMount data-opanel="templates" className="data-[state=inactive]:hidden">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {templates.map((t) => (
              <article key={t.id} className={cn(card, "flex flex-col p-4")}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-medium">{t.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">Used {t.used} times</div>
                  </div>
                  <span className="grid size-8 place-items-center rounded-full bg-gray-50 text-gray-500"><FileText className="size-4" /></span>
                </div>
                <div className="mt-3 rounded-xl bg-gray-25 p-3 ring-1 ring-inset ring-black/[0.04]">
                  <div className="text-xs font-medium"><VarText text={t.subject} /></div>
                  <p className="mt-1.5 line-clamp-3 whitespace-pre-line text-xs leading-relaxed text-gray-600"><VarText text={t.body} /></p>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <TemplateDialog
                    template={t}
                    triggerClassName="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-foreground"
                    trigger={<><Pencil className="size-3.5" />Edit</>}
                  />
                  <Link href="/outreach/sequences/sq1" className="fx-btn inline-flex h-8 items-center rounded-full bg-ink-900 px-3.5 text-xs font-medium text-white hover:bg-ink-800"><Roll>Use in sequence</Roll></Link>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
