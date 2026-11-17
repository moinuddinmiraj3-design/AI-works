/* eslint-disable @next/next/no-img-element */
import { Sparkles } from "lucide-react";
import { MatchRing } from "@/components/search/match-ring";
import { candidates } from "@/lib/search-mock";

/** Right-hand panel on Sign in and Sign up: team photo, headline and three matched candidates. */
export function AuthShowcase() {
  const picks = candidates.slice(0, 3);
  return (
    <div className="hidden p-3 lg:block">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-ink-900 p-10 text-white">
        {/* Photo + fades so text stays readable and the blue walls sit back */}
        <img src="/images/signin-team.jpg" alt="" className="absolute inset-0 size-full object-cover object-[50%_35%]" />
        <div aria-hidden className="absolute inset-0 bg-ink-900/35" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink-900/95 via-ink-900/70 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink-900 via-ink-900/85 to-transparent" />
        <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-500/25 blur-3xl" />

        <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-ink-100 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-brand-400" />Search finished in 4 minutes
        </span>
        <h2 className="relative mt-5 max-w-md text-[30px] font-medium leading-[1.15] tracking-[-0.025em] [text-wrap:balance]">
          Describe the hire.<br />Lasso brings back the people worth talking to.
        </h2>

        <div className="relative mt-auto space-y-2.5">
          {picks.map((c, i) => (
            <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-white/[0.88] p-3 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_12px_32px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/50 backdrop-blur-xl backdrop-saturate-150" style={{ marginLeft: i * 28, marginRight: (2 - i) * 28 }}>
              <img src={c.avatar} alt="" className="size-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[13px] font-medium">{c.name}</div>
                <div className="truncate text-xs text-muted-foreground">{c.title} · {c.company}</div>
              </div>
              <MatchRing value={c.match} size={40} />
            </div>
          ))}
          <p className="pt-4 text-xs text-ink-100/80">“We filled two senior design roles from our first search.” — Head of Talent, Series B SaaS</p>
        </div>
      </div>
    </div>
  );
}
