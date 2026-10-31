import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/estudio")({ head: () => pageHead("Módulos de estudio", "Evalúa tus conocimientos y avanza por una ruta en pentagrama de teoría y práctica musical."), component: LearningPath });