export type AppPage =
  | "dashboard"
  | "farmers"
  | "purchases"
  | "sales"
  | "inventory"
  | "accounts"
  | "reports"
  | "settings";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface Farmer {
  id: number;
  name: string;
  phone: string;
  address: string;
  coffeeType: string;
  totalTx: number;
  status: string;
}

export interface Purchase {
  id: string;
  date: string;
  farmer: string;
  coffeeType: string;
  weight: number;
  moisture: number;
  pricePerKg: number;
  total: number;
  status: string;
}

export interface Sale {
  id: string;
  date: string;
  customer: string;
  coffeeType: string;
  weight: number;
  pricePerKg: number;
  total: number;
  status: string;
}

export interface InventoryItem {
  id: number;
  type: string;
  incoming: number;
  outgoing: number;
  current: number;
  unit: string;
  minStock: number;
}

export interface Payable {
  id: string;
  farmer: string;
  amount: number;
  due: string;
  remaining: number;
  status: string;
}

export interface Receivable {
  id: string;
  customer: string;
  amount: number;
  due: string;
  remaining: number;
  status: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: string;
  party: string;
  coffeeType: string;
  weight: number;
  amount: number;
}

export interface MonthlyDataPoint {
  month: string;
  pembelian: number;
  penjualan: number;
}
