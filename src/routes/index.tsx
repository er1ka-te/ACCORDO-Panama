import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { OrchestraBackground } from "@/components/OrchestraBackground";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { ImpactCards } from "@/components/ImpactCards";
import { PanamaImpact } from "@/components/PanamaImpact";
import { RotatingHub } from "@/components/RotatingHub";
import { CommunityMural } from "@/components/CommunityMural";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACCORDO Panamá — Tu camino musical" },
      {
        name: "description",
        content:
          "Alquila, compra o publica instrumentos, libros y partituras en Panamá. Directorio de academias y fundaciones de música.",
      },
      { property: "og:title", content: "ACCORDO Panamá — Tu camino musical" },
      {
        property: "og:description",
        content: "Instrumentos y partituras accesibles para estudiantes panameños.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <>
      <OrchestraBackground />
      <Hero />

      <ImpactCards />
      <PanamaImpact />
      <AnnouncementBanner />

      {/* Debajo del carrusel: módulos de estudio, donaciones y voluntarios */}
      <RotatingHub />

      {/* Al final de todo: mural comunitario */}
      <CommunityMural />
    </>
  );
}