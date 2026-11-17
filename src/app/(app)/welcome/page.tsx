import Link from "next/link";
import { ArrowRight, Check, FolderPlus, Mail, Radar, Send, Sparkles, UserCheck } from "lucide-react";
import { TopBar } from "@/components/shell/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { NewCollectionDialog } from "@/components/popups/shell-popups";
import { Roll, Beam } from "@/components/ui/fx";

const card = "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]";
const steps = [
  { done: true, title: "Create your workspace", hint: "Northwind is ready", href: "/settings" },
  { done: true, title: "Connect Gmail", hint: "alex@northwind.com", href: "/settings" },
  { done: false, title: "Run your first search", hint: "Describe who you're hiring", href: "/search/new" },
  { done: false, title: "Shortlist people into a collection", hint: "Your saved lists live in Library", href: "/collections/c4" },
  { done: false, title: "Send your first sequence", hint: "Email + follow-ups from your inbox", href: "/outreach/sequences/sq4" },
];

/** Dashboard for a brand-new workspace, before any searches exist. */
export default function WelcomePage() {
  return (
    <>
      <TopBar crumbs={["Dashboard"]} />
      <div className="mx-auto w-full max-w-[1684px] px-4 pb-10 pt-4 lg:px-8">
        <h1 className="text-[26px] font-medium leading-tight tracking-[-0.025em]">Welcome to Lasso, Alex</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Your workspace is set up. Here&apos;s how to get your first shortlist.</p>

        <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-12">
          <section className={`${card} p-6 xl:col-span-7`}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium">Getting started</span>
              <span className="text-xs text-muted-foreground"><span className="font-medium text-foreground">2</span> of 5 done</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full w-2/5 rounded-full bg-brand-500" /></div>
            <ol className="mt-5 space-y-1">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <Link href={s.href} className="group flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-gray-25">
                    <span className={s.done ? "grid size-7 place-items-center rounded-full bg-ink-900 text-white" : i === 2 ? "grid size-7 place-items-center rounded-full border-2 border-brand-500 text-[11px] font-medium" : "grid size-7 place-items-center rounded-full border border-gray-200 text-[11px] text-gray-400"}>
                      {s.done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className={s.done ? "block text-[13px] text-gray-400 line-through" : "block text-[13px] font-medium"}>{s.title}</span>
                      <span className="block text-xs text-muted-foreground">{s.hint}</span>
                    </span>
                    {!s.done && <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-500" />}
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section className="relative overflow-hidden rounded-2xl bg-ink-900 p-6 text-white xl:col-span-5">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-500/25 blur-3xl" />
            <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs"><Sparkles className="size-3.5 text-brand-400" />Takes about 4 minutes</span>
            <h2 className="relative mt-4 text-[22px] font-medium leading-tight tracking-[-0.02em]">Start with one role you&apos;re hiring for right now.</h2>
            <p className="relative mt-2 text-[13px] text-ink-300">Describe it like you&apos;d brief a recruiter. Lasso reads the brief, sets the criteria and scores every profile it finds.</p>
            <Link href="/search/new" className="relative mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-medium text-ink-900 hover:bg-white/90">
              <Radar className="size-4" />Start your first search
            </Link>
          </section>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[{ i: Radar, l: "Candidates sourced" }, { i: UserCheck, l: "Shortlisted" }, { i: Send, l: "Emails sent" }, { i: Mail, l: "Reply rate" }].map(({ i: Icon, l }) => (
            <div key={l} className={`${card} p-4`}>
              <div className="flex items-center gap-2 text-[13px] font-medium"><span className="grid size-7 place-items-center rounded-full bg-gray-50 text-gray-500"><Icon className="size-3.5" /></span>{l}</div>
              <div className="mt-3 text-[24px] font-medium leading-none text-gray-300 tabular">—</div>
              <div className="mt-2 text-xs text-muted-foreground">Shows up after your first search</div>
            </div>
          ))}
        </div>

        <section className={`${card} mt-3`}>
          <EmptyState compact icon={FolderPlus} title="No candidates saved yet" description="People you shortlist from a search land in a collection, ready to email together.">
            <Link href="/search/new" className="fx-btn inline-flex h-9 items-center rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"><Beam /><Roll>Find candidates</Roll></Link>
            <NewCollectionDialog triggerClassName="fx-btn inline-flex h-9 items-center rounded-full border border-black/[0.06] bg-white px-4 text-xs font-medium shadow-xs hover:bg-gray-25" trigger={<Roll>Create a collection</Roll>} />
          </EmptyState>
        </section>
      </div>
    </>
  );
}
