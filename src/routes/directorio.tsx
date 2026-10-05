import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Instagram, MessageCircle, ExternalLink } from "lucide-react";
import { ESCUELAS } from "@/lib/data";

export const Route = createFileRoute("/directorio")({
  head: () => ({
    meta: [
      { title: "Dónde aprender música en Panamá — ACCORDO Panamá" },
      { name: "description", content: "Red de orquestas, fundaciones, academias y opciones de clases particulares en Panamá." },
      { property: "og:title", content: "Dónde aprender música — ACCORDO Panamá" },
      { property: "og:description", content: "Encuentra fundaciones, academias y clases particulares de música en Panamá." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Directorio,
});

const TIPOS = ["Todos", "Fundación y red oficial", "Academia pagada", "Profesor particular"] as const;
const COSTOS = [
  { id: "todos", label: "Todos los costos", test: () => true },
  { id: "gratis", label: "Gratis / Fundación", test: (max: number) => max === 0 },
  { id: "pago", label: "$1 - $100", test: (max: number) => max > 0 && max <= 100 },
] as const;

function Directorio() {
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("Todos");
  const [filtro, setFiltro] = useState<(typeof COSTOS)[number]["id"]>("todos");
  const lista = useMemo(() => {
    const costo = COSTOS.find((x) => x.id === filtro) ?? COSTOS[0];
    return ESCUELAS.filter((e) => (tipo === "Todos" || e.tipo === tipo) && costo.test(e.costoMax));
  }, [tipo, filtro]);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Directorio</p>
      <h1 className="mt-2 text-4xl">Dónde aprender en Panamá</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Fundaciones, academias y opciones de clases particulares, con contacto directo.</p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Tipo de enseñanza">
        {TIPOS.map((item) => <button key={item} type="button" onClick={() => setTipo(item)} className={`chip ${tipo === item ? "chip-active" : ""}`}>{item}</button>)}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Costo de enseñanza">
        {COSTOS.map((item) => <button key={item.id} type="button" onClick={() => setFiltro(item.id)} className={`chip ${filtro === item.id ? "chip-active" : ""}`}>{item.label}</button>)}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((e) => (
          <article key={e.id} className="card-lift flex min-w-0 flex-col rounded-xl border border-border bg-card p-6">
            {e.foto && <img src={e.foto} alt={`Especialidad en ${e.enfoque}`} loading="lazy" className="mb-4 h-36 w-full rounded-md object-cover" />}
            <p className="eyebrow text-[0.65rem]">{e.tipo}</p>
            <h2 className="mt-1 text-xl leading-snug">{e.nombre}</h2>
            {e.perfilDemostrativo && <p className="mt-1 text-xs text-muted-foreground">Perfil ilustrativo · confirma disponibilidad y credenciales</p>}
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /><span>{e.ubicacion}<br />{e.corregimiento}, {e.provincia}<br />Referencia: {e.referencia}</span></p>
            <p className="mt-3 text-sm">{e.enfoque}</p>
            {e.trayectoria && <p className="mt-2 text-sm text-muted-foreground">{e.trayectoria}</p>}
            {e.modalidadClases && <p className="mt-2 text-sm text-muted-foreground">{e.modalidadClases}</p>}
            <p className="mt-3 rounded-md bg-secondary p-3 text-sm font-semibold">{e.planes}</p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              <a href={e.contacto} target="_blank" rel="noreferrer" className="btn-coffee flex-1 px-4 py-2 text-xs"><MessageCircle className="h-4 w-4" /> Contactar</a>
              <a href={e.maps} target="_blank" rel="noreferrer" aria-label={`Ver ${e.nombre} en Google Maps`} title="Google Maps" className="rounded-md border border-border p-2.5 hover:border-gold"><ExternalLink className="h-4 w-4" /></a>
              {!e.perfilDemostrativo && <a href={e.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${e.nombre}`} title="Instagram" className="rounded-md border border-border p-2.5 hover:border-gold"><Instagram className="h-4 w-4" /></a>}
            </div>
          </article>
        ))}
      </div>
      {lista.length === 0 && <p className="mt-8 text-sm text-muted-foreground">No hay opciones con esos filtros.</p>}
    </div>
  );
}