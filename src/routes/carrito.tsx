import { createFileRoute } from "@tanstack/react-router";
import { Cart } from "@/components/Cart";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/carrito")({ head: () => pageHead("Carrito", "Gestiona tu selección de instrumentos, alquileres y donaciones en ACCORDO."), component: Cart });