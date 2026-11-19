import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// AQUÍ SOLO CAMBIAS LA RUTA DE CADA FOTO CUANDO LA SUBAS A public/fotos/
const ANUNCIOS_CARRUSEL = [
  {
    id: "anuncio-1",
    titulo: "Anuncio 1",
    imagen: "/anuncio-1.png",
    activo: true,
  },
  {
    id: "anuncio-2",
    titulo: "Anuncio 2",
    imagen: "/anuncio-2.png",
    activo: true,
  },
  {
    id: "anuncio-3",
    titulo: "Anuncio 3",
    imagen: "/anuncio-3.png",
    activo: true,
  },
  {
    id: "anuncio-4",
    titulo: "Anuncio 4",
    imagen: "/anuncio-4.png",
    activo: true,
  },
  {
    id: "anuncio-5",
    titulo: "Anuncio 5",
    imagen: "/anuncio-5.png",
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
      {/* Franja beige de fondo detrás de los anuncios */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-44 -translate-y-1/2 bg-[#e8dfd3]/80"
      />

      <div className="announcement-viewport relative z-10" ref={carouselRef}>
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
            className="announcement-arrow announcement-arrow-left z-20"
            aria-label="Anuncio anterior"
            onClick={() => carousel?.scrollPrev()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="announcement-arrow announcement-arrow-right z-20"
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
