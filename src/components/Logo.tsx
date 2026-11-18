import { SITE } from "@/lib/site";
export function Logo({ inverted = false, align = "center" }: { inverted?: boolean; align?: "center" | "left" }) {
  return (
    <span className={`flex items-center ${align === "left" ? "justify-start" : "justify-center"} w-full gap-2`}>
      <img
        src="/logo-accordo.png" 
        alt={`${SITE.name} — Tu camino musical`}
        className="h-12 w-auto object-contain"
      />
    </span>
  );
}