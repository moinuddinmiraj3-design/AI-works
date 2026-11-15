import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { chat, criteria, importanceLabel, pool } from "@/lib/search-mock";
import { cn } from "@/lib/utils";

const dot = { very: "bg-ink-900", important: "bg-gray-500", nice: "bg-gray-300" } as const;
const bands = [
  { key: "excellent", label: "90%+", className: "bg-brand-500" },
  { key: "high", label: "80–89%", className: "bg-ink-900" },
  { key: "medium", label: "60–79%", className: "bg-gray-400" },
  { key: "low", label: "Below 60%", className: "bg-gray-200" },
] as const;

export function AssistantPane() {
  const progress = pool.reviewed / pool.total;
  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {/* Pool */}
        <section>
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-medium">Profiles reviewed</span>
            <span className="text-xs text-muted-foreground tabular">{pool.reviewed} of ~{pool.total}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-ink-900" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full">
            {bands.map((b) => (
              <span key={b.key} className={b.className} style={{ width: `${(pool[b.key] / pool.reviewed) * 100}%` }} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {bands.map((b) => (
              <span key={b.key} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className={cn("size-2 rounded-[2px]", b.className)} />
                {b.label}
                <span className="ml-auto font-medium text-foreground tabular">{pool[b.key]}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Criteria */}
        <section className="border-t border-black/[0.06] pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-medium">Criteria</span>
            <Link href="/search/new" className="text-xs text-brand-700 hover:underline">Edit</Link>
          </div>
          <ul className="mt-2 space-y-1">
            {criteria.map((c) => (
              <li key={c.id} className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-xs hover:bg-gray-25" title={importanceLabel[c.importance]}>
                <span className={cn("size-1.5 shrink-0 rounded-full", dot[c.importance])} />
                <span className="min-w-0 flex-1 truncate">{c.label}</span>
                <span className="text-gray-400 tabular">{c.matched}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Conversation */}
        <section className="space-y-2.5 border-t border-black/[0.06] pt-4">
          {chat.map((m, i) =>
            m.from === "user" ? (
              <div key={i} className="ml-6 rounded-2xl rounded-tr-md bg-ink-900 px-3 py-2 text-xs leading-relaxed text-white">{m.text}</div>
            ) : (
              <div key={i} className="flex gap-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600">
                  <Sparkles className="size-3" />
                </span>
                <p className="text-xs leading-relaxed text-gray-600">{m.text}</p>
              </div>
            )
          )}
        </section>
      </div>

      {/* Composer */}
      <div className="border-t border-black/[0.06] p-3">
        <div className="mb-2 flex gap-1.5 overflow-x-auto">
          {["Find more", "US only", "Must have research"].map((q) => (
            <button key={q} className="h-6 shrink-0 rounded-full bg-gray-50 px-2.5 text-[11px] text-gray-600 hover:bg-gray-100 hover:text-foreground">{q}</button>
          ))}
        </div>
        <form className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-gray-25 py-1 pl-3 pr-1 focus-within:border-gray-300 focus-within:bg-white" onSubmit={(e) => e.preventDefault()}>
          <input id="assistant-input" placeholder="Ask Lasso to refine the search…" className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400" />
          <button aria-label="Send" className="grid size-7 place-items-center rounded-lg bg-ink-900 text-white hover:bg-ink-800">
            <ArrowUp className="size-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
}
