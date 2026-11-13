import { useMemo, useState } from "react";
import { FileText, X } from "lucide-react";
import { RANGOS, formatPrecio, type Producto } from "@/lib/data";
import { useCatalogo } from "@/lib/store";
import { Link } from "@tanstack/react-router";
import { useExperience } from "@/lib/experience-store";
import { Button } from "@/components/ui/button";



const FAMILIAS = ["Todos", "Cuerda", "Viento", "Percusión", "Libros y Partituras", "Accesorios"] as const;
const MODALIDADES = ["Todas", "Venta", "Alquiler", "Donación"] as const;
const FORMATOS = ["Todos", "Físico", "Digital"] as const;

export function Catalog() {
  const { productos } = useCatalogo();
  const { addToCart } = useExperience();
  const [agregado, setAgregado] = useState(false);
  const [familia, setFamilia] = useState<(typeof FAMILIAS)[number]>("Todos");
  const [modalidad, setModalidad] = useState<(typeof MODALIDADES)[number]>("Todas");
  const [formato, setFormato] = useState<(typeof FORMATOS)[number]>("Todos");
  const [rango, setRango] = useState<string>("todos");
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [opcion, setOpcion] = useState("");
  const [pdfAbierto, setPdfAbierto] = useState(false);
  const abrirDetalle = (producto: Producto) => {
    setDetalle(producto);
    setOpcion("");
    setPdfAbierto(false);
    setAgregado(false);
  };

  const lista = useMemo(() => {
    const r = RANGOS.find((x) => x.id === rango) ?? RANGOS[0];
    return productos.filter(
      (p) =>
        (familia === "Todos" || p.familia === familia) &&
        (modalidad === "Todas" || p.modalidad === modalidad) &&
        (formato === "Todos" || p.formato === formato || familia !== "Libros y Partituras") &&
        p.precio >= r.min &&
        p.precio <= r.max,
    );
  }, [productos, familia, modalidad, formato, rango]);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Catálogo</p>
      <h1 className="mt-2 text-4xl">Instrumentos, libros y partituras</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Usa los filtros para encontrar exactamente lo que necesitas para tus clases.
      </p>

      {/* FILTROS */}
      <div className="mt-8 grid gap-5 rounded-xl border border-border bg-card p-6">
        <Grupo titulo="Categoría">
          {FAMILIAS.map((f) => (
            <button key={f} type="button" onClick={() => setFamilia(f)} className={`chip ${familia === f ? "chip-active" : ""}`}>
              {f}
            </button>
          ))}
        </Grupo>

        <Grupo titulo="Modalidad">
          {MODALIDADES.map((m) => (
            <button key={m} type="button" onClick={() => setModalidad(m)} className={`chip ${modalidad === m ? "chip-active" : ""}`}>
              {m}
            </button>
          ))}
        </Grupo>

        {familia === "Libros y Partituras" && (
          <Grupo titulo="Formato">
            {FORMATOS.map((f) => (
              <button key={f} type="button" onClick={() => setFormato(f)} className={`chip ${formato === f ? "chip-active" : ""}`}>
                {f}
              </button>
            ))}
          </Grupo>
        )}

        <Grupo titulo="Precio">
          {RANGOS.map((r) => (
            <button key={r.id} type="button" onClick={() => setRango(r.id)} className={`chip ${rango === r.id ? "chip-active" : ""}`}>
              {r.label}
            </button>
          ))}
        </Grupo>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{lista.length} resultado(s)</p>

      {/* TARJETAS */}
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <article key={p.id} className="card-lift group overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative overflow-hidden">
              <img
                src={p.imagen}
                alt={p.titulo}
                loading="lazy"
                width={900}
                height={700}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span
                className="absolute left-3 top-3 rounded-full px-3 py-1 text-[0.7rem] font-bold text-coffee"
                style={{ background: "var(--gradient-gold)" }}
              >
                {p.modalidad}
              </span>
            </div>
            <div className="p-5">
              <p className="eyebrow text-[0.65rem]">{p.familia}</p>
              <h3 className="mt-1 text-xl leading-snug">{p.titulo}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Estado: {p.estado}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-2xl text-gold-deep">{formatPrecio(p)}</span>
                <button type="button" className="btn-coffee px-4 py-2 text-xs" onClick={() => abrirDetalle(p)}>
                  Ver detalles
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {lista.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No hay productos con esos filtros. Prueba "Todos los precios".
        </p>
      )}

      {/* MODAL DETALLE */}
      {detalle && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-coffee/70 p-4 backdrop-blur-sm"
          onClick={() => setDetalle(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles de ${detalle.titulo}`}
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold/30 bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDetalle(null)}
              aria-label="Cerrar"
              className="absolute right-3 top-3 rounded-full bg-card/90 p-2"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={detalle.imagen} alt={detalle.titulo} width={900} height={700} className="h-56 w-full object-cover" />
            <div className="p-6">
              <p className="eyebrow">{detalle.modalidad} · {detalle.familia}</p>
              <h2 className="mt-2 text-2xl">{detalle.titulo}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{detalle.descripcion}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Precio</dt>
                  <dd className="font-semibold">{formatPrecio(detalle)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Estado</dt>
                  <dd className="font-semibold">{detalle.estado}</dd>
                </div>
              </dl>
              <label className="mt-4 grid gap-1.5 text-sm font-semibold">
                {detalle.selectorLabel ?? "Presentación"} <span className="text-destructive">*</span>
                <select required value={opcion} onChange={(e) => setOpcion(e.target.value)} className="field">
                  <option value="">Selecciona una opción</option>
                  {(detalle.opciones ?? ["Standard"]).map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              {detalle.pdfPreview && (
                <div className="mt-4">
                  <button type="button" onClick={() => setPdfAbierto(true)} className="btn-outline-gold w-full">
                    <FileText className="h-4 w-4" /> Vista previa PDF
                  </button>
                  {pdfAbierto && <p role="status" className="mt-2 rounded-md bg-secondary p-3 text-sm">Vista previa demostrativa de {detalle.titulo}. El archivo completo se entregará únicamente con autorización de derechos.</p>}
                </div>
              )}
              <div className="mt-6 space-y-3">
                <Button variant="gold" disabled={!opcion || agregado} className="h-auto w-full whitespace-normal" onClick={() => { addToCart({ id: detalle.id, titulo: detalle.titulo, imagen: detalle.imagen, modalidad: detalle.modalidad, precio: detalle.modalidad === "Donación" ? 0 : detalle.precio, opcion }); setAgregado(true); }}>{agregado ? "Añadido al carrito" : detalle.modalidad === "Venta" ? "Comprar · añadir al carrito" : detalle.modalidad === "Alquiler" ? "Alquilar · añadir al carrito" : "Solicitar donación gratuita"}</Button>
                {agregado && <Button asChild variant="outline" className="w-full"><Link to="/carrito">Ver carrito</Link></Button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow">{titulo}</h2>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
