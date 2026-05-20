function LoadingSpinner() {
  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#030712]
      "
    >
      <div
        className="
          h-16
          w-16
          animate-spin
          rounded-full
          border-4
          border-indigo-500
          border-t-transparent
        "
      />
    </div>
  );
}

export default LoadingSpinner;