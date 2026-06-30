import type {
  Farmer,
  InventoryItem,
  MonthlyDataPoint,
  Payable,
  Purchase,
  Receivable,
  Sale,
  Transaction,
} from "../types";

export const monthlyData: MonthlyDataPoint[] = [
  { month: "Jan", pembelian: 4200, penjualan: 3800 },
  { month: "Feb", pembelian: 5100, penjualan: 4600 },
  { month: "Mar", pembelian: 3800, penjualan: 3500 },
  { month: "Apr", pembelian: 6200, penjualan: 5900 },
  { month: "Mei", pembelian: 5800, penjualan: 5400 },
  { month: "Jun", pembelian: 7100, penjualan: 6800 },
  { month: "Jul", pembelian: 6500, penjualan: 6200 },
  { month: "Agu", pembelian: 7800, penjualan: 7200 },
];

export const farmers: Farmer[] = [
  { id: 1, name: "Budi Santoso", phone: "0812-3456-7890", address: "Desa Kintamani, Bali", coffeeType: "Arabika", totalTx: 24, status: "aktif" },
  { id: 2, name: "Sari Dewi", phone: "0813-2345-6789", address: "Aceh Tengah, Aceh", coffeeType: "Gayo", totalTx: 18, status: "aktif" },
  { id: 3, name: "Hendra Putra", phone: "0821-3456-7891", address: "Toraja Utara, Sulsel", coffeeType: "Toraja", totalTx: 31, status: "aktif" },
  { id: 4, name: "Rina Marlina", phone: "0815-6789-0123", address: "Flores Timur, NTT", coffeeType: "Flores", totalTx: 12, status: "nonaktif" },
  { id: 5, name: "Agus Kurniawan", phone: "0822-1234-5678", address: "Kerinci, Jambi", coffeeType: "Robusta", totalTx: 27, status: "aktif" },
  { id: 6, name: "Fitri Handayani", phone: "0817-8901-2345", address: "Mandailing Natal, Sumut", coffeeType: "Mandailing", totalTx: 9, status: "aktif" },
];

export const purchases: Purchase[] = [
  { id: "PB-001", date: "2024-08-10", farmer: "Budi Santoso", coffeeType: "Arabika", weight: 250, moisture: 12.5, pricePerKg: 42000, total: 10500000, status: "Lunas" },
  { id: "PB-002", date: "2024-08-09", farmer: "Sari Dewi", coffeeType: "Gayo", weight: 180, moisture: 13.0, pricePerKg: 55000, total: 9900000, status: "Lunas" },
  { id: "PB-003", date: "2024-08-08", farmer: "Hendra Putra", coffeeType: "Toraja", weight: 320, moisture: 11.8, pricePerKg: 48000, total: 15360000, status: "Belum Lunas" },
  { id: "PB-004", date: "2024-08-07", farmer: "Agus Kurniawan", coffeeType: "Robusta", weight: 500, moisture: 14.2, pricePerKg: 28000, total: 14000000, status: "Lunas" },
  { id: "PB-005", date: "2024-08-06", farmer: "Fitri Handayani", coffeeType: "Mandailing", weight: 150, moisture: 12.0, pricePerKg: 52000, total: 7800000, status: "Cicilan" },
];

export const sales: Sale[] = [
  { id: "PJ-001", date: "2024-08-10", customer: "PT Nusantara Coffee", coffeeType: "Arabika", weight: 200, pricePerKg: 58000, total: 11600000, status: "Lunas" },
  { id: "PJ-002", date: "2024-08-09", customer: "CV Sumber Makmur", coffeeType: "Gayo", weight: 150, pricePerKg: 72000, total: 10800000, status: "Belum Lunas" },
  { id: "PJ-003", date: "2024-08-08", customer: "UD Kopi Jaya", coffeeType: "Robusta", weight: 400, pricePerKg: 38000, total: 15200000, status: "Lunas" },
  { id: "PJ-004", date: "2024-08-07", customer: "PT Bumi Perkasa", coffeeType: "Toraja", weight: 280, pricePerKg: 65000, total: 18200000, status: "Lunas" },
];

export const inventory: InventoryItem[] = [
  { id: 1, type: "Arabika", incoming: 1250, outgoing: 980, current: 270, unit: "Kg", minStock: 100 },
  { id: 2, type: "Gayo", incoming: 820, outgoing: 650, current: 170, unit: "Kg", minStock: 80 },
  { id: 3, type: "Toraja", incoming: 1100, outgoing: 900, current: 200, unit: "Kg", minStock: 100 },
  { id: 4, type: "Robusta", incoming: 2400, outgoing: 2100, current: 300, unit: "Kg", minStock: 200 },
  { id: 5, type: "Mandailing", incoming: 600, outgoing: 550, current: 50, unit: "Kg", minStock: 80 },
  { id: 6, type: "Flores", incoming: 380, outgoing: 320, current: 60, unit: "Kg", minStock: 50 },
];

export const payables: Payable[] = [
  { id: "HU-001", farmer: "Hendra Putra", amount: 15360000, due: "2024-08-20", remaining: 15360000, status: "Belum Lunas" },
  { id: "HU-002", farmer: "Fitri Handayani", amount: 7800000, due: "2024-08-15", remaining: 3900000, status: "Cicilan" },
  { id: "HU-003", farmer: "Rina Marlina", amount: 4200000, due: "2024-07-30", remaining: 4200000, status: "Jatuh Tempo" },
];

export const receivables: Receivable[] = [
  { id: "HP-001", customer: "CV Sumber Makmur", amount: 10800000, due: "2024-08-20", remaining: 10800000, status: "Belum Lunas" },
  { id: "HP-002", customer: "UD Kopi Prima", amount: 8500000, due: "2024-08-12", remaining: 4250000, status: "Cicilan" },
];

export const recentTransactions: Transaction[] = [
  { id: "PB-001", date: "2024-08-10", type: "Pembelian", party: "Budi Santoso", coffeeType: "Arabika", weight: 250, amount: 10500000 },
  { id: "PJ-001", date: "2024-08-10", type: "Penjualan", party: "PT Nusantara Coffee", coffeeType: "Arabika", weight: 200, amount: 11600000 },
  { id: "PB-002", date: "2024-08-09", type: "Pembelian", party: "Sari Dewi", coffeeType: "Gayo", weight: 180, amount: 9900000 },
  { id: "PJ-002", date: "2024-08-09", type: "Penjualan", party: "CV Sumber Makmur", coffeeType: "Gayo", weight: 150, amount: 10800000 },
  { id: "PB-003", date: "2024-08-08", type: "Pembelian", party: "Hendra Putra", coffeeType: "Toraja", weight: 320, amount: 15360000 },
];

export const COFFEE_TYPES = ["Arabika", "Gayo", "Toraja", "Robusta", "Mandailing", "Flores"] as const;
