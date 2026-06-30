import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

const styles: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-[#d1fae5] text-[#065f46]",
  warning: "bg-[#fef3c7] text-[#92400e]",
  danger: "bg-[#fee2e2] text-[#991b1b]",
  info: "bg-[#dbeafe] text-[#1e40af]",
};

export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono ${styles[variant]}`}>
      {children}
    </span>
  );
}
