import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import instrumentsImage from "@/assets/impact-instruments.jpg";
import studyImage from "@/assets/impact-study.jpg";

function ViolaIcon() {
  return <svg viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block h-8 w-7 shrink-0 text-gold-deep">
    <path d="M14 3h4v12h-4zM12 4h8M12 8h8M12 15c-5-3-9 1-8 5 1 3 5 3 4 6-5 1-6 8-2 10 5 3 15 3 20-1 3-3 1-8-4-9-1-3 3-3 4-6 1-4-3-8-8-5M16 15v20M12 31h8M10 21c-3 2 1 4-1 6M22 21c3 2-1 4 1 6" />
  </svg>;
}

function ImpactCard({ reverse = false }: { reverse?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVisible(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <article ref={ref} data-visible={visible} className={`impact-card grid overflow-hidden rounded-lg border border-cream/40 text-foreground md:grid-cols-[2fr_3fr] ${reverse ? "impact-card-right md:grid-cols-[3fr_2fr]" : ""}`}>
    <img src={reverse ? studyImage : instrumentsImage} alt={reverse ? "Partituras, libros de estudio y un arco" : "Viola, arco y libros de música"} width={1024} height={1024} loading="lazy" className={`aspect-[4/3] h-full w-full object-cover md:aspect-auto ${reverse ? "md:order-2" : ""}`} />
    <div className="flex flex-col justify-center p-6 md:p-10">
      <h2 className="text-3xl italic leading-tight md:text-4xl">
        {reverse ? "¿Qué puedes ofrecer y encontrar?" : "¿Qué es ACCORDO?"}{" "}
        {reverse ? <ViolaIcon /> : <Heart aria-hidden="true" className="inline-block h-7 w-7 text-gold-deep" />}
      </h2>
      <p className="mt-5 text-base leading-relaxed">
        {reverse
          ? "Aceptamos todo tipo de instrumentos (cuerda, viento, percusión), accesorios (arcos, cuerdas, atriles), libros de teoría y partituras que se encuentren en buen estado. Nosotros ofrecemos el puente directo para conectar tus donaciones con estudiantes y fundaciones musicales, o la opción de publicar tus piezas para venta o alquiler accesible."
          : "Somos una plataforma y emprendimiento social que transforma el acceso a la música en Panamá. Facilitamos la donación directa de equipos a quienes más lo necesitan, pero también brindamos un espacio seguro para que las personas puedan vender o alquilar sus instrumentos usados a precios accesibles, generando un ingreso justo sin perder su inversión."}
      </p>
      {reverse && <Button asChild variant="gold" className="mt-6 h-auto self-start whitespace-normal"><Link to="/publicar">Ofrecer mi instrumento <ArrowRight aria-hidden="true" /></Link></Button>}
    </div>
  </article>;
}

export function ImpactCards() {
  return <section aria-label="ACCORDO y su impacto" className="shell grid gap-8 overflow-hidden py-12 md:py-16">
    <ImpactCard />
    <ImpactCard reverse />
  </section>;
}