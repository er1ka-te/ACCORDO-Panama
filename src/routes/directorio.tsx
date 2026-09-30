import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Instagram, MessageCircle } from "lucide-react";
import { ESCUELAS } from "@/lib/data";

export const Route = createFileRoute("/directorio")({
  head: () => ({
    meta: [
      { title: "Dónde aprender música en Panamá — Sonora Panamá" },
      {
        name: "description",
        content:
          "Directorio de academias, escuelas y fundaciones de música en Panamá con sus planes, costos y contacto directo.",
      },
      { property: "og:title", content: "Dónde aprender música en Panamá" },
      {
        property: "og:description",
        content: "Fundaciones gratuitas y academias desde $25 al mes en todo el país.",
      },
    ],
  }),
  component: Directorio,
});

const FILTROS = [
  { id: "todos", label: "Todos los costos", test: () => true },
  { id: "gratis", label: "Gratis / Fundación", test: (max: number) => max === 0 },
  { id: "pago", label: "$1 - $100", test: (max: number) => max > 0 && max <= 100 },
] as const;

function Directorio() {
  const [filtro, setFiltro] = useState<string>("todos");

  const lista = useMemo(() => {
    const f = FILTROS.find((x) => x.id === filtro) ?? FILTROS[0];
    return ESCUELAS.filter((e) => f.test(e.costoMax));
  }, [filtro]);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Directorio</p>
      <h1 className="mt-2 text-4xl">Dónde aprender en Panamá</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Escuelas, academias y fundaciones verificadas, con sus planes y contacto directo.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button key={f.id} type="button" onClick={() => setFiltro(f.id)} className={`chip ${filtro === f.id ? "chip-active" : ""}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((e) => (
          <article key={e.id} className="card-lift flex flex-col rounded-xl border border-border bg-card p-6">
            <p className="eyebrow text-[0.65rem]">{e.tipo}</p>
            <h2 className="mt-1 text-xl leading-snug">{e.nombre}</h2>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              {e.ubicacion}
            </p>
            <p className="mt-3 text-sm">{e.enfoque}</p>
            <p className="mt-3 rounded-md bg-secondary p-3 text-sm font-semibold">
              {e.planes}
            </p>
            <div className="mt-auto flex items-center gap-2 pt-5">
              <a href={e.contacto} target="_blank" rel="noreferrer" className="btn-coffee flex-1 px-4 py-2 text-xs">
                <MessageCircle className="h-4 w-4" /> Contactar
              </a>
              <a
                href={e.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram de ${e.nombre}`}
                className="rounded-md border border-border p-2.5 transition-colors hover:border-gold hover:text-gold-deep"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
