import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const MENU = [
  { to: "/", label: "Home" },
  { to: "/catalogo", label: "Shop", Icon: ShoppingBag },
  { to: "/directorio", label: "Dónde aprender" },
  { to: "/publicar", label: "Publicar" },
  { to: "/contacto", label: "Contacto" },
  { to: "/admin", label: "Panel" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="shell grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div aria-hidden="true" />

        <Link to="/" onClick={() => setOpen(false)} aria-label="Inicio" className="justify-self-center">
          <Logo />
        </Link>

        <div className="flex items-center justify-end">
          <Button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="chip"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="shell grid gap-1 border-t border-border/70 py-3">
          {MENU.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {"Icon" in item && item.Icon ? <item.Icon className="h-4 w-4 text-gold-deep" /> : null}
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
