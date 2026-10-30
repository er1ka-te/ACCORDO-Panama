import { createFileRoute } from "@tanstack/react-router";
import { Checkout } from "@/components/Checkout";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/checkout")({ head: () => pageHead("Confirmación y pago", "Confirma tus compras, alquileres y solicitudes educativas en modo demostrativo."), component: Checkout });