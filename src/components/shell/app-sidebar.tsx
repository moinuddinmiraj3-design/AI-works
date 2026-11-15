"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  ChevronsLeft,
  LayoutDashboard,
  Library,
  Plus,
  Search,
  Send,
  Settings,
  SquarePen,
  UserPlus,
  UserSearch,
  Users,
} from "lucide-react";
import { CommandPalette, NewCollectionDialog, WorkspaceMenu } from "@/components/popups/shell-popups";
import { collections, workspace } from "@/lib/mock";
import { toneClasses } from "@/lib/tone";
import { cn } from "@/lib/utils";

// `match` lists every route prefix that belongs to the section, so it stays highlighted on its sub-pages.
const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, match: ["/welcome"] },
  { href: "/search/new", label: "Sourcing", icon: UserSearch, match: ["/search", "/searches"] },
  { href: "/collections", label: "Library", icon: Library, match: ["/collections", "/candidates"] },
  { href: "/outreach", label: "Outreach", icon: Send, match: ["/outreach"] },
];

function Item({ href, label, icon: Icon, active }: { href: string; label: string; icon: React.ElementType; active?: boolean }) {
  return (
    <Link
      href={href}
      title={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "side-center flex h-8 items-center gap-2.5 rounded-full px-3 text-[13px] transition-colors",
        active ? "bg-ink-900 font-medium text-white shadow-[0_4px_10px_-4px_rgba(0,0,0,0.45)]" : "text-gray-600 hover:bg-black/[0.04] hover:text-foreground"
      )}
    >
      <Icon className={cn("size-4 shrink-0", active ? "text-white" : "text-gray-500")} strokeWidth={1.75} />
      <span className="side-hide truncate">{label}</span>
    </Link>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="whitespace-nowrap rounded-[4px] border bg-white px-1 py-0.5 font-sans text-[10px] leading-none text-gray-500">{children}</kbd>;
}

export function AppSidebar({ onNavigate, onToggle }: { onNavigate?: () => void; onToggle?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const pct = Math.round(((14 - workspace.trialDaysLeft) / 14) * 100);

  return (
    <nav className="flex h-full flex-col px-2.5 pb-2.5 pt-2.5" onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate?.()}>
      {/* Workspace + collapse */}
      <div className="side-stack flex items-center justify-between">
        <WorkspaceMenu />
        <button data-collapse-toggle onClick={onToggle} aria-label="Collapse sidebar" title="Collapse or expand sidebar" className="hidden size-7 place-items-center rounded-md text-gray-400 hover:bg-black/[0.04] hover:text-foreground lg:grid">
          <ChevronsLeft className="side-flip size-4 transition-transform" strokeWidth={1.75} />
        </button>
      </div>

      {/* New search + quick find */}
      <div className="side-stack mt-2.5 flex gap-1.5">
        <Link href="/search/new" title="New search" className="side-square flex h-[30px] min-w-0 flex-1 items-center gap-2 whitespace-nowrap rounded-md border bg-white px-2 text-[13px] text-gray-600 hover:text-foreground">
          <SquarePen className="size-3.5 shrink-0" strokeWidth={1.75} />
          <span className="side-hide">New search</span>
          <span className="side-hide ml-auto"><Kbd>⌘ K</Kbd></span>
        </Link>
        <CommandPalette
          triggerClassName="side-square flex h-[30px] shrink-0 items-center gap-1.5 rounded-md border bg-white px-2 text-gray-500 hover:text-foreground"
          trigger={<><Search className="size-3.5" strokeWidth={1.75} /><span className="side-hide"><Kbd>⌘ /</Kbd></span></>}
        />
      </div>


      <div className="mt-3 space-y-px">
        {nav.map(({ match, ...n }) => (
          <Item key={n.href} {...n} active={n.href === "/" ? pathname === "/" || match.some((m) => pathname.startsWith(m)) : match.some((m) => pathname.startsWith(m))} />
        ))}
      </div>

      {/* Collections */}
      <div className="mt-4">
        <div className="side-hide flex h-7 items-center justify-between px-2">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            Collections
            <span className="grid size-4 place-items-center rounded-[4px] border bg-white"><ChevronDown className="size-2.5" /></span>
          </span>
          <NewCollectionDialog
            triggerClassName="grid size-5 place-items-center rounded-sm text-gray-400 hover:bg-black/[0.04] hover:text-foreground"
            trigger={<Plus className="size-3.5" />}
          />
        </div>
        <div className="space-y-px">
          {collections.map((c) => (
            <Link key={c.id} href={`/collections/${c.id}`} title={c.name} className="side-center flex h-[30px] items-center gap-2.5 rounded-md px-2 text-[13px] text-gray-600 hover:bg-black/[0.04] hover:text-foreground">
              <span className={cn("grid size-4 place-items-center rounded-[4px]", toneClasses[c.tone])}>
                <Users className="size-2.5" strokeWidth={2.5} />
              </span>
              <span className="side-hide truncate">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        {/* Trial card */}
        <div className="side-hide relative overflow-hidden rounded-lg border bg-white p-3">
          <div aria-hidden className="pointer-events-none absolute -right-6 -top-10 size-28 rounded-full bg-brand-200/60 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--brand-200)_1px,transparent_1px)] [background-size:8px_8px] [mask-image:linear-gradient(225deg,black,transparent_55%)]" />
          <div className="relative text-xs font-medium">Your Lasso trial is active</div>
          <p className="relative mt-1 text-[11px] leading-snug text-gray-500">
            Enjoy {workspace.trialDaysLeft} more days of access to Starter benefits with your free trial.
          </p>
          <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-2 space-y-px">
          <Item href="/settings/members" label="Invite team" icon={UserPlus} active={pathname.startsWith("/settings/members")} />
          <Item href="/help" label="Knowledge hub" icon={BookOpen} active={pathname.startsWith("/help")} />
          <Item href="/settings" label="Account settings" icon={Settings} active={isActive("/settings") && !pathname.startsWith("/settings/members")} />
        </div>
      </div>
    </nav>
  );
}
