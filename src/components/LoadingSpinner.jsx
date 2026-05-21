function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-border-muted border-t-primary" />
        <p
          className="text-[11px] text-slate-text tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Cargando datos...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;