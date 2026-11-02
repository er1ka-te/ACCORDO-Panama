import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/Catalog";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de instrumentos y partituras — ACCORDO Panamá" },
      {
        name: "description",
        content:
          "Filtra instrumentos de cuerda, viento y percusión, libros y partituras por modalidad de venta o alquiler y por rango de precio.",
      },
      { property: "og:title", content: "Catálogo — ACCORDO Panamá" },
      {
        property: "og:description",
        content: "Instrumentos y partituras en venta, alquiler y donación en Panamá.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});
