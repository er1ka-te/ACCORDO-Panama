import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/lib/experience-context";

export function AnnouncementBanner() {
  const { state } = useExperience();
  const anuncios = state.anuncios.filter(a => a.activo);
  const [carouselRef, carousel] = useEmblaCarousel({ align: "center", loop: true });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!carousel || hovered || focused || anuncios.length < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: number | undefined;
    const update = () => {
      window.clearInterval(interval);
      if (!motion.matches) interval = window.setInterval(() => carousel.scrollNext(), 2200);
    };
    update();
    motion.addEventListener("change", update);
    return () => { window.clearInterval(interval); motion.removeEventListener("change", update); };
  }, [carousel, hovered, focused, anuncios.length]);
  if (!anuncios.length) return null;
  return <section aria-label="Anuncios de la comunidad" aria-roledescription="carrusel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} className="announcement-carousel relative isolate py-6">
    <div className="announcement-viewport" ref={carouselRef}>
      <div className="announcement-track">
        {anuncios.map((anuncio, i) => <div key={anuncio.id} className="announcement-slide" role="group" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${anuncios.length}`}>
          <img src={anuncio.imagen} alt={anuncio.titulo} className="announcement-image" draggable={false} />
        </div>)}
      </div>
    </div>
    {anuncios.length > 1 && <><Button variant="ghost" size="icon" className="announcement-arrow announcement-arrow-left" aria-label="Anuncio anterior" onClick={() => carousel?.scrollPrev()}><ChevronLeft /></Button><Button variant="ghost" size="icon" className="announcement-arrow announcement-arrow-right" aria-label="Anuncio siguiente" onClick={() => carousel?.scrollNext()}><ChevronRight /></Button></>}
  </section>;
}