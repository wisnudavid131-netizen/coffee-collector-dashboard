import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { COFFEE_TYPES, sales } from "../services/mockData";
import { fmt, fmtKg } from "../utils/format";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { StatusBadge } from "../shared/StatusBadge";

export function SalesPage() {
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{sales.length} transaksi ditemukan</p>
        <Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4" /> Catat Penjualan</Button>
      </div>

      {showForm && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Form Penjualan Baru</h3>
            <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Input label="Nama Pembeli" value="" onChange={() => {}} placeholder="PT Nusantara Coffee" />
            <Input label="Tanggal Penjualan" type="date" value="2024-08-10" onChange={() => {}} />
            <Select label="Jenis Kopi" value="Arabika" onChange={() => {}} options={[...COFFEE_TYPES]} />
            <Input label="Berat (Kg)" value="200" onChange={() => {}} suffix="Kg" />
            <Input label="Harga per Kg" value="58000" onChange={() => {}} suffix="Rp" />
            <Select label="Status Bayar" value="Lunas" onChange={() => {}} options={["Lunas", "Belum Lunas", "Cicilan"]} />
          </div>
          <div className="p-4 bg-secondary rounded-xl mb-4">
            <p className="text-xs text-muted-foreground mb-1">Total Penjualan</p>
            <p className="text-xl font-bold font-mono text-foreground">{fmt(200 * 58000)}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => { setShowForm(false); addToast("Penjualan berhasil disimpan", "success"); }}><Check className="w-4 h-4" /> Simpan</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["ID", "Tanggal", "Pembeli", "Jenis", "Berat", "Harga/Kg", "Total", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground font-mono uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-mono text-primary">{s.id}</td>
                  <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">{s.date}</td>
                  <td className="px-4 py-3.5 text-sm text-foreground">{s.customer}</td>
                  <td className="px-4 py-3.5"><Badge variant="success">{s.coffeeType}</Badge></td>
                  <td className="px-4 py-3.5 text-sm font-mono">{fmtKg(s.weight)}</td>
                  <td className="px-4 py-3.5 text-sm font-mono">{fmt(s.pricePerKg)}</td>
                  <td className="px-4 py-3.5 text-sm font-mono font-semibold">{fmt(s.total)}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
