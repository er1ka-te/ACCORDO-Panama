import { z } from "zod";
import orchestra from "@/assets/orquesta-poster.jpg";
import strings from "@/assets/cat-cuerda.jpg";
import piano from "@/assets/cat-libros.jpg";
import winds from "@/assets/cat-viento.jpg";
import percussion from "@/assets/cat-percusion.jpg";

export const announcementSchema = z.object({
  id: z.string().min(1), titulo: z.string().trim().min(1).max(100),
  detalle: z.string().trim().max(240), imagen: z.string().min(1).max(2000),
  destino: z.enum(["/directorio", "/estudio", "/donaciones", "/catalogo", "/publicar"]),
  activo: z.boolean(), membresia: z.enum(["Pendiente", "Pagada (demo)", "Sin membresía"]),
  tarifa: z.number().finite().min(0).max(10000),
});
export type Announcement = z.infer<typeof announcementSchema>;
// IMÁGENES DE ANUNCIOS: cambia `imagen` aquí o desde Anuncios en el Panel.
export const ANNOUNCEMENTS: Announcement[] = [
  { id: "ad1", titulo: "Encuentro de jóvenes músicos", detalle: "Eventos y ensambles · anuncio de ejemplo", imagen: orchestra, destino: "/directorio", activo: true, membresia: "Sin membresía", tarifa: 0 },
  { id: "ad2", titulo: "Tu próximo paso en la música", detalle: "Academias de Panamá · consulta programas y disponibilidad", imagen: strings, destino: "/directorio", activo: true, membresia: "Sin membresía", tarifa: 0 },
  { id: "ad3", titulo: "Un instrumento, una oportunidad", detalle: "Fundaciones y donaciones para la formación musical", imagen: winds, destino: "/donaciones", activo: true, membresia: "Sin membresía", tarifa: 0 },
  { id: "ad4", titulo: "Aprende a tu propio ritmo", detalle: "Profesores particulares · descubre tu especialidad", imagen: piano, destino: "/directorio", activo: true, membresia: "Sin membresía", tarifa: 0 },
  { id: "ad5", titulo: "Cada nota cuenta", detalle: "Comienza tu ruta de estudio musical", imagen: percussion, destino: "/estudio", activo: true, membresia: "Sin membresía", tarifa: 0 },
];

export const beneficiarySchema = z.object({
  estudios: z.string().trim().min(10, "Describe tus estudios o interés musical (mínimo 10 caracteres).").max(500),
  objetivo: z.string().trim().min(10, "Describe cómo practicarás (mínimo 10 caracteres).").max(500),
  noReventa: z.literal(true, { errorMap: () => ({ message: "Debes comprometerte a usarlo para estudiar, no para reventa." }) }),
});
export const donationSchema = z.object({
  id: z.string(), titulo: z.string().trim().min(3).max(100),
  descripcion: z.string().trim().min(10).max(1000),
  destino: z.enum(["Fundación", "Comunidad"]), fundacion: z.string().max(200),
  estado: z.enum(["Pendiente de evaluación", "Contacto preparado", "Aceptada", "No aceptada", "Disponible", "Solicitud recibida", "Asignada"]),
}).refine(d => d.destino !== "Fundación" || d.fundacion.length > 0, "Elige una fundación.");
export type Donation = z.infer<typeof donationSchema>;
export const cartItemSchema = z.object({
  id: z.string(), titulo: z.string(), imagen: z.string(), opcion: z.string().min(1),
  modalidad: z.enum(["Venta", "Alquiler", "Donación"]), precio: z.number().finite().nonnegative(), cantidad: z.number().int().min(1).max(10),
});
export type CartItem = z.infer<typeof cartItemSchema>;
export const totalCart = (items: CartItem[]) => items.reduce((sum, i) => sum + (i.modalidad === "Donación" ? 0 : i.precio * i.cantidad), 0);
export const confirmations = {
  Venta: "Tu compra fue realizada con éxito. Muchas gracias.",
  Alquiler: "Tu alquiler fue realizada con éxito. Muchas gracias.",
  Donación: "Tu donación fue realizada con éxito. Muchas gracias por apoyar la música de jóvenes estudiantes.",
};
export { INITIAL_QUIZ, MODULES, canOpenModule, initialQuizCompleted, canCompleteStep } from "./learning";
