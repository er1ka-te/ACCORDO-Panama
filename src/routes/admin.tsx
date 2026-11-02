import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "@/components/AdminPanel";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de administración — ACCORDO Panamá" },
      {
        name: "description",
        content: "Panel simulado para agregar productos, ajustar precios y revisar solicitudes de alquiler.",
      },
      { property: "og:title", content: "Panel de administración — ACCORDO Panamá" },
      { property: "og:description", content: "Gestión de catálogo y solicitudes de alquiler." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPanel,
});
