/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { shortlisted } from "@/lib/mock";

const stack = shortlisted.slice(0, 3).reverse(); // best match ends up in front
const tilt = ["-rotate-[8deg] translate-y-2", "-rotate-2", "rotate-[5deg] translate-y-1"];

/** Accent card: this week's best candidates, shown as a fanned stack of profile cards. */
export function TopMatchesCard() {
  return (
    <Link
      href="/search/s1"
      className="@container group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 p-4 text-white shadow-[0_8px_24px_-8px_rgba(242,107,29,0.55)]"
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

      {/* fanned profile cards: width, spread and type scale with the card */}
      <div className="relative mt-3 h-[clamp(74px,22cqw,108px)]" style={{ ["--cw" as string]: "clamp(132px, 40cqw, 210px)" }}>
        {stack.map((c, i) => (
          <div
            key={c.id}
            className={`absolute top-1 rounded-xl border border-white/30 bg-white/20 p-[clamp(8px,2.4cqw,12px)] shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 ${tilt[i]}`}
            style={{ zIndex: i, width: "var(--cw)", left: `calc((100% - var(--cw)) * ${i / 2})` }}
          >
            <div className="flex items-center gap-2">
              <img src={c.avatar} alt="" className="size-[clamp(24px,7cqw,34px)] rounded-full object-cover ring-2 ring-white/40" />
              <div className="min-w-0 leading-tight">
                <div className="truncate text-[clamp(11px,3.3cqw,14px)] font-medium">{c.name}</div>
                <div className="truncate text-[clamp(9px,2.7cqw,11px)] text-white/70">{c.company}</div>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="h-1 flex-1 rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white" style={{ width: `${c.match}%` }} />
              </div>
              <span className="text-[clamp(9px,2.7cqw,11px)] font-medium tabular">{c.match}%</span>
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
