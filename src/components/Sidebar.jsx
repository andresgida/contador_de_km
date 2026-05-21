import { Calculator, Car, TrendingUp, Settings, Plus, LifeBuoy } from "lucide-react";

const NAV_ITEMS = [
  { icon: Calculator, label: "Calculadora", active: true },
  { icon: Car,        label: "Vehículos",   active: false },
  { icon: TrendingUp, label: "Análisis",    active: false },
  { icon: Settings,   label: "Configuración", active: false },
];

function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-surface-container border-r border-border-muted z-40">
      <div className="flex flex-col h-full py-8">

        {/* Brand */}
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary font-bold text-lg flex-shrink-0">
              A
            </div>
            <div>
              <h1 className="text-[18px] font-bold text-primary tracking-tight leading-tight">
                Andresgida™
              </h1>
              <p
                className="text-[11px] text-slate-text opacity-70 tracking-widest uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Analizador KM Palomo
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <a
              key={label}
              href="#"
              className={
                active
                  ? "flex items-center gap-3 px-6 py-3 text-primary bg-primary/10 border-r-4 border-primary transition-all duration-200"
                  : "flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface transition-all duration-200"
              }
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              <span
                className="text-[12px] font-medium tracking-wider"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-6 mt-4">
          <button className="w-full py-3 px-4 bg-primary-container text-on-primary font-bold text-sm rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform metric-glow">
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 px-6 border-t border-border-muted pt-6">
          <a
            href="#"
            className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            <LifeBuoy size={18} strokeWidth={1.8} />
            <span
              className="text-[12px] font-medium tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Soporte
            </span>
          </a>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
