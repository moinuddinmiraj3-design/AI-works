import Link from "next/link";
import { BriefcaseBusiness, ChevronRight, Code, PenTool, Plus, TrendingUp } from "lucide-react";
import { roles } from "@/lib/mock";
import { AddRoleDialog } from "@/components/popups/page-popups";

const icons = { pen: PenTool, code: Code, trend: TrendingUp } as const;

/** Dark card: each open role and how close its shortlist is to the target. */
export function OpenRolesCard() {
  const totalShort = roles.reduce((n, r) => n + r.shortlisted, 0);
  const totalTarget = roles.reduce((n, r) => n + r.target, 0);
  return (
    <section className="@container flex h-full w-full flex-col rounded-2xl bg-ink-900 p-4 text-ink-100 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5 text-[13px] font-medium text-white">
          <span className="grid size-7 place-items-center rounded-full bg-white text-ink-900">
            <BriefcaseBusiness className="size-3.5" strokeWidth={2} />
          </span>
          Open roles
        </div>
        <AddRoleDialog
          triggerClassName="inline-flex h-7 items-center gap-1.5 rounded-full bg-white pl-1.5 pr-3 text-xs font-medium text-ink-900 hover:bg-white/90"
          trigger={<><span className="grid size-4 place-items-center rounded-full bg-ink-900 text-white"><Plus className="size-3" strokeWidth={2.5} /></span>Add role</>}
        />
      </div>

      <ul className="mt-3 flex flex-1 flex-col gap-1">
        {roles.map((r) => {
          const Icon = icons[r.icon as keyof typeof icons];
          const pct = Math.round((r.shortlisted / r.target) * 100);
          return (
            <li key={r.id} className="flex flex-1">
              <Link href={`/search/${r.id}`} className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2 transition-colors hover:bg-white/[0.09] @md:grid-cols-[auto_minmax(0,1fr)_minmax(0,150px)_auto_auto]">
                <Icon className="size-4 text-ink-300" strokeWidth={1.75} />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] text-white">{r.title}</span>
                  <span className="mt-2 block h-1 rounded-full bg-white/10 @md:hidden">
                    <span className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500" style={{ width: `${pct}%` }} />
                  </span>
                </span>
                <span className="hidden items-center gap-2 @md:flex">
                  <span className="w-8 text-right text-xs text-ink-300 tabular">{pct}%</span>
                  <span className="h-1.5 flex-1 rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500" style={{ width: `${pct}%` }} />
                  </span>
                </span>
                <span className="text-xs text-ink-300 tabular">
                  <span className="text-white">{r.shortlisted}</span> / {r.target}
                </span>
                <span className="hidden size-6 place-items-center rounded-full bg-white/10 text-ink-300 group-hover:text-white @md:grid">
                  <ChevronRight className="size-3.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 px-1 pt-3 text-xs text-ink-300">
        <span>
          <span className="font-medium text-white tabular">{totalShort}</span> of {totalTarget} shortlisted across {roles.length} roles
        </span>
        <span className="h-1 flex-1 rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-white/70" style={{ width: `${Math.round((totalShort / totalTarget) * 100)}%` }} />
        </span>
        <span className="tabular">{Math.round((totalShort / totalTarget) * 100)}%</span>
      </div>
    </section>
  );
}
