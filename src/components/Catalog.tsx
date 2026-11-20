import { useMemo, useState } from "react";
import { FileText, Lock, MailCheck, ShieldAlert, X } from "lucide-react";
import {
  RANGOS,
  celloSizeGuides,
  doubleBassSizeGuides,
  formatPrecio,
  violaSizeGuides,
  violinSizeGuides,
  type Producto,
  type StringSizeGuide,
} from "@/lib/data";
import { useCatalogo } from "@/lib/store";
import { Link } from "@tanstack/react-router";
import { useExperience } from "@/lib/experience-context";
import { Button } from "@/components/ui/button";

const FAMILIAS = [
  "Todos",
  "Cuerda",
  "Viento",
  "Percusión",
  "Libros y Partituras",
  "Accesorios",
] as const;
const MODALIDADES = ["Todas", "Venta", "Alquiler", "Donación"] as const;
const FORMATOS = ["Todos", "Físico", "Digital"] as const;

// 1 o 2 imágenes de muestra por producto (coloca estas imágenes en /public/...)
const PREVIEW_IMAGES: Record<string, string[]> = {
  p10: ["/previews/suzuki-violin.png", "/previews/suzuki-violin-2.png"],
  p11: ["/previews/suzuki-viola-1.png", "/previews/suzuki-viola-2.png"],
  p12: ["/previews/metodo-suzuki.jpg"],
  p13: ["/previews/partituras-orquesta.png", "/previews/partituras-orquesta-2.png"],
};

function esPartituraPorCorreo(producto: Producto): boolean {
  const texto = `${producto.id} ${producto.titulo} ${producto.descripcion}`.toLowerCase();
  return texto.includes("partitura") || producto.id === "p13";
}

function getGuidesForProduct(producto: Producto | null): StringSizeGuide[] | null {
  if (!producto || producto.familia !== "Cuerda") return null;
  if (producto.tipo === "Violín") return violinSizeGuides;
  if (producto.tipo === "Viola") return violaSizeGuides;
  if (producto.tipo === "Violonchelo") return celloSizeGuides;
  if (producto.tipo === "Contrabajo") return doubleBassSizeGuides;
  return null;
}

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
  const [pendienteDonacion, setPendienteDonacion] = useState(false);
  const [aceptaDonacion, setAceptaDonacion] = useState(false);
  const [errorDonacion, setErrorDonacion] = useState(false);

  const abrirDetalle = (producto: Producto) => {
    setDetalle(producto);
    setOpcion("");
    setPdfAbierto(false);
    setAgregado(false);
    setPendienteDonacion(false);
    setAceptaDonacion(false);
    setErrorDonacion(false);
  };

  const agregarAlCarritoDirecto = (producto: Producto, opcionElegida: string) => {
    addToCart({
      id: producto.id,
      titulo: producto.titulo,
      imagen: producto.imagen,
      modalidad: producto.modalidad,
      precio: producto.modalidad === "Donación" ? 0 : producto.precio,
      opcion: opcionElegida,
    });
    setAgregado(true);
    setPendienteDonacion(false);
  };

  const handleAccionPrincipal = () => {
    if (!detalle || !opcion || agregado) return;
    if (detalle.modalidad === "Donación") {
      setPendienteDonacion(true);
      setErrorDonacion(false);
      return;
    }
    agregarAlCarritoDirecto(detalle, opcion);
  };

  const confirmarDonacionYAgregar = () => {
    if (!detalle || !opcion) return;
    if (!aceptaDonacion) {
      setErrorDonacion(true);
      return;
    }
    agregarAlCarritoDirecto(detalle, opcion);
  };

  const lista = useMemo(() => {
    const r = RANGOS.find((x) => x.id === rango) ?? RANGOS[0];
    return productos.filter(
      (p) =>
        (familia === "Todos" || p.familia === familia) &&
        (modalidad === "Todas" || p.modalidad === modalidad) &&
        (formato === "Todos" ||
          p.formato === formato ||
          familia !== "Libros y Partituras") &&
        p.precio >= r.min &&
        p.precio <= r.max,
    );
  }, [productos, familia, modalidad, formato, rango]);

  const activeGuides = useMemo(() => getGuidesForProduct(detalle), [detalle]);

  const selectedGuide = useMemo(() => {
    if (!activeGuides || !opcion) return null;
    return (
      activeGuides.find((g) => g.size === opcion || g.label === opcion) ?? null
    );
  }, [activeGuides, opcion]);

  const previewImgs = useMemo(() => {
    if (!detalle) return [];
    const custom = PREVIEW_IMAGES[detalle.id];
    if (custom && custom.length > 0) return custom.slice(0, 2);
    return [detalle.imagen];
  }, [detalle]);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Catálogo</p>
      <h1 className="mt-2 text-4xl">Instrumentos, libros y partituras</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Usa los filtros para encontrar exactamente lo que necesitas.
      </p>

      {/* FILTROS */}
      <div className="mt-8 grid gap-5 rounded-xl border border-border bg-card p-6">
        <Grupo titulo="Categoría">
          {FAMILIAS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFamilia(f)}
              className={`chip ${familia === f ? "chip-active" : ""}`}
            >
              {f}
            </button>
          ))}
        </Grupo>

        <Grupo titulo="Modalidad">
          {MODALIDADES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModalidad(m)}
              className={`chip ${modalidad === m ? "chip-active" : ""}`}
            >
              {m}
            </button>
          ))}
        </Grupo>

        {familia === "Libros y Partituras" && (
          <Grupo titulo="Formato">
            {FORMATOS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormato(f)}
                className={`chip ${formato === f ? "chip-active" : ""}`}
              >
                {f}
              </button>
            ))}
          </Grupo>
        )}

        <Grupo titulo="Precio">
          {RANGOS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRango(r.id)}
              className={`chip ${rango === r.id ? "chip-active" : ""}`}
            >
              {r.label}
            </button>
          ))}
        </Grupo>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {lista.length} resultado(s)
      </p>

      {/* TARJETAS */}
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <article
            key={p.id}
            className="card-lift group overflow-hidden rounded-xl border border-border bg-card"
          >
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
              <p className="mt-1 text-xs text-muted-foreground">
                Estado: {p.estado}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-2xl text-gold-deep">
                  {formatPrecio(p)}
                </span>
                <button
                  type="button"
                  className="btn-coffee px-4 py-2 text-xs"
                  onClick={() => abrirDetalle(p)}
                >
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
            <img
              src={detalle.imagen}
              alt={detalle.titulo}
              width={900}
              height={700}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <p className="eyebrow">
                {detalle.modalidad} · {detalle.familia}
              </p>
              <h2 className="mt-2 text-2xl">{detalle.titulo}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {detalle.descripcion}
              </p>
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
                {detalle.selectorLabel ?? "Presentación"}{" "}
                <span className="text-destructive">*</span>
                <select
                  required
                  value={opcion}
                  onChange={(e) => setOpcion(e.target.value)}
                  className="field"
                >
                  <option value="">Selecciona una opción</option>
                  {activeGuides
                    ? activeGuides.map((guide) => (
                        <option key={guide.size} value={guide.size}>
                          {guide.label}
                        </option>
                      ))
                    : (detalle.opciones ?? ["Standard"]).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                </select>
              </label>

              {activeGuides && (
                <div className="mt-3 rounded-lg border border-border bg-secondary/50 p-3 text-xs">
                  {selectedGuide ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">
                        Guía para talla {selectedGuide.size} ({detalle.tipo}):
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Largo de brazo:</strong> {selectedGuide.armCm}
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Edad recomendada:</strong> {selectedGuide.ageRange}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Selecciona una talla para ver el largo de brazo en centímetros y la edad recomendada para {detalle.tipo.toLowerCase()}.
                    </p>
                  )}
                </div>
              )}

              {detalle.pdfPreview && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setPdfAbierto((v) => !v)}
                    className="btn-outline-gold w-full"
                  >
                    <FileText className="h-4 w-4" />{" "}
                    {pdfAbierto ? "Ocultar vista previa PDF" : "Vista previa PDF"}
                  </button>

                  {pdfAbierto && (
                    <div
                      role="status"
                      className="mt-3 space-y-3 rounded-lg border border-border bg-secondary/60 p-3 text-sm"
                    >
                      <p className="font-medium">
                        Vista previa ({previewImgs.length}{" "}
                        {previewImgs.length === 1 ? "página" : "páginas"} de muestra) de{" "}
                        {detalle.titulo}:
                      </p>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {previewImgs.map((src, idx) => (
                          <figure
                            key={`${src}-${idx}`}
                            className="overflow-hidden rounded-md border border-border bg-card"
                          >
                            <img
                              src={src}
                              alt={`Página de muestra ${idx + 1} de ${detalle.titulo}`}
                              className="h-40 w-full object-cover"
                            />
                            <figcaption className="px-2 py-1 text-[0.7rem] text-muted-foreground">
                              Muestra {idx + 1}
                            </figcaption>
                          </figure>
                        ))}
                      </div>

                      {detalle.modalidad === "Venta" ? (
                        <div className="flex items-start gap-2 rounded-md border border-gold/40 bg-card p-2.5 text-xs">
                          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                          <p className="text-muted-foreground">
                            <strong className="text-foreground">Contenido bloqueado:</strong>{" "}
                            solo se muestra esta vista previa limitada. Para acceder al libro o
                            archivo completo debes comprarlo y contar con la autorización de
                            derechos correspondiente.
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Material de donación disponible para consulta educativa; el archivo
                          completo se entrega sujeto a autorización de derechos y uso responsable.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {pendienteDonacion && !agregado && (
                <div className="mt-4 rounded-xl border border-gold/40 bg-secondary/70 p-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    {esPartituraPorCorreo(detalle) ? (
                      <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                    ) : (
                      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                    )}
                    <div className="space-y-2">
                      <p className="font-semibold">
                        Condiciones de donación — {detalle.titulo}
                      </p>

                      {esPartituraPorCorreo(detalle) ? (
                        <>
                          <p className="text-xs text-muted-foreground">
                            Como se trata de partituras enviadas por correo,{" "}
                            <strong className="text-foreground">
                              no tienes que ir a ninguna bodega
                            </strong>{" "}
                            a retirarlas.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Debes usarlas <strong className="text-foreground">para lo que son</strong>{" "}
                            (estudio y práctica musical) y{" "}
                            <strong className="text-foreground">
                              no venderlas, botarlas ni desperdiciarlas
                            </strong>
                            .
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-muted-foreground">
                            Si eres <strong className="text-foreground">menor de edad</strong>,
                            debes ir acompañado de tu{" "}
                            <strong className="text-foreground">
                              padre, madre o adulto responsable debidamente identificado
                            </strong>{" "}
                            para retirar el instrumento en las bodegas.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Se firmará un{" "}
                            <strong className="text-foreground">compromiso sencillo</strong> de que
                            se usará <strong className="text-foreground">únicamente para estudio</strong>{" "}
                            y <strong className="text-foreground">no para vender, empeñar</strong> ni
                            darle mal uso.
                          </p>
                        </>
                      )}

                      <label className="flex cursor-pointer items-start gap-2 pt-1 text-xs">
                        <input
                          type="checkbox"
                          checked={aceptaDonacion}
                          onChange={(e) => {
                            setAceptaDonacion(e.target.checked);
                            if (e.target.checked) setErrorDonacion(false);
                          }}
                          className="mt-0.5 h-4 w-4 accent-gold-deep"
                        />
                        <span>
                          {esPartituraPorCorreo(detalle)
                            ? "Acepto usar estas partituras para estudio y no venderlas, botarlas ni desperdiciarlas."
                            : "Acepto acudir con un adulto responsable identificado si soy menor de edad para retiro en bodega y firmar el compromiso de uso exclusivo para estudio (sin venta ni empeño)."}
                        </span>
                      </label>

                      {errorDonacion && (
                        <p className="text-xs font-medium text-destructive">
                          Marca la casilla para continuar y agregar al carrito.
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        <Button
                          type="button"
                          variant="gold"
                          className="h-auto py-1.5 text-xs"
                          onClick={confirmarDonacionYAgregar}
                        >
                          Aceptar y continuar al carrito
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-auto py-1.5 text-xs"
                          onClick={() => {
                            setPendienteDonacion(false);
                            setAceptaDonacion(false);
                            setErrorDonacion(false);
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <Button
                  variant="gold"
                  disabled={!opcion || agregado || pendienteDonacion}
                  className="h-auto w-full whitespace-normal"
                  onClick={handleAccionPrincipal}
                >
                  {agregado
                    ? "Añadido al carrito"
                    : detalle.modalidad === "Venta"
                      ? "Comprar · añadir al carrito"
                      : detalle.modalidad === "Alquiler"
                        ? "Alquilar · añadir al carrito"
                        : "Solicitar donación gratuita"}
                </Button>
                {agregado && (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/carrito">Ver carrito</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Grupo({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="eyebrow">{titulo}</h2>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
