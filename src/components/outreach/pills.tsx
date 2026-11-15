import { CircleDashed, Clock, Pause } from "lucide-react";
import type { MailStatus, SeqStatus } from "@/lib/outreach-mock";
import { cn } from "@/lib/utils";

const base = "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-xs font-medium";

export function SeqPill({ status }: { status: SeqStatus }) {
  if (status === "active")
    return <span className={cn(base, "border-transparent bg-brand-50 text-brand-700")}><span className="size-1.5 rounded-full bg-brand-500" />Active</span>;
  if (status === "paused")
    return <span className={cn(base, "border-transparent bg-gray-100 text-gray-600")}><Pause className="size-3" />Paused</span>;
  return <span className={cn(base, "border-dashed border-black/[0.14] bg-white text-gray-500")}><CircleDashed className="size-3" />Draft</span>;
}

export function MailPill({ status, when }: { status: MailStatus; when?: string }) {
  if (status === "replied") return <span className={cn(base, "border-transparent bg-brand-50 text-brand-700")}><span className="size-1.5 rounded-full bg-brand-500" />Replied</span>;
  if (status === "opened") return <span className={cn(base, "border-transparent bg-gray-100 text-foreground")}>Opened</span>;
  if (status === "sent") return <span className={cn(base, "border-black/[0.08] bg-white text-gray-600")}>Sent</span>;
  return <span className={cn(base, "border-dashed border-black/[0.14] bg-white text-gray-500")}><Clock className="size-3" />{when ?? "Scheduled"}</span>;
}
