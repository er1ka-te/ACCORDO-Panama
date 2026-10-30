import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/lib/experience-store";

export function AnnouncementBanner() {
  const { state } = useExperience();
  const anuncios = state.anuncios.filter(a => a.activo);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || anuncios.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setIndex(i => (i + 1) % anuncios.length), 6000);
    return () => window.clearInterval(interval);
  }, [paused, anuncios.length]);
  const anuncio = anuncios[index % Math.max(1, anuncios.length)];
  if (!anuncio) return null;
  const move = (delta: number) => setIndex(i => (i + delta + anuncios.length) % anuncios.length);
  return <section aria-label="Anuncios de la comunidad" aria-roledescription="carrusel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} className="relative isolate min-h-80 overflow-hidden surface-coffee">
    <img key={anuncio.id} src={anuncio.imagen} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="absolute inset-0 -z-10 bg-coffee/75" />
    <div className="shell flex min-h-80 flex-col justify-center gap-4 py-12 pb-20">
      <p className="eyebrow">Comunidad ACCORDO · {index % anuncios.length + 1} / {anuncios.length}</p>
      <h2 className="max-w-2xl text-3xl text-cream md:text-4xl">{anuncio.titulo}</h2>
      <p className="max-w-xl text-sm text-cream/80">{anuncio.detalle}</p>
      <Button asChild variant="gold" className="self-start"><Link to={anuncio.destino}>Ver más</Link></Button>
    </div>
    <div className="shell absolute inset-x-0 bottom-5 flex items-center justify-between gap-3">
      <div className="flex gap-1">{anuncios.map((a, i) => <Button key={a.id} variant={i === index % anuncios.length ? "gold" : "outline"} size="icon" aria-label={`Anuncio ${i + 1}`} aria-current={i === index % anuncios.length ? "true" : undefined} onClick={() => setIndex(i)}>{i + 1}</Button>)}</div>
      <div className="flex gap-1"><Button variant="gold" size="icon" aria-label="Anuncio anterior" onClick={() => move(-1)}><ChevronLeft /></Button><Button variant="gold" size="icon" aria-label={paused ? "Reanudar anuncios" : "Pausar anuncios"} onClick={() => setPaused(p => !p)}>{paused ? <Play /> : <Pause />}</Button><Button variant="gold" size="icon" aria-label="Anuncio siguiente" onClick={() => move(1)}><ChevronRight /></Button></div>
    </div>
  </section>;
}