import catCuerda from "@/assets/cat-cuerda.jpg";
import catViento from "@/assets/cat-viento.jpg";
import catLibros from "@/assets/cat-libros.jpg";
import catPercusion from "@/assets/cat-percusion.jpg";

export type Modalidad = "Venta" | "Alquiler" | "Donación";
export type Familia = "Cuerda" | "Viento" | "Percusión" | "Teclado" | "Libros y Partituras";
export type Formato = "Físico" | "Digital";

export type Producto = {
  id: string;
  titulo: string;
  familia: Familia;
  tipo: string;
  modalidad: Modalidad;
  precio: number; // USD. 0 = gratuito / donación
  unidad?: string; // "por mes", etc.
  estado: string;
  formato?: Formato;
  imagen: string;
  descripcion: string;
};

export const IMAGENES = {
  Cuerda: catCuerda,
  Viento: catViento,
  Percusión: catPercusion,
  Teclado: catCuerda,
  "Libros y Partituras": catLibros,
} satisfies Record<Familia, string>;

export const PRODUCTOS_SEED: Producto[] = [
  {
    id: "p1",
    titulo: "Violín 4/4 de estudio",
    familia: "Cuerda",
    tipo: "Violín",
    modalidad: "Alquiler",
    precio: 25,
    unidad: "por mes",
    estado: "Usado — excelente",
    imagen: catCuerda,
    descripcion: "Incluye arco, resina y estuche rígido. Ideal para iniciación en conservatorio.",
  },
  {
    id: "p2",
    titulo: "Viola 3/4 para estudiantes",
    familia: "Cuerda",
    tipo: "Viola",
    modalidad: "Alquiler",
    precio: 32,
    unidad: "por mes",
    estado: "Usado — muy bueno",
    imagen: catCuerda,
    descripcion: "Revisada por luthier aliado. Ajuste de puente y cuerdas nuevas incluidas.",
  },
  {
    id: "p3",
    titulo: "Chelo 4/4 con estuche blando",
    familia: "Cuerda",
    tipo: "Chelo",
    modalidad: "Alquiler",
    precio: 75,
    unidad: "por mes",
    estado: "Usado — bueno",
    imagen: catCuerda,
    descripcion: "Para nivel intermedio. Entrega en bodega de Vía España o envío nacional.",
  },
  {
    id: "p4",
    titulo: "Guitarra acústica cuerdas de nylon",
    familia: "Cuerda",
    tipo: "Guitarra",
    modalidad: "Venta",
    precio: 48,
    estado: "Nuevo",
    imagen: catCuerda,
    descripcion: "Tamaño 39\". La favorita para clases escolares y talleres comunitarios.",
  },
  {
    id: "p5",
    titulo: "Trompeta Bb reacondicionada",
    familia: "Viento",
    tipo: "Trompeta",
    modalidad: "Venta",
    precio: 95,
    estado: "Usado — muy bueno",
    imagen: catViento,
    descripcion: "Válvulas lubricadas y campana pulida. Incluye boquilla 7C.",
  },
  {
    id: "p6",
    titulo: "Clarinete de estudio",
    familia: "Viento",
    tipo: "Clarinete",
    modalidad: "Alquiler",
    precio: 30,
    unidad: "por mes",
    estado: "Usado — excelente",
    imagen: catViento,
    descripcion: "Zapatillas revisadas, 3 cañas incluidas. Perfecto para banda escolar.",
  },
  {
    id: "p7",
    titulo: "Flauta traversa donada",
    familia: "Viento",
    tipo: "Flauta",
    modalidad: "Donación",
    precio: 0,
    estado: "Usado — bueno",
    imagen: catViento,
    descripcion: "Donación de una familia panameña. Se asigna a estudiantes con carta de su escuela.",
  },
  {
    id: "p8",
    titulo: "Cajón peruano artesanal",
    familia: "Percusión",
    tipo: "Cajón",
    modalidad: "Venta",
    precio: 65,
    estado: "Nuevo",
    imagen: catPercusion,
    descripcion: "Madera de cedro nacional, sonido cálido para acompañamiento acústico.",
  },
  {
    id: "p9",
    titulo: "Djembé mediano",
    familia: "Percusión",
    tipo: "Djembé",
    modalidad: "Alquiler",
    precio: 18,
    unidad: "por mes",
    estado: "Usado — muy bueno",
    imagen: catPercusion,
    descripcion: "Para talleres de percusión afropanameña y clases grupales.",
  },
  {
    id: "p10",
    titulo: "Teclado 61 teclas sensitivas",
    familia: "Teclado",
    tipo: "Teclado",
    modalidad: "Alquiler",
    precio: 40,
    unidad: "por mes",
    estado: "Usado — excelente",
    imagen: catCuerda,
    descripcion: "Con atril, pedal y fuente. Ideal para solfeo y armonía en casa.",
  },
  {
    id: "p11",
    titulo: "Método Suzuki Violín Vol. 1 (físico)",
    familia: "Libros y Partituras",
    tipo: "Método",
    modalidad: "Venta",
    precio: 22,
    estado: "Nuevo",
    formato: "Físico",
    imagen: catLibros,
    descripcion: "Edición con audio de referencia. El estándar en academias panameñas.",
  },
  {
    id: "p12",
    titulo: "Solfeo de los solfeos — PDF",
    familia: "Libros y Partituras",
    tipo: "Teoría",
    modalidad: "Venta",
    precio: 4,
    estado: "Digital",
    formato: "Digital",
    imagen: catLibros,
    descripcion: "Descarga inmediata en PDF, apto para tableta e impresión.",
  },
  {
    id: "p13",
    titulo: "Antología de tamboritos panameños",
    familia: "Libros y Partituras",
    tipo: "Partituras",
    modalidad: "Donación",
    precio: 0,
    estado: "Digital",
    formato: "Digital",
    imagen: catLibros,
    descripcion: "Arreglos folclóricos liberados por profesores locales. Descarga gratuita.",
  },
  {
    id: "p14",
    titulo: "Partituras de piano nivel 1 (físico)",
    familia: "Libros y Partituras",
    tipo: "Partituras",
    modalidad: "Alquiler",
    precio: 6,
    unidad: "por mes",
    estado: "Usado — bueno",
    imagen: catLibros,
    descripcion: "Colección anillada para el primer año de piano.",
  },
];

export type Escuela = {
  id: string;
  nombre: string;
  tipo: "Fundación" | "Academia" | "Escuela pública" | "Conservatorio";
  ubicacion: string;
  planes: string;
  costoMin: number;
  costoMax: number;
  enfoque: string;
  instagram: string;
  contacto: string;
};

export const ESCUELAS: Escuela[] = [
  {
    id: "e1",
    nombre: "Fundación Sinfónica Juvenil",
    tipo: "Fundación",
    ubicacion: "Casco Antiguo, Ciudad de Panamá",
    planes: "Gratuito con audición y beca de instrumento",
    costoMin: 0,
    costoMax: 0,
    enfoque: "Orquesta juvenil, cuerdas y vientos",
    instagram: "https://instagram.com",
    contacto: "https://wa.me/50760000001",
  },
  {
    id: "e2",
    nombre: "Academia Clave de Sol",
    tipo: "Academia",
    ubicacion: "San Francisco, Ciudad de Panamá",
    planes: "Clases individuales desde $45/mes",
    costoMin: 45,
    costoMax: 90,
    enfoque: "Piano, guitarra y canto",
    instagram: "https://instagram.com",
    contacto: "https://wa.me/50760000002",
  },
  {
    id: "e3",
    nombre: "Escuela de Música de David",
    tipo: "Escuela pública",
    ubicacion: "David, Chiriquí",
    planes: "Matrícula social $10 anual",
    costoMin: 0,
    costoMax: 10,
    enfoque: "Formación inicial para niños de 7 a 14 años",
    instagram: "https://instagram.com",
    contacto: "https://wa.me/50760000003",
  },
  {
    id: "e4",
    nombre: "Conservatorio Nacional",
    tipo: "Conservatorio",
    ubicacion: "Calidonia, Ciudad de Panamá",
    planes: "Programa formal, cuota semestral $60",
    costoMin: 20,
    costoMax: 60,
    enfoque: "Teoría, solfeo e instrumento principal",
    instagram: "https://instagram.com",
    contacto: "https://wa.me/50760000004",
  },
  {
    id: "e5",
    nombre: "Fundación Danilo Pérez",
    tipo: "Fundación",
    ubicacion: "Casco Antiguo, Ciudad de Panamá",
    planes: "Talleres gratuitos y becas de jazz",
    costoMin: 0,
    costoMax: 0,
    enfoque: "Jazz, improvisación y ensambles",
    instagram: "https://instagram.com",
    contacto: "https://wa.me/50760000005",
  },
  {
    id: "e6",
    nombre: "Academia Coclé Suena",
    tipo: "Academia",
    ubicacion: "Penonomé, Coclé",
    planes: "Plan grupal $25/mes",
    costoMin: 25,
    costoMax: 55,
    enfoque: "Percusión folclórica y guitarra",
    instagram: "https://instagram.com",
    contacto: "https://wa.me/50760000006",
  },
];

export const FAQS = [
  {
    q: "¿Cómo funciona el alquiler de un instrumento?",
    a: "Eliges el instrumento, reservas en línea y firmas un acuerdo mensual. Pagas el primer mes y un depósito reembolsable. Puedes retirarlo en nuestra bodega o pedir envío nacional.",
  },
  {
    q: "¿Qué pasa si el instrumento se daña?",
    a: "El desgaste normal está cubierto. Para daños mayores aplicamos el depósito y te acompañamos con un luthier aliado a costo preferencial.",
  },
  {
    q: "¿Puedo publicar mi instrumento si vivo en el interior?",
    a: "Sí. Coordinamos recolección con transportista aliado o puedes enviarlo a la bodega; el costo se descuenta de tu primera liquidación.",
  },
  {
    q: "¿Los libros digitales se descargan al instante?",
    a: "Sí, recibes el enlace de descarga por correo inmediatamente después del pago.",
  },
  {
    q: "¿Hay opciones gratuitas?",
    a: "Contamos con instrumentos donados y partituras liberadas. Se asignan con carta de tu escuela, fundación o profesor.",
  },
];

/** Rangos de precio reutilizados en catálogo y directorio. */
export const RANGOS = [
  { id: "todos", label: "Todos los precios", min: 0, max: Infinity },
  { id: "gratis", label: "Gratuitos / Donaciones ($0)", min: 0, max: 0 },
  { id: "economico", label: "Económico ($1 - $50)", min: 1, max: 50 },
  { id: "intermedio", label: "Intermedio ($51 - $100)", min: 51, max: 100 },
] as const;

export const formatPrecio = (p: Producto) =>
  p.precio === 0 ? "Gratis / Donación" : `$${p.precio}${p.unidad ? ` ${p.unidad}` : ""}`;
