import { Card, CardTitle, Delta } from "@/components/ui/delta";

export function MetricCard({ icon, label, value, delta, suffix, children }: {
  icon: React.ElementType; label: string; value: string; delta: number; suffix?: string; children?: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col">
      <CardTitle icon={icon}>{label}</CardTitle>
      <div className="mt-3 text-[24px] font-medium leading-none tracking-[-0.02em] tabular">{value}</div>
      <Delta value={delta} suffix={suffix} className="mt-2 flex-wrap" />
      {children}
    </Card>
  );
}
