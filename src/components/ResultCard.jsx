function ResultCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        shadow-xl
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-400/20
      "
    >
      <div
        className="
          absolute
          right-0
          top-0
          h-24
          w-24
          rounded-full
          bg-indigo-500/10
          blur-2xl
        "
      />

      <div className="relative z-10">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-indigo-500/20
            text-indigo-300
          "
        >
          {icon}
        </div>

        <p className="mt-6 text-sm text-slate-400">
          {title}
        </p>

        <h3
          className="
            mt-2
            text-3xl
            font-bold
            tracking-tight
          "
        >
          {value}
        </h3>
      </div>
    </div>
  );
}

export default ResultCard;