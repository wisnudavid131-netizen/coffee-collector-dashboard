import {
  BarChart2, Package, ShoppingCart, TrendingUp,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { inventory, monthlyData, recentTransactions } from "../services/mockData";
import { fmt, fmtKg } from "../utils/format";
import { Badge } from "../shared/Badge";
import { Card } from "../shared/Card";
import { KpiCard } from "../shared/KpiCard";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Stok Kopi" value="850 Kg" sub="Semua jenis" delta={5.2} icon={Package} color="bg-[#d1fae5] text-[#065f46]" />
        <KpiCard label="Pembelian Hari Ini" value="Rp 25,2 Jt" sub="3 transaksi" delta={12.1} icon={ShoppingCart} color="bg-[#fef3c7] text-[#92400e]" />
        <KpiCard label="Penjualan Hari Ini" value="Rp 22,4 Jt" sub="2 transaksi" delta={-3.5} icon={TrendingUp} color="bg-[#dbeafe] text-[#1e40af]" />
        <KpiCard label="Laba Bulan Ini" value="Rp 18,7 Jt" sub="vs. Rp 16,2 Jt lalu" delta={15.4} icon={BarChart2} color="bg-[#f3e8ff] text-[#6b21a8]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Volume Pembelian & Penjualan</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Kuintal per bulan — 2024</p>
            </div>
            <Badge variant="info">2024</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="gbeli" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gjual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6f4e37" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6f4e37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#7a6a52" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7a6a52" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="pembelian" name="Pembelian" stroke="#2d6a4f" fill="url(#gbeli)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="penjualan" name="Penjualan" stroke="#6f4e37" fill="url(#gjual)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Stok per Jenis Kopi</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Saldo stok saat ini (Kg)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={inventory} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="type" tick={{ fontSize: 11, fill: "#7a6a52" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7a6a52" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", fontSize: 12 }} />
              <Bar dataKey="current" name="Stok (Kg)" fill="#2d6a4f" radius={[6, 6, 0, 0]} />
              <Bar dataKey="incoming" name="Masuk (Kg)" fill="#95d5b2" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground text-sm">Transaksi Terbaru</h3>
          <Badge variant="default">5 terbaru</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["ID", "Tanggal", "Tipe", "Pihak", "Jenis Kopi", "Berat", "Nilai"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground font-mono uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, i) => (
                <tr key={tx.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : ""}`}>
                  <td className="px-5 py-3.5 text-xs font-mono text-primary">{tx.id}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground font-mono">{tx.date}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={tx.type === "Pembelian" ? "info" : "success"}>{tx.type}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{tx.party}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{tx.coffeeType}</td>
                  <td className="px-5 py-3.5 text-sm font-mono">{fmtKg(tx.weight)}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-medium text-foreground">{fmt(tx.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
