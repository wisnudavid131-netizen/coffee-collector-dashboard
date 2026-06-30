import { useState } from "react";
import { Check, Plus, Printer, X } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { COFFEE_TYPES, farmers, purchases } from "../services/mockData";
import { fmt, fmtKg } from "../utils/format";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { StatusBadge } from "../shared/StatusBadge";

export function PurchasesPage() {
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState("250");
  const [pricePerKg, setPricePerKg] = useState("42000");
  const total = Number(weight) * Number(pricePerKg);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{purchases.length} transaksi ditemukan</p>
        <Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4" /> Catat Pembelian</Button>
      </div>

      {showForm && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Form Pembelian Baru</h3>
            <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Input label="Tanggal Pembelian" type="date" value="2024-08-10" onChange={() => {}} />
            <Select label="Petani" value="Budi Santoso" onChange={() => {}} options={farmers.map(f => f.name)} />
            <Select label="Jenis Kopi" value="Arabika" onChange={() => {}} options={[...COFFEE_TYPES]} />
            <Input label="Berat (Kg)" value={weight} onChange={setWeight} suffix="Kg" />
            <Input label="Kadar Air (%)" value="12.5" onChange={() => {}} suffix="%" />
            <Input label="Harga per Kg" value={pricePerKg} onChange={setPricePerKg} suffix="Rp" />
          </div>
          <div className="flex items-center gap-4 mb-4 p-4 bg-secondary rounded-xl">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Pembelian</p>
              <p className="text-xl font-bold text-foreground font-mono">{fmt(total)}</p>
            </div>
            <div className="flex-1" />
            <Select label="Status Pembayaran" value="Lunas" onChange={() => {}} options={["Lunas", "Belum Lunas", "Cicilan"]} />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => { setShowForm(false); addToast("Pembelian berhasil disimpan", "success"); }}><Check className="w-4 h-4" /> Simpan</Button>
            <Button variant="outline" onClick={() => addToast("Mencetak struk...", "info")}><Printer className="w-4 h-4" /> Cetak Struk</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["ID", "Tanggal", "Petani", "Jenis", "Berat", "Kadar Air", "Harga/Kg", "Total", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground font-mono uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchases.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-mono text-primary">{p.id}</td>
                  <td className="px-4 py-3.5 text-xs font-mono text-muted-foreground">{p.date}</td>
                  <td className="px-4 py-3.5 text-sm text-foreground">{p.farmer}</td>
                  <td className="px-4 py-3.5"><Badge variant="info">{p.coffeeType}</Badge></td>
                  <td className="px-4 py-3.5 text-sm font-mono">{fmtKg(p.weight)}</td>
                  <td className="px-4 py-3.5 text-sm font-mono">{p.moisture}%</td>
                  <td className="px-4 py-3.5 text-sm font-mono">{fmt(p.pricePerKg)}</td>
                  <td className="px-4 py-3.5 text-sm font-mono font-semibold">{fmt(p.total)}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
