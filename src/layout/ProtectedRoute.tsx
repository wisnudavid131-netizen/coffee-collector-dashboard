import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
