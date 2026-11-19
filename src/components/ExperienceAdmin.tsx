import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/lib/experience-context";
import { announcementSchema, type Announcement } from "@/lib/experience";

// Pon aquí los nombres exactos de dos imágenes que ya tengas en public/ (las del carrusel)
const IMAGENES_INICIALES = ["/anuncio-1.png", "/anuncio-2.png"];
const TITULOS_INICIALES = ["Convocatoria de práctica", "Presentación orquestal"];

export function ExperienceAdmin() {
  const { state, update } = useExperience();
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<Announcement | null>(null);

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-3xl">Gestión de ACCORDO</h2>

      <div className="my-6 flex flex-wrap gap-2">
        <Button variant="gold" onClick={() => setMessage("")}>
          Anuncios
        </Button>
      </div>

      {message && (
        <p role="status" className="mb-4 text-sm">
          {message}
        </p>
      )}

      <div className="mb-5">
        <Button
          variant="gold"
          onClick={() =>
            setDraft({
              id: crypto.randomUUID(),
              titulo: "",
              detalle: "",
              imagen: IMAGENES_INICIALES[0],
              destino: "/directorio",
              activo: true,
              membresia: "Pendiente",
              tarifa: 0,
            })
          }
        >
          Añadir anuncio
        </Button>
      </div>

      {draft && (
        <form
          className="mb-8 grid max-w-2xl gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = announcementSchema.safeParse(draft);
            if (!parsed.success) {
              setMessage(parsed.error.issues[0]?.message ?? "Revisa el anuncio.");
              return;
            }
            if (!draft.imagen.startsWith("/") && !/^https:\/\//.test(draft.imagen)) {
              setMessage("La imagen debe ser una ruta local o una URL HTTPS.");
              return;
            }
            update((s) => ({
              ...s,
              anuncios: s.anuncios.some((a) => a.id === draft.id)
                ? s.anuncios.map((a) => (a.id === draft.id ? parsed.data : a))
                : [...s.anuncios, parsed.data],
            }));
            setDraft(null);
            setMessage("Anuncio guardado.");
          }}
        >
          <h3 className="text-2xl">Editar anuncio</h3>
          <label className="grid gap-1 text-sm font-semibold">
            Título
            <input
              required
              maxLength={100}
              value={draft.titulo}
              onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
              className="field"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Descripción
            <input
              maxLength={240}
              value={draft.detalle}
              onChange={(e) => setDraft({ ...draft, detalle: e.target.value })}
              className="field"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Imagen (URL HTTPS o ruta local)
            <input
              required
              maxLength={2000}
              value={draft.imagen}
              onChange={(e) => setDraft({ ...draft, imagen: e.target.value })}
              className="field"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Destino
            <select
              className="field"
              value={draft.destino}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  destino: announcementSchema.shape.destino.parse(e.target.value),
                })
              }
            >
              {announcementSchema.shape.destino.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.activo}
              onChange={(e) => setDraft({ ...draft, activo: e.target.checked })}
            />
            Activo
          </label>
          <div className="flex gap-3">
            <Button variant="gold" type="submit">
              Guardar anuncio
            </Button>
            <Button variant="outline" type="button" onClick={() => setDraft(null)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <div className="divide-y divide-border">
        {state.anuncios.map((a, index) => {
          const tituloMostrar = TITULOS_INICIALES[index] ?? a.titulo;
          const imagenMostrar = IMAGENES_INICIALES[index] ?? a.imagen;

          return (
            <article key={a.id} className="flex flex-wrap items-center gap-4 py-5">
              <img
                src={imagenMostrar}
                alt={tituloMostrar}
                className="h-16 w-24 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1 basis-40">
                <h3 className="text-xl">{tituloMostrar}</h3>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  setDraft({
                    ...a,
                    titulo: tituloMostrar,
                    imagen: imagenMostrar,
                  })
                }
              >
                Editar
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  update((s) => ({
                    ...s,
                    anuncios: s.anuncios.map((i) =>
                      i.id === a.id ? { ...i, activo: !i.activo } : i
                    ),
                  }))
                }
              >
                {a.activo ? "Pausar" : "Activar"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Eliminar anuncio ${tituloMostrar}`}
                onClick={() =>
                  update((s) => ({
                    ...s,
                    anuncios: s.anuncios.filter((i) => i.id !== a.id),
                  }))
                }
              >
                <Trash2 />
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
