import { useEffect, useState } from "react";
import {
  Music,
  BookOpen,
  Sparkles,
  PartyPopper,
  Guitar,
  Headphones,
} from "lucide-react";

interface MuralPhoto {
  id: string;
  imageSrc: string;
  imageAlt: string;
  fullName: string;
  age: number;
  stageLabel: string;
  province: string;
  message: string;
  staggerClass: string;
  frameAccent: string;
}

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
}

const MURAL_PHOTOS: MuralPhoto[] = [
  {
    id: "mural-1",
    imageSrc: "/mural-1.png",
    imageAlt: "Niño de primaria sonriendo con su estuche de instrumento musical",
    fullName: "Mateo Castillo",
    age: 9,
    stageLabel: "Primaria",
    province: "Panamá",
    message:
      "¡Ahora puedo practicar mis notas todos los días y tocar canciones con mis amigos!",
    staggerClass: "lg:-translate-y-4",
    frameAccent: "border-rose-400 bg-rose-50",
  },
  {
    id: "mural-2",
    imageSrc: "/mural-2.png",
    imageAlt: "Preadolescente de secundaria feliz sosteniendo su instrumento",
    fullName: "Valeria Mendoza",
    age: 12,
    stageLabel: "Secundaria",
    province: "Chiriquí",
    message:
      "Desde pequeña soñaba con tener un instrumento; hoy por fin se me da y me hace súper feliz.",
    staggerClass: "lg:translate-y-5",
    frameAccent: "border-amber-400 bg-amber-50",
  },
  {
    id: "mural-3",
    imageSrc: "/mural-3.png",
    imageAlt: "Niño de primaria celebrando la entrega de su instrumento",
    fullName: "Lucas Serrano",
    age: 8,
    stageLabel: "Primaria",
    province: "Coclé",
    message:
      "Nunca pensé tener mi propio instrumento; hoy empecé a aprender el ritmo.",
    staggerClass: "lg:-translate-y-3",
    frameAccent: "border-sky-400 bg-sky-50",
  },
  {
    id: "mural-4",
    imageSrc: "/mural-4.png",
    imageAlt: "Preadolescente de secundaria sonriendo tras recibir su instrumento",
    fullName: "Sofía Quintero",
    age: 13,
    stageLabel: "Secundaria",
    province: "Veraguas",
    message:
      "Era un sueño que veía lejos y que por fin llegó; la música me da ilusión cada día.",
    staggerClass: "lg:translate-y-4",
    frameAccent: "border-emerald-400 bg-emerald-50",
  },
];

const CONFETTI_COLORS = [
  "#FF3B7F",
  "#FFB800",
  "#00B894",
  "#0984E3",
  "#A55EEA",
  "#FF6B35",
];

export function CommunityMural() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  const triggerConfetti = () => {
    const burst: ConfettiPiece[] = Array.from({ length: 42 }, (_, index) => ({
      id: Date.now() + index,
      left: Math.random() * 96 + 2,
      delay: Math.random() * 0.35,
      duration: 1.6 + Math.random() * 1.1,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length] ?? "#FF3B7F",
      rotate: Math.floor(Math.random() * 360),
    }));
    setConfettiPieces(burst);
  };

  useEffect(() => {
    if (confettiPieces.length === 0) return;
    const clearTimer = window.setTimeout(() => {
      setConfettiPieces([]);
    }, 3000);
    return () => window.clearTimeout(clearTimer);
  }, [confettiPieces]);

  return (
    <section
      aria-label="Mural comunitario"
      className="relative z-20 w-full overflow-hidden bg-gradient-to-br from-[#FF6B9D] via-[#FFC857] to-[#4ECDC4] py-16 text-slate-900 shadow-[inset_0_12px_30px_rgba(0,0,0,0.12)]"
    >
      <style>{`
        @keyframes muralPhotoBobA {
          0%, 100% { transform: translateY(0px) rotate(-1.2deg); }
          50% { transform: translateY(-9px) rotate(1deg); }
        }
        @keyframes muralPhotoBobB {
          0%, 100% { transform: translateY(-7px) rotate(1.2deg); }
          50% { transform: translateY(4px) rotate(-1deg); }
        }
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(520px) rotate(540deg) scale(0.85);
            opacity: 0;
          }
        }
        @keyframes sparkTwinkle {
          0%, 100% { transform: scale(0.85) rotate(0deg); opacity: 0.45; }
          50% { transform: scale(1.15) rotate(15deg); opacity: 0.9; }
        }
        .mural-card-a {
          animation: muralPhotoBobA 4.5s ease-in-out infinite;
        }
        .mural-card-b {
          animation: muralPhotoBobB 5s ease-in-out infinite;
        }
        .confetti-piece {
          animation-name: confettiFall;
          animation-timing-function: cubic-bezier(0.22, 0.8, 0.36, 1);
          animation-fill-mode: forwards;
        }
        .mural-spark {
          animation: sparkTwinkle 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* Fondo festivo de chispas y celebración */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="mural-spark absolute left-[6%] top-[12%] h-3.5 w-3.5 rounded-full bg-fuchsia-600/70" />
        <span className="mural-spark absolute left-[18%] top-[28%] h-2.5 w-6 rotate-45 rounded-full bg-indigo-600/60" />
        <span className="mural-spark absolute left-[34%] top-[10%] h-4 w-4 rounded-sm bg-white/80" />
        <span className="mural-spark absolute right-[28%] top-[15%] h-3 w-7 -rotate-25 rounded-full bg-rose-600/65" />
        <span className="mural-spark absolute right-[12%] top-[22%] h-4 w-4 rounded-full bg-violet-700/65" />
        <span className="mural-spark absolute left-[12%] bottom-[16%] h-3.5 w-3.5 rounded-sm bg-teal-800/60" />
        <span className="mural-spark absolute left-[48%] bottom-[10%] h-3 w-6 rotate-12 rounded-full bg-amber-700/60" />
        <span className="mural-spark absolute right-[18%] bottom-[14%] h-4 w-4 rounded-full bg-pink-700/65" />

        {/* Líneas suaves de pentagrama decorativo */}
        <svg
          className="absolute inset-x-0 top-1/2 h-28 w-full -translate-y-1/2 opacity-20"
          viewBox="0 0 1200 120"
          fill="none"
        >
          <path d="M0 20 Q 300 5, 600 20 T 1200 20" stroke="#1e1b4b" strokeWidth="2" />
          <path d="M0 32 Q 300 17, 600 32 T 1200 32" stroke="#1e1b4b" strokeWidth="2" />
          <path d="M0 44 Q 300 29, 600 44 T 1200 44" stroke="#1e1b4b" strokeWidth="2" />
          <path d="M0 56 Q 300 41, 600 56 T 1200 56" stroke="#1e1b4b" strokeWidth="2" />
          <path d="M0 68 Q 300 53, 600 68 T 1200 68" stroke="#1e1b4b" strokeWidth="2" />
        </svg>
      </div>

      {/* Lluvia de confeti al presionar el botón */}
      {confettiPieces.length > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
        >
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece absolute top-0 h-3.5 w-2.5 rounded-xs shadow-xs"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                transform: `rotate(${piece.rotate}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-white/85 p-6 shadow-xl backdrop-blur-xs md:flex-row md:items-center md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Mural de alegría</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Historias que nacen con la música
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-700">
              Pasa el cursor sobre cada fotografía para leer el mensaje que cada
              niño quiere compartir.
            </p>
          </div>

          <button
            type="button"
            onClick={triggerConfetti}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <PartyPopper className="h-4 w-4" />
            <span>¡Lanzar confeti!</span>
          </button>
        </div>

        {/* Fila de 4 fotografías verticales con movimiento y adornos musicales */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MURAL_PHOTOS.map((photo, index) => {
            const isHovered = hoveredId === photo.id;
            const animClass = index % 2 === 0 ? "mural-card-a" : "mural-card-b";

            return (
              <div
                key={photo.id}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative ${photo.staggerClass}`}
              >
                {/* Adornos flotantes de música, libros y accesorios */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-md"
                >
                  {index % 4 === 0 && <Music className="h-4 w-4" />}
                  {index % 4 === 1 && <BookOpen className="h-4 w-4" />}
                  {index % 4 === 2 && <Guitar className="h-4 w-4" />}
                  {index % 4 === 3 && <Headphones className="h-4 w-4" />}
                </span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 -right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-slate-900 shadow-md"
                >
                  {index % 2 === 0 ? (
                    <BookOpen className="h-4 w-4" />
                  ) : (
                    <Music className="h-4 w-4" />
                  )}
                </span>

                {/* Contorno / marco con nombre y apellido, edad, provincia y mensaje */}
                <article
                  className={`${animClass} relative overflow-hidden rounded-2xl border-4 ${photo.frameAccent} p-3 shadow-2xl transition-all duration-300`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white">
                    <div>
                      <p className="text-sm font-bold leading-tight">
                        {photo.fullName}, {photo.age} años
                      </p>
                      <p className="text-[11px] font-medium text-amber-300">
                        {photo.stageLabel} · Provincia: {photo.province}
                      </p>
                    </div>
                    <Music className="h-4 w-4 shrink-0 text-pink-400" />
                  </div>

                  {/* Fotografía rectangular vertical tipo cámara */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-200">
                    <img
                      src={photo.imageSrc}
                      alt={photo.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Mensaje del niño al pasar el mouse */}
                    <div
                      className={`absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent p-4 text-white transition-all duration-300 ${
                        isHovered
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-4 opacity-0"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        Mensaje de {photo.fullName}
                      </span>
                      <p className="mt-1 text-xs font-medium leading-relaxed text-white">
                        “{photo.message}”
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-semibold text-slate-700">
                    <span>{photo.province}</span>
                    <span>
                      {isHovered ? "Mensaje visible" : "Pasa el mouse"}
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}