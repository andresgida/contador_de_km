import { Calculator, Car, TrendingUp, Settings } from "lucide-react";

const NAV_ITEMS = [
  { icon: Calculator, label: "Calc",      active: true },
  { icon: Car,        label: "Vehículos", active: false },
  { icon: TrendingUp, label: "Análisis",  active: false },
  { icon: Settings,   label: "Ajustes",   active: false },
];

function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-border-muted z-50 flex justify-around items-center py-2 px-4">
      {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
        <a
          key={label}
          href="#"
          className={`flex flex-col items-center gap-1 py-1 ${
            active ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
          <span className="text-[10px] font-medium">{label}</span>
        </a>
      ))}
    </nav>
  );
}

export default MobileNav;
