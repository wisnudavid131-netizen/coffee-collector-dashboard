import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, TrendingUp, Package,
  FileText, Settings, ChevronLeft, ChevronRight, Bell, Search,
  LogOut, Coffee, BarChart2, ArrowUpRight, ArrowDownRight,
  Plus, Edit2, Trash2, Eye, Printer, Download, Filter,
  X, Check, ChevronDown, AlertCircle, Loader2, Upload,
  CreditCard, BookOpen, Menu
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "login" | "dashboard" | "farmers" | "purchases" | "sales" | "inventory" | "accounts" | "reports" | "settings";

interface Toast { id: number; message: string; type: "success" | "error" | "info"; }
interface Modal { type: "confirm" | "form"; title: string; message?: string; onConfirm?: () => void; }

// ─── Mock Data ────────────────────────────────────────────────────────────────
const monthlyData = [
  { month: "Jan", pembelian: 4200, penjualan: 3800 },
  { month: "Feb", pembelian: 5100, penjualan: 4600 },
  { month: "Mar", pembelian: 3800, penjualan: 3500 },
  { month: "Apr", pembelian: 6200, penjualan: 5900 },
  { month: "Mei", pembelian: 5800, penjualan: 5400 },
  { month: "Jun", pembelian: 7100, penjualan: 6800 },
  { month: "Jul", pembelian: 6500, penjualan: 6200 },
  { month: "Agu", pembelian: 7800, penjualan: 7200 },
];

const farmers = [
  { id: 1, name: "Budi Santoso", phone: "0812-3456-7890", address: "Desa Kintamani, Bali", coffeeType: "Arabika", totalTx: 24, status: "aktif" },
  { id: 2, name: "Sari Dewi", phone: "0813-2345-6789", address: "Aceh Tengah, Aceh", coffeeType: "Gayo", totalTx: 18, status: "aktif" },
  { id: 3, name: "Hendra Putra", phone: "0821-3456-7891", address: "Toraja Utara, Sulsel", coffeeType: "Toraja", totalTx: 31, status: "aktif" },
  { id: 4, name: "Rina Marlina", phone: "0815-6789-0123", address: "Flores Timur, NTT", coffeeType: "Flores", totalTx: 12, status: "nonaktif" },
  { id: 5, name: "Agus Kurniawan", phone: "0822-1234-5678", address: "Kerinci, Jambi", coffeeType: "Robusta", totalTx: 27, status: "aktif" },
  { id: 6, name: "Fitri Handayani", phone: "0817-8901-2345", address: "Mandailing Natal, Sumut", coffeeType: "Mandailing", totalTx: 9, status: "aktif" },
];

const purchases = [
  { id: "PB-001", date: "2024-08-10", farmer: "Budi Santoso", coffeeType: "Arabika", weight: 250, moisture: 12.5, pricePerKg: 42000, total: 10500000, status: "Lunas" },
  { id: "PB-002", date: "2024-08-09", farmer: "Sari Dewi", coffeeType: "Gayo", weight: 180, moisture: 13.0, pricePerKg: 55000, total: 9900000, status: "Lunas" },
  { id: "PB-003", date: "2024-08-08", farmer: "Hendra Putra", coffeeType: "Toraja", weight: 320, moisture: 11.8, pricePerKg: 48000, total: 15360000, status: "Belum Lunas" },
  { id: "PB-004", date: "2024-08-07", farmer: "Agus Kurniawan", coffeeType: "Robusta", weight: 500, moisture: 14.2, pricePerKg: 28000, total: 14000000, status: "Lunas" },
  { id: "PB-005", date: "2024-08-06", farmer: "Fitri Handayani", coffeeType: "Mandailing", weight: 150, moisture: 12.0, pricePerKg: 52000, total: 7800000, status: "Cicilan" },
];

const sales = [
  { id: "PJ-001", date: "2024-08-10", customer: "PT Nusantara Coffee", coffeeType: "Arabika", weight: 200, pricePerKg: 58000, total: 11600000, status: "Lunas" },
  { id: "PJ-002", date: "2024-08-09", customer: "CV Sumber Makmur", coffeeType: "Gayo", weight: 150, pricePerKg: 72000, total: 10800000, status: "Belum Lunas" },
  { id: "PJ-003", date: "2024-08-08", customer: "UD Kopi Jaya", coffeeType: "Robusta", weight: 400, pricePerKg: 38000, total: 15200000, status: "Lunas" },
  { id: "PJ-004", date: "2024-08-07", customer: "PT Bumi Perkasa", coffeeType: "Toraja", weight: 280, pricePerKg: 65000, total: 18200000, status: "Lunas" },
];

const inventory = [
  { id: 1, type: "Arabika", incoming: 1250, outgoing: 980, current: 270, unit: "Kg", minStock: 100 },
  { id: 2, type: "Gayo", incoming: 820, outgoing: 650, current: 170, unit: "Kg", minStock: 80 },
  { id: 3, type: "Toraja", incoming: 1100, outgoing: 900, current: 200, unit: "Kg", minStock: 100 },
  { id: 4, type: "Robusta", incoming: 2400, outgoing: 2100, current: 300, unit: "Kg", minStock: 200 },
  { id: 5, type: "Mandailing", incoming: 600, outgoing: 550, current: 50, unit: "Kg", minStock: 80 },
  { id: 6, type: "Flores", incoming: 380, outgoing: 320, current: 60, unit: "Kg", minStock: 50 },
];

const payables = [
  { id: "HU-001", farmer: "Hendra Putra", amount: 15360000, due: "2024-08-20", remaining: 15360000, status: "Belum Lunas" },
  { id: "HU-002", farmer: "Fitri Handayani", amount: 7800000, due: "2024-08-15", remaining: 3900000, status: "Cicilan" },
  { id: "HU-003", farmer: "Rina Marlina", amount: 4200000, due: "2024-07-30", remaining: 4200000, status: "Jatuh Tempo" },
];

const receivables = [
  { id: "HP-001", customer: "CV Sumber Makmur", amount: 10800000, due: "2024-08-20", remaining: 10800000, status: "Belum Lunas" },
  { id: "HP-002", customer: "UD Kopi Prima", amount: 8500000, due: "2024-08-12", remaining: 4250000, status: "Cicilan" },
];

const recentTransactions = [
  { id: "PB-001", date: "2024-08-10", type: "Pembelian", party: "Budi Santoso", coffeeType: "Arabika", weight: 250, amount: 10500000 },
  { id: "PJ-001", date: "2024-08-10", type: "Penjualan", party: "PT Nusantara Coffee", coffeeType: "Arabika", weight: 200, amount: 11600000 },
  { id: "PB-002", date: "2024-08-09", type: "Pembelian", party: "Sari Dewi", coffeeType: "Gayo", weight: 180, amount: 9900000 },
  { id: "PJ-002", date: "2024-08-09", type: "Penjualan", party: "CV Sumber Makmur", coffeeType: "Gayo", weight: 150, amount: 10800000 },
  { id: "PB-003", date: "2024-08-08", type: "Pembelian", party: "Hendra Putra", coffeeType: "Toraja", weight: 320, amount: 15360000 },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
const fmtKg = (n: number) => `${n.toLocaleString("id-ID")} Kg`;

// ─── Subcomponents ────────────────────────────────────────────────────────────
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" }) {
  const styles = {
    default: "bg-muted text-muted-foreground",
    success: "bg-[#d1fae5] text-[#065f46]",
    warning: "bg-[#fef3c7] text-[#92400e]",
    danger: "bg-[#fee2e2] text-[#991b1b]",
    info: "bg-[#dbeafe] text-[#1e40af]",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono ${styles[variant]}`}>
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, "success" | "warning" | "danger" | "info"> = {
    "Lunas": "success", "aktif": "success",
    "Cicilan": "warning", "Belum Lunas": "warning",
    "Jatuh Tempo": "danger", "nonaktif": "danger",
  };
  return <Badge variant={map[status] || "default"}>{status}</Badge>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Button({
  children, onClick, variant = "primary", size = "md", className = "", disabled = false, type = "button"
}: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg"; className?: string; disabled?: boolean; type?: "button" | "submit";
}) {
  const base = "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-[#245c43] shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-[#d4ebe0]",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
    danger: "bg-destructive text-destructive-foreground hover:bg-[#a93226]",
    outline: "border border-border text-foreground hover:bg-muted",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function Input({ label, type = "text", value, onChange, placeholder, className = "", suffix }: {
  label?: string; type?: string; value: string | number; onChange: (v: string) => void;
  placeholder?: string; className?: string; suffix?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">{suffix}</span>}
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options, className = "" }: {
  label?: string; value: string; onChange: (v: string) => void; options: string[]; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all pr-9"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Toast System ─────────────────────────────────────────────────────────────
function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-64 animate-in slide-in-from-right
          ${t.type === "success" ? "bg-[#1b4332] text-white" : t.type === "error" ? "bg-destructive text-destructive-foreground" : "bg-foreground text-card"}`}>
          {t.type === "success" ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="opacity-60 hover:opacity-100"><X className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("admin@kopinusantara.id");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ee] flex">
      {/* Left panel */}
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

      {/* Right panel */}
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems: { key: Page; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "farmers", label: "Petani", icon: Users },
  { key: "purchases", label: "Pembelian", icon: ShoppingCart },
  { key: "sales", label: "Penjualan", icon: TrendingUp },
  { key: "inventory", label: "Stok", icon: Package },
  { key: "accounts", label: "Piutang & Hutang", icon: CreditCard },
  { key: "reports", label: "Laporan", icon: BookOpen },
  { key: "settings", label: "Pengaturan", icon: Settings },
];

function Sidebar({ page, setPage, collapsed, setCollapsed }: {
  page: Page; setPage: (p: Page) => void; collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <aside className={`flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 flex-shrink-0 ${collapsed ? "w-16" : "w-60"}`}
      style={{ minHeight: "100vh" }}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Coffee className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && <span className="font-semibold text-sm tracking-tight">Bos Kopi</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${page === key
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-[#95d5b2] hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              } ${collapsed ? "justify-center" : ""}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`flex items-center gap-3 px-4 py-4 border-t border-sidebar-border text-[#95d5b2] hover:text-sidebar-foreground text-sm transition-all ${collapsed ? "justify-center" : ""}`}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Sembunyikan</span></>}
      </button>
    </aside>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ page, onLogout, addToast }: { page: Page; onLogout: () => void; addToast: (msg: string, type?: Toast["type"]) => void }) {
  const titles: Record<Page, string> = {
    login: "", dashboard: "Dashboard", farmers: "Data Petani",
    purchases: "Pembelian", sales: "Penjualan", inventory: "Stok",
    accounts: "Piutang & Hutang", reports: "Laporan", settings: "Pengaturan",
  };
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold text-foreground">{titles[page]}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Cari..."
            className="pl-9 pr-4 py-1.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 w-48"
          />
        </div>
        <button onClick={() => addToast("Tidak ada notifikasi baru", "info")}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">AK</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-foreground leading-none">W.D PRASETYO</p>
            <p className="text-[11px] text-muted-foreground leading-none mt-0.5">Admin</p>
          </div>
          <button onClick={onLogout} className="ml-1 p-1.5 rounded-lg hover:bg-muted transition-colors">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, delta, icon: Icon, color }: {
  label: string; value: string; sub?: string; delta?: number; icon: React.ElementType; color: string;
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

// ─── Dashboard Page ───────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Stok Kopi" value="850 Kg" sub="Semua jenis" delta={5.2} icon={Package} color="bg-[#d1fae5] text-[#065f46]" />
        <KpiCard label="Pembelian Hari Ini" value="Rp 25,2 Jt" sub="3 transaksi" delta={12.1} icon={ShoppingCart} color="bg-[#fef3c7] text-[#92400e]" />
        <KpiCard label="Penjualan Hari Ini" value="Rp 22,4 Jt" sub="2 transaksi" delta={-3.5} icon={TrendingUp} color="bg-[#dbeafe] text-[#1e40af]" />
        <KpiCard label="Laba Bulan Ini" value="Rp 18,7 Jt" sub="vs. Rp 16,2 Jt lalu" delta={15.4} icon={BarChart2} color="bg-[#f3e8ff] text-[#6b21a8]" />
      </div>

      {/* Charts */}
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

      {/* Recent Transactions */}
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

// ─── Farmers Page ─────────────────────────────────────────────────────────────
function FarmersPage({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
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

      {/* Modal */}
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
              <Select label="Jenis Kopi" value={form.coffeeType} onChange={v => setForm(f => ({ ...f, coffeeType: v }))} options={["Arabika", "Gayo", "Toraja", "Robusta", "Mandailing", "Flores"]} />
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

// ─── Purchases Page ───────────────────────────────────────────────────────────
function PurchasesPage({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
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

      {/* Form */}
      {showForm && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Form Pembelian Baru</h3>
            <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-muted"><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Input label="Tanggal Pembelian" type="date" value="2024-08-10" onChange={() => {}} />
            <Select label="Petani" value="Budi Santoso" onChange={() => {}} options={farmers.map(f => f.name)} />
            <Select label="Jenis Kopi" value="Arabika" onChange={() => {}} options={["Arabika", "Gayo", "Toraja", "Robusta", "Mandailing", "Flores"]} />
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

// ─── Sales Page ───────────────────────────────────────────────────────────────
function SalesPage({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
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
            <Select label="Jenis Kopi" value="Arabika" onChange={() => {}} options={["Arabika", "Gayo", "Toraja", "Robusta", "Mandailing", "Flores"]} />
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

// ─── Inventory Page ───────────────────────────────────────────────────────────
function InventoryPage() {
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

// ─── Accounts Page ────────────────────────────────────────────────────────────
function AccountsPage({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
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
              {(tab === "payable" ? payables : receivables).map((item: Record<string, string | number>) => (
                <tr key={item.id as string} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-primary">{item.id as string}</td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{(item.farmer || item.customer) as string}</td>
                  <td className="px-5 py-3.5 text-sm font-mono">{fmt(item.amount as number)}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{item.due as string}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold">{fmt(item.remaining as number)}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status as string} /></td>
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
              {fmt((tab === "payable" ? payables : receivables).reduce((a, b) => a + (b.remaining as number), 0))}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
function ReportsPage({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
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

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
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

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [collapsed, setCollapsed] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  const addToast = (message: string, type: Toast["type"] = "success") => {
    const id = toastId + 1;
    setToastId(id);
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };
  const removeToast = (id: number) => setToasts(t => t.filter(x => x.id !== id));

  useEffect(() => {
    document.documentElement.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
  }, []);

  if (page === "login") {
    return (
      <>
        <LoginPage onLogin={() => { setPage("dashboard"); addToast("Selamat datang, W.D PRASETYO!", "success"); }} />
        <ToastContainer toasts={toasts} remove={removeToast} />
      </>
    );
  }

  const pageProps = { addToast };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar page={page} onLogout={() => { setPage("login"); }} addToast={addToast} />
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {page === "dashboard" && <DashboardPage />}
          {page === "farmers" && <FarmersPage {...pageProps} />}
          {page === "purchases" && <PurchasesPage {...pageProps} />}
          {page === "sales" && <SalesPage {...pageProps} />}
          {page === "inventory" && <InventoryPage />}
          {page === "accounts" && <AccountsPage {...pageProps} />}
          {page === "reports" && <ReportsPage {...pageProps} />}
          {page === "settings" && <SettingsPage {...pageProps} />}
        </main>
      </div>
      <ToastContainer toasts={toasts} remove={removeToast} />
    </div>
  );
}
