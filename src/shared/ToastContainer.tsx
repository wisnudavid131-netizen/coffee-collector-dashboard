import { AlertCircle, Check, X } from "lucide-react";
import type { Toast } from "../types";

export function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
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
