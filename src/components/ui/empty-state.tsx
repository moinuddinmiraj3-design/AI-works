import { cn } from "@/lib/utils";

/** Friendly empty state: a soft illustration, a title, one line of help and up to two actions. */
export function EmptyState({
  icon: Icon, title, description, children, className, compact,
}: { icon: React.ElementType; title: string; description: string; children?: React.ReactNode; className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center px-6 text-center", compact ? "py-10" : "py-16", className)}>
      <div className="relative">
        <div className="grid w-44 gap-1.5 opacity-70" aria-hidden>
          {[0.9, 0.7, 0.5].map((o, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-black/[0.05] bg-white px-2.5 py-2 shadow-xs" style={{ opacity: o }}>
              <span className="size-5 rounded-full bg-gray-100" />
              <span className="h-1.5 flex-1 rounded-full bg-gray-100" />
              <span className="h-1.5 w-6 rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
        <span className="absolute -bottom-3 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-2xl bg-ink-900 text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
      </div>
      <h3 className="mt-8 text-[15px] font-medium">{title}</h3>
      <p className="mt-1 max-w-sm text-[13px] text-muted-foreground">{description}</p>
      {children && <div className="mt-5 flex flex-wrap justify-center gap-2">{children}</div>}
    </div>
  );
}
