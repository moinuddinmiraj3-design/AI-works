"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Pencil, Sparkles } from "lucide-react";
import { candidates } from "@/lib/search-mock";
import { cn } from "@/lib/utils";

/* Timeline (seconds). Kept in plain numbers so the prototype can run the same animation. */
export const RUN = { steps: [0, 0.7, 1.4, 3.6], done: 4.4, leave: 5.2, total: 214, strong: 38 };
const labels = ["Reading your brief", "Turning it into 6 criteria", "Scanning profiles", "Scoring and ranking"];
const status = ["Reading your brief…", "Turning it into 6 criteria…", "Scanning profiles…", "Scoring and ranking…", "Done — 38 strong matches"];
const faces = candidates.slice(0, 5);

export function frame(t: number) {
  const step = t >= RUN.done ? 4 : RUN.steps.filter((s) => t >= s).length - 1;
  const scan = Math.min(1, Math.max(0, (t - RUN.steps[2]) / (RUN.steps[3] - RUN.steps[2])));
  const count = Math.round(scan * RUN.total);
  const strong = t >= RUN.done ? RUN.strong : Math.round(scan * RUN.strong * 0.9);
  return { step, count, strong, faces: Math.min(5, Math.floor(strong / 7)), bar: Math.min(1, t / RUN.done) };
}

export function Searching({ brief }: { brief: string }) {
  const router = useRouter();
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const s = (performance.now() - start) / 1000;
      setT(s);
      if (s >= RUN.leave) { router.push("/search/s1"); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [router]);
  const f = frame(t);

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 pb-10 pt-10 lg:px-6" data-run-root>
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)] sm:p-8">
        <div className="flex items-center gap-2 text-xs text-brand-700">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-brand-500" /></span>
          <span data-run-status>{status[f.step]}</span>
        </div>
        <h1 className="mt-3 text-[26px] font-medium leading-tight tracking-[-0.025em]">Finding your Senior Product Designer</h1>
        <p className="mt-2 rounded-xl bg-gray-25 p-3 text-[13px] leading-relaxed text-gray-600 ring-1 ring-inset ring-black/[0.04]">“{brief}”</p>

        <div className="mt-6 flex items-baseline justify-between">
          <span className="text-[13px] font-medium"><span data-run-count className="tabular">{f.count}</span> <span className="font-normal text-muted-foreground">of ~260 profiles reviewed</span></span>
          <span className="text-xs text-muted-foreground tabular"><span data-run-pct>{Math.round(f.bar * 100)}</span>%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <div data-run-bar className="h-full rounded-full bg-brand-500 transition-[width] duration-100" style={{ width: `${f.bar * 100}%` }} />
        </div>

        <ol className="mt-6 space-y-3">
          {labels.map((l, i) => {
            const state = f.step > i ? "done" : f.step === i ? "current" : "todo";
            return (
              <li key={l} data-run-step={i} data-state={state} className="group flex items-center gap-3 text-[13px]">
                <span className="grid size-6 place-items-center rounded-full border transition-colors group-data-[state=current]:border-brand-500 group-data-[state=done]:border-ink-900 group-data-[state=done]:bg-ink-900 group-data-[state=done]:text-white group-data-[state=todo]:border-gray-200">
                  <Check className="hidden size-3 group-data-[state=done]:block" strokeWidth={3} />
                  <span className="hidden size-2 animate-pulse rounded-full bg-brand-500 group-data-[state=current]:block" />
                </span>
                <span className="group-data-[state=todo]:text-gray-400 group-data-[state=current]:font-medium">{l}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gray-25 p-4 ring-1 ring-inset ring-black/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {faces.map((c, i) => (
                <img key={c.id} data-run-face={i} src={c.avatar} alt="" className={cn("size-8 rounded-full object-cover ring-2 ring-white transition-all duration-300", i < f.faces ? "scale-100 opacity-100" : "scale-75 opacity-0")} />
              ))}
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-medium"><span data-run-strong className="tabular">{f.strong}</span> strong matches so far</div>
              <div className="text-xs text-muted-foreground">90% match or higher</div>
            </div>
          </div>
          <Sparkles className="size-4 text-gray-400" />
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-2">
          <Link href="/search/new" className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] text-gray-600 hover:bg-gray-50"><Pencil className="size-3.5" />Edit brief</Link>
          <Link href="/search/s1" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink-900 px-5 text-[13px] font-medium text-white hover:bg-ink-800">See matches now<ArrowRight className="size-4" /></Link>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">You can leave this page. Lasso keeps searching and lets you know when it&apos;s done.</p>
    </div>
  );
}
