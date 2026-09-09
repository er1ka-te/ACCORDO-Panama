import { SITE } from "@/lib/site";

/** Logotipo SVG editable: cambia trazos o colores libremente. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 transition-transform duration-300 hover:rotate-6"
      >
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--gold)" strokeWidth="2" />
        <path
          d="M14 30c4-10 7-16 10-16s3 6 3 12c0 4 1 6 3 6s3-2 4-6"
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="19" cy="33" r="4" fill="var(--gold)" />
      </svg>
      <span className="leading-none">
        <span
          className="block font-display text-2xl font-semibold tracking-tight"
          style={{ color: inverted ? "var(--cream)" : "var(--coffee)" }}
        >
          {SITE.name}
        </span>
        <span className="eyebrow block text-[0.6rem]">Panamá</span>
      </span>
    </span>
  );
}
