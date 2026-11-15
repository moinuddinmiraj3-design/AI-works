"use client";

import { useState } from "react";
import { Check, Copy, Folder, Globe, Plus, Send } from "lucide-react";
import { Dialog, DialogAction, Field, PopHeading, PopSeparator, Popover, inputCls, textareaCls, useClose } from "@/components/ui/pop";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toaster";
import { VarText } from "@/components/outreach/var-text";
import { collections } from "@/lib/mock";
import { templates } from "@/lib/outreach-mock";
import { toneClasses } from "@/lib/tone";
import { cn } from "@/lib/utils";

/* ---------- Share ---------- */
export function ShareDialog({ title, link, triggerClassName, trigger }: { title: string; link: string; triggerClassName: string; trigger: React.ReactNode }) {
  const [anyone, setAnyone] = useState(true);
  return (
    <Dialog title={title} description="Share a read-only view with your team or hiring managers." triggerClassName={triggerClassName} trigger={trigger}
      footer={<DialogAction primary>Done</DialogAction>}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input id={`share-${link}`} readOnly value={`https://lasso.app/share/${link}`} className={cn(inputCls, "text-gray-600")} />
          <button type="button" data-toast="Link copied" onClick={() => { navigator.clipboard?.writeText(`https://lasso.app/share/${link}`).catch(() => {}); toast("Link copied"); }}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800">
            <Copy className="size-3.5" />Copy
          </button>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-25 p-3 ring-1 ring-inset ring-black/[0.05]">
          <span className="flex items-center gap-2.5 text-[13px]"><Globe className="size-4 text-gray-500" />Anyone with the link can view</span>
          <Switch label="Anyone with the link can view" checked={anyone} onChange={setAnyone} />
        </div>
        <Field label="Or invite people">
          <div className="flex gap-2">
            <input id={`share-invite-${link}`} type="email" placeholder="name@northwind.com" className={inputCls} />
            <button type="button" data-toast="Invite sent" onClick={() => toast("Invite sent")} className="inline-flex h-10 shrink-0 items-center rounded-full border border-black/[0.08] bg-white px-4 text-xs font-medium hover:bg-gray-25">Invite</button>
          </div>
        </Field>
      </div>
    </Dialog>
  );
}

/* ---------- Compose email ---------- */
export function ComposeDialog({
  to, email, first, company, reply, triggerClassName, trigger, triggerLabel,
}: { to: string; email?: string | null; first: string; company: string; reply?: string; triggerClassName: string; trigger: React.ReactNode; triggerLabel?: string }) {
  const fillT = (s: string) => s.replaceAll("{First name}", first).replaceAll("{Company}", company).replaceAll("{Role}", "designer");
  const [subject, setSubject] = useState(reply ? `Re: ${reply}` : fillT(templates[0].subject));
  const [body, setBody] = useState(reply ? `Hi ${first},\n\nGreat to hear from you! Does Thursday at 2pm work? I'll send a calendar invite.\n\nBest,\nAlex` : fillT(templates[0].body));
  return (
    <Dialog title={reply ? `Reply to ${to}` : `Email ${to}`} description={`Sent from alex@northwind.com${email ? ` to ${email}` : ""}`} width={560}
      triggerLabel={triggerLabel} triggerClassName={triggerClassName} trigger={trigger}
      footer={<>
        {!reply && <DialogAction href="/outreach/sequences/sq1">Add to a sequence instead</DialogAction>}
        <DialogAction primary toast={`Email sent to ${to}`}><Send className="size-3.5" />Send</DialogAction>
      </>}>
      <div className="space-y-3">
        {!reply && (
          <div className="flex flex-wrap gap-1.5">
            <span className="self-center text-[11px] text-gray-500">Template</span>
            {templates.slice(0, 3).map((t, i) => (
              <button key={t.id} type="button" data-compose-template={i}
                onClick={() => { setSubject(fillT(t.subject.replace("{Subject}", "our last email"))); setBody(fillT(t.body)); }}
                className="h-7 rounded-full bg-gray-50 px-2.5 text-xs text-gray-600 hover:bg-gray-100 hover:text-foreground">{t.name}</button>
            ))}
          </div>
        )}
        <Field label="Subject"><input id={`compose-subj-${first}${reply ? "-r" : ""}`} value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} /></Field>
        <Field label="Message"><textarea id={`compose-body-${first}${reply ? "-r" : ""}`} rows={9} value={body} onChange={(e) => setBody(e.target.value)} className={textareaCls} /></Field>
      </div>
    </Dialog>
  );
}

/* ---------- Collection picker ---------- */
export function CollectionPicker({ initial = [], triggerClassName, trigger, align = "start", side = "bottom", rootClassName }: { initial?: string[]; triggerClassName: string; trigger: React.ReactNode; align?: "start" | "end"; side?: "bottom" | "top"; rootClassName?: string }) {
  const [sel, setSel] = useState<string[]>(initial);
  return (
    <Popover width={260} align={align} side={side} rootClassName={rootClassName} triggerClassName={triggerClassName} trigger={trigger}>
      <PopHeading>Save to collection</PopHeading>
      {collections.map((c) => {
        const on = sel.includes(c.id);
        return (
          <button key={c.id} type="button" data-pick-toggle data-selected={on}
            onClick={() => { setSel((s) => (on ? s.filter((x) => x !== c.id) : [...s, c.id])); toast(on ? `Removed from ${c.name}` : `Saved to ${c.name}`); }}
            className="group flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] hover:bg-gray-50">
            <span className={cn("grid size-6 place-items-center rounded-md", toneClasses[c.tone])}><Folder className="size-3" /></span>
            <span className="min-w-0 flex-1 truncate">{c.name}</span>
            <span className="grid size-4 place-items-center rounded-[5px] border border-gray-300 group-data-[selected=true]:border-ink-900 group-data-[selected=true]:bg-ink-900 group-data-[selected=true]:text-white">
              <Check className="hidden size-3 group-data-[selected=true]:block" strokeWidth={3} />
            </span>
          </button>
        );
      })}
      <PopSeparator />
      <button type="button" data-pop-item data-toast="Collection created" onClick={() => toast("Collection created")} className="flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-gray-600 hover:bg-gray-50">
        <Plus className="size-4 text-gray-500" />New collection
      </button>
    </Popover>
  );
}

/* ---------- Confirm ---------- */
export function ConfirmDialog({ title, description, confirm, toastMsg, danger, triggerClassName, trigger }: { title: string; description: string; confirm: string; toastMsg: string; danger?: boolean; triggerClassName: string; trigger: React.ReactNode }) {
  return (
    <Dialog title={title} description={description} width={420} triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction>Cancel</DialogAction><DialogAction primary toast={toastMsg} className={danger ? "bg-danger hover:bg-danger/90" : undefined}>{confirm}</DialogAction></>}>
      <span className="sr-only">{description}</span>
    </Dialog>
  );
}

/* ---------- Template editor ---------- */
export function TemplateDialog({ template, triggerClassName, trigger }: { template?: (typeof templates)[number]; triggerClassName: string; trigger: React.ReactNode }) {
  const [subject, setSubject] = useState(template?.subject ?? "");
  const [body, setBody] = useState(template?.body ?? "Hi {First name},\n\n");
  const id = template?.id ?? "new";
  return (
    <Dialog title={template ? `Edit “${template.name}”` : "New template"} description="Use {First name}, {Company} and {Role}. They're filled in for each person." width={600}
      triggerClassName={triggerClassName} trigger={trigger}
      footer={<><DialogAction>Cancel</DialogAction><DialogAction primary toast={template ? "Template saved" : "Template created"}>{template ? "Save template" : "Create template"}</DialogAction></>}>
      <div className="space-y-3">
        <Field label="Name"><input id={`tpl-name-${id}`} defaultValue={template?.name} placeholder="e.g. First touch — engineers" className={inputCls} /></Field>
        <Field label="Subject"><input id={`tpl-subj-${id}`} value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} /></Field>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Message</span>
            <span className="flex gap-1">
              {["First name", "Company", "Role"].map((v) => (
                <button key={v} type="button" data-insert-tpl={v} onClick={() => setBody((b) => `${b}{${v}}`)} className="h-6 rounded-[6px] bg-white px-2 text-[11px] font-medium text-gray-700 ring-1 ring-inset ring-black/[0.08] hover:bg-gray-50">+ {v}</button>
              ))}
            </span>
          </div>
          <textarea id={`tpl-body-${id}`} rows={8} value={body} onChange={(e) => setBody(e.target.value)} className={cn(textareaCls, "mt-1")} />
        </div>
        <div className="rounded-xl bg-gray-25 p-3 text-xs leading-relaxed text-gray-600 ring-1 ring-inset ring-black/[0.04]">
          <div className="mb-1 text-[11px] font-medium text-gray-500">How it reads</div>
          <div className="font-medium text-foreground"><VarText text={subject || "Subject"} /></div>
          <p className="mt-1 line-clamp-3 whitespace-pre-line"><VarText text={body} /></p>
        </div>
      </div>
    </Dialog>
  );
}

/** Small helper so plain buttons can close the surrounding popover/dialog. */
export function CloseButton({ children, className, toastMsg, onClick }: { children: React.ReactNode; className: string; toastMsg?: string; onClick?: () => void }) {
  const close = useClose();
  return <button type="button" data-pop-item data-dialog-close data-toast={toastMsg} onClick={() => { onClick?.(); if (toastMsg) toast(toastMsg); close(); }} className={className}>{children}</button>;
}
