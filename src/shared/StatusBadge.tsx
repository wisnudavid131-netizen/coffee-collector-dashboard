import { Badge } from "./Badge";

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, "success" | "warning" | "danger" | "info"> = {
    "Lunas": "success", "aktif": "success",
    "Cicilan": "warning", "Belum Lunas": "warning",
    "Jatuh Tempo": "danger", "nonaktif": "danger",
  };
  return <Badge variant={map[status] || "default"}>{status}</Badge>;
}
