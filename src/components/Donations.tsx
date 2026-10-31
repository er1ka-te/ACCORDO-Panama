import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ESCUELAS, IMAGENES } from "@/lib/data";
import { donationSchema, confirmations } from "@/lib/experience";
import { useExperience } from "@/lib/experience-store";
export function Donations() {
  const { state, update, addToCart } = useExperience();
  const [destino, setDestino] = useState<"Fundación" | "Comunidad">("Fundación");
  const [titulo, setTitulo] = useState(""); const [descripcion, setDescripcion] = useState(""); const [fundacion, setFundacion] = useState("");
  const [message, setMessage] = useState(""); const [error, setError] = useState("");
  return <div className="shell py-14"><p className="eyebrow">Apoya la música</p><h1 className="mt-2 text-4xl">Donaciones de instrumentos</h1><div className="mt-8 flex flex-wrap gap-3">{(["Fundación", "Comunidad"] as const).map(d => <Button key={d} variant={destino === d ? "gold" : "outline"} aria-pressed={destino === d} onClick={() => { setDestino(d); setMessage(""); }}>{d === "Fundación" ? "Donar a fundaciones" : "Donar a la comunidad"}</Button>)}</div>
    <div className="mt-8 grid gap-8 lg:grid-cols-2"><form className="space-y-5" onSubmit={e => {
      e.preventDefault(); setError("");
      const parsed = donationSchema.safeParse({ id: crypto.randomUUID(), titulo, descripcion, destino, fundacion, estado: destino === "Fundación" ? "Pendiente de evaluación" : "Disponible" });
      if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Revisa los datos."); return; }
      update(s => ({ ...s, donaciones: [parsed.data, ...s.donaciones] })); setMessage(confirmations.Donación); setTitulo(""); setDescripcion("");
    }}><h2 className="text-2xl">Ofrecer un instrumento</h2><p className="text-sm text-muted-foreground">{destino === "Fundación" ? "ACCORDO prepara el contacto desde el panel. La fundación evalúa si acepta el instrumento." : "Se publicará gratuitamente para estudiantes, con verificación educativa antes de solicitarlo."}</p>
      <label className="grid gap-2 text-sm font-semibold">Instrumento<input required minLength={3} maxLength={100} value={titulo} onChange={e => setTitulo(e.target.value)} className="field" /></label><label className="grid gap-2 text-sm font-semibold">Estado y descripción<textarea required minLength={10} maxLength={1000} value={descripcion} onChange={e => setDescripcion(e.target.value)} className="field" /></label>
      {destino === "Fundación" && <label className="grid gap-2 text-sm font-semibold">Fundación<select required className="field" value={fundacion} onChange={e => setFundacion(e.target.value)}><option value="">Selecciona una fundación</option>{ESCUELAS.filter(e => e.tipo === "Fundación y red oficial").map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}</select></label>}
      <Button type="submit" variant="gold">Confirmar donación</Button>{error && <p role="alert" className="text-destructive">{error}</p>}{message && <div role="status"><p>{message}</p><p className="mt-2 text-xs text-muted-foreground">Registro demostrativo guardado en este navegador. {destino === "Fundación" ? "Pendiente de evaluación; no se envió ninguna notificación." : "Disponible para solicitudes educativas."}</p></div>}
    </form><section><h2 className="text-2xl">Disponibles para la comunidad</h2><div className="mt-4 grid gap-4">{state.donaciones.filter(d => d.destino === "Comunidad" && d.estado === "Disponible").map(d => <article key={d.id} className="rounded-lg border border-border bg-card p-5"><h3 className="text-xl">{d.titulo}</h3><p className="my-3 text-sm text-muted-foreground">{d.descripcion}</p><p className="mb-4 font-semibold">Gratis · fines educativos</p><Button asChild variant="gold" onClick={() => addToCart({ id: d.id, titulo: d.titulo, imagen: IMAGENES.Cuerda, opcion: "Donación comunitaria", modalidad: "Donación", precio: 0 })}><Link to="/checkout">Solicitar y verificar</Link></Button></article>)}<Button asChild variant="outline"><Link to="/catalogo">Ver donaciones del catálogo</Link></Button></div></section></div>
  </div>;
}