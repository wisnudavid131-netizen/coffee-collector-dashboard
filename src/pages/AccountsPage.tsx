import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { payables, receivables } from "../services/mockData";
import { fmt } from "../utils/format";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { StatusBadge } from "../shared/StatusBadge";

export function AccountsPage() {
  const { addToast } = useToast();
  const [tab, setTab] = useState<"payable" | "receivable">("payable");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
        {[["payable", "Hutang ke Petani"], ["receivable", "Piutang dari Pembeli"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as "payable" | "receivable")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {label}
          </button>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-foreground text-sm">{tab === "payable" ? "Daftar Hutang ke Petani" : "Daftar Piutang dari Pembeli"}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{tab === "payable" ? "Kewajiban pembayaran kepada petani mitra" : "Tagihan kepada pembeli kopi"}</p>
          </div>
          <Button size="sm" onClick={() => addToast("Menambahkan entri baru", "info")}><Plus className="w-3.5 h-3.5" /> Tambah</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["ID", "Pihak", "Total", "Jatuh Tempo", "Sisa", "Status", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground font-mono uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(tab === "payable" ? payables : receivables).map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-primary">{item.id}</td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{"farmer" in item ? item.farmer : item.customer}</td>
                  <td className="px-5 py-3.5 text-sm font-mono">{fmt(item.amount)}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{item.due}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold">{fmt(item.remaining)}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5">
                    <Button size="sm" variant="secondary" onClick={() => addToast("Membayar cicilan...", "success")}>Bayar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total outstanding</p>
            <p className="font-bold font-mono text-foreground">
              {fmt((tab === "payable" ? payables : receivables).reduce((a, b) => a + b.remaining, 0))}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
