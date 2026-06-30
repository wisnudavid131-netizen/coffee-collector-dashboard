import type { ReactNode } from "react";

export function Button({
  children, onClick, variant = "primary", size = "md", className = "", disabled = false, type = "button"
}: {
  children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg"; className?: string; disabled?: boolean; type?: "button" | "submit";
}) {
  const base = "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-[#245c43] shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-[#d4ebe0]",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
    danger: "bg-destructive text-destructive-foreground hover:bg-[#a93226]",
    outline: "border border-border text-foreground hover:bg-muted",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
