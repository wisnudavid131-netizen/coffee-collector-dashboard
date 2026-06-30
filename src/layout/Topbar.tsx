import { Bell, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { PAGE_TITLES, pathnameToPage } from "../services/routes";
import { useLocation } from "react-router";

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToast } = useToast();

  const page = pathnameToPage(location.pathname);
  const title = page ? PAGE_TITLES[page] : "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
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
          <button onClick={handleLogout} className="ml-1 p-1.5 rounded-lg hover:bg-muted transition-colors">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
