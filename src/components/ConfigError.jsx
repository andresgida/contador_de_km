function ConfigError({ message }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center space-y-3">
        <p className="text-error font-semibold">No se pudo cargar la aplicación</p>
        <p className="text-on-surface text-sm leading-relaxed">{message}</p>
        <p className="text-slate-text text-xs">
          Reinicia el servidor (<code className="text-primary">npm run dev</code>) después de crear el archivo{" "}
          <code className="text-primary">.env</code>.
        </p>
      </div>
    </div>
  );
}

export default ConfigError;
