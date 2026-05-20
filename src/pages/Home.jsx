import { useEffect, useState } from "react";

import {
  Car,
  Calendar,
  Gauge,
  Activity,
  Sparkles,
} from "lucide-react";

import Button from "../components/Button";
import FormField from "../components/FormField";
import LoadingSpinner from "../components/LoadingSpinner";
import ResultCard from "../components/ResultCard";

import { useInitialData } from "../hooks/useInitialData";

import {
  saveCalculation,
  updateInitialData,
} from "../services/mileageService";

import { calculateMileageAverage } from "../utils/calculations";

function Home() {
  const { data, loading, error } =
    useInitialData();

  const [initialMileage, setInitialMileage] =
    useState("");

  const [initialDate, setInitialDate] =
    useState("");

  const [currentMileage, setCurrentMileage] =
    useState("");

  const [results, setResults] =
    useState(null);

  const [formErrors, setFormErrors] =
    useState({});

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (data) {
      setInitialMileage(data.mileage);
      setInitialDate(data.initial_date);
    }
  }, [data]);

  async function handleCalculate() {
    const errors = {};

    if (!currentMileage) {
      errors.currentMileage =
        "Ingresa el kilometraje actual";
    }

    if (
      Number(currentMileage) <
      Number(initialMileage)
    ) {
      errors.currentMileage =
        "El kilometraje actual no puede ser menor";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0)
      return;

    try {
      setSaving(true);

      const calculation =
        calculateMileageAverage({
          initialMileage:
            Number(initialMileage),

          currentMileage:
            Number(currentMileage),

          initialDate,
        });

      setResults(calculation);

      await updateInitialData(
        Number(initialMileage),
        initialDate
      );

      await saveCalculation({
        current_mileage:
          Number(currentMileage),

        kms_traveled:
          calculation.kmsTraveled,

        days_elapsed:
          calculation.daysElapsed,

        daily_avg:
          calculation.dailyAverage,

        annual_avg:
          calculation.annualAverage,
      });
    } catch (err) {
      console.error(err);

      alert(
        "Ocurrió un error guardando datos"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-red-400">
        {error}
      </div>
    );
  } 

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#030712]
        text-white
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          absolute
          left-[-200px]
          top-[-200px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-indigo-500/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-200px]
          right-[-200px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10">
        {/* HERO */}

        <div className="text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-indigo-400/20
              bg-white/5
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <Sparkles size={16} />

            <span className="text-sm text-slate-300">
              Andresgida Project
            </span>
          </div>

          <h1
            className="
              mx-auto
              mt-6
              max-w-4xl
              text-4xl
              font-black
              leading-tight
              tracking-tight
              md:text-6xl
            "
          >
            Promedio actual de KM del palomo
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-slate-400
            "
          >
            Analiza el rendimiento y uso
            de tu automóvil con métricas
            modernas y estimaciones
            automáticas.
          </p>
        </div>

        {/* GRID */}

        <div className="mt-14 grid gap-8 lg:grid-cols-[420px_1fr]">
          {/* FORM */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-8
              shadow-2xl
              backdrop-blur-2xl
            "
          >
            <h2 className="text-2xl font-bold">
              Datos del vehículo
            </h2>

            <p className="mt-2 text-slate-400">
              Completa la información para
              generar el análisis.
            </p>

            <div className="mt-8 space-y-6">
              <FormField
                label="Kilometraje inicial"
                type="number"
                value={initialMileage}
                onChange={(e) =>
                  setInitialMileage(
                    e.target.value
                  )
                }
              />

              <FormField
                label="Fecha inicial"
                type="date"
                value={initialDate}
                onChange={(e) =>
                  setInitialDate(
                    e.target.value
                  )
                }
              />

              <FormField
                label="Kilometraje actual"
                type="number"
                placeholder="Ej: 50000"
                value={currentMileage}
                onChange={(e) =>
                  setCurrentMileage(
                    e.target.value
                  )
                }
                error={
                  formErrors.currentMileage
                }
              />

              <Button
                onClick={handleCalculate}
                disabled={saving}
              >
                {saving
                  ? "Calculando..."
                  : "Calcular promedio"}
              </Button>
            </div>
          </div>

          {/* RESULTS */}

          <div>
            <div className="grid gap-6 md:grid-cols-2">
              <ResultCard
                title="Kilómetros recorridos"
                value={`${results?.kmsTraveled || 0} km`}
                icon={<Car size={22} />}
              />

              <ResultCard
                title="Días transcurridos"
                value={
                  results?.daysElapsed || 0
                }
                icon={<Calendar size={22} />}
              />

              <ResultCard
                title="Promedio diario"
                value={`${
                  results
                    ? results.dailyAverage.toFixed(
                        2
                      )
                    : "0"
                } km`}
                icon={<Gauge size={22} />}
              />

              <ResultCard
                title="Promedio anual"
                value={`${
                  results
                    ? results.annualAverage.toFixed(
                        2
                      )
                    : "0"
                } km`}
                icon={<Activity size={22} />}
              />
            </div>

            {/* INFO PANEL */}

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-2xl
              "
            >
              <h3 className="text-2xl font-bold">
                Análisis inteligente
              </h3>

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-slate-400
                  leading-relaxed
                "
              >
                El sistema analiza el
                kilometraje recorrido desde
                la fecha inicial registrada
                y calcula una proyección
                anual basada en el promedio
                diario de uso del vehículo.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500">
                    Persistencia
                  </p>

                  <h4 className="mt-2 text-lg font-semibold">
                    Supabase Cloud
                  </h4>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500">
                    Arquitectura
                  </p>

                  <h4 className="mt-2 text-lg font-semibold">
                    React + Vite
                  </h4>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500">
                    Diseño
                  </p>

                  <h4 className="mt-2 text-lg font-semibold">
                    Responsive UI
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;