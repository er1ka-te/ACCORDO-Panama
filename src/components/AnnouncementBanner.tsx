import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// AQUÍ SOLO CAMBIAS LA RUTA DE CADA FOTO CUANDO LA SUBAS A public/fotos/
const ANUNCIOS_CARRUSEL = [
  {
    id: "anuncio-1",
    titulo: "Anuncio 1",
    imagen: "/fotos/anuncio-1.png",
    activo: true,
  },
  {
    id: "anuncio-2",
    titulo: "Anuncio 2",
    imagen: "/fotos/anuncio-2.jpg",
    activo: true,
  },
  {
    id: "anuncio-3",
    titulo: "Anuncio 3",
    imagen: "/fotos/anuncio-3.jpg",
    activo: true,
  },
];

export function AnnouncementBanner() {
  const anuncios = ANUNCIOS_CARRUSEL.filter((a) => a.activo);
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
    return () => {
      window.clearInterval(interval);
      motion.removeEventListener("change", update);
    };
  }, [carousel, hovered, focused, anuncios.length]);

  if (!anuncios.length) return null;

  return (
    <section
      aria-label="Anuncios de la comunidad"
      aria-roledescription="carrusel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      className="announcement-carousel relative isolate py-6"
    >
      <div className="announcement-viewport" ref={carouselRef}>
        <div className="announcement-track">
          {anuncios.map((anuncio, i) => (
            <div
              key={anuncio.id}
              className="announcement-slide"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${anuncios.length}`}
            >
              <img
                src={anuncio.imagen}
                alt={anuncio.titulo}
                className="announcement-image"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      {anuncios.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="announcement-arrow announcement-arrow-left"
            aria-label="Anuncio anterior"
            onClick={() => carousel?.scrollPrev()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="announcement-arrow announcement-arrow-right"
            aria-label="Anuncio siguiente"
            onClick={() => carousel?.scrollNext()}
          >
            <ChevronRight />
          </Button>
        </>
      )}
    </section>
  );
}
