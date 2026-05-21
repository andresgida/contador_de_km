const ACCENTS = {
  primary:   { bar: "#4cd7f6", icon: "bg-primary/10 text-primary" },
  secondary: { bar: "#c0c1ff", icon: "bg-secondary/10 text-secondary" },
  container: { bar: "#06b6d4", icon: "bg-primary-container/10 text-primary-container" },
  tertiary:  { bar: "#ffb873", icon: "bg-tertiary/10 text-tertiary" },
};

function ResultCard({ title, value, icon, accent = "primary", badge }) {
  const colors = ACCENTS[accent] ?? ACCENTS.primary;

  return (
    <div className="bg-surface-card border border-border-muted p-6 rounded-[24px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div
        className="absolute top-0 left-0 w-1 h-full opacity-60 rounded-l-[24px]"
        style={{ backgroundColor: colors.bar }}
      />

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${colors.icon}`}>
          {icon}
        </div>
        {badge && (
          <span
            className="text-[11px] font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#10B981" }}
          >
            {badge}
          </span>
        )}
      </div>

      <p
        className="text-[11px] font-medium mb-1 text-slate-text"
        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}
      >
        {title}
      </p>

      <h4 className="text-[24px] font-bold text-on-surface leading-tight">
        {value}
      </h4>
    </div>
  );
}

export default ResultCard;