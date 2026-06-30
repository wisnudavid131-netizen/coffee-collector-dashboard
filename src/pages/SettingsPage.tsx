import { useState } from "react";
import { Check, Coffee, Edit2, Plus, Upload } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { StatusBadge } from "../shared/StatusBadge";

export function SettingsPage() {
  const { addToast } = useToast();
  const [tab, setTab] = useState("Profil Perusahaan");
  const tabs = ["Profil Perusahaan", "Manajemen Pengguna", "Keamanan"];

  return (
    <div className="flex gap-6">
      <div className="w-48 flex-shrink-0">
        <Card className="p-2">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
              {t}
            </button>
          ))}
        </Card>
      </div>

      <div className="flex-1">
        {tab === "Profil Perusahaan" && (
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-5">Profil Perusahaan</h3>
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted/40 rounded-xl">
              <div className="w-20 h-20 bg-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                <Coffee className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground mb-1">Logo Perusahaan</p>
                <p className="text-xs text-muted-foreground mb-2">PNG, JPG hingga 2MB</p>
                <Button variant="outline" size="sm"><Upload className="w-3.5 h-3.5" /> Upload Logo</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nama Perusahaan" value="UD Bos Kopi" onChange={() => {}} className="col-span-2" />
              <Input label="No. Telepon" value="0812-3456-7890" onChange={() => {}} />
              <Input label="Email" value="admin@kopinusantara.id" onChange={() => {}} />
              <Input label="Alamat" value="Jl. Kopi No. 12, Bandung" onChange={() => {}} className="col-span-2" />
              <Input label="NPWP" value="12.345.678.9-012.000" onChange={() => {}} />
              <Select label="Provinsi" value="Jawa Barat" onChange={() => {}} options={["Aceh", "Sumatera Utara", "Jawa Barat", "Jawa Timur", "Sulawesi Selatan"]} />
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <Button onClick={() => addToast("Profil berhasil disimpan", "success")}><Check className="w-4 h-4" /> Simpan Perubahan</Button>
            </div>
          </Card>
        )}

        {tab === "Manajemen Pengguna" && (
          <Card>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">Daftar Pengguna</h3>
              <Button size="sm" onClick={() => addToast("Undangan pengguna dikirim", "success")}><Plus className="w-3.5 h-3.5" /> Undang Pengguna</Button>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "W.D PRASETYO", email: "admin@kopinusantara.id", role: "Admin", active: true },
                { name: "Dewi Rahayu", email: "dewi@kopinusantara.id", role: "Operator", active: true },
                { name: "Rizky Pratama", email: "rizky@kopinusantara.id", role: "Viewer", active: false },
              ].map(u => (
                <div key={u.email} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{u.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={u.role === "Admin" ? "info" : u.role === "Operator" ? "success" : "default"}>{u.role}</Badge>
                    <StatusBadge status={u.active ? "aktif" : "nonaktif"} />
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "Keamanan" && (
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-5">Ubah Kata Sandi</h3>
            <div className="flex flex-col gap-4 max-w-sm">
              <Input label="Kata Sandi Saat Ini" type="password" value="••••••••" onChange={() => {}} />
              <Input label="Kata Sandi Baru" type="password" value="" onChange={() => {}} placeholder="Min. 8 karakter" />
              <Input label="Konfirmasi Kata Sandi" type="password" value="" onChange={() => {}} placeholder="Ulangi kata sandi baru" />
              <Button onClick={() => addToast("Kata sandi berhasil diubah", "success")} className="w-fit"><Check className="w-4 h-4" /> Ubah Kata Sandi</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
