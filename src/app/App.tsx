import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import { ToastProvider, useToast } from "../hooks/useToast";
import { AppShell } from "../layout/AppShell";
import { ProtectedRoute } from "../layout/ProtectedRoute";
import { AccountsPage } from "../pages/AccountsPage";
import { DashboardPage } from "../pages/DashboardPage";
import { FarmersPage } from "../pages/FarmersPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { PurchasesPage } from "../pages/PurchasesPage";
import { ReportsPage } from "../pages/ReportsPage";
import { SalesPage } from "../pages/SalesPage";
import { SettingsPage } from "../pages/SettingsPage";
import { ToastContainer } from "../shared/ToastContainer";

function AppRoutes() {
  const { toasts, removeToast } = useToast();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer toasts={toasts} remove={removeToast} />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
