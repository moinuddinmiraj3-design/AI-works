import Link from "next/link";
import { Eye, Plus, Radar, Share2, Upload } from "lucide-react";
import { Card, CardTitle, Delta } from "@/components/ui/delta";
import { ImportDialog } from "@/components/popups/page-popups";
import { ShareDialog } from "@/components/popups/common-popups";
import { searches, sourced } from "@/lib/mock";
import { cn } from "@/lib/utils";

/* Stepped mosaic in the corner: each column a bit taller, fading in. */
const mosaic = [
  [0, 0, 0, 0, 3],
  [0, 0, 0, 2, 3],
  [0, 0, 1, 2, 3],
  [0, 1, 1, 2, 2],
];
const shade = ["bg-transparent", "bg-brand-100", "bg-brand-200", "bg-brand-500"];

export function SourcedCard() {
  return (
    <Card
      className="relative flex w-full flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 100% 0%, #fff3ea 0%, transparent 55%), radial-gradient(90% 80% at 100% 100%, #f7f5f3 0%, transparent 60%), #ffffff",
      }}
    >
      <div className="flex items-center justify-between">
        <CardTitle icon={Radar}>Candidates sourced</CardTitle>
        <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-600">4 searches</span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[36px] font-medium leading-none tracking-[-0.03em] tabular">{sourced.total.toLocaleString("en-US")}</span>
            <Eye className="size-4 text-gray-300" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Delta value={sourced.delta} className="rounded-full bg-gray-50 py-0.5 pl-0.5 pr-2" />
            <span className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground tabular">{sourced.strong}</span> strong matches
            </span>
          </div>
        </div>
        <div className="grid shrink-0 grid-cols-5 gap-1" aria-hidden>
          {mosaic.flat().map((v, i) => (
            <span key={i} className={`size-2.5 rounded-[2px] ${shade[v]}`} />
          ))}
        </div>
      </div>

      {/* Shown only when the card sits beside the taller chart (below xl) */}
      <ul className="mt-5 hidden space-y-2 md:block xl:hidden">
        {searches.map((s) => (
          <li key={s.id}>
            <Link href={`/search/${s.id}`} className="flex items-center gap-3 rounded-lg bg-gray-25 px-3 py-2 hover:bg-gray-50">
              <span className={cn("size-1.5 shrink-0 rounded-full", s.status === "searching" ? "animate-pulse bg-primary" : "bg-success")} />
              <span className="min-w-0 flex-1 truncate text-xs font-medium">{s.title}</span>
              <span className="h-1 w-14 shrink-0 rounded-full bg-gray-100">
                <span className={cn("block h-full rounded-full", s.status === "searching" ? "bg-primary" : "bg-success")} style={{ width: `${s.progress * 100}%` }} />
              </span>
              <span className="w-16 shrink-0 text-right text-[11px] text-muted-foreground tabular">{s.strong} strong</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid grid-cols-3 gap-2 pt-4">
        <Link href="/search/new" className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-ink-900 text-[13px] font-medium text-white transition-colors hover:bg-ink-800">
          <Plus className="size-4" /><span>New<span className="max-sm:hidden"> search</span></span>
        </Link>
        <ImportDialog
          triggerClassName="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-gray-50 text-[13px] font-medium transition-colors hover:bg-gray-100"
          trigger={<><Upload className="size-3.5 text-gray-500" /><span className="max-sm:hidden">Import list</span><span className="sm:hidden">Import</span></>}
        />
        <ShareDialog
          title="Share hiring report"
          link="report-nov"
          triggerClassName="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-gray-50 text-[13px] font-medium transition-colors hover:bg-gray-100"
          trigger={<><Share2 className="size-3.5 text-gray-500" /><span className="max-sm:hidden">Share report</span><span className="sm:hidden">Share</span></>}
        />
      </div>
    </Card>
  );
}
