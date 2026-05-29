import { useState } from "react";
import { Car, Lock, Shield } from "lucide-react";

import Button from "../components/Button";
import FormField from "../components/FormField";
import { useAuth } from "../contexts/AuthContext";

function mapAuthError(message) {
  const normalized = message?.toLowerCase() ?? "";

  if (normalized.includes("invalid login credentials")) {
    return "Correo o contraseña incorrectos.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Confirma tu correo en Supabase antes de ingresar.";
  }
  if (normalized.includes("too many requests")) {
    return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";
  }

  return message || "No se pudo iniciar sesión.";
}

function Login() {
  const { login, accessDenied, adminEmails } = useAuth();
  const [email, setEmail] = useState(adminEmails[0] ?? "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Ingresa el correo del administrador";
    }
    if (!password) {
      nextErrors.password = "Ingresa tu contraseña";
    }

    setErrors(nextErrors);
    setFormError(null);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitting(true);
      await login(email.trim(), password);
    } catch (err) {
      setFormError(mapAuthError(err.message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary metric-glow">
            <Car size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              Contador KM Palomo
            </h1>
            <p
              className="text-[11px] text-slate-text mt-2 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Acceso administrador
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-[24px] space-y-5">
          <div className="flex items-center gap-2 text-on-surface">
            <Lock size={18} className="text-primary flex-shrink-0" />
            <h2 className="text-lg font-semibold">Iniciar sesión</h2>
          </div>

          {(formError || accessDenied) && (
            <p
              className="text-[12px] text-error bg-error/10 border border-error/30 rounded-lg px-3 py-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {formError || accessDenied}
            </p>
          )}

          <FormField
            label="Correo administrador"
            type="email"
            autoComplete="username"
            placeholder="admin@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <FormField
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </Button>

          <div className="flex items-start gap-2 pt-1">
            <Shield size={14} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-slate-text leading-relaxed">
              Acceso para cuentas con rol <span className="text-primary">admin</span> en Supabase
              {adminEmails.length > 0 && (
                <>
                  {" "}o correo autorizado:{" "}
                  <span className="text-on-surface">{adminEmails.join(", ")}</span>
                </>
              )}
              .
            </p>
          </div>
        </form>

        <p
          className="text-center text-[10px] text-slate-text tracking-wider"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          © 2026 Andresgida · Panel privado
        </p>
      </div>
    </div>
  );
}

export default Login;
