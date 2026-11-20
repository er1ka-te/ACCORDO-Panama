import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MapPin,
  Instagram,
  MessageCircle,
  ExternalLink,
  Globe,
  Phone,
} from "lucide-react";
import { ESCUELAS, type TipoEscuela } from "@/lib/data";

export const Route = createFileRoute("/directorio")({
  head: () => ({
    meta: [
      { title: "Dónde aprender música en Panamá — ACCORDO Panamá" },
      {
        name: "description",
        content:
          "Fundaciones, academias y opciones de clases particulares en Panamá.",
      },
      { property: "og:title", content: "Dónde aprender música — ACCORDO Panamá" },
      {
        property: "og:description",
        content:
          "Fundaciones, academias y opciones de clases particulares, con contacto directo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Directorio,
});

const TIPOS = [
  "Todos",
  "Fundación",
  "Academia pagada",
  "Profesor particular",
] as const;

type FiltroTipo = (typeof TIPOS)[number];

function Iniciales({ nombre }: { nombre: string }) {
  const texto = nombre
    .split(" ")
    .filter(
      (p) =>
        p.length > 2 &&
        !["de", "la", "las", "los", "y", "en"].includes(p.toLowerCase()),
    )
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="flex h-full w-full items-center justify-center bg-secondary font-display text-base font-bold text-gold-deep">
      {texto || "AC"}
    </div>
  );
}

function Directorio() {
  const [tipo, setTipo] = useState<FiltroTipo>("Todos");

  const lista = useMemo(() => {
    if (tipo === "Todos") return ESCUELAS;
    return ESCUELAS.filter((e) => e.tipo === (tipo as TipoEscuela));
  }, [tipo]);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Directorio</p>
      <h1 className="mt-2 text-4xl">Dónde aprender en Panamá</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Fundaciones, academias y opciones de clases particulares, con contacto directo.
      </p>

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Tipo de enseñanza"
      >
        {TIPOS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTipo(item)}
            className={`chip ${tipo === item ? "chip-active" : ""}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((e) => (
          <article
            key={e.id}
            className="card-lift group flex min-w-0 flex-col rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
                {e.imagen ? (
                  <img
                    src={e.imagen}
                    alt={
                      e.tipo === "Profesor particular"
                        ? `Foto de ${e.nombre}`
                        : `Logo de ${e.nombre}`
                    }
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <Iniciales nombre={e.nombre} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="eyebrow text-[0.65rem]">{e.tipo}</p>
                <h2 className="mt-1 text-xl leading-snug">{e.nombre}</h2>
              </div>
            </div>

            {e.perfilDemostrativo && (
              <p className="mt-2 text-xs text-muted-foreground">
                Perfil ilustrativo · confirma disponibilidad y credenciales
              </p>
            )}

            {e.ubicacion && (
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <span>{e.ubicacion}</span>
              </p>
            )}

            {e.telefono && (
              <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                <span>Teléfono: {e.telefono}</span>
              </p>
            )}

            <p className="mt-3 text-sm">{e.enfoque}</p>

            {e.trayectoria && (
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="text-foreground">Trayectoria:</strong>{" "}
                {e.trayectoria}
              </p>
            )}

            {e.experiencia && (
              <p className="mt-2 text-sm text-muted-foreground">
                <strong className="text-foreground">Experiencia:</strong>{" "}
                {e.experiencia}
              </p>
            )}

            {e.modalidadClases && (
              <p className="mt-2 text-sm text-muted-foreground">
                {e.modalidadClases}
              </p>
            )}

            {e.planes && (
              <p className="mt-3 rounded-md bg-secondary p-3 text-sm font-semibold">
                {e.planes}
              </p>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              {e.contacto && (
                <a
                  href={e.contacto}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-coffee flex-1 px-4 py-2 text-xs"
                >
                  <MessageCircle className="h-4 w-4" /> Contactar
                </a>
              )}
              {e.sitioWeb && (
                <a
                  href={e.sitioWeb}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Sitio web de ${e.nombre}`}
                  title="Sitio web"
                  className="rounded-md border border-border p-2.5 hover:border-gold"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {e.maps && (
                <a
                  href={e.maps}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ver ${e.nombre} en Google Maps`}
                  title="Google Maps"
                  className="rounded-md border border-border p-2.5 hover:border-gold"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {!e.perfilDemostrativo && e.instagram && (
                <a
                  href={e.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram de ${e.nombre}`}
                  title="Instagram"
                  className="rounded-md border border-border p-2.5 hover:border-gold"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {lista.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">
          No hay opciones con esos filtros.
        </p>
      )}
    </div>
  );
}
