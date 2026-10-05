import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { IMAGENES, formatPrecio, type Familia, type Modalidad } from "@/lib/data";
import { SOLICITUDES, useCatalogo } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de administración — ACCORDO Panamá" },
      {
        name: "description",
        content: "Panel simulado para agregar productos, ajustar precios y revisar solicitudes de alquiler.",
      },
      { property: "og:title", content: "Panel de administración — ACCORDO Panamá" },
      { property: "og:description", content: "Gestión de catálogo y solicitudes de alquiler." },
    ],
  }),
  component: Admin,
});

const FAMILIAS: Familia[] = ["Cuerda", "Viento", "Percusión", "Teclado", "Libros y Partituras", "Accesorios"];
const MODALIDADES: Modalidad[] = ["Venta", "Alquiler", "Donación"];

function Admin() {
  const { productos, agregar, actualizarPrecio, eliminar, restaurar } = useCatalogo();
  const [titulo, setTitulo] = useState("");
  const [familia, setFamilia] = useState<Familia>("Cuerda");
  const [modalidad, setModalidad] = useState<Modalidad>("Venta");
  const [precio, setPrecio] = useState("0");
  const [estado, setEstado] = useState("Nuevo");

  return (
    <div className="shell py-14">
      <p className="eyebrow">Interno</p>
      <h1 className="mt-2 text-4xl">Panel de administración</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Demostración en el navegador: los cambios se guardan localmente y se reflejan en el catálogo.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!titulo.trim()) return;
            agregar({
              titulo,
              familia,
              tipo: familia,
              modalidad,
              precio: Number(precio) || 0,
              ...(modalidad === "Alquiler" ? { unidad: "por mes" } : {}),
              estado,
              imagen: IMAGENES[familia],
              descripcion: "Producto agregado desde el panel de administración.",
            });
            setTitulo("");
            setPrecio("0");
          }}
          className="grid h-fit gap-4 rounded-xl border border-border bg-card p-6"
        >
          <h2 className="text-2xl">Agregar producto</h2>
          <label className="grid gap-1.5 text-sm font-semibold">
            Título
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="field" placeholder="Violín 3/4" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Categoría
            <select value={familia} onChange={(e) => setFamilia(e.target.value as Familia)} className="field">
              {FAMILIAS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Modalidad
            <select value={modalidad} onChange={(e) => setModalidad(e.target.value as Modalidad)} className="field">
              {MODALIDADES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Precio (USD)
            <input value={precio} onChange={(e) => setPrecio(e.target.value)} type="number" min="0" className="field" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Estado
            <input value={estado} onChange={(e) => setEstado(e.target.value)} className="field" />
          </label>
          <button type="submit" className="btn-gold">
            Guardar producto
          </button>
          <button type="button" onClick={restaurar} className="btn-outline-gold">
            <RotateCcw className="h-4 w-4" /> Restaurar catálogo inicial
          </button>
        </form>

        <div className="grid gap-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl">Catálogo ({productos.length})</h2>
            <div className="mt-4 grid gap-2">
              {productos.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-md border border-border p-3 text-sm">
                  <span className="flex-1 font-semibold">{p.titulo}</span>
                  <span className="text-xs text-muted-foreground">{formatPrecio(p)}</span>
                  <input
                    type="number"
                    min="0"
                    defaultValue={p.precio}
                    onBlur={(e) => actualizarPrecio(p.id, Number(e.target.value) || 0)}
                    className="field w-24 py-1.5"
                    aria-label={`Precio de ${p.titulo}`}
                  />
                  <button
                    type="button"
                    onClick={() => eliminar(p.id)}
                    aria-label={`Eliminar ${p.titulo}`}
                    className="rounded-md border border-border p-2 transition-colors hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl">Solicitudes de alquiler</h2>
            <div className="mt-4 grid gap-2">
              {SOLICITUDES.map((s) => (
                <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3 text-sm">
                  <span className="font-semibold">{s.producto}</span>
                  <span className="text-muted-foreground">{s.cliente} · {s.plan}</span>
                  <span className="chip chip-active">{s.estado}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
