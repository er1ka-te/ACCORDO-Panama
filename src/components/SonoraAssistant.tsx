import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkle } from "lucide-react";
import { ESCUELAS, FAQS, PRODUCTOS_SEED, formatPrecio } from "@/lib/data";
import { SITE } from "@/lib/site";

type Msg = { role: "bot" | "user"; text: string };

const SUGERENCIAS = [
  "Tengo $30, ¿qué me recomiendas?",
  "¿Cómo mido el brazo para violín?",
  "¿Qué es un intervalo musical?",
  "¿Qué cuesta una clase particular?",
];

/** Tutor musical local con respuestas orientativas; no realiza consultas remotas. */
function responder(input: string): string {
  const t = input.toLowerCase();
  const monto = Number(t.match(/(?:\$|presupuesto(?: de)?\s*)(\d+)/)?.[1] ?? NaN);

  if (/(brazo|medida|talla|tamaño|3\/4|4\/4)/.test(t)) {
    return "Para medir: extiende el brazo izquierdo sin tensarlo, desde la base del cuello hasta la mitad de la palma. Como referencia para violín, 56–60 cm suele corresponder a 3/4 y 60 cm o más a 4/4. En viola también importa la longitud del cuerpo (p. ej. 15.5 pulgadas); comprueba que puedas abrazar la voluta cómodamente y pide evaluación a tu profesor o luthier antes de elegir.";
  }

  if (/(intervalo|escala|acorde|armonía|armonia|compás|compas|ritmo|nota musical|teoría|teoria)/.test(t)) {
    if (/intervalo/.test(t)) return "Un intervalo es la distancia entre dos notas. Por ejemplo, de Do a Mi hay una tercera mayor; de Do a Sol, una quinta justa. Practica cantando ambas notas y reconociendo su distancia al oído.";
    if (/acorde|armon/.test(t)) return "Un acorde combina notas simultáneas. Una tríada mayor se construye con raíz, tercera mayor y quinta justa: Do–Mi–Sol. Una tríada menor baja la tercera: Do–Mi♭–Sol.";
    if (/compás|compas|ritmo/.test(t)) return "El compás agrupa pulsos: 4/4 tiene cuatro tiempos por compás y la negra vale un tiempo. Cuenta 1–2–3–4 con un metrónomo lento, acentuando el primero.";
    return "La escala mayor sigue el patrón tono–tono–semitono–tono–tono–tono–semitono. En Do mayor se toca Do–Re–Mi–Fa–Sol–La–Si–Do. ¿Quieres practicar intervalos, acordes o ritmo?";
  }

  if (/(niño|niña|edad|años|elegir|recomien|instrumento para)/.test(t) && Number.isNaN(monto)) {
    return "Para principiantes pequeños, violín en talla adecuada, flauta dulce o teclado suelen ser accesibles. Para adolescentes, viola, chelo, trompeta o piano dependen más del interés y del espacio de práctica que de la edad. Si el presupuesto es limitado, prueba un alquiler mensual o una donación y consulta programas de la Red de Orquestas. Dime la edad y el presupuesto para afinar la sugerencia.";
  }

  if (/(clase|profesor|academia|red de orquestas|costo|tarifa)/.test(t)) {
    return "Las clases particulares del directorio se muestran como ejemplos de $20–$35 por hora, con atención individual. Las academias privadas cobran según plan y sede: pide una cotización actual. La Red de Orquestas y las fundaciones tienen programas sujetos a cupos y convocatoria; consulta requisitos y costos directamente antes de inscribirte.";
  }

  if (!Number.isNaN(monto)) {
    const opciones = PRODUCTOS_SEED.filter((p) => p.precio <= monto && p.familia !== "Accesorios").slice(0, 3);
    if (opciones.length) {
      return `Con un presupuesto de $${monto} puedes empezar con:\n\n${opciones
        .map((p) => `• ${p.titulo} — ${formatPrecio(p)} (${p.modalidad})`)
        .join("\n")}\n\nSi es para clases, el alquiler mensual suele ser la opción más liviana.`;
    }
    return `Con $${monto} puedes revisar donaciones en $0 y consultar los programas de la Red de Orquestas, sujetos a cupos.`;
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
    return `El directorio muestra ${ESCUELAS.length} opciones entre fundaciones, academias y perfiles ilustrativos de profesores. Para costos reales y cupos, contacta directamente a cada institución.`;
  }

  if (/(libro|partitura|pdf|digital)/.test(t)) {
    return "En Libros y Partituras puedes elegir formato físico o digital. La vista previa PDF es demostrativa; los archivos completos requieren autorización de derechos y aún no se entregan desde esta web.";
  }

  if (/(hola|buenas|saludos|hey)/.test(t)) {
    return `¡Hola! Soy el Asistente Musical de ${SITE.name}. Cuéntame tu instrumento de interés y tu presupuesto, y te armo una recomendación.`;
  }

  const faq = FAQS.find((f) =>
    f.q.toLowerCase().split(" ").some((w) => w.length > 5 && t.includes(w)),
  );
  if (faq) return faq.a;

  return "Puedo orientarte sobre teoría musical, medidas de violín y viola, elección de instrumentos, alquileres y opciones de clases en Panamá. Cuéntame qué quieres aprender.";
}

export function SonoraAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "¡Bienvenido a ACCORDO! Pregúntame sobre teoría musical, medidas de instrumentos, presupuesto o clases en Panamá.",
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
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section className="flex h-[min(26rem,calc(100dvh-5rem))] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-xl border border-gold/30 bg-card shadow-[var(--shadow-gold)]">
          <header className="surface-coffee flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-display text-lg leading-tight text-cream">Asistente ACCORDO</p>
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
