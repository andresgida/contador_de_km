import { useEffect, useState } from "react";
import { Car, Calendar, BarChart3, TrendingUp, Sparkles, Route } from "lucide-react";

import Button from "../components/Button";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import ResultCard from "../components/ResultCard";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import MobileNav from "../components/MobileNav";

import { useInitialData } from "../hooks/useInitialData";
import { saveCalculation, updateInitialData } from "../services/mileageService";
import { calculateMileageAverage } from "../utils/calculations";

function Home() {
  const { data, loading, error } = useInitialData();

  const [initialMileage, setInitialMileage] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");
  const [results, setResults] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setInitialMileage(data.mileage);
      setInitialDate(data.initial_date);
    }
  }, [data]);

  async function handleCalculate() {
    const errors = {};

    if (!currentMileage) {
      errors.currentMileage = "Ingresa el kilometraje actual";
    }

    if (Number(currentMileage) < Number(initialMileage)) {
      errors.currentMileage = "El kilometraje actual no puede ser menor";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setSaving(true);

      const calculation = calculateMileageAverage({
        initialMileage: Number(initialMileage),
        currentMileage: Number(currentMileage),
        initialDate,
      });

      setResults(calculation);

      await updateInitialData(Number(initialMileage), initialDate);

      await saveCalculation({
        current_mileage: Number(currentMileage),
        kms_traveled: calculation.kmsTraveled,
        days_elapsed: calculation.daysElapsed,
        daily_avg: calculation.dailyAverage,
        annual_avg: calculation.annualAverage,
      });
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error guardando datos");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex overflow-x-hidden">

      {/* ── Desktop sidebar ─────────────────── */}
      <Sidebar />

      {/* ── Main area ───────────────────────── */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col overflow-x-hidden">

        <TopBar />

        {/* ── Scrollable content ────────────── */}
        <div className="flex-1 px-4 md:px-10 py-8 max-w-[1280px] mx-auto w-full space-y-8 pb-24 md:pb-10">

          {/* ── Hero: Form + Metric cards ─────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Form panel */}
            <div className="lg:col-span-4">
              <div className="glass-panel p-6 rounded-[24px] space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <Car size={20} className="text-primary flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-on-surface">
                    Datos del Vehículo
                  </h3>
                </div>

                <div className="space-y-4">
                  <FormField
                    label="Kilometraje inicial"
                    type="number"
                    placeholder="Ej. 120000"
                    value={initialMileage}
                    onChange={(e) => setInitialMileage(e.target.value)}
                  />

                  <FormField
                    label="Fecha inicial"
                    type="date"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                  />

                  <FormField
                    label="Kilometraje actual"
                    type="number"
                    placeholder="Ej. 135000"
                    value={currentMileage}
                    onChange={(e) => setCurrentMileage(e.target.value)}
                    error={formErrors.currentMileage}
                  />
                </div>

                <Button onClick={handleCalculate} disabled={saving}>
                  {saving ? "Calculando..." : "Calcular promedio"}
                </Button>
              </div>
            </div>

            {/* Metric cards 2×2 grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ResultCard
                  title="Kilómetros recorridos"
                  value={results ? `${results.kmsTraveled.toLocaleString()} km` : "— km"}
                  icon={<Route size={20} />}
                  accent="primary"
                  badge={results ? "+calculado" : null}
                />
                <ResultCard
                  title="Días transcurridos"
                  value={results ? `${results.daysElapsed.toLocaleString()} días` : "— días"}
                  icon={<Calendar size={20} />}
                  accent="secondary"
                />
                <ResultCard
                  title="Promedio diario"
                  value={results ? `${results.dailyAverage.toFixed(2)} km/día` : "— km/día"}
                  icon={<BarChart3 size={20} />}
                  accent="container"
                />
                <ResultCard
                  title="Promedio anual"
                  value={results ? `${Math.round(results.annualAverage).toLocaleString()} km/año` : "— km/año"}
                  icon={<TrendingUp size={20} />}
                  accent="tertiary"
                />
              </div>
            </div>

          </section>

          {/* ── Analysis section ─────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Text panel */}
            <div className="lg:col-span-7 bg-surface-container-low border border-border-muted p-8 rounded-[32px] space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-on-surface">
                  Análisis inteligente
                </h3>
              </div>

              <div className="space-y-4 text-slate-text leading-relaxed">
                <p className="text-base">
                  Nuestro sistema utiliza algoritmos avanzados para procesar los datos
                  de kilometraje y tiempo. Al ingresar el kilometraje inicial y la fecha
                  de referencia, calculamos la diferencia neta para determinar el
                  rendimiento real del vehículo.
                </p>
                <p className="text-base">
                  El análisis proyecta tendencias basadas en tu comportamiento de manejo
                  actual. Esto permite predecir cuándo el vehículo requerirá servicios de
                  mantenimiento preventivo, optimizando la vida útil de los componentes.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { dot: "#10B981", label: "Algoritmo Optimizado" },
                  { dot: "#4cd7f6", label: "Supabase Cloud" },
                  { dot: "#c0c1ff", label: "React + Vite" },
                ].map(({ dot, label }) => (
                  <div
                    key={label}
                    className="px-4 py-2 bg-surface-container-high rounded-full border border-border-muted flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
                    <span
                      className="text-[11px] font-medium text-on-surface tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Car image panel */}
            <div className="lg:col-span-5 min-h-[320px] rounded-[32px] overflow-hidden relative group">
              <img
                src="/palomo.jpg"
                alt="El palomo - DSU302 Medellín"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "320px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 glass-panel rounded-xl">
                <p
                  className="text-[10px] font-medium text-primary tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  FORD FIESTA MODELO 2017
                </p>
                <p className="text-sm font-semibold text-on-surface">
                  Comportamiento del km del palomo
                </p>
              </div>
            </div>

          </section>

        </div>

        {/* ── Footer ───────────────────────── */}
        <footer className="border-t border-border-muted bg-surface-container-lowest py-8 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-10 max-w-[1280px] mx-auto">
            <div>
              <h4 className="text-lg font-bold text-primary">Andrés Gómez Idárraga</h4>
              <p
                className="text-[11px] text-slate-text mt-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                © 2026 Andresgida. Todos los derechos reservados.
              </p>
            </div>
            <div
              className="flex gap-6 text-[11px] text-on-surface"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="hover:text-primary transition-colors cursor-default">Supabase Cloud</span>
              <span className="hover:text-primary transition-colors cursor-default">React + Vite</span>
              <span className="hover:text-primary transition-colors cursor-default">Responsive UI</span>
            </div>
          </div>
        </footer>

      </main>

      {/* ── Mobile bottom nav ────────────────── */}
      <MobileNav />

    </div>
  );
}

export default Home;