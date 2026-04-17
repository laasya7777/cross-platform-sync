import { useEffect, useState } from "react";
import { Menu, X, Eye } from "lucide-react";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

interface HeaderProps {
  onBookClick: () => void;
}

export const Header = ({ onBookClick }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const fromTop = window.scrollY + 140;
      let current = "hero";
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= fromTop) current = item.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy/95 backdrop-blur-lg shadow-lg">
      <div className="flex items-center justify-between px-4 sm:px-8 h-[62px] border-b border-white/10">
        <button onClick={() => go("hero")} className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-sky to-accent flex items-center justify-center border-2 border-accent/60">
            <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="text-left">
            <strong className="block font-display text-sm sm:text-base text-white leading-tight">
              Dr J Sumanth Reddy
            </strong>
            <span className="text-[10px] text-sky-300 tracking-[2px] uppercase">Eye Specialist</span>
          </div>
        </button>

        <button
          onClick={onBookClick}
          className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-sky to-accent text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-glow"
        >
          Book Appointment
        </button>

        <button
          onClick={() => setMobileOpen((s) => !s)}
          className="lg:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center justify-center gap-1 h-11 bg-white/5 px-8">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            className={`text-xs uppercase tracking-wider font-medium px-4 py-1.5 rounded-md transition ${
              active === n.id
                ? "text-white bg-accent/20"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {n.label}
          </button>
        ))}
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden flex flex-col gap-1 px-4 py-3 bg-navy-deep border-t border-white/10">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`text-left px-4 py-3 rounded-md text-sm uppercase tracking-wider font-medium transition ${
                active === n.id ? "text-white bg-accent/20" : "text-white/80 hover:bg-white/10"
              }`}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onBookClick();
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky to-accent text-white px-5 py-3 rounded-full text-sm font-semibold"
          >
            Book Appointment
          </button>
        </nav>
      )}
    </header>
  );
};
