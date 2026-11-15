/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { shortlisted } from "@/lib/mock";

const stack = shortlisted.slice(0, 3).reverse(); // best match ends up in front
const tilt = ["-rotate-[8deg] translate-x-0 translate-y-2", "-rotate-2 translate-x-[68px]", "rotate-[5deg] translate-x-[136px] translate-y-1"];

/** Accent card: this week's best candidates, shown as a fanned stack of profile cards. */
export function TopMatchesCard() {
  return (
    <Link
      href="/search/s1"
      className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 p-4 text-white shadow-[0_8px_24px_-8px_rgba(242,107,29,0.55)]"
    >
      {/* soft light + grid texture */}
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-white/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.16)_0_2px,transparent_2px_9px)] [mask-image:linear-gradient(200deg,black,transparent_75%)]" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[15px] font-medium">Top matches</div>
          <div className="text-xs text-white/70">Best of this week</div>
        </div>
        <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      {/* fanned profile cards */}
      <div className="relative mt-3 h-[74px]">
        {stack.map((c, i) => (
          <div
            key={c.id}
            className={`absolute left-0 top-1 w-[132px] rounded-xl border border-white/30 bg-white/20 p-2 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 ${tilt[i]}`}
            style={{ zIndex: i }}
          >
            <div className="flex items-center gap-2">
              <img src={c.avatar} alt="" className="size-6 rounded-full object-cover ring-2 ring-white/40" />
              <div className="min-w-0 leading-tight">
                <div className="truncate text-[11px] font-medium">{c.name}</div>
                <div className="truncate text-[9px] text-white/70">{c.company}</div>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="h-1 flex-1 rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white" style={{ width: `${c.match}%` }} />
              </div>
              <span className="text-[9px] font-medium tabular">{c.match}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-auto grid grid-cols-3 divide-x divide-white/25 pt-3">
        {[["Design", 38], ["Engineering", 21], ["Growth", 17]].map(([k, v]) => (
          <div key={k} className="px-2.5 first:pl-0">
            <div className="text-[11px] text-white/70">{k}</div>
            <div className="text-[15px] font-medium tabular">{v}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}
