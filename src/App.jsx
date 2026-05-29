import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ConfigError from "./components/ConfigError";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  isSupabaseConfigured,
  supabaseConfigError,
} from "./services/supabase";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Verificando sesión..." />;
  }

  return isAuthenticated ? <Home /> : <Login />;
}

function App() {
  if (!isSupabaseConfigured) {
    return <ConfigError message={supabaseConfigError} />;
  }

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
