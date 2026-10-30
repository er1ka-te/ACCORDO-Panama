import { Link } from "@tanstack/react-router";
import { BookOpen, HeartHandshake, ShoppingBag, Upload } from "lucide-react";
const links = [
  { to: "/estudio", text: "Módulos de estudio", Icon: BookOpen },
  { to: "/donaciones", text: "Donaciones", Icon: HeartHandshake },
  { to: "/catalogo", text: "Compra y alquiler", Icon: ShoppingBag },
  { to: "/publicar", text: "Publicar instrumento", Icon: Upload },
] as const;
export function DirectLinks() {
  return <nav aria-label="Accesos directos" className="border-b border-border bg-secondary"><div className="shell grid grid-cols-2 gap-3 py-6 md:grid-cols-4">{links.map(({ to, text, Icon }) => <Link key={to} to={to} className="flex items-center gap-3 rounded-md px-3 py-4 text-sm font-semibold transition-colors hover:bg-card"><Icon className="h-5 w-5 shrink-0 text-gold-deep" /><span>{text}</span></Link>)}</div></nav>;
}