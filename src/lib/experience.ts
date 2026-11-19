import { z } from "zod";

export const announcementSchema = z.object({
  id: z.string().min(1), titulo: z.string().trim().min(1).max(100),
  detalle: z.string().trim().max(240), imagen: z.string().min(1).max(2000),
  destino: z.enum(["/directorio", "/estudio", "/donaciones", "/catalogo", "/publicar"]),
  activo: z.boolean(), membresia: z.enum(["Pendiente", "Pagada (demo)", "Sin membresía"]),
  tarifa: z.number().finite().min(0).max(10000),
});

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
