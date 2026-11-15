import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/delta";
import { PersonAvatar } from "@/components/ui/person";
import { collections, shortlisted, type CandidateStatus } from "@/lib/mock";
import { toneDot } from "@/lib/tone";
import { cn } from "@/lib/utils";

const status: Record<CandidateStatus, { label: string; className: string }> = {
  new: { label: "Not contacted", className: "bg-gray-50 text-gray-600" },
  emailed: { label: "Emailed", className: "bg-[#ebf2ff] text-[#2f66d6]" },
  replied: { label: "Replied", className: "bg-[#e9f6ee] text-[#18804a]" },
  "no-email": { label: "No email yet", className: "bg-[#fdf3e1] text-[#9a6206]" },
};

/** Columns appear as the card gets wider (container queries), so it reads well at half or full width. */
export function ShortlistList() {
  return (
    <Card className="@container w-full p-0">
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <CardTitle icon={Users}>Recently shortlisted</CardTitle>
        <Link href="/collections" className="inline-flex h-7 items-center gap-1 rounded-full border bg-white px-2.5 text-xs text-gray-600 hover:bg-gray-25">
          View all <ChevronRight className="size-3" />
        </Link>
      </div>
      <div className="px-2 pb-2">
        <table className="w-full table-fixed text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-gray-400">
              <th className="px-3 pb-2 font-normal">Candidate</th>
              <th className="hidden px-3 pb-2 font-normal @3xl:table-cell">Collection</th>
              <th className="w-28 px-3 pb-2 font-normal">Status</th>
              <th className="w-14 px-3 pb-2 font-normal @2xl:w-48">Match</th>
              <th className="hidden w-8 px-3 pb-2 @md:table-cell" />
            </tr>
          </thead>
          <tbody>
            {shortlisted.slice(0, 4).map((c) => {
              const col = collections.find((x) => x.id === c.collection)!;
              return (
                <tr key={c.id} className="group">
                  <td className="rounded-l-xl px-3 py-1.5 group-hover:bg-gray-25">
                    <Link href={`/candidates/${c.id}`} className="flex min-w-0 items-center gap-3">
                      <PersonAvatar src={c.avatar} name={c.name} className="size-8" />
                      <span className="min-w-0 leading-tight">
                        <span className="block truncate font-medium">{c.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{c.title} · {c.company}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-3 py-1.5 text-gray-600 group-hover:bg-gray-25 @3xl:table-cell">
                    <span className="flex items-center gap-2 truncate">
                      <span className={cn("size-1.5 shrink-0 rounded-full", toneDot[col.tone])} />
                      <span className="truncate">{col.name}</span>
                    </span>
                  </td>
                  <td className="px-3 py-1.5 group-hover:bg-gray-25">
                    <span className={cn("inline-flex h-6 items-center whitespace-nowrap rounded-full px-2.5 text-xs font-medium", status[c.status].className)}>{status[c.status].label}</span>
                  </td>
                  <td className="px-3 py-1.5 group-hover:bg-gray-25">
                    <span className="flex items-center gap-2.5">
                      <span className="hidden h-1.5 flex-1 rounded-full bg-gray-100 @2xl:block">
                        <span className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: `${c.match}%` }} />
                      </span>
                      <span className="text-xs font-medium tabular">{c.match}%</span>
                    </span>
                  </td>
                  <td className="hidden rounded-r-xl px-3 py-1.5 text-right group-hover:bg-gray-25 @md:table-cell">
                    <ChevronRight className="ml-auto size-4 text-gray-300 group-hover:text-gray-500" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
