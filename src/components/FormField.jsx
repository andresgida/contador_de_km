function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="space-y-2">
      <label
        className="
          text-sm
          font-medium
          text-slate-300
        "
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-4
          py-4
          text-white
          placeholder:text-slate-400
          backdrop-blur-sm
          transition-all
          duration-300
          focus:border-indigo-400
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/40
          ${
            error
              ? "border-red-500"
              : ""
          }
        `}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;