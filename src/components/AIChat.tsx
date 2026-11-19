import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ARIA_AVATAR_URL } from "@/lib/image-config";
import { useDraggableLauncher } from "@/hooks/use-draggable-launcher";

type Msg = { role: "bot" | "user"; text: string; error?: boolean };

const SUGERENCIAS = [
  "¿Cómo mido el brazo para violín?",
  "¿Qué es un intervalo musical?",
  "¿Cómo practico el ritmo?",
];

const RESPUESTAS_ESTANDAR: { claves: string[]; respuesta: string }[] = [
  {
    claves: ["brazo", "medir", "talla", "tamano", "tamaño", "violin", "violín", "viola", "cello", "violonchelo", "contrabajo"],
    respuesta:
      "Para medir el brazo y elegir talla en cuerdas: extiende el brazo hacia un lado con la palma hacia arriba y mide desde la base del cuello (centro) hasta el centro de la palma.\n• Violín: 43–47 cm (1/4), 48–52 cm (1/2), 53–56 cm (3/4), 57+ cm (4/4).\n• Viola: se mide en pulgadas (ej. 12\" a 16.5\"+) según largo de brazo y edad.\n• Violonchelo y contrabajo: revisa la guía de tallas en el catálogo según estatura/brazo y edad.",
  },
  {
    claves: ["intervalo", "distancia", "semitono", "tono", "tercera", "quinta", "octava"],
    respuesta:
      "Un intervalo musical es la distancia entre dos notas.\n• Puede ser melódico (las notas suenan una tras otra) o armónico (suenan juntas).\n• Se mide por número (segunda, tercera, cuarta, quinta, octava…) y por calidad (mayor, menor, justa, aumentada o disminuida).\n• Tip: asocia cada intervalo con el inicio de una canción conocida para reconocerlo de oído.",
  },
  {
    claves: ["ritmo", "practicar", "metronomo", "metrónomo", "compas", "compás", "pulso", "tiempo"],
    respuesta:
      "Para practicar el ritmo:\n1. Empieza con metrónomo lento (60–70 BPM) marcando el pulso estable.\n2. Golpea o cuenta en voz alta las figuras antes de tocar con el instrumento.\n3. Divide los compases difíciles en fragmentos de 2 o 4 tiempos y sube la velocidad poco a poco cuando salga limpio.",
  },
  {
    claves: ["alquiler", "comprar", "compra", "donacion", "donación", "precio", "catalogo", "catálogo", "shop"],
    respuesta:
      "En ACCORDO puedes explorar instrumentos, métodos, partituras y accesorios en el catálogo según su modalidad:\n• Alquiler: ideal para estudiantes que están creciendo o probando un instrumento.\n• Venta: compra directa con precio indicado.\n• Donación: recursos disponibles ($0) para apoyo musical estudiantil.",
  },
  {
    claves: ["estudio", "practica", "práctica", "empezar", "principiante", "partitura", "afinacion", "afinación"],
    respuesta:
      "Para una buena sesión de estudio:\n• Dedica 20–30 minutos diarios constantes en lugar de muchas horas un solo día.\n• Comienza con calentamiento, afinación y postura cómoda.\n• Termina tocando una pieza o escala que disfrutes para mantener la motivación.",
  },
];

function responderLocalmente(pregunta: string): string {
  const limpia = pregunta
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (/^(hola|buenas|hey|que tal|qué tal|saludos)/.test(limpia.trim())) {
    return "¡Hola! Soy Aria, tu asistente en ACCORDO. Puedo ayudarte con cómo medir el brazo para cuerdas, qué es un intervalo musical, cómo practicar el ritmo, modalidades de alquiler/compra/donación o rutinas de estudio. ¿Qué quieres consultar?";
  }

  let mejorMatch: { puntaje: number; respuesta: string } = {
    puntaje: 0,
    respuesta:
      "Puedo ayudarte con estas 5 consultas frecuentes:\n1. Cómo medir el brazo y elegir talla para instrumentos de cuerda.\n2. Qué es un intervalo musical.\n3. Cómo practicar el ritmo con metrónomo.\n4. Cómo funcionan alquiler, compra y donaciones en ACCORDO.\n5. Consejos de práctica y estudio diario.\n\nToca uno de los botones de sugerencia o escríbeme sobre alguno de esos temas.",
  };

  for (const item of RESPUESTAS_ESTANDAR) {
    let puntaje = 0;
    for (const clave of item.claves) {
      const claveSinTilde = clave
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (limpia.includes(claveSinTilde)) {
        puntaje += 1;
      }
    }
    if (puntaje > mejorMatch.puntaje) {
      mejorMatch = { puntaje, respuesta: item.respuesta };
    }
  }

  return mejorMatch.respuesta;
}

export function AIChat() {
  const launcher = useDraggableLauncher();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "¡Hola! Soy Aria. ¿Qué quieres aprender o practicar hoy?" },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
  }, [msgs, open, busy]);

  const enviar = (texto: string) => {
    const question = texto.trim();
    if (!question || question.length > 1000 || busy) return;
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setBusy(true);

    window.setTimeout(() => {
      const respuesta = responderLocalmente(question);
      setMsgs((m) => [...m, { role: "bot", text: respuesta }]);
      setBusy(false);
    }, 220);
  };

  const avatar = ARIA_AVATAR_URL ? (
    <img src={ARIA_AVATAR_URL} alt="Aria" className="h-8 w-8 shrink-0 rounded-full object-cover" />
  ) : (
    <Sparkle className="h-5 w-5 shrink-0" />
  );

  return (
    <div className="fixed bottom-20 right-3 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="Chat con Aria"
          className="flex h-[min(26rem,calc(100dvh-5rem))] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-xl border border-gold/30 bg-card shadow-[var(--shadow-gold)]"
        >
          <header className="surface-coffee flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              {avatar}
              <p className="font-display text-lg leading-tight text-cream">Aria</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar asistente">
              <X className="text-cream" />
            </Button>
          </header>

          <div role="log" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] break-words whitespace-pre-line rounded-lg px-3 py-2 text-sm ${
                  m.error
                    ? "border border-destructive text-destructive"
                    : m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "border border-border bg-secondary text-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
            {busy && (
              <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                Aria está preparando tu respuesta…
              </p>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {SUGERENCIAS.map((s) => (
              <Button
                key={s}
                variant="outline"
                disabled={busy}
                onClick={() => enviar(s)}
                className="h-auto whitespace-normal rounded-full px-2.5 py-1 text-[0.7rem]"
              >
                {s}
              </Button>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              enviar(input);
            }}
          >
            <input
              maxLength={1000}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="field min-w-0"
              aria-label="Mensaje para Aria"
            />
            <Button type="submit" variant="gold" size="icon" disabled={busy || !input.trim()} aria-label="Enviar">
              <Send />
            </Button>
          </form>
        </section>
      )}

      <div
        ref={launcher.anchorRef}
        className="aria-launcher fixed bottom-20 right-3 sm:bottom-6 sm:right-6"
        style={
          launcher.position
            ? { left: launcher.position.x, top: launcher.position.y, right: "auto", bottom: "auto" }
            : undefined
        }
      >
        <Button
          {...launcher.pointerHandlers}
          variant="gold"
          aria-expanded={open}
          aria-label={open ? "Cerrar Aria" : "Abrir Aria"}
          onClick={(event) => {
            if (event.detail !== 0 && launcher.consumeDragClick()) return;
            setOpen((v) => !v);
          }}
          data-dragging={launcher.dragging}
          className="aria-launcher-button h-auto touch-none select-none rounded-full py-3 pl-3 pr-5"
        >
          {avatar}
          <span>{open ? "Cerrar" : "Aria"}</span>
        </Button>
      </div>
    </div>
  );
}
