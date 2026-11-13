import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, X, Sparkle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { askAria } from "@/lib/aria.functions";
import { ARIA_AVATAR_URL } from "@/lib/image-config";
import { useDraggableLauncher } from "@/hooks/use-draggable-launcher";
type Msg = { role: "bot" | "user"; text: string; error?: boolean };
const SUGERENCIAS = ["¿Cómo mido el brazo para violín?", "¿Qué es un intervalo musical?", "¿Cómo practico el ritmo?"];
export function AIChat() {
  const launcher = useDraggableLauncher();
  const [open, setOpen] = useState(false); const [input, setInput] = useState(""); const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "¡Hola! Soy Aria. ¿Qué quieres aprender o practicar hoy?" }]);
  const sendQuestion = useServerFn(askAria);
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { if (open) endRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" }); }, [msgs, open, busy]);
  const enviar = async (texto: string) => {
    const question = texto.trim(); if (!question || question.length > 1000 || busy) return;
    setMsgs(m => [...m, { role: "user", text: question }]); setInput(""); setBusy(true);
    try { const result = await sendQuestion({ data: { question } }); setMsgs(m => [...m, { role: "bot", text: result.error || result.text, error: Boolean(result.error) }]); }
    catch { setMsgs(m => [...m, { role: "bot", text: "No se pudo conectar con Aria. Tu consulta no se reenviará automáticamente.", error: true }]); }
    finally { setBusy(false); }
  };
  const avatar = ARIA_AVATAR_URL ? <img src={ARIA_AVATAR_URL} alt="Aria" className="h-8 w-8 shrink-0 rounded-full object-cover" /> : <Sparkle className="h-5 w-5 shrink-0" />;
  return <div className="fixed bottom-20 right-3 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
    {open && <section aria-label="Chat con Aria" className="flex h-[min(26rem,calc(100dvh-5rem))] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-xl border border-gold/30 bg-card shadow-[var(--shadow-gold)]">
      <header className="surface-coffee flex items-center justify-between gap-3 px-4 py-3"><div className="flex items-center gap-3">{avatar}<p className="font-display text-lg leading-tight text-cream">Aria</p></div><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar asistente"><X className="text-cream" /></Button></header>
      <div role="log" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">{msgs.map((m, i) => <div key={i} className={`max-w-[85%] break-words whitespace-pre-line rounded-lg px-3 py-2 text-sm ${m.error ? "border border-destructive text-destructive" : m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "border border-border bg-secondary text-foreground"}`}>{m.text}</div>)}{busy && <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />Aria está preparando tu respuesta…</p>}<div ref={endRef} /></div>
      <div className="flex flex-wrap gap-1.5 px-3 pb-2">{SUGERENCIAS.map(s => <Button key={s} variant="outline" disabled={busy} onClick={() => void enviar(s)} className="h-auto whitespace-normal rounded-full px-2.5 py-1 text-[0.7rem]">{s}</Button>)}</div>
      <form className="flex items-center gap-2 border-t border-border p-3" onSubmit={e => { e.preventDefault(); void enviar(input); }}><input maxLength={1000} value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe tu pregunta…" className="field min-w-0" aria-label="Mensaje para Aria" /><Button type="submit" variant="gold" size="icon" disabled={busy || !input.trim()} aria-label="Enviar"><Send /></Button></form>
    </section>}
    <div ref={launcher.anchorRef} className="aria-launcher fixed bottom-20 right-3 sm:bottom-6 sm:right-6" style={launcher.position ? { left: launcher.position.x, top: launcher.position.y, right: "auto", bottom: "auto" } : undefined}>
      <Button {...launcher.pointerHandlers} variant="gold" aria-expanded={open} aria-label={open ? "Cerrar Aria" : "Abrir Aria"} onClick={event => { if (event.detail !== 0 && launcher.consumeDragClick()) return; setOpen(v => !v); }} data-dragging={launcher.dragging} className="aria-launcher-button h-auto touch-none select-none rounded-full py-3 pl-3 pr-5">{avatar}<span>{open ? "Cerrar" : "Aria"}</span></Button>
    </div>
  </div>;
}