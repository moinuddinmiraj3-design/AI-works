import { ChevronRight } from "lucide-react";
import { AccountMenu, NotificationsPopover } from "@/components/popups/shell-popups";
import { UsagePopover } from "@/components/popups/page-popups";
import { MobileMenuButton } from "./app-shell";
import { workspace } from "@/lib/mock";

/** Top bar: breadcrumb on the left, usage + notifications + account on the right. */
export function TopBar({ crumbs }: { crumbs: string[] }) {
  return (
    <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center gap-2 border-b border-black/[0.05] bg-canvas px-4 lg:px-6">
      <MobileMenuButton />
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[13px]">
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 text-gray-300" />}
            <span className={i === crumbs.length - 1 ? "font-medium" : "text-muted-foreground"}>{c}</span>
          </span>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <UsagePopover left={workspace.searchesLimit - workspace.searchesUsed} />
        <NotificationsPopover />
        <AccountMenu />
      </div>
    </header>
  );
}

/** Second bar under the top bar: status on the left, page actions on the right. */
export function Toolbar({ children, status }: { children?: React.ReactNode; status?: React.ReactNode }) {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 lg:px-6">
      <div className="min-w-0">{status}</div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

export function SectionTitle({ title, meta, action }: { title: string; meta?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-md font-medium">
        {title}
        {meta != null && <span className="ml-1.5 font-normal text-gray-400 tabular">{meta}</span>}
      </h2>
      {action}
    </div>
  );
}
