import { createFileRoute } from "@tanstack/react-router";
import { Donations } from "@/components/Donations";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/donaciones")({ head: () => pageHead("Donaciones de instrumentos", "Dona a fundaciones o a estudiantes de la comunidad con verificación educativa."), component: Donations });