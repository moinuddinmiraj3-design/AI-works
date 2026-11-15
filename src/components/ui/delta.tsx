import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** "+12.4% vs last week" change chip. */
export function Delta({ value, suffix = "vs last week", className }: { value: number; suffix?: string; className?: string }) {
  const up = value >= 0;
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", className)}>
      <span className={cn("grid size-4 place-items-center rounded-full text-white", up ? "bg-primary" : "bg-danger")}>
        {up ? <ArrowUpRight className="size-2.5" strokeWidth={3} /> : <ArrowDownRight className="size-2.5" strokeWidth={3} />}
      </span>
      <span className={cn("font-medium tabular", up ? "text-primary" : "text-danger")}>
        {up ? "+" : ""}
        {value}%
      </span>
      <span className="text-muted-foreground">{suffix}</span>
    </span>
  );
}

/** White rounded surface used for every dashboard card. */
export function Card({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("rounded-2xl border border-black/[0.06] bg-card p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_-6px_rgba(16,24,40,0.08)]", className)} {...props} />;
}

export function CardTitle({ icon: Icon, children, className }: { icon: React.ElementType; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-[13px] font-medium", className)}>
      <span className="grid size-7 place-items-center rounded-full bg-gray-50 text-gray-600">
        <Icon className="size-3.5" strokeWidth={1.75} />
      </span>
      {children}
    </div>
  );
}
