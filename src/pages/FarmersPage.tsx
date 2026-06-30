import { useState } from "react";
import { Check, Edit2, Eye, Plus, Search, Trash2, X } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { COFFEE_TYPES, farmers } from "../services/mockData";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { StatusBadge } from "../shared/StatusBadge";

export function FarmersPage() {
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", coffeeType: "Arabika" });

  const filtered = farmers.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.coffeeType.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    setShowModal(false);
    addToast(editId ? "Data petani diperbarui" : "Petani baru ditambahkan", "success");
    setForm({ name: "", phone: "", address: "", coffeeType: "Arabika" });
    setEditId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari petani atau jenis kopi..."
            className="pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 w-64"
          />
        </div>
        <Button onClick={() => { setShowModal(true); setEditId(null); }}>
          <Plus className="w-4 h-4" /> Tambah Petani
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Nama Petani", "Telepon", "Alamat", "Jenis Kopi", "Total Tx", "Status", "Aksi"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground font-mono uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-foreground text-sm">{f.name}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-muted-foreground">{f.phone}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground max-w-48 truncate">{f.address}</td>
                  <td className="px-5 py-3.5"><Badge variant="info">{f.coffeeType}</Badge></td>
                  <td className="px-5 py-3.5 text-sm font-mono text-center">{f.totalTx}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={f.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => addToast(`Melihat detail ${f.name}`, "info")} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => { setEditId(f.id); setForm({ name: f.name, phone: f.phone, address: f.address, coffeeType: f.coffeeType }); setShowModal(true); }} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => addToast(`${f.name} dihapus`, "error")} className="p-1.5 rounded-lg hover:bg-[#fee2e2] transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{filtered.length} dari {farmers.length} petani</p>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-mono ${p === 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold text-foreground">{editId ? "Edit Petani" : "Tambah Petani Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <Input label="Nama Lengkap" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Budi Santoso" className="col-span-2" />
              <Input label="No. Telepon" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="0812-xxxx-xxxx" />
              <Select label="Jenis Kopi" value={form.coffeeType} onChange={v => setForm(f => ({ ...f, coffeeType: v }))} options={[...COFFEE_TYPES]} />
              <Input label="Alamat" value={form.address} onChange={v => setForm(f => ({ ...f, address: v }))} placeholder="Desa, Kecamatan, Kabupaten" className="col-span-2" />
            </div>
            <div className="flex gap-3 p-5 border-t border-border justify-end">
              <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button onClick={handleSave}><Check className="w-4 h-4" /> Simpan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
