import { useState } from "react";
import {
  ArrowDownRight, ArrowUpRight, Download, Filter, Loader2, Search,
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useToast } from "../hooks/useToast";
import { monthlyData } from "../services/mockData";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";

export function ReportsPage() {
  const { addToast } = useToast();
  const [period, setPeriod] = useState("Bulanan");
  const [loading, setLoading] = useState(false);

  const handleExport = (type: string) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); addToast(`Laporan ${type} berhasil diunduh`, "success"); }, 1500);
  };

  const summaryData = [
    { label: "Total Pembelian", value: "Rp 57,56 Jt", sub: "1.400 Kg", delta: 8.2 },
    { label: "Total Penjualan", value: "Rp 55,8 Jt", sub: "1.030 Kg", delta: 5.1 },
    { label: "Laba Kotor", value: "Rp 18,24 Jt", sub: "Margin 32.6%", delta: 14.3 },
    { label: "Piutang Berjalan", value: "Rp 15,05 Jt", sub: "3 transaksi", delta: -2.1 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-1 bg-muted p-1 rounded-xl">
            {["Harian", "Mingguan", "Bulanan", "Tahunan"].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Input label="" value="2024-08-01" type="date" onChange={() => {}} className="w-36" />
            <span className="text-muted-foreground text-sm">–</span>
            <Input label="" value="2024-08-31" type="date" onChange={() => {}} className="w-36" />
            <Button variant="secondary" size="sm"><Search className="w-3.5 h-3.5" /> Tampilkan</Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => handleExport("PDF")} disabled={loading}>
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("Excel")} disabled={loading}>
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} Export Excel
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map(d => (
          <Card key={d.label} className="p-5">
            <p className="text-xs text-muted-foreground mb-2">{d.label}</p>
            <p className="text-lg font-bold font-mono text-foreground">{d.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">{d.sub}</p>
              <span className={`text-xs font-mono font-medium flex items-center gap-0.5 ${d.delta >= 0 ? "text-[#065f46]" : "text-destructive"}`}>
                {d.delta >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{Math.abs(d.delta)}%
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="font-semibold text-foreground text-sm mb-4">Grafik {period} — Agustus 2024</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#7a6a52" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#7a6a52" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="pembelian" name="Pembelian" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
            <Bar dataKey="penjualan" name="Penjualan" fill="#6f4e37" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
