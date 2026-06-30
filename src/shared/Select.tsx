import { ChevronDown } from "lucide-react";

export function Select({ label, value, onChange, options, className = "" }: {
  label?: string; value: string; onChange: (v: string) => void; options: string[]; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all pr-9"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
