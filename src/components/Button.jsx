function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="
        w-full py-4 px-6
        bg-primary-container text-on-primary
        font-bold text-base rounded-lg
        metric-glow
        transition-all duration-200
        hover:brightness-110
        active:scale-95
        disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none disabled:shadow-none
      "
    >
      {children}
    </button>
  );
}

export default Button;