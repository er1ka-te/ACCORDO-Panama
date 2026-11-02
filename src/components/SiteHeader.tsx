import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useExperience } from "@/lib/experience-store";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { state } = useExperience();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link to="/catalogo" className="btn-gold">
            Explorar catálogo
          </Link>
        </div>

        <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon"><Link to="/carrito" aria-label={`Carrito, ${state.carrito.length} artículos`} className="relative"><ShoppingBag />{state.carrito.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{state.carrito.length}</span>}</Link></Button>
        <Button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="chip xl:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
        </div>
      </div>

      {open && (
        <nav className="shell grid gap-1 border-t border-border/70 py-3 xl:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
