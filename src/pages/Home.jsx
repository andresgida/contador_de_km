import { useEffect, useState } from "react";

import {
  Car,
  Calendar,
  Gauge,
  Activity,
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
  const {
    data,
    loading,
    error,
  } = useInitialData();

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

    if (Object.keys(errors).length > 0) {
      return;
    }

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
        "Ocurrió un error guardando los datos"
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
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-indigo-500/20
              bg-indigo-500/10
              px-4
              py-2
              text-sm
              text-indigo-300
            "
          >
            Calculadora inteligente
          </div>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              leading-tight
              md:text-5xl
            "
          >
            Promedio anual de kilometraje
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-base
              text-slate-400
              md:text-lg
            "
          >
            Calcula el promedio anual
            recorrido por tu vehículo
            utilizando datos reales y
            estimaciones automáticas.
          </p>
        </div>

        {/* CONTENT */}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* FORM */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-slate-900
              p-6
              shadow-2xl
            "
          >
            <h2 className="text-2xl font-semibold">
              Datos del vehículo
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Completa la información para
              realizar el cálculo.
            </p>

            <div className="mt-8 space-y-5">
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

              <div className="pt-3">
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
          </div>

          {/* RESULTS */}

          <div className="lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              <ResultCard
                title="Kilómetros recorridos"
                value={`${results?.kmsTraveled || 0} km`}
                icon={<Car size={20} />}
              />

              <ResultCard
                title="Días transcurridos"
                value={
                  results?.daysElapsed || 0
                }
                icon={<Calendar size={20} />}
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
                icon={<Gauge size={20} />}
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
                icon={<Activity size={20} />}
              />
            </div>

            {/* INFO PANEL */}

            <div
              className="
                mt-6
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-indigo-500/10
                to-slate-900
                p-8
              "
            >
              <h3 className="text-2xl font-semibold">
                ¿Cómo funciona?
              </h3>

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-slate-300
                  leading-relaxed
                "
              >
                La aplicación calcula el
                promedio anual de kilómetros
                recorridos utilizando la
                diferencia entre el
                kilometraje inicial y el
                actual, teniendo en cuenta
                los días transcurridos desde
                la fecha registrada.
              </p>

              <div
                className="
                  mt-6
                  grid
                  gap-4
                  md:grid-cols-3
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-white/5
                    p-4
                  "
                >
                  <p className="text-sm text-slate-400">
                    Cálculo automático
                  </p>

                  <h4 className="mt-2 font-semibold">
                    Tiempo real
                  </h4>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-white/5
                    p-4
                  "
                >
                  <p className="text-sm text-slate-400">
                    Persistencia
                  </p>

                  <h4 className="mt-2 font-semibold">
                    Supabase Cloud
                  </h4>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-white/5
                    p-4
                  "
                >
                  <p className="text-sm text-slate-400">
                    Responsive
                  </p>

                  <h4 className="mt-2 font-semibold">
                    Mobile First
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