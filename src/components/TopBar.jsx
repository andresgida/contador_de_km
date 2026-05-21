import { Menu, Settings, HelpCircle, Bell } from "lucide-react";

function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border-muted shadow-[0px_4px_20px_rgba(6,182,212,0.06)]">
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-[1280px] mx-auto">

        {/* Left */}
        <div className="flex items-center gap-4">
          <Menu size={22} className="md:hidden text-primary cursor-pointer" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
            Ford Fiesta Titanium
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-4">
            <Settings
              size={18}
              className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200"
            />
            <HelpCircle
              size={18}
              className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200"
            />
            <div className="relative">
              <Bell
                size={18}
                className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200"
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
            </div>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
            AG
          </div>
        </div>

      </div>
    </header>
  );
}

export default TopBar;
