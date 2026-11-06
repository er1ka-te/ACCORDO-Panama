import { createFileRoute } from "@tanstack/react-router";
import { Checkout } from "@/components/Checkout";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/checkout")({ head: () => pageHead("Confirmación y pago", "Registra tus solicitudes de compra, alquiler y donación educativa en ACCORDO Panamá."), component: Checkout });