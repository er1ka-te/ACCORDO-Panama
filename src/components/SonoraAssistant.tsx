import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkle } from "lucide-react";
import { ESCUELAS, FAQS, PRODUCTOS_SEED, formatPrecio } from "@/lib/data";
import { SITE } from "@/lib/site";

type Msg = { role: "bot" | "user"; text: string };

const SUGERENCIAS = [
  "Tengo $30, ¿qué me recomiendas?",
  "¿Cómo alquilo un violín?",
  "Quiero publicar mi instrumento",
  "Escuelas gratuitas en Panamá",
];

/** Asistente Musical Sonora: recomienda por presupuesto y responde dudas frecuentes. */
function responder(input: string): string {
  const t = input.toLowerCase();
  const monto = Number(t.match(/\$?\s?(\d+)/)?.[1] ?? NaN);

  if (!Number.isNaN(monto)) {
    const opciones = PRODUCTOS_SEED.filter((p) => p.precio <= monto).slice(0, 3);
    if (opciones.length) {
      return `Con un presupuesto de $${monto} puedes empezar con:\n\n${opciones
        .map((p) => `• ${p.titulo} — ${formatPrecio(p)} (${p.modalidad})`)
        .join("\n")}\n\nSi es para clases, el alquiler mensual suele ser la opción más liviana.`;
    }
    return `Con $${monto} aún no alcanza el alquiler más económico ($6/mes en partituras). Revisa la sección de donaciones: hay instrumentos y partituras en $0 con carta de tu escuela.`;
  }

  if (/(gratis|donaci|beca|fundaci)/.test(t)) {
    const gratis = ESCUELAS.filter((e) => e.costoMax === 0);
    return `Opciones sin costo:\n\n${gratis
      .map((e) => `• ${e.nombre} — ${e.ubicacion} (${e.planes})`)
      .join("\n")}\n\nTambién tenemos instrumentos donados en el catálogo, filtro "Gratuitos / Donaciones".`;
  }

  if (/(alquil|rent)/.test(t)) {
    return "Para alquilar: 1) filtra el catálogo por modalidad Alquiler, 2) abre el detalle y solicita el plan mensual, 3) firmamos el acuerdo y pagas el primer mes más un depósito reembolsable. Retiras en bodega o te lo enviamos a tu provincia.";
  }

  if (/(publicar|vender|poner|ofrecer)/.test(t)) {
    return "Para publicar tu instrumento o libro: llena el formulario en la sección Publicar. Verificamos el estado con un técnico aliado, lo recibimos en bodega con inventario fotográfico y desde ahí gestionamos entregas y pagos. Tú fijas el precio; nosotros la logística.";
  }

  if (/(escuela|academia|aprender|clase|profesor)/.test(t)) {
    return `Tenemos ${ESCUELAS.length} lugares en el directorio "Dónde aprender", desde fundaciones gratuitas en el Casco Antiguo hasta academias en Chiriquí y Coclé. Dime tu provincia y presupuesto y te sugiero una.`;
  }

  if (/(libro|partitura|pdf|digital)/.test(t)) {
    return "En Libros y Partituras hay material físico y digital. Los PDF se descargan al instante desde $4, y hay partituras panameñas liberadas en $0.";
  }

  if (/(hola|buenas|saludos|hey)/.test(t)) {
    return `¡Hola! Soy el Asistente Musical de ${SITE.name}. Cuéntame tu instrumento de interés y tu presupuesto, y te armo una recomendación.`;
  }

  const faq = FAQS.find((f) =>
    f.q.toLowerCase().split(" ").some((w) => w.length > 5 && t.includes(w)),
  );
  if (faq) return faq.a;

  return "Puedo ayudarte con: recomendaciones por presupuesto, cómo alquilar o comprar, cómo publicar tu instrumento y escuelas de música en Panamá. ¿Cuál de esos te interesa?";
}

export function SonoraAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "¡Bienvenido a Sonora! Dime tu presupuesto o el instrumento que buscas y te recomiendo opciones en Panamá.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const enviar = (texto: string) => {
    const t = texto.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    window.setTimeout(
      () => setMsgs((m) => [...m, { role: "bot", text: responder(t) }]),
      420,
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <section className="flex h-[26rem] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-xl border border-gold/30 bg-card shadow-[var(--shadow-gold)]">
          <header className="surface-coffee flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-display text-lg leading-tight text-cream">Asistente Musical</p>
              <p className="text-[0.7rem] uppercase tracking-widest text-gold">
                {SITE.name} · en línea
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">
              <X className="h-4 w-4 text-cream/80 transition-transform hover:scale-110" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "border border-border bg-secondary text-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {SUGERENCIAS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => enviar(s)}
                className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] font-semibold text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="field"
              aria-label="Mensaje para el asistente"
            />
            <button type="submit" className="btn-gold px-3 py-2.5" aria-label="Enviar">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full py-3 pl-3 pr-5 font-semibold text-coffee transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]"
        style={{ background: "var(--gradient-gold)" }}
      >
        <Sparkle className="h-5 w-5" />
        <span className="text-sm">{open ? "Cerrar" : "Asistente"}</span>
      </button>
    </div>
  );
}
