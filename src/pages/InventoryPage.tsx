import { Coffee } from "lucide-react";
import { inventory } from "../services/mockData";
import { fmtKg } from "../utils/format";
import { Badge } from "../shared/Badge";
import { Card } from "../shared/Card";

export function InventoryPage() {
  const totalStock = inventory.reduce((a, b) => a + b.current, 0);
  const lowStock = inventory.filter(i => i.current <= i.minStock);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Stok Keseluruhan</p>
          <p className="text-2xl font-bold font-mono text-foreground">{fmtKg(totalStock)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Jenis Kopi Tersedia</p>
          <p className="text-2xl font-bold font-mono text-foreground">{inventory.length}</p>
        </Card>
        <Card className="p-4 border-destructive/30">
          <p className="text-xs text-destructive mb-1">Stok Menipis</p>
          <p className="text-2xl font-bold font-mono text-destructive">{lowStock.length} jenis</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map(item => {
          const pct = Math.round((item.current / (item.incoming || 1)) * 100);
          const isLow = item.current <= item.minStock;
          return (
            <Card key={item.id} className={`p-5 ${isLow ? "border-destructive/30 bg-[#fff5f5]" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLow ? "bg-[#fee2e2]" : "bg-secondary"}`}>
                    <Coffee className={`w-4 h-4 ${isLow ? "text-destructive" : "text-primary"}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{item.type}</p>
                    {isLow && <p className="text-xs text-destructive">Stok menipis!</p>}
                  </div>
                </div>
                <Badge variant={isLow ? "danger" : "success"}>{pct}%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                <div className={`h-1.5 rounded-full ${isLow ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["Masuk", item.incoming, "text-primary"], ["Keluar", item.outgoing, "text-accent"], ["Saldo", item.current, isLow ? "text-destructive" : "text-foreground"]].map(([label, val, cls]) => (
                  <div key={label as string}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-mono">{label as string}</p>
                    <p className={`font-bold text-sm font-mono ${cls as string}`}>{val as number}</p>
                    <p className="text-[10px] text-muted-foreground">Kg</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
