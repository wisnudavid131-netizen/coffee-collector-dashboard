export function Input({ label, type = "text", value, onChange, placeholder, className = "", suffix }: {
  label?: string; type?: string; value: string | number; onChange: (v: string) => void;
  placeholder?: string; className?: string; suffix?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-all"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">{suffix}</span>}
      </div>
    </div>
  );
}
