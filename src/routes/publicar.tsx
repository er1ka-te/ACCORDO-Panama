import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClipboardCheck, Warehouse, Handshake, BadgeDollarSign } from "lucide-react";

export const Route = createFileRoute("/publicar")({
  head: () => ({
    meta: [
      { title: "Publica tu instrumento o libro — ACCORDO Panamá" },
      {
        name: "description",
        content:
          "Registra tu instrumento, libro o partitura para venta o alquiler: verificación técnica, recepción en bodega y logística transparente.",
      },
      { property: "og:title", content: "Publica tu instrumento — ACCORDO Panamá" },
      {
        property: "og:description",
        content: "Proceso claro de verificación, bodega y entrega para propietarios en Panamá.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Publicar,
});

const PASOS = [
  { Icon: ClipboardCheck, t: "1. Registro", d: "Llenas el formulario con fotos y estado real del instrumento o libro." },
  { Icon: Handshake, t: "2. Verificación", d: "Un técnico aliado revisa el estado y acordamos el precio de venta o alquiler." },
  { Icon: Warehouse, t: "3. Bodega física", d: "Recibimos el artículo con inventario fotográfico y acuerdo de custodia firmado." },
  { Icon: BadgeDollarSign, t: "4. Pago y logística", d: "Gestionamos entregas, devoluciones y te liquidamos cada mes." },
];

function Publicar() {
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Propietarios</p>
      <h1 className="mt-2 text-4xl">Pon tu instrumento o libro en venta / alquiler</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Tú decides el precio; nosotros nos encargamos de verificar, almacenar y mover el instrumento con total transparencia.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PASOS.map(({ Icon, t, d }) => (
          <article key={t} className="card-lift rounded-xl border border-border bg-card p-6">
            <Icon className="h-6 w-6 text-gold-deep" />
            <h2 className="mt-4 text-lg">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
          className="grid gap-4 rounded-xl border border-border bg-card p-6"
        >
          <h2 className="text-2xl">Registra tu artículo</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-semibold">
              Nombre completo
              <input required className="field" placeholder="Tu nombre" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Teléfono o WhatsApp
              <input required className="field" placeholder="+507 6000-0000" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Correo
              <input required type="email" className="field" placeholder="tucorreo@correo.com" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Provincia
              <input required className="field" placeholder="Panamá, Chiriquí…" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Tipo de artículo
              <select className="field">
                <option>Instrumento de cuerda</option>
                <option>Instrumento de viento</option>
                <option>Percusión</option>
                <option>Teclado</option>
                <option>Libro o partitura</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Modalidad
              <select className="field">
                <option>Venta</option>
                <option>Alquiler</option>
                <option>Donación</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Precio esperado (USD)
              <input className="field" type="number" min="0" placeholder="0" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Estado del artículo
              <select className="field">
                <option>Nuevo</option>
                <option>Usado — excelente</option>
                <option>Usado — muy bueno</option>
                <option>Usado — bueno</option>
                <option>Requiere reparación</option>
              </select>
            </label>
          </div>
          <label className="grid gap-1.5 text-sm font-semibold">
            Descripción y detalles
            <textarea className="field min-h-28" placeholder="Marca, tamaño, accesorios incluidos, años de uso…" />
          </label>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input required type="checkbox" className="mt-0.5" />
            Acepto la verificación técnica y el acuerdo de custodia en bodega antes de publicar.
          </label>
          <button type="submit" className="btn-gold">
            Enviar registro
          </button>
          {enviado && (
            <p className="rounded-md border border-gold/40 bg-secondary p-3 text-sm">
              ¡Gracias! Recibimos tu registro (demostración). Te contactaríamos en 24 horas para coordinar la verificación.
            </p>
          )}
        </form>

        <aside className="surface-coffee h-fit rounded-xl p-8">
          <h2 className="text-2xl text-cream">Transparencia total</h2>
          <ul className="mt-4 grid gap-3 text-sm text-cream/80">
            <li>• Ficha fotográfica firmada al recibir tu artículo en bodega.</li>
            <li>• Seguro básico contra daños durante la custodia y el transporte.</li>
            <li>• Depósito reembolsable a cargo de quien alquila, no del propietario.</li>
            <li>• Comisión clara del 15% sobre cada venta o mes de alquiler.</li>
            <li>• Puedes retirar tu instrumento cuando quieras, avisando 15 días antes.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
