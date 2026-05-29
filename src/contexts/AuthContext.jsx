import { createContext, useContext, useEffect, useState } from "react";

import {
  getSession,
  onAuthStateChange,
  signIn as authSignIn,
  signOut as authSignOut,
} from "../services/authService";
import { isSupabaseConfigured } from "../services/supabase";
import { getAdminEmails, isAdminUser } from "../utils/adminAccess";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    let subscription;

    async function init() {
      try {
        const current = await getSession();
        await applySession(current);
      } finally {
        setLoading(false);
      }
    }

    init();

    subscription = onAuthStateChange((nextSession) => {
      applySession(nextSession);
    });

    return () => subscription?.unsubscribe();
  }, []);

  async function applySession(nextSession) {
    if (!nextSession) {
      setSession(null);
      return;
    }

    if (!isAdminUser(nextSession)) {
      setAccessDenied(
        "Tu cuenta no tiene rol de administrador. Agrega tu correo en VITE_ADMIN_EMAIL o asigna role: admin en Supabase."
      );
      await authSignOut();
      setSession(null);
      return;
    }

    setAccessDenied(null);
    setSession(nextSession);
  }

  async function login(email, password) {
    setAccessDenied(null);
    const { session: newSession } = await authSignIn(email, password);

    if (!isAdminUser(newSession)) {
      await authSignOut();
      throw new Error("Este usuario no tiene permisos de administrador.");
    }

    setSession(newSession);
  }

  async function logout() {
    await authSignOut();
    setSession(null);
    setAccessDenied(null);
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    accessDenied,
    isAuthenticated: Boolean(session),
    login,
    logout,
    adminEmails: getAdminEmails(),
    isAdmin: isAdminUser(session),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
