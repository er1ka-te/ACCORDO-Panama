import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

interface HubRectItem {
  id: "modulos" | "donaciones" | "voluntarios";
  title: string;
  image: string;
  shortPhrase: string;
  hasTestLink?: boolean;
  to?: string;
}

const HUB_ITEMS: readonly HubRectItem[] = [
  {
    id: "modulos",
    title: "Módulos de estudio",
    image: "/modulos-bg.jpg",
    shortPhrase: "Descubre tu nivel y avanza en tu ruta musical.",
    hasTestLink: true,
    to: "/estudios",
  },
  {
    id: "donaciones",
    title: "Donaciones",
    image: "/donacion.png",
    shortPhrase: "Impulsa el traslado y entrega de instrumentos en Panamá.",
    hasTestLink: false,
  },
  {
    id: "voluntarios",
    title: "Voluntarios",
    image: "/voluntariado-entrega.png",
    shortPhrase: "Suma tu apoyo técnico, logístico y comunitario.",
    hasTestLink: false,
  },
] as const;

export function RotatingHub() {
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [hoveredId, setHoveredId] = useState<HubRectItem["id"] | null>(null);

  useEffect(() => {
    if (hoveredId !== null) return;

    const interval = window.setInterval(() => {
      setOrder((prev) => {
        const [first, ...rest] = prev;
        return first !== undefined ? [...rest, first] : [0, 1, 2];
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, [hoveredId]);

  const orderedItems: HubRectItem[] = order
    .map((idx) => HUB_ITEMS[idx])
    .filter((item): item is HubRectItem => item !== undefined);

  const renderExpandedPanel = (id: HubRectItem["id"]) => {
    if (id === "modulos") {
      return (
        <div className="space-y-3 text-left text-xs leading-relaxed text-[#3A1F0E]">
          <p className="font-serif text-base font-bold text-[#3A1F0E]">
            Módulos de Estudio
          </p>
          <p>
            <strong>1.</strong> Se realiza una prueba para verificar en qué nivel
            se encuentra la persona con su conocimiento en la música.
          </p>
          <p>
            <strong>2.</strong> Luego de pasar la prueba, automáticamente inicia
            los módulos de aprendizaje con una pequeña ruta de aprendizaje que se
            muestra en qué parte vas del módulo.
          </p>
          <div className="pt-1">
            <Link
              to="/estudio"
              className="inline-block rounded-lg bg-[#3A2314] px-4 py-2 text-xs font-semibold text-[#FAF6EE] transition hover:bg-[#5A3921]"
            >
              Iniciar Prueba
            </Link>
          </div>
        </div>
      );
    }

    if (id === "donaciones") {
      return (
        <div className="space-y-3 text-left text-xs leading-relaxed text-[#3A1F0E]">
          <p className="font-serif text-base font-bold text-[#3A1F0E]">
            Donaciones
          </p>
          <div className="rounded-lg bg-white/75 p-2.5">
            <p className="font-semibold text-[#5A3921]">Yappy</p>
            <p className="mt-0.5 flex flex-wrap items-center justify-between gap-2">
              <span>+507 6565-8090</span>
              <span className="font-semibold">Fundación ACCORDO</span>
            </p>
          </div>
          <div className="rounded-lg bg-white/75 p-2.5">
            <p className="font-semibold text-[#5A3921]">Cuenta de banco - Corriente</p>
            <p className="mt-0.5 flex flex-wrap items-center justify-between gap-2">
              <span>03-88-88-654321-0</span>
              <span className="font-semibold">ACCORDO Panamá</span>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2 text-left text-xs leading-snug text-[#3A1F0E]">
        <p className="font-serif text-base font-bold text-[#3A1F0E]">
          Voluntarios
        </p>
        <p>
          <strong>Técnico/a de Mantenimiento y Luthiería:</strong> Verifica,
          mantiene y repara instrumentos para que estén listos para usarse.
        </p>
        <p>
          <strong>Especialista de Logística e Inventario:</strong> Coordina el
          transporte, revisa la logística y lleva el control de inventario de los
          instrumentos.
        </p>
        <p>
          <strong>Embajador/a para Entregas:</strong> Lleva y reparte los
          instrumentos y mantiene la comunicación directa con las personas.
        </p>
      <p className="border-t border-[#5A3921]/20 pt-2 text-[11px] font-medium text-[#4A2E1B]">
          Escríbenos a nuestro contacto de ACCORDO Panamá para postularte.
        </p>
      </div>
    );
  };

  return (
    <section
      aria-label="Módulos de estudio, donaciones y voluntarios"
      className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <style>{`
        @keyframes hubRectMotionA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes hubRectMotionB {
          0%, 100% { transform: translateY(-4px); }
          50% { transform: translateY(3px); }
        }
        @keyframes glowingBoxDrift {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.01); }
        }
        .hub-card-motion-a {
          animation: hubRectMotionA 4.6s ease-in-out infinite;
        }
        .hub-card-motion-b {
          animation: hubRectMotionB 5.2s ease-in-out infinite;
        }
        .glowing-info-rect {
          animation: glowingBoxDrift 3.2s ease-in-out infinite;
          box-shadow: 0 0 24px rgba(255, 248, 224, 0.95), 0 10px 26px rgba(58, 35, 20, 0.22);
        }
      `}</style>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {orderedItems.map((item, idx) => {
          const isCenterCard = idx === 1;
          const isHovered = hoveredId === item.id;
          const cardMotionClass =
            idx % 2 === 0 ? "hub-card-motion-a" : "hub-card-motion-b";

          const baseSurfaceClass = isCenterCard
            ? "bg-[#4A2E1B] text-[#FAF6EE] border-[#8C5A32]/40 shadow-[0_10px_24px_rgba(74,46,27,0.28)]"
            : "bg-[#EFE7D6] text-[#3A1F0E] border-[#5A3921]/20 shadow-[0_10px_24px_rgba(90,57,33,0.16)]";

          return (
            <article
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative flex h-[340px] flex-col overflow-hidden rounded-xl border transition-all duration-300 ${baseSurfaceClass} ${cardMotionClass}`}
            >
              {/* Imagen grande arriba */}
              <div className="h-52 w-full shrink-0 overflow-hidden bg-[#2C1A0E]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Espacio inferior más pequeño con título y una frase corta */}
              <div className="flex flex-1 flex-col justify-center px-4 py-2.5 text-center">
                <h3
                  className={`font-serif text-base font-bold ${
                    isCenterCard ? "text-[#FAF6EE]" : "text-[#3A1F0E]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-1 line-clamp-2 text-xs leading-snug ${
                    isCenterCard ? "text-[#FAF6EE]/85" : "text-[#4A2E1B]"
                  }`}
                >
                  {item.shortPhrase}
                </p>
              </div>

              {/* Rectángulo brillante desplegable al pasar el cursor */}
              {isHovered && (
                <div
                  className="glowing-info-rect pointer-events-auto absolute inset-2 z-20 flex flex-col justify-center overflow-y-auto rounded-xl border border-white bg-[#FFFDF7]/95 p-4 backdrop-blur-xs"
                >
                  {renderExpandedPanel(item.id)}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}