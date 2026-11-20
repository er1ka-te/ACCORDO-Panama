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

export type TipoEscuela =
  | "Fundación"
  | "Academia pagada"
  | "Profesor particular";

export type EscuelaItem = {
  id: string;
  tipo: TipoEscuela;
  nombre: string;
  imagen?: string;
  perfilDemostrativo?: boolean;
  ubicacion: string;
  telefono?: string;
  sitioWeb?: string;
  instagram?: string;
  contacto?: string;
  maps?: string;
  enfoque: string;
  trayectoria?: string;
  experiencia?: string;
  modalidadClases?: string;
  planes: string;
};

// Guarda los logos en /public/logos/ y las fotos de profesores en /public/profesores/
export const ESCUELAS: EscuelaItem[] = [
  {
    id: "funsincopa",
    tipo: "Fundación",
    nombre: "Fundación Sinfonía Concertante de Panamá (FUNSINCOPA)",
    imagen: "/logos/funsincopa.png",
    ubicacion:
      "Escuela Bilingüe República de Italia, Calle Segunda, Amelia Denis de Icaza, San Miguelito, Panamá.",
    telefono: "+507 260-0646",
    sitioWeb: "https://funsincopa.org/",
    instagram: "https://www.instagram.com/funsincopa/",
    contacto: "https://funsincopa.org/",
    maps: "https://www.google.com/maps/search/?api=1&query=San+Miguelito+Panama",
    enfoque:
      "Formación orquestal infantil y juvenil en violín, viola, violonchelo, contrabajo, vientos, percusión, lectura musical, conciertos y festivales educativos.",
    trayectoria:
      "Fundación sin fines de lucro dedicada a la educación musical integral y la proyección artística de niños y jóvenes en Panamá.",
    modalidadClases: "Ensayos grupales, talleres formativos y conciertos sinfónicos.",
    planes:
      "Programa formativo de fundación sin fines de lucro · Consulta convocatorias e inscripción directa.",
  },
  {
    id: "amp",
    tipo: "Academia pagada",
    nombre: "Academia de Música de Panamá (AMP)",
    imagen: "/logos/amp.png",
    ubicacion:
      "San Francisco (Calle 71 Este) y Town Center Costa del Este, Ciudad de Panamá.",
    telefono: "+(507) 392-2324",
    sitioWeb: "https://www.ampenlinea.com/",
    instagram: "https://www.instagram.com/ampenlinea/",
    contacto: "https://www.ampenlinea.com/",
    maps: "https://www.google.com/maps/search/?api=1&query=San+Francisco+Panama",
    enfoque:
      "Clases prácticas por niveles en guitarra, piano, batería, bajo, canto, violín, formación de bandas, audio y producción musical.",
    trayectoria:
      "Academia enfocada en el aprendizaje aplicado, ensambles en vivo y desarrollo escénico para niños, jóvenes y adultos.",
    modalidadClases: "Clases individuales, bandas y talleres según nivel.",
    planes:
      "Costos orientativos: desde aprox. $57.50 hasta $160+ (según planes trimestrales, frecuencia o promociones por sede).",
  },
  {
    id: "la-nota",
    tipo: "Academia pagada",
    nombre: "Academia de Música La Nota",
    imagen: "/logos/la-nota.png",
    ubicacion:
      "Sedes en Vía Israel, Paseo Albrook, Los Pueblos y Coronado, Panamá.",
    telefono: "Contacto directo por teléfono y WhatsApp según sede",
    sitioWeb: "https://www.academialanota.com/",
    instagram: "https://www.instagram.com/academialanota/",
    contacto: "https://www.academialanota.com/",
    maps: "https://www.google.com/maps/search/?api=1&query=Via+Israel+Panama",
    enfoque:
      "Iniciación musical infantil, piano, guitarra, violín, canto, batería, ukelele, lectura de partituras y cursos de verano.",
    trayectoria:
      "Red de academias en Panamá con programas por edades y metodologías con respaldo Yamaha en sedes seleccionadas.",
    modalidadClases: "Clases personalizadas y grupos pequeños.",
    planes:
      "Costos orientativos: desde aprox. $57.50 hasta $115+ al mes (varía según sede, edad, modalidad y promoción vigente).",
  },
  {
    id: "instituto-sol",
    tipo: "Academia pagada",
    nombre: "Instituto Sol",
    imagen: "/logos/instituto-sol.png",
    ubicacion:
      "Plaza Altos de Panamá, 2° piso, Local L-8A, Condado del Rey, Ciudad de Panamá.",
    telefono: "6650-8120 / 6203-8221",
    sitioWeb: "https://institutosolpty.com/",
    instagram: "https://www.instagram.com/institutosol.pa/",
    contacto: "https://institutosolpty.com/",
    maps: "https://www.google.com/maps/search/?api=1&query=Condado+del+Rey+Panama",
    enfoque:
      "Currículo musical y artístico estructurado en 4 niveles: piano, guitarra, violín, canto, batería, teoría y presentaciones semestrales.",
    trayectoria:
      "Academia centrada en el avance progresivo del estudiante con atención cercana en grupos pequeños y muestras de cierre.",
    modalidadClases: "Clases individuales y grupos pequeños; opción de primera clase de prueba.",
    planes:
      "Costos orientativos: desde $0 (primera clase de prueba) hasta planes mensuales aprox. de $65 a $135 según instrumento y frecuencia.",
  },
  {
    id: "alfaro",
    tipo: "Academia pagada",
    nombre: "Academia de Música Alfaro",
    imagen: "/logos/alfaro.png",
    ubicacion: "Vía Argentina, Ciudad de Panamá.",
    telefono: "+507 6799-6164",
    sitioWeb: "https://academia.cialfaro.com/",
    instagram: "https://www.instagram.com/academiamusicalalfaro/",
    contacto: "https://academia.cialfaro.com/",
    maps: "https://www.google.com/maps/search/?api=1&query=Via+Argentina+Panama",
    enfoque:
      "Piano, teclado, guitarra, violín, canto, batería, lectura musical y cursos infantiles de iniciación con Método Yamaha.",
    trayectoria:
      "Más de 80 años de tradición musical en Panamá formando generaciones de niños, jóvenes y adultos.",
    modalidadClases: "Clases individuales y grupales por edades y niveles.",
    planes:
      "Costos orientativos: desde aprox. $60 hasta $150+ al mes (según duración de clase, modalidad individual/grupal y programa).",
  },
  {
    id: "sono-arte",
    tipo: "Academia pagada",
    nombre: "Sono Arte",
    imagen: "/logos/sono-arte.png",
    ubicacion:
      "Av. Centenario, Edif. Plaza 507, Local Nº 18, Juan Díaz, Ciudad de Panamá.",
    telefono: "(+507) 397-1736 / (+507) 6414-7036",
    sitioWeb: "https://sonoartepanama.com/",
    instagram: "https://www.instagram.com/sonoartepanama/",
    contacto: "https://sonoartepanama.com/",
    maps: "https://www.google.com/maps/search/?api=1&query=Juan+Diaz+Panama",
    enfoque:
      "Guitarra, piano, canto, violín, batería, bajo eléctrico, solfeo y armonía en sesiones de 60 minutos.",
    trayectoria:
      "Más de 20 años formando estudiantes paso a paso con teoría aplicada y recitales de avance.",
    modalidadClases: "Clases de 1 hora en grupos pequeños o individual, con recuperación de clases.",
    planes:
      "Costos orientativos: desde aprox. $65 hasta $140+ al mes (varía según instrumento, horario y cantidad de horas semanales).",
  },
  {
    id: "prof-mateo",
    tipo: "Profesor particular",
    nombre: "Mateo Quintero (24 años · Instructor joven)",
    imagen: "/profesores/profesor-mateo.jpg",
    perfilDemostrativo: true,
    ubicacion: "Ciudad de Panamá (presencial y virtual)",
    telefono: "+507 6000-1101",
    contacto: "https://wa.me/50760001101",
    maps: "https://www.google.com/maps/search/?api=1&query=Ciudad+de+Panama",
    enfoque:
      "Guitarra acústica y eléctrica, ukelele, ritmo y acompañamiento de canciones.",
    trayectoria:
      "Egresado de formación musical contemporánea y participante activo en ensambles juveniles en Ciudad de Panamá.",
    experiencia:
      "3 años enseñando a principiantes, niños y jóvenes desde cero con repertorio práctico.",
    modalidadClases: "Clases particulares de 1 hora · Presencial o en línea.",
    planes: "Cobro por hora: $18 / hora.",
  },
  {
    id: "prof-valeria",
    tipo: "Profesor particular",
    nombre: "Valeria Mendoza (31 años · Instructora de cuerdas)",
    imagen: "/profesores/profesora-valeria.jpg",
    perfilDemostrativo: true,
    ubicacion: "Ciudad de Panamá (estudio, domicilio y virtual)",
    telefono: "+507 6000-2202",
    contacto: "https://wa.me/50760002202",
    maps: "https://www.google.com/maps/search/?api=1&query=Ciudad+de+Panama",
    enfoque:
      "Viola, violín inicial, técnica de arco, afinación, lectura en clave de do y solfeo.",
    trayectoria:
      "Integrante de agrupaciones de cámara y orquestas juveniles, especializada en repertorio Suzuki y técnica de cuerdas.",
    experiencia:
      "7 años guiando estudiantes desde nivel inicial hasta ingreso a orquestas estudiantiles.",
    modalidadClases: "Clases personalizadas · Presencial o virtual.",
    planes: "Cobro por hora: $25 / hora.",
  },
  {
    id: "prof-ricardo",
    tipo: "Profesor particular",
    nombre: "Ricardo Paredes (46 años · Maestro con amplia trayectoria)",
    imagen: "/profesores/profesor-ricardo.jpg",
    perfilDemostrativo: true,
    ubicacion: "Ciudad de Panamá (tardes y sábados)",
    telefono: "+507 6000-3303",
    contacto: "https://wa.me/50760003303",
    maps: "https://www.google.com/maps/search/?api=1&query=Ciudad+de+Panama",
    enfoque:
      "Piano, armonía, lectura de partituras, teoría musical y preparación para audiciones.",
    trayectoria:
      "Pianista, arreglista y docente con participación en agrupaciones sinfónicas, bandas y dirección musical en Panamá.",
    experiencia:
      "18 años formando estudiantes de distintas edades en técnica pianística y lenguaje musical.",
    modalidadClases: "Sesiones individuales · Presencial o en línea.",
    planes: "Cobro por hora: $32 / hora.",
  },
  {
    id: "prof-beatriz",
    tipo: "Profesor particular",
    nombre: "Beatriz Saldaña (58 años · Docente decana)",
    imagen: "/profesores/profesora-beatriz.jpg",
    perfilDemostrativo: true,
    ubicacion: "Ciudad de Panamá (sesiones individuales)",
    telefono: "+507 6000-4404",
    contacto: "https://wa.me/50760004404",
    maps: "https://www.google.com/maps/search/?api=1&query=Ciudad+de+Panama",
    enfoque:
      "Canto, técnica vocal, control respiratorio, proyección escénica y ensamble.",
    trayectoria:
      "Más de dos décadas de trayectoria pedagógica y escénica dirigiendo coros y talleres formativos.",
    experiencia:
      "25+ años enseñando proyección vocal, afinación, ritmo y seguridad en escenario.",
    modalidadClases: "Coaching vocal y clases individuales.",
    planes: "Cobro por hora: $30 / hora.",
  },
];
