export function CommunityMural() {
  const [confetti, setConfetti] = useState<WhiteConfettiPiece[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  
interface MuralStudent {
  id: string;
  imageSrc: string;
  imageAlt: string;
  fullName: string;
  age: number;
  province: string;
  message: string;
  staggerClass: string;
  floatClass: string;
}

interface WhiteConfettiPiece {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const MURAL_STUDENTS: MuralStudent[] = [
  {
    id: "mural-1",
    imageSrc: "/mural-1.png",
    imageAlt: "Niño de primaria sonriendo con su estuche de instrumento musical",
    fullName: "Mateo Castillo",
    age: 9,
    province: "Panamá",
    message:
      "Ahora puedo practicar mis notas todos los días y llevar mi estuche con orgullo.",
    staggerClass: "lg:-translate-y-5",
    floatClass: "mural-float-a",
  },
  {
    id: "mural-2",
    imageSrc: "/mural-2.png",
    imageAlt: "Preadolescente de secundaria feliz sosteniendo su instrumento",
    fullName: "Valeria Mendoza",
    age: 12,
    province: "Chiriquí",
    message:
      "Tocar mi flauta me ayuda a concentrarme y compartir música en mi escuela.",
    staggerClass: "lg:translate-y-7",
    floatClass: "mural-float-b",
  },
  {
    id: "mural-3",
    imageSrc: "/mural-3.png",
    imageAlt: "Niño de primaria celebrando la entrega de su instrumento",
    fullName: "Lucas Serrano",
    age: 8,
    province: "Coclé",
    message:
      "Cuando toco mi instrumento siento mucha alegría y ganas de aprender más.",
    staggerClass: "lg:-translate-y-4",
    floatClass: "mural-float-a",
  },
  {
    id: "mural-4",
    imageSrc: "/mural-4.png",
    imageAlt: "Preadolescente de secundaria sonriendo tras recibir su instrumento",
    fullName: "Sofía Quintero",
    age: 13,
    province: "Veraguas",
    message:
      "La música nos une y nos abre caminos que antes parecían lejanos.",
    staggerClass: "lg:translate-y-6",
    floatClass: "mural-float-b",
  },
];

export function CommunityMural() {
  const [confetti, setConfetti] = useState<WhiteConfettiPiece[]>([]);

  const handleConfetti = () => {
    const batchId = Date.now();
    const pieces: WhiteConfettiPiece[] = Array.from({ length: 30 }, (_, idx) => ({
      id: batchId + idx,
      left: Math.random() * 100,
      size: 6 + Math.random() * 7,
      duration: 2.4 + Math.random() * 1.4,
      delay: Math.random() * 0.35,
    }));

    setConfetti((prev) => [...prev, ...pieces]);

    window.setTimeout(() => {
      setConfetti((prev) =>
        prev.filter((item) => !pieces.some((added) => added.id === item.id))
      );
    }, 4200);
  };

  return (
    <section
      aria-label="Mural comunitario ACCORDO"
      className="relative isolate min-h-[700px] w-full overflow-hidden bg-transparent pt-20 pb-36 md:pt-24 md:pb-44"
    >
      <style>{`
        @keyframes muralFloatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes muralFloatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(7px); }
        }
        @keyframes whiteConfettiFall {
          0% {
            transform: translateY(-14px) rotate(0deg);
            opacity: 0.95;
          }
          100% {
            transform: translateY(620px) rotate(340deg);
            opacity: 0;
          }
        }
        .mural-float-a {
          animation: muralFloatA 5.4s ease-in-out infinite;
        }
        .mural-float-b {
          animation: muralFloatB 6.1s ease-in-out infinite;
        }
        .white-confetti-piece {
          position: absolute;
          top: -12px;
          background-color: #FFFFFF;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
          animation-name: whiteConfettiFall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Confeti blanco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      >
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="white-confetti-piece"
            style={{
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: `${piece.size * 0.65}px`,
              animationDuration: `${piece.duration}s`,
              animationDelay: `${piece.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Pentagrama dorado brillante de fondo */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 580"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{
          filter: "drop-shadow(0 0 9px rgba(235, 198, 86, 0.72))",
        }}
      >
        <defs>
          <linearGradient id="goldStaffGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C99E28" />
            <stop offset="35%" stopColor="#F8DC81" />
            <stop offset="70%" stopColor="#D9B236" />
            <stop offset="100%" stopColor="#F9E59E" />
          </linearGradient>
        </defs>
        {[0, 16, 32, 48, 64].map((offsetY, idx) => (
          <path
            key={idx}
            d={`M -40 ${210 + offsetY} C 240 ${110 + offsetY}, 440 ${340 + offsetY}, 720 ${225 + offsetY} C 1020 ${105 + offsetY}, 1220 ${335 + offsetY}, 1480 ${205 + offsetY}`}
            fill="none"
            stroke="url(#goldStaffGrad)"
            strokeWidth={idx === 2 ? "2.2" : "1.5"}
            strokeLinecap="round"
            opacity={0.95}
          />
        ))}
      </svg>

      {/* Notas musicales doradas brillantes rodeando el título y el pentagrama */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ color: "#E8C458" }}
      >
        <Music
          className="absolute top-12 left-[14%] h-5 w-5 -rotate-12 md:left-[24%]"
          style={{ filter: "drop-shadow(0 0 8px rgba(232, 196, 88, 0.85))" }}
        />
        <Music2
          className="absolute top-14 right-[15%] h-5 w-5 rotate-12 md:right-[24%]"
          style={{ filter: "drop-shadow(0 0 8px rgba(232, 196, 88, 0.85))" }}
        />
        <Music2
          className="absolute top-44 left-[7%] h-6 w-6 -rotate-6"
          style={{ filter: "drop-shadow(0 0 8px rgba(232, 196, 88, 0.85))" }}
        />
        <Music
          className="absolute top-48 right-[8%] h-6 w-6 rotate-12"
          style={{ filter: "drop-shadow(0 0 8px rgba(232, 196, 88, 0.85))" }}
        />
        <Music
          className="absolute bottom-24 left-[18%] h-5 w-5 rotate-6"
          style={{ filter: "drop-shadow(0 0 8px rgba(232, 196, 88, 0.85))" }}
        />
        <Music2
          className="absolute bottom-20 right-[18%] h-5 w-5 -rotate-12"
          style={{ filter: "drop-shadow(0 0 8px rgba(232, 196, 88, 0.85))" }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Título en cursiva color café reforzado con línea fina y fondo beige translúcido */}
        <div className="mx-auto mb-14 flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-[#5A3921]/25 bg-[#EFE7D6]/55 px-6 py-4 shadow-xs backdrop-blur-[2px]">
          <div className="min-w-0 flex-1">
            <h2
              className="font-serif text-2xl font-semibold italic tracking-wide text-[#3A1F0E] sm:text-3xl"
              style={{ textShadow: "0 1px 0 rgba(255, 250, 240, 0.65)" }}
            >
              Nuestro Mural Musical
            </h2>
            <div className="mt-2 h-[2px] w-28 bg-[#7A4922]/85" />
          </div>

          <button
            type="button"
            onClick={handleConfetti}
            aria-label="Confeti"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#5A3921]/25 bg-[#FAF6EE]/65 text-[#3A1F0E] transition hover:bg-[#FAF6EE]/90"
          >
            <Sparkles className="h-4 w-4" />
          </button>
        </div>

        {/* 4 marcos fotográficos sin fondo extra, alternados sobre el pentagrama */}
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {MURAL_STUDENTS.map((student) => {
            const isOpen = activeStudentId === student.id;

            return (
              <div key={student.id} className={student.staggerClass}>
                <article
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() =>
                    setActiveStudentId((prev) =>
                      prev === student.id ? null : student.id
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStudentId((prev) =>
                        prev === student.id ? null : student.id
                      );
                    }
                  }}
                  className={`${student.floatClass} group relative cursor-pointer select-none rounded-lg border border-white bg-white p-2 transition-transform duration-300 hover:z-20 hover:scale-[1.03]`}
                  style={{
                    boxShadow:
                      "0 12px 28px rgba(255, 255, 255, 0.95), 0 4px 14px rgba(74, 46, 27, 0.08)",
                  }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                    <img
                      src={student.imageSrc}
                      alt={student.imageAlt}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        isOpen ? "scale-105" : ""
                      }`}
                    />

                    <div
                      className={`pointer-events-none absolute inset-x-0 bottom-0 bg-[#3A2314]/90 p-3.5 text-xs leading-relaxed text-[#FAF6EE] backdrop-blur-xs transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
                    >
                      “{student.message}”
                    </div>
                  </div>

                  <div className="pt-2.5 pb-1 text-center">
                    <p className="font-serif text-sm italic text-[#4A2E1B] sm:text-base">
                      {student.fullName}, {student.age} años · {student.province}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#7A4922]/80 lg:hidden">
                      {isOpen ? "Toca para cerrar" : "Toca para leer mensaje"}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
