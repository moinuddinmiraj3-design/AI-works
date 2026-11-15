"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Check, ImagePlus, Inbox, Lock, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { toast } from "@/components/ui/toaster";
import { GoogleMark } from "./google-mark";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Create your workspace", hint: "Name and logo" },
  { title: "Connect Gmail", hint: "Send from your inbox" },
  { title: "Start your first search", hint: "Describe a hire" },
];
const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";
const roles = ["Product Designer", "Software Engineer", "Marketing Lead", "Data Scientist"];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [team, setTeam] = useState("Recruiting");
  const [brief, setBrief] = useState("Senior product designer with B2B SaaS experience, based in the US");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1040px] flex-col px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <Logo />
        <span className="text-xs text-muted-foreground">Step <span data-ostep-num className="tabular">{step + 1}</span> of 3</span>
      </div>

      <div className="grid flex-1 grid-cols-1 items-center gap-4 py-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className={cn(card, "p-6 sm:p-8")}>
          {/* Step 1 */}
          <div data-ostep-panel={0} className={cn(step !== 0 && "hidden")}>
            <h1 className="text-[24px] font-medium leading-tight tracking-[-0.02em]">Create your workspace</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">This is where your searches, lists and outreach live.</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl border border-dashed border-gray-300 bg-gray-25 text-gray-400"><ImagePlus className="size-5" /></span>
              <div className="text-xs text-muted-foreground"><button data-toast="Logo picker opens here" onClick={() => toast("Logo picker opens here")} className="font-medium text-foreground hover:underline">Upload logo</button><br />Square image, up to 2 MB</div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs text-gray-600">Company name</span>
                <input id="ob-company" defaultValue="Northwind" className="mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] outline-none focus:border-gray-300 focus:bg-white" />
              </label>
              <label className="block">
                <span className="text-xs text-gray-600">Your role</span>
                <input id="ob-role" defaultValue="Head of Talent" className="mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] outline-none focus:border-gray-300 focus:bg-white" />
              </label>
            </div>
            <div className="mt-5">
              <span className="text-xs text-gray-600">Who will use Lasso?</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Recruiting", "Hiring managers", "Founders", "Agency"].map((t) => (
                  <button key={t} data-pick={t} onClick={() => setTeam(t)} className={cn("h-8 rounded-full px-3.5 text-[13px] transition-colors", team === t ? "bg-ink-900 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>{t}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div data-ostep-panel={1} className={cn(step !== 1 && "hidden")}>
            <h1 className="text-[24px] font-medium leading-tight tracking-[-0.02em]">Connect Gmail</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">Outreach goes out from your own address, so replies land in your inbox.</p>
            <div className="mt-6 rounded-2xl bg-gray-25 p-4 ring-1 ring-inset ring-black/[0.05]">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-white shadow-xs"><GoogleMark className="size-5" /></span>
                <div className="leading-tight"><div className="text-[13px] font-medium">Google Workspace</div><div className="text-xs text-muted-foreground">alex@northwind.com</div></div>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2.5"><Inbox className="size-4 text-gray-400" />Send emails and follow-ups on your behalf</li>
                <li className="flex items-center gap-2.5"><Check className="size-4 text-gray-400" />See replies so sequences stop automatically</li>
                <li className="flex items-center gap-2.5"><Calendar className="size-4 text-gray-400" />Spot booked meetings (optional)</li>
              </ul>
            </div>
            <button data-connect className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-black/[0.08] bg-white text-[13px] font-medium shadow-xs hover:bg-gray-25">
              <GoogleMark />Connect Google account
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400"><Lock className="size-3" />We never read emails that aren&apos;t part of your outreach.</p>
          </div>

          {/* Step 3 */}
          <div data-ostep-panel={2} className={cn(step !== 2 && "hidden")}>
            <h1 className="text-[24px] font-medium leading-tight tracking-[-0.02em]">Start your first search</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">Describe who you&apos;re hiring. You can refine it on the next screen.</p>
            <div className="mt-6 rounded-xl border border-black/[0.08] bg-gray-25 p-3 focus-within:border-gray-300 focus-within:bg-white">
              <textarea id="ob-brief" rows={4} value={brief} onChange={(e) => setBrief(e.target.value)} className="block w-full resize-none bg-transparent text-[14px] leading-relaxed outline-none" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {roles.map((r) => (
                <button key={r} data-role-text={`${r} with 4+ years of experience, based in the US`} onClick={() => setBrief(`${r} with 4+ years of experience, based in the US`)} className="h-8 rounded-full bg-gray-50 px-3 text-[13px] text-gray-600 hover:bg-gray-100 hover:text-foreground">{r}</button>
              ))}
            </div>
          </div>

          <p className={cn("mt-4 text-xs text-muted-foreground", step !== 2 && "hidden")} data-ostep-skiplink>
            Not ready yet? <Link href="/welcome" className="font-medium text-foreground underline-offset-4 hover:underline">Skip to your dashboard</Link>
          </p>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-black/[0.06] pt-5">
            <button data-oback onClick={() => setStep((s) => Math.max(0, s - 1))} className={cn("inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] text-gray-600 hover:bg-gray-50", step === 0 && "invisible")}>
              <ArrowLeft className="size-4" />Back
            </button>
            <div className="flex items-center gap-2">
              <button data-oskip onClick={() => setStep((s) => Math.min(2, s + 1))} className={cn("inline-flex h-10 items-center rounded-full px-4 text-[13px] text-gray-500 hover:bg-gray-50", step !== 1 && "hidden")}>Skip for now</button>
              <button data-onext onClick={() => setStep((s) => Math.min(2, s + 1))} className={cn("inline-flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-5 text-[13px] font-medium text-white hover:bg-ink-800", step === 2 && "hidden")}>
                Continue<ArrowRight className="size-4" />
              </button>
              <Link href="/search/searching" data-ofinish className={cn("inline-flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-5 text-[13px] font-medium text-white hover:bg-ink-800", step !== 2 && "hidden")}>
                <Sparkles className="size-4" />Find candidates
              </Link>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <aside className={cn(card, "p-5")}>
          <div className="text-[13px] font-medium">Getting set up</div>
          <div className="mt-1 text-xs text-muted-foreground">About 2 minutes</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div data-ostep-bar className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>
          <ol className="mt-5 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} data-ostep-dot={i} data-state={i < step ? "done" : i === step ? "current" : "todo"} className="group flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-medium transition-colors group-data-[state=current]:border-ink-900 group-data-[state=current]:bg-white group-data-[state=current]:text-foreground group-data-[state=done]:border-ink-900 group-data-[state=done]:bg-ink-900 group-data-[state=done]:text-white group-data-[state=todo]:border-gray-200 group-data-[state=todo]:text-gray-400">
                  <Check className="hidden size-3 group-data-[state=done]:block" strokeWidth={3} />
                  <span className="group-data-[state=done]:hidden">{i + 1}</span>
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] group-data-[state=todo]:text-gray-400 group-data-[state=current]:font-medium">{s.title}</span>
                  <span className="block text-xs text-muted-foreground">{s.hint}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
