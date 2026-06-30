import { ChevronLeft, ChevronRight, Coffee } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { navItems } from "../services/routes";

export function Sidebar({ collapsed, setCollapsed }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className={`flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 flex-shrink-0 ${collapsed ? "w-16" : "w-60"}`}
      style={{ minHeight: "100vh" }}>
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Coffee className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && <span className="font-semibold text-sm tracking-tight">Bos Kopi</span>}
      </div>

      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {navItems.map(({ key, label, icon: Icon, path }) => (
          <button
            key={key}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${location.pathname === path
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-[#95d5b2] hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              } ${collapsed ? "justify-center" : ""}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`flex items-center gap-3 px-4 py-4 border-t border-sidebar-border text-[#95d5b2] hover:text-sidebar-foreground text-sm transition-all ${collapsed ? "justify-center" : ""}`}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Sembunyikan</span></>}
      </button>
    </aside>
  );
}
