import { SITE } from "@/lib/site";

/** Marca editable: clave de Sol entrelazada con el perfil de una viola. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 52 52"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 transition-transform duration-300 hover:rotate-6"
      >
        <path
          d="M27 4c-8 7-10 15-5 21 4 5 13 2 12-5-1-5-8-6-12-2-7 7-3 19 7 19 8 0 13-7 9-14"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M17 17c-6 3-8 10-4 15 2 3 2 5 0 8 5 5 12 5 16 1 4 4 11 4 16-1-2-3-2-5 0-8 4-5 2-12-4-15-4 4-8 4-12 0-4 4-8 4-12 0Z"
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="1.8"
        />
        <path d="M29 9v37M25 12h8M25 43h8" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="23" cy="29" r="2.2" fill="var(--gold)" />
      </svg>
      <span className="leading-none">
        <span
          className="block font-display text-2xl font-semibold"
          style={{ color: inverted ? "var(--cream)" : "var(--coffee)" }}
        >
          {SITE.name}
        </span>
        <span className="eyebrow block text-[0.6rem]">Tu camino musical</span>
      </span>
    </span>
  );
}
