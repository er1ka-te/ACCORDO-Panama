export type Modalidad = "Venta" | "Alquiler" | "Donación";
export type Familia =
  | "Cuerda"
  | "Viento"
  | "Percusión"
  | "Libros y Partituras"
  | "Accesorios";
export type Formato = "Físico" | "Digital";

export type Producto = {
  id: string;
  titulo: string;
  familia: Familia;
  tipo: string;
  modalidad: Modalidad;
  precio: number;
  unidad?: string;
  estado: string;
  formato?: Formato;
  imagen: string;
  descripcion: string;
  selectorLabel?: string;
  opciones?: string[];
  pdfPreview?: boolean;
};

const PHOTOS = {
  violin: "/violin-estuche.jpg",
  viola: "/viola-estuche.jpg",
  cello: "/violinchelo-estuche.jfif",
  doubleBass: "/contrabajo-estuche.jfif",
  guitar: "/guitarra.jfif",
  trumpet: "/trompeta.webp",
  sax: "/saxofon-alto.jfif",
  flute: "/flauta-transversal.jpg",
  drums: "/bateria.jfif",
  score: "/partitura-orquesta.png",
  book: "/metodo-suzuki.jfif",
  accessory: "/accesorios.jpg",
  rosin: "/resina-arco.jfif",
  shoulderRest: "/soporte-hombro.jpg",
  hardCase: "/estuche-rigido.jpg",
  softCase: "/estuche-ligero.jpg",
  musicStand: "/atril-metalico.jpg",
  stringsSet: "/cuerdas-repuesto.jpg",
} as const;

export const IMAGENES = {
  Cuerda: PHOTOS.violin,
  Viento: PHOTOS.flute,
  Percusión: PHOTOS.drums,
  "Libros y Partituras": PHOTOS.book,
  Accesorios: PHOTOS.accessory,
} satisfies Record<Familia, string>;

export interface StringSizeGuide {
  size: string;
  armCm: string;
  ageRange: string;
  label: string;
}

export const violinSizeGuides: StringSizeGuide[] = [
  {
    size: "1/4",
    armCm: "43-47 cm",
    ageRange: "5-7 años",
    label: "1/4 · Brazo 43-47 cm · ~5-7 años",
  },
  {
    size: "1/2",
    armCm: "48-52 cm",
    ageRange: "7-9 años",
    label: "1/2 · Brazo 48-52 cm · ~7-9 años",
  },
  {
    size: "3/4",
    armCm: "53-56 cm",
    ageRange: "9-11 años",
    label: "3/4 · Brazo 53-56 cm · ~9-11 años",
  },
  {
    size: "4/4",
    armCm: "57+ cm",
    ageRange: "11+ años",
    label: "4/4 · Brazo 57+ cm · ~11+ años",
  },
];

export const violaSizeGuides: StringSizeGuide[] = [
  {
    size: '12"',
    armCm: "51-56 cm",
    ageRange: "6-7 años",
    label: '12" · Brazo 51-56 cm · ~6-7 años',
  },
  {
    size: '13"',
    armCm: "56-60 cm",
    ageRange: "8-9 años",
    label: '13" · Brazo 56-60 cm · ~8-9 años',
  },
  {
    size: '14"',
    armCm: "60-64 cm",
    ageRange: "9-11 años",
    label: '14" · Brazo 60-64 cm · ~9-11 años',
  },
  {
    size: '15"',
    armCm: "64-67 cm",
    ageRange: "11-13 años",
    label: '15" · Brazo 64-67 cm · ~11-13 años',
  },
  {
    size: '15.5"',
    armCm: "67-70 cm",
    ageRange: "12-14 años",
    label: '15.5" · Brazo 67-70 cm · ~12-14 años',
  },
  {
    size: '16"',
    armCm: "70-73 cm",
    ageRange: "14-16 años",
    label: '16" · Brazo 70-73 cm · ~14-16 años',
  },
  {
    size: '16.5"+',
    armCm: "73+ cm",
    ageRange: "16+ años / adulto",
    label: '16.5"+ · Brazo 73+ cm · ~16+ años',
  },
];

export const celloSizeGuides: StringSizeGuide[] = [
  {
    size: "1/4",
    armCm: "45-50 cm",
    ageRange: "5-7 años",
    label: "1/4 · Brazo 45-50 cm · ~5-7 años",
  },
  {
    size: "1/2",
    armCm: "51-55 cm",
    ageRange: "7-9 años",
    label: "1/2 · Brazo 51-55 cm · ~7-9 años",
  },
  {
    size: "3/4",
    armCm: "56-60 cm",
    ageRange: "9-12 años",
    label: "3/4 · Brazo 56-60 cm · ~9-12 años",
  },
  {
    size: "4/4",
    armCm: "61+ cm",
    ageRange: "12+ años",
    label: "4/4 · Brazo 61+ cm · ~12+ años",
  },
];

export const doubleBassSizeGuides: StringSizeGuide[] = [
  {
    size: "1/4",
    armCm: "48-54 cm",
    ageRange: "8-11 años",
    label: "1/4 · Brazo 48-54 cm · ~8-11 años",
  },
  {
    size: "1/2",
    armCm: "55-59 cm",
    ageRange: "11-13 años",
    label: "1/2 · Brazo 55-59 cm · ~11-13 años",
  },
  {
    size: "3/4",
    armCm: "60+ cm",
    ageRange: "13+ años",
    label: "3/4 · Brazo 60+ cm · ~13+ años",
  },
  {
    size: "4/4",
    armCm: "63+ cm",
    ageRange: "15+ años / adulto",
    label: "4/4 · Brazo 63+ cm · ~15+ años",
  },
];

export const windModels = ["Sib", "Do", "Standard"];
export const formats = ["Físico impreso", "Digital PDF descargable"];

export const PRODUCTOS_SEED: Producto[] = [
  {
    id: "p1",
    titulo: "Violín con estuche",
    familia: "Cuerda",
    tipo: "Violín",
    modalidad: "Alquiler",
    precio: 25,
    unidad: "por mes",
    estado: "Usado — excelente",
    imagen: PHOTOS.violin,
    descripcion: "Incluye estuche para transporte y práctica diaria.",
    selectorLabel: "Tamaño",
    opciones: violinSizeGuides.map((guide) => guide.size),
  },
  {
    id: "p2",
    titulo: "Viola con estuche",
    familia: "Cuerda",
    tipo: "Viola",
    modalidad: "Alquiler",
    precio: 32,
    unidad: "por mes",
    estado: "Usado — muy bueno",
    imagen: PHOTOS.viola,
    descripcion: "Incluye estuche y revisión lista para ensayo o clase.",
    selectorLabel: "Tamaño (pulgadas)",
    opciones: violaSizeGuides.map((guide) => guide.size),
  },
  {
    id: "p3",
    titulo: "Violonchelo con estuche",
    familia: "Cuerda",
    tipo: "Violonchelo",
    modalidad: "Alquiler",
    precio: 75,
    unidad: "por mes",
    estado: "Usado — bueno",
    imagen: PHOTOS.cello,
    descripcion: "Incluye estuche para traslado seguro y estudio.",
    selectorLabel: "Tamaño",
    opciones: celloSizeGuides.map((guide) => guide.size),
  },
  {
    id: "p3b",
    titulo: "Contrabajo con estuche",
    familia: "Cuerda",
    tipo: "Contrabajo",
    modalidad: "Alquiler",
    precio: 85,
    unidad: "por mes",
    estado: "Usado — bueno",
    imagen: PHOTOS.doubleBass,
    descripcion: "Incluye estuche para protección y transporte orquestal.",
    selectorLabel: "Tamaño",
    opciones: doubleBassSizeGuides.map((guide) => guide.size),
  },
  {
    id: "p4",
    titulo: "Guitarra",
    familia: "Cuerda",
    tipo: "Guitarra",
    modalidad: "Venta",
    precio: 48,
    estado: "Nuevo",
    imagen: PHOTOS.guitar,
    descripcion: "Ideal para clases, talleres y práctica constante.",
    selectorLabel: "Tamaño",
    opciones: ["3/4", "4/4"],
  },
  {
    id: "p5",
    titulo: "Trompeta",
    familia: "Viento",
    tipo: "Trompeta",
    modalidad: "Venta",
    precio: 95,
    estado: "Usado — muy bueno",
    imagen: PHOTOS.trumpet,
    descripcion: "Lista para práctica individual, banda o ensamble.",
    selectorLabel: "Modelo / Afinación",
    opciones: windModels,
  },
  {
    id: "p6",
    titulo: "Saxofón alto",
    familia: "Viento",
    tipo: "Saxofón",
    modalidad: "Alquiler",
    precio: 45,
    unidad: "por mes",
    estado: "Usado — excelente",
    imagen: PHOTOS.sax,
    descripcion: "Saxofón alto para estudio y presentaciones escolares.",
    selectorLabel: "Modelo",
    opciones: ["Mib — Alto", "Standard"],
  },
  {
    id: "p7",
    titulo: "Flauta transversal",
    familia: "Viento",
    tipo: "Flauta",
    modalidad: "Donación",
    precio: 0,
    estado: "Usado — bueno",
    imagen: PHOTOS.flute,
    descripcion: "Flauta transversal disponible para estudiantes.",
    selectorLabel: "Modelo",
    opciones: ["Do", "Standard"],
  },
  {
    id: "p8",
    titulo: "Batería",
    familia: "Percusión",
    tipo: "Batería",
    modalidad: "Venta",
    precio: 120,
    estado: "Usado — bueno",
    imagen: PHOTOS.drums,
    descripcion: "Batería para práctica rítmica, ensamble y talleres.",
    selectorLabel: "Modelo",
    opciones: ["Standard", "Estudio"],
  },
  {
    id: "p10",
    titulo: "Suzuki violín 1",
    familia: "Libros y Partituras",
    tipo: "Método",
    modalidad: "Venta",
    precio: 12,
    estado: "Disponible",
    formato: "Digital",
    imagen: PHOTOS.book,
    descripcion: "Repertorio y técnica inicial de Suzuki violín 1.",
    selectorLabel: "Formato",
    opciones: formats,
    pdfPreview: true,
  },
  {
    id: "p11",
    titulo: "Suzuki viola 1",
    familia: "Libros y Partituras",
    tipo: "Método",
    modalidad: "Venta",
    precio: 12,
    estado: "Disponible",
    formato: "Digital",
    imagen: PHOTOS.book,
    descripcion: "Repertorio y técnica inicial de Suzuki viola 1.",
    selectorLabel: "Formato",
    opciones: formats,
    pdfPreview: true,
  },
  {
    id: "p12",
    titulo: "Método Suzuki",
    familia: "Libros y Partituras",
    tipo: "Método",
    modalidad: "Venta",
    precio: 14,
    estado: "Disponible",
    formato: "Digital",
    imagen: PHOTOS.book,
    descripcion: "Guía base del Método Suzuki para formación progresiva.",
    selectorLabel: "Formato",
    opciones: formats,
    pdfPreview: true,
  },
  {
    id: "p13",
    titulo: "Partituras de orquesta",
    familia: "Libros y Partituras",
    tipo: "Partituras",
    modalidad: "Donación",
    precio: 0,
    estado: "Digital",
    formato: "Digital",
    imagen: PHOTOS.score,
    descripcion:
      "Incluye obras y arreglos como Jingle Bells, We Wish You a Merry Christmas, A Surprise Tango, Can Can, merengue y más piezas de repertorio.",
    selectorLabel: "Obra / Repertorio",
    opciones: [
      "Jingle Bells",
      "We Wish You a Merry Christmas",
      "A Surprise Tango",
      "Can Can",
      "Merengue",
    ],
    pdfPreview: true,
  },
  {
    id: "a1",
    titulo: "Resina para arco",
    familia: "Accesorios",
    tipo: "Mantenimiento",
    modalidad: "Venta",
    precio: 8,
    estado: "Nuevo",
    imagen: PHOTOS.rosin,
    descripcion: "Resina para arco compatible con violín, viola, contrabajo y violonchelo.",
    selectorLabel: "Instrumento",
    opciones: ["Violín", "Viola", "Contrabajo", "Violonchelo"],
  },
  {
    id: "a2",
    titulo: "Soporte de hombro",
    familia: "Accesorios",
    tipo: "Ergonomía",
    modalidad: "Venta",
    precio: 18,
    estado: "Nuevo",
    imagen: PHOTOS.shoulderRest,
    descripcion: "Soporte de hombro para viola y violín.",
    selectorLabel: "Instrumento",
    opciones: ["Viola", "Violín"],
  },
  {
    id: "a3",
    titulo: "Estuche rígido reforzado",
    familia: "Accesorios",
    tipo: "Estuche",
    modalidad: "Venta",
    precio: 72,
    estado: "Nuevo",
    imagen: PHOTOS.hardCase,
    descripcion: "Estuche rígido reforzado para protección en traslados.",
    selectorLabel: "Instrumento",
    opciones: ["Violín", "Viola", "Violonchelo", "Contrabajo"],
  },
  {
    id: "a4",
    titulo: "Estuche ligero acolchado",
    familia: "Accesorios",
    tipo: "Estuche",
    modalidad: "Venta",
    precio: 38,
    estado: "Nuevo",
    imagen: PHOTOS.softCase,
    descripcion: "Estuche ligero acolchado cómodo para llevar a diario.",
    selectorLabel: "Instrumento",
    opciones: ["Violín", "Viola", "Guitarra"],
  },
  {
    id: "a5",
    titulo: "Atril metálico plegable",
    familia: "Accesorios",
    tipo: "Atril",
    modalidad: "Venta",
    precio: 24,
    estado: "Nuevo",
    imagen: PHOTOS.musicStand,
    descripcion: "Atril metálico plegable para estudio y ensayo.",
    selectorLabel: "Presentación",
    opciones: ["Standard"],
  },
  {
    id: "a6",
    titulo: "Juego de cuerdas de repuesto",
    familia: "Accesorios",
    tipo: "Cuerdas",
    modalidad: "Venta",
    precio: 22,
    estado: "Nuevo",
    imagen: PHOTOS.stringsSet,
    descripcion: "Juego de cuerdas de repuesto para mantenimiento.",
    selectorLabel: "Instrumento",
    opciones: ["Violín", "Viola", "Violonchelo", "Contrabajo", "Guitarra"],
  },
];

export const RANGOS = [
  { id: "todos", label: "Todos los precios", min: 0, max: Infinity },
  { id: "donaciones", label: "Donaciones ($0)", min: 0, max: 0 },
  { id: "economico", label: "Económico ($1 - $50)", min: 1, max: 50 },
  { id: "intermedio", label: "Intermedio ($51 - $100)", min: 51, max: 100 },
] as const;

export const formatPrecio = (p: Producto) =>
  p.precio === 0
    ? "Donación ($0)"
    : `$${p.precio}${p.unidad ? ` ${p.unidad}` : ""}`;

export type FaqItem = {
  id: string;
  pregunta: string;
  respuesta: string;
};

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    pregunta: "¿Cómo funcionan el alquiler, la compra y las donaciones en ACCORDO?",
    respuesta:
      "Puedes explorar instrumentos y materiales según su modalidad y contactar o agregar al carrito lo que necesites para tu práctica o estudio.",
  },
  {
    id: "faq-2",
    pregunta: "¿Cómo elijo la talla correcta de un instrumento de cuerda?",
    respuesta:
      "Revisa la guía de medidas por largo de brazo y edad aproximada antes de seleccionar la talla en el catálogo.",
  },
  {
    id: "faq-3",
    pregunta: "¿Puedo donar o solicitar apoyo musical?",
    respuesta:
      "Sí, las secciones de donaciones y estudio están pensadas para conectar estudiantes con recursos e iniciativas musicales.",
  },
];

export type EscuelaItem = {
  id: string;
  nombre: string;
  ubicacion: string;
  especialidad: string;
};

export const ESCUELAS: EscuelaItem[] = [
  {
    id: "esc-1",
    nombre: "Programa Juvenil de Cuerdas",
    ubicacion: "Panamá",
    especialidad: "Violín, viola, violonchelo y práctica orquestal",
  },
  {
    id: "esc-2",
    nombre: "Taller Comunitario de Viento y Percusión",
    ubicacion: "Panamá",
    especialidad: "Iniciación musical y ensamble",
  },
];
