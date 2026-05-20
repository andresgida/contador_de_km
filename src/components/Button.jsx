function Button({
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-indigo-500
        to-cyan-500
        px-6
        py-4
        font-semibold
        text-white
        shadow-lg
        shadow-indigo-500/20
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-indigo-500/40
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}

export default Button;