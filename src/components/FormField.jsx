import { useState } from "react";

function FormField({ label, error, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        className={`block text-[11px] font-medium tracking-widest uppercase transition-colors duration-200 ${
          focused ? "text-primary" : "text-slate--text"
        }`}
        style={{ fontFamily: "'JetBrains Mono', monospace", color: focused ? "#4cd7f6" : "#94A3B8" }}
      >
        {label}
      </label>

      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className="
          w-full bg-[#030712] border border-border-muted rounded-lg px-3 py-3
          text-on-surface placeholder:text-slate-text/40
          focus:border-primary focus:ring-1 focus:ring-primary/40
          outline-none transition-all duration-200 text-sm
        "
      />

      {error && (
        <p className="text-[11px] text-error" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;