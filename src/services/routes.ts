import type { ElementType } from "react";
import {
  BookOpen,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import type { AppPage } from "../types";

export const ROUTES: Record<AppPage, string> = {
  dashboard: "/dashboard",
  farmers: "/farmers",
  purchases: "/purchases",
  sales: "/sales",
  inventory: "/inventory",
  accounts: "/accounts",
  reports: "/reports",
  settings: "/settings",
};

export const PAGE_TITLES: Record<AppPage, string> = {
  dashboard: "Dashboard",
  farmers: "Data Petani",
  purchases: "Pembelian",
  sales: "Penjualan",
  inventory: "Stok",
  accounts: "Piutang & Hutang",
  reports: "Laporan",
  settings: "Pengaturan",
};

export const navItems: { key: AppPage; label: string; icon: ElementType; path: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: ROUTES.dashboard },
  { key: "farmers", label: "Petani", icon: Users, path: ROUTES.farmers },
  { key: "purchases", label: "Pembelian", icon: ShoppingCart, path: ROUTES.purchases },
  { key: "sales", label: "Penjualan", icon: TrendingUp, path: ROUTES.sales },
  { key: "inventory", label: "Stok", icon: Package, path: ROUTES.inventory },
  { key: "accounts", label: "Piutang & Hutang", icon: CreditCard, path: ROUTES.accounts },
  { key: "reports", label: "Laporan", icon: BookOpen, path: ROUTES.reports },
  { key: "settings", label: "Pengaturan", icon: Settings, path: ROUTES.settings },
];

export function pathnameToPage(pathname: string): AppPage | null {
  const entry = Object.entries(ROUTES).find(([, path]) => path === pathname);
  return entry ? (entry[0] as AppPage) : null;
}
