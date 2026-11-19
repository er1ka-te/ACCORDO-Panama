import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Music,
  HandHeart,
  Landmark,
  ArrowRight,
  ChevronDown,
  RotateCw,
} from "lucide-react";

type CardId = "modulos" | "voluntarios" | "donaciones";

interface ExpandedBlock {
  label: string;
  text: string;
}

interface HubItem {
  id: CardId;
  badge: string;
  title: string;
  shortDesc: string;
  imageBg: string;
  imageAlt: string;
  solidColorClass: string;
  expandedTitle: string;
  expandedContent: ExpandedBlock[];
  ctaLabel?: string;
  ctaTo?: "/estudio";
}

const HUB_ITEMS: HubItem[] = [
  {
    id: "modulos",
    badge: "100% Gratuitos",
    title: "Módulos de aprendizaje",
    shortDesc:
      "Formación musical interactiva con ruta guiada desde tus primeros pasos.",
    imageBg: "/modulos-bg.jpg",
    imageAlt: "Estudiante practicando teoría y lectura musical",
    solidColorClass: "bg-[#3B281E] text-cream border-[#7A583B]",
    expandedTitle: "¿Cómo funcionan los módulos de estudio?",
    expandedContent: [
      {
        label: "1. Prueba inicial",
        text: "Primero se realiza una prueba corta para conocer tu punto de partida, tu familiaridad con la música y el ritmo de estudio que mejor se adapta a ti.",
      },
      {
        label: "2. Avance por módulos",
        text: "Con base en esa prueba entras a los módulos gratuitos de lectura, ritmo y fundamentos musicales para avanzar de forma ordenada y sin costo.",
      },
    ],
    ctaLabel: "Ir a módulos de estudio",
    ctaTo: "/estudio",
  },
  {
    id: "voluntarios",
    badge: "Convocatoria abierta",
    title: "Voluntarios",
    shortDesc:
      "Revisión técnica, logística hacia provincias centrales y acompañamiento en entregas.",
    imageBg: "/voluntariado-entrega.jpg",
    imageAlt: "Persona entregando un instrumento musical a un estudiante",
    solidColorClass: "bg-[#4A3222] text-cream border-[#8C6D46]",
    expandedTitle: "¿Qué tipo de voluntarios buscamos?",
    expandedContent: [
      {
        label: "Revisión y mantenimiento técnico (lutería)",
        text: "Personas con conocimientos técnicos para inspeccionar, ajustar, calibrar y reparar instrumentos antes de listarlos en la plataforma, enviarlos a las provincias centrales o entregarlos a fundaciones.",
      },
      {
        label: "Transporte y logística",
        text: "Voluntarios que apoyen en el traslado seguro y embalaje adecuado de los instrumentos hasta los puntos de acopio, fundaciones o provincias centrales.",
      },
      {
        label: "Acompañamiento en entregas",
        text: "Equipo humano que acompañe las entregas presenciales a niños, jóvenes y organizaciones beneficiadas, cuidando el trato cercano y el registro del proceso.",
      },
    ],
  },
  {
    id: "donaciones",
    badge: "Aporte directo",
    title: "Donaciones",
    shortDesc:
      "Apoya el acceso musical mediante Yappy o transferencia a cuenta bancaria.",
    imageBg: "/donacion.png",
    imageAlt: "Apoyo musical y comunitario en Panamá",
    solidColorClass: "bg-[#2C1E16] text-cream border-[#6E5239]",
    expandedTitle: "Canales de aporte y destino de las donaciones",
    expandedContent: [
      {
        label: "Mensaje",
        text: "Cada aporte ayuda a que más estudiantes en Panamá tengan acceso a formación e instrumentos en buen estado sin que el costo sea una barrera.",
      },
      {
        label: "A dónde van las donaciones",
        text: "Se destinan a fundaciones musicales, escuelas comunitarias, proyectos formativos y entregas hacia las provincias centrales del país.",
      },
      {
        label: "Yappy (ejemplo panameño)",
        text: "Número: 6482-3910 — Nombre que te debe salir: Fundación Accordo Panamá",
      },
      {
        label: "Banco — Cuenta Corriente (ejemplo)",
        text: "Cuenta corriente: 03-45-01-884920-7 — A nombre de: Fundación Accordo Panamá",
      },
    ],
  },
];

export function RotatingHub() {
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<CardId | null>(null);

  useEffect(() => {
    if (hoveredId !== null) return;
    const timer = window.setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % HUB_ITEMS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [hoveredId]);

  const handleRotateNext = () => {
    setCenterIndex((prev) => (prev + 1) % HUB_ITEMS.length);
  };

  const getSafeHubItem = (index: number): HubItem => {
    const found = HUB_ITEMS[index];
    if (found) return found;
    return HUB_ITEMS[0] as HubItem;
  };

  const leftIndex = (centerIndex + HUB_ITEMS.length - 1) % HUB_ITEMS.length;
  const rightIndex = (centerIndex + 1) % HUB_ITEMS.length;

  const orderedCards: { item: HubItem; position: "left" | "center" | "right" }[] = [
    { item: getSafeHubItem(leftIndex), position: "left" },
    { item: getSafeHubItem(centerIndex), position: "center" },
    { item: getSafeHubItem(rightIndex), position: "right" },
  ];

  const renderIcon = (id: CardId, className = "h-5 w-5 text-gold") => {
    if (id === "modulos") return <Music className={className} />;
    if (id === "voluntarios") return <HandHeart className={className} />;
    return <Landmark className={className} />;
  };

  return (
    <section className="shell py-14">
      <style>{`
        @keyframes hubFloatLeft {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-7px) rotate(0.8deg); }
        }
        @keyframes hubFloatRight {
          0%, 100% { transform: translateY(-6px) rotate(1deg); }
          50% { transform: translateY(2px) rotate(-0.8deg); }
        }
        .hub-side-left {
          animation: hubFloatLeft 4.2s ease-in-out infinite;
        }
        .hub-side-right {
          animation: hubFloatRight 4.6s ease-in-out infinite;
        }
      `}</style>

      <div className="rounded-3xl border border-border bg-cream/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Explora ACCORDO</p>
            <h2 className="mt-2 text-3xl md:text-4xl">
              Aprende, súmate como voluntario o dona
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Las tarjetas rotan automáticamente. La del centro muestra su imagen
              y, al pasar el cursor, despliega más información.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRotateNext}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground shadow-[0_6px_18px_rgba(0,0,0,0.14)] transition hover:border-gold hover:bg-cream sm:self-auto"
          >
            <RotateCw className="h-3.5 w-3.5 text-gold" />
            <span>Rotar posición</span>
          </button>
        </div>

        <div className="mt-8 grid items-center gap-6 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
          {orderedCards.map(({ item, position }) => {
            const isCenter = position === "center";
            const isExpanded = isCenter && hoveredId === item.id;

            if (!isCenter) {
              return (
                <article
                  key={item.id}
                  onClick={() => {
                    const realIdx = HUB_ITEMS.findIndex((x) => x.id === item.id);
                    if (realIdx !== -1) setCenterIndex(realIdx);
                  }}
                  className={`${item.solidColorClass} ${
                    position === "left" ? "hub-side-left" : "hub-side-right"
                  } flex min-h-[210px] cursor-pointer flex-col items-center justify-between rounded-3xl border p-6 text-center shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_22px_44px_rgba(0,0,0,0.36)]`}
                >
                  <span className="rounded-full bg-black/25 px-3 py-1 text-[11px] tracking-wide text-cream/80">
                    Toca para centrar
                  </span>

                  <h3 className="my-4 text-lg font-semibold leading-snug text-cream">
                    {item.title}
                  </h3>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 shadow-inner">
                    {renderIcon(item.id, "h-5 w-5 text-gold")}
                  </div>
                </article>
              );
            }

            return (
              <article
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative overflow-hidden rounded-3xl border border-gold/75 bg-surface-coffee text-cream shadow-[0_25px_60px_rgba(0,0,0,0.38)] transition-all duration-500 lg:scale-[1.03]"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={item.imageBg}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-medium text-cream shadow-md backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-cream">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream/85">
                        {item.shortDesc}
                      </p>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {item.ctaTo && item.ctaLabel && (
                    <div className="mt-4">
                      <Link
                        to={item.ctaTo}
                        className="btn-gold inline-flex items-center gap-2 text-sm shadow-lg transition-transform hover:scale-105"
                      >
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isExpanded
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 rounded-2xl border border-white/15 bg-black/35 p-4 text-xs leading-relaxed text-cream/90 shadow-inner">
                        <p className="font-semibold uppercase tracking-wider text-gold">
                          {item.expandedTitle}
                        </p>
                        {item.expandedContent.map((block) => (
                          <div key={block.label} className="space-y-0.5">
                            <p className="font-semibold text-cream">
                              {block.label}:
                            </p>
                            <p className="text-cream/85">{block.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[11px] text-cream/70">
                      Pasa el cursor para ver detalles
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/30 shadow-md">
                      {renderIcon(item.id, "h-5 w-5 text-gold")}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}