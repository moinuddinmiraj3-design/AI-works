import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { searches } from "@/lib/mock";
import { toneClasses } from "@/lib/tone";
import { cn } from "@/lib/utils";

export function RecentSearches() {
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="text-[13px] font-medium">Recent searches</h2>
        <Link href="/searches" className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground">
          All searches <ChevronRight className="size-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {searches.map((s) => (
          <Link
            key={s.id}
            href={`/search/${s.id}`}
            className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)] transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", toneClasses[s.tone])}>
                <Search className="size-3.5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{s.title}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{s.description}</p>
            <div className="mt-3 flex items-baseline justify-between text-xs">
              <span><span className="text-[15px] font-medium tabular">{s.strong}</span> <span className="text-muted-foreground">strong of {s.reviewed}</span></span>
              <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", s.status === "searching" ? "bg-brand-50 text-brand-700" : "bg-gray-50 text-gray-600")}>
                <span className={cn("size-1.5 rounded-full", s.status === "searching" ? "animate-pulse bg-brand-500" : "bg-gray-400")} />
                {s.status === "searching" ? "Searching" : "Done"}
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100">
              <div className={cn("h-full rounded-full", s.status === "searching" ? "bg-brand-500" : "bg-ink-900")} style={{ width: `${s.progress * 100}%` }} />
            </div>
            <div className="mt-2.5 text-[11px] text-gray-400">Updated {s.updated}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
