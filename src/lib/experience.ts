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
  Alquiler: "Tu alquiler fue realizado con éxito. Muchas gracias.",
  Donación: "Tu donación fue realizada con éxito. Muchas gracias por apoyar la música de jóvenes estudiantes.",
};
export const canOpenModule = (tested: boolean, completed: number, index: number) => tested && index <= completed;
export const INITIAL_QUIZ = [
  { pregunta: "¿Cuántas líneas tiene un pentagrama?", opciones: ["4", "5", "6"], correcta: "5" },
  { pregunta: "¿Qué indica el tempo?", opciones: ["Velocidad del pulso", "Volumen", "Altura de una nota"], correcta: "Velocidad del pulso" },
  { pregunta: "¿Qué nota sigue a Do?", opciones: ["Sol", "Re", "Si"], correcta: "Re" },
];
export const initialQuizCompleted = (answers: string[]) => answers.length === 3 && answers.every((a, i) => INITIAL_QUIZ[i]?.opciones.includes(a));
export const MODULES = [
  { titulo: "Notas y pentagrama", texto: "El pentagrama tiene cinco líneas y cuatro espacios. En clave de Sol, las líneas de abajo hacia arriba son Mi, Sol, Si, Re y Fa. Los espacios son Fa, La, Do y Mi. Practica nombrándolos en voz alta.", pregunta: "¿Cuál es la nota de la primera línea en clave de Sol?", opciones: ["Mi", "Do", "La"], correcta: "Mi" },
  { titulo: "Pulso y ritmo", texto: "El pulso es regular; el ritmo combina duraciones. En 4/4, la negra dura un tiempo, la blanca dos y la redonda cuatro. Marca cuatro pulsos con palmas y alterna negras y blancas.", pregunta: "¿Cuántos tiempos dura una blanca en 4/4?", opciones: ["1", "2", "4"], correcta: "2" },
  { titulo: "Escalas e intervalos", texto: "Do mayor contiene Do, Re, Mi, Fa, Sol, La y Si. Un intervalo mide la distancia entre dos notas. Do a Sol es una quinta justa. Canta lentamente la escala de ida y vuelta.", pregunta: "¿Qué intervalo hay entre Do y Sol?", opciones: ["Tercera", "Quinta justa", "Segunda"], correcta: "Quinta justa" },
  { titulo: "Acordes y armonía", texto: "La tríada mayor se forma con raíz, tercera mayor y quinta justa. Do mayor es Do–Mi–Sol. Do menor cambia Mi por Mi bemol. Escucha y compara su carácter sin forzar las manos.", pregunta: "¿Qué notas forman Do mayor?", opciones: ["Do–Mi–Sol", "Do–Fa–La", "Re–Fa–La"], correcta: "Do–Mi–Sol" },
  { titulo: "Práctica consciente", texto: "Empieza con postura relajada y movimientos suaves. Practica lentamente en fragmentos, descansa si hay tensión y aumenta el tempo gradualmente. Graba una frase, escucha y elige un detalle para mejorar.", pregunta: "¿Qué debes hacer si sientes dolor al tocar?", opciones: ["Tocar más fuerte", "Parar y revisar postura con un docente", "Aumentar el tempo"], correcta: "Parar y revisar postura con un docente" },
];