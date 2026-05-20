function FormField({
  label,
  error,
  ...props
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-slate-300
        "
      >
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-black/20
          px-4
          py-4
          text-white
          outline-none
          transition-all
          placeholder:text-slate-500
          focus:border-indigo-400
          focus:ring-4
          focus:ring-indigo-500/20
        "
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;