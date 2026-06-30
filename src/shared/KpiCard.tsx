import type { ElementType } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "./Card";

export function KpiCard({ label, value, sub, delta, icon: Icon, color }: {
  label: string; value: string; sub?: string; delta?: number; icon: ElementType; color: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-mono font-medium ${delta >= 0 ? "text-[#065f46]" : "text-destructive"}`}>
            {delta >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground font-mono">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </Card>
  );
}
