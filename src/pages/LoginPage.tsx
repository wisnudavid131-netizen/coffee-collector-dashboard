import { useState } from "react";
import { useNavigate } from "react-router";
import { Coffee, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

export function LoginPage() {
  const [email, setEmail] = useState("admin@kopinusantara.id");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
      navigate("/dashboard");
      addToast("Selamat datang, W.D PRASETYO!", "success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ee] flex">
      <div className="hidden lg:flex flex-col justify-between w-[48%] bg-[#1b4332] p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 70%, #52b788 0%, transparent 60%), radial-gradient(circle at 80% 20%, #6f4e37 0%, transparent 50%)" }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#52b788] rounded-xl flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#1b4332]" />
            </div>
            <span className="text-white font-semibold text-lg">Bos kopi</span>
          </div>
          <p className="text-[#95d5b2] text-sm">Sistem Manajemen Tengkulak Kopi</p>
        </div>
        <div className="relative">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#2d6a4f] text-[#95d5b2] px-3 py-1.5 rounded-full text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] animate-pulse" />
              Platform Aktif
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Kelola bisnis kopi Anda dengan lebih efisien
            </h1>
            <p className="text-[#95d5b2] text-base leading-relaxed">
              Catat pembelian dari petani, pantau stok, kelola penjualan, dan buat laporan lengkap — semuanya dalam satu platform.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[["2.4T+", "Nilai Transaksi"], ["1,200+", "Petani Mitra"], ["98%", "Kepuasan"]].map(([val, label]) => (
              <div key={label} className="bg-[#2d6a4f] rounded-xl p-4">
                <div className="text-white font-bold text-xl font-mono">{val}</div>
                <div className="text-[#95d5b2] text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[#52b788] text-xs relative">© 2024 Bos Kopi. Hak cipta dilindungi.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Coffee className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Bos Kopi</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">Selamat datang kembali</h2>
            <p className="text-muted-foreground text-sm">Masuk untuk mengakses dashboard Anda</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <div className="flex flex-col gap-5">
              <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="admin@email.com" />
              <Input label="Kata Sandi" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  <span className="text-muted-foreground">Ingat saya</span>
                </label>
                <button className="text-primary hover:underline">Lupa kata sandi?</button>
              </div>
              <Button onClick={handleLogin} disabled={loading} size="lg" className="w-full justify-center">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</> : "Masuk"}
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Butuh bantuan? <a href="#" className="text-primary hover:underline">Hubungi dukungan</a>
          </p>
        </div>
      </div>
    </div>
  );
}
