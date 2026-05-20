function ResultCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-lg
        transition-all
        duration-300
        hover:translate-y-[-3px]
        hover:bg-white/10
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {title}
        </p>

        <div
          className="
            rounded-xl
            bg-indigo-500/20
            p-3
            text-indigo-300
          "
        >
          {icon}
        </div>
      </div>

      <h3
        className="
          mt-5
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h3>
    </div>
  );
}

export default ResultCard;