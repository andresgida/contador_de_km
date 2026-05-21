import { useState, useRef } from "react";
import { Calendar } from "lucide-react";

function FormField({ label, error, ...props }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const isDate = props.type === "date";

  function openPicker() {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  }

  return (
    <div className="space-y-1.5">
      <label
        className="block text-[11px] font-medium tracking-widest uppercase transition-colors duration-200"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: focused ? "#4cd7f6" : "#94A3B8" }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={`
            w-full bg-[#030712] rounded-lg px-3 py-3
            text-on-surface placeholder:text-slate-text/40
            outline-none transition-all duration-200 text-sm
            border ${focused ? "border-primary ring-1 ring-primary/40" : "border-border-muted"}
            ${isDate ? "date-input pr-10" : ""}
          `}
        />
        {isDate && (
          <button
            type="button"
            tabIndex={-1}
            onClick={openPicker}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container transition-colors cursor-pointer"
          >
            <Calendar size={16} />
          </button>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-error" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;