import catCuerda from "@/assets/cat-cuerda.jpg";
import catViento from "@/assets/cat-viento.jpg";
import catLibros from "@/assets/cat-libros.jpg";
import catPercusion from "@/assets/cat-percusion.jpg";

export type Modalidad = "Venta" | "Alquiler" | "Donación";
export type Familia = "Cuerda" | "Viento" | "Percusión" | "Teclado" | "Libros y Partituras" | "Accesorios";
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

// IMÁGENES DE PRODUCTOS: cambia estas URLs; cada producto enlaza su foto mediante `imagen`.
// ACCESORIOS: cambia `imagen` en los registros a1–a8 de PRODUCTOS_SEED.
const PHOTOS = {
  violin: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=1200&q=80",
  viola: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?auto=format&fit=crop&w=1200&q=80",
  cello: "https://images.unsplash.com/photo-1558556405-3071bd8d3ee6?auto=format&fit=crop&w=1200&q=80",
  guitar: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
  trumpet: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
  sax: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80&crop=right",
  flute: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
  percussion: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80",
  piano: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
  score: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  book: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=1200&q=80",
  accessory: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
} as const;

export const IMAGENES = {
  Cuerda: catCuerda,
  Viento: catViento,
  Percusión: catPercusion,
  Teclado: PHOTOS.piano,
  "Libros y Partituras": catLibros,
  Accesorios: PHOTOS.accessory,
} satisfies Record<Familia, string>;

const stringSizes = ["1/4", "1/2", "3/4", "4/4"];
const violaSizes = ["1/4", "1/2", "3/4", "4/4", '15.5"'];
const windModels = ["Sib", "Do", "Standard"];
const formats = ["Físico impreso", "Digital PDF descargable"];

export const PRODUCTOS_SEED: Producto[] = [
  { id: "p1", titulo: "Violín de estudio", familia: "Cuerda", tipo: "Violín", modalidad: "Alquiler", precio: 25, unidad: "por mes", estado: "Usado — excelente", imagen: PHOTOS.violin, descripcion: "Incluye arco, resina y estuche rígido. Ideal para iniciación.", selectorLabel: "Tamaño", opciones: stringSizes },
  { id: "p2", titulo: "Viola para estudiantes", familia: "Cuerda", tipo: "Viola", modalidad: "Alquiler", precio: 32, unidad: "por mes", estado: "Usado — muy bueno", imagen: PHOTOS.viola, descripcion: "Revisada por luthier aliado, con puente ajustado y cuerdas nuevas.", selectorLabel: "Tamaño", opciones: violaSizes },
  { id: "p3", titulo: "Violonchelo con estuche", familia: "Cuerda", tipo: "Violonchelo", modalidad: "Alquiler", precio: 75, unidad: "por mes", estado: "Usado — bueno", imagen: PHOTOS.cello, descripcion: "Instrumento cálido para nivel inicial e intermedio, con arco y estuche.", selectorLabel: "Tamaño", opciones: stringSizes },
  { id: "p4", titulo: "Guitarra acústica de nylon", familia: "Cuerda", tipo: "Guitarra", modalidad: "Venta", precio: 48, estado: "Nuevo", imagen: PHOTOS.guitar, descripcion: "Tamaño clásico para clases escolares y talleres comunitarios.", selectorLabel: "Tamaño", opciones: ["3/4", "4/4"] },
  { id: "p5", titulo: "Trompeta de estudio reacondicionada", familia: "Viento", tipo: "Trompeta", modalidad: "Venta", precio: 95, estado: "Usado — muy bueno", imagen: PHOTOS.trumpet, descripcion: "Válvulas lubricadas, campana pulida y boquilla 7C incluida.", selectorLabel: "Afinación / Modelo", opciones: windModels },
  { id: "p6", titulo: "Saxofón alto de iniciación", familia: "Viento", tipo: "Saxofón", modalidad: "Alquiler", precio: 45, unidad: "por mes", estado: "Usado — excelente", imagen: PHOTOS.sax, descripcion: "Saxofón revisado con boquilla, correa y estuche acolchado.", selectorLabel: "Afinación / Modelo", opciones: ["Mib — Alto", "Sib — Tenor", "Standard"] },
  { id: "p7", titulo: "Flauta traversa donada", familia: "Viento", tipo: "Flauta", modalidad: "Donación", precio: 0, estado: "Usado — bueno", imagen: PHOTOS.flute, descripcion: "Asignación para estudiantes con carta de su centro educativo.", selectorLabel: "Afinación / Modelo", opciones: ["Do", "Standard"] },
  { id: "p8", titulo: "Cajón artesanal", familia: "Percusión", tipo: "Cajón", modalidad: "Venta", precio: 65, estado: "Nuevo", imagen: PHOTOS.percussion, descripcion: "Madera nacional y sonido cálido para acompañamiento acústico.", selectorLabel: "Modelo", opciones: ["Standard", "Con bordones ajustables"] },
  { id: "p9", titulo: "Teclado de 61 teclas", familia: "Teclado", tipo: "Teclado", modalidad: "Alquiler", precio: 40, unidad: "por mes", estado: "Usado — excelente", imagen: PHOTOS.piano, descripcion: "Incluye atril, pedal y fuente para estudiar en casa.", selectorLabel: "Modelo", opciones: ["61 teclas", "88 teclas"] },
  { id: "p10", titulo: "Suzuki Violín 1", familia: "Libros y Partituras", tipo: "Método", modalidad: "Venta", precio: 12, estado: "Disponible", formato: "Digital", imagen: PHOTOS.score, descripcion: "Material de estudio introductorio con repertorio progresivo.", selectorLabel: "Formato", opciones: formats, pdfPreview: true },
  { id: "p11", titulo: "Suzuki Viola 1", familia: "Libros y Partituras", tipo: "Método", modalidad: "Venta", precio: 12, estado: "Disponible", formato: "Digital", imagen: PHOTOS.book, descripcion: "Edición para viola con ejercicios y piezas de iniciación.", selectorLabel: "Formato", opciones: formats, pdfPreview: true },
  { id: "p12", titulo: "Método Sevcik", familia: "Libros y Partituras", tipo: "Técnica", modalidad: "Venta", precio: 8, estado: "Digital", formato: "Digital", imagen: PHOTOS.score, descripcion: "Ejercicios técnicos graduados para cuerda frotada.", selectorLabel: "Formato", opciones: formats, pdfPreview: true },
  { id: "p13", titulo: "Partituras de Orquesta", familia: "Libros y Partituras", tipo: "Partituras", modalidad: "Donación", precio: 0, estado: "Digital", formato: "Digital", imagen: PHOTOS.score, descripcion: "Selección demostrativa para práctica de ensamble juvenil.", selectorLabel: "Formato", opciones: formats, pdfPreview: true },
  { id: "a1", titulo: "Resina / Colofonia para arco", familia: "Accesorios", tipo: "Mantenimiento", modalidad: "Venta", precio: 8, estado: "Nuevo", imagen: PHOTOS.accessory, descripcion: "Para violín, viola, violonchelo y contrabajo.", selectorLabel: "Instrumento", opciones: ["Violín", "Viola", "Violonchelo", "Contrabajo"] },
  { id: "a2", titulo: "Soporte de hombro ajustable", familia: "Accesorios", tipo: "Ergonomía", modalidad: "Venta", precio: 18, estado: "Nuevo", imagen: PHOTOS.violin, descripcion: "Almohadilla regulable para postura cómoda.", selectorLabel: "Compatibilidad", opciones: ["Violín 1/2–3/4", "Violín 4/4", "Viola 15–16 pulgadas"] },
  { id: "a3", titulo: "Estuche rígido reforzado", familia: "Accesorios", tipo: "Estuche", modalidad: "Venta", precio: 72, estado: "Nuevo", imagen: PHOTOS.cello, descripcion: "Plástico reforzado, cierres seguros y correa acolchada.", selectorLabel: "Instrumento", opciones: ["Violín", "Viola", "Violonchelo"] },
  { id: "a4", titulo: "Estuche ligero acolchado", familia: "Accesorios", tipo: "Estuche", modalidad: "Venta", precio: 38, estado: "Nuevo", imagen: PHOTOS.guitar, descripcion: "Tela resistente, bolsillos y protección interior.", selectorLabel: "Instrumento", opciones: ["Violín", "Viola", "Guitarra"] },
  { id: "a5", titulo: "Atril metálico plegable", familia: "Accesorios", tipo: "Atril", modalidad: "Venta", precio: 24, estado: "Nuevo", imagen: PHOTOS.score, descripcion: "Altura regulable y bolsa de transporte.", selectorLabel: "Modelo", opciones: ["Plegable", "Orquestal reforzado"] },
  { id: "a6", titulo: "Juego de cuerdas de repuesto", familia: "Accesorios", tipo: "Cuerdas", modalidad: "Venta", precio: 22, estado: "Nuevo", imagen: PHOTOS.violin, descripcion: "Juego completo para mantenimiento preventivo.", selectorLabel: "Instrumento", opciones: ["Violín", "Viola", "Violonchelo", "Guitarra"] },
  { id: "a7", titulo: "Afinador digital cromático", familia: "Accesorios", tipo: "Afinador", modalidad: "Venta", precio: 14, estado: "Nuevo", imagen: PHOTOS.guitar, descripcion: "Pantalla clara y pinza de vibración.", selectorLabel: "Modelo", opciones: ["Pinza", "Cromático de bolsillo"] },
  { id: "a8", titulo: "Metrónomo digital", familia: "Accesorios", tipo: "Metrónomo", modalidad: "Venta", precio: 19, estado: "Nuevo", imagen: PHOTOS.piano, descripcion: "Tempo regulable, pulso audible y salida para audífonos.", selectorLabel: "Modelo", opciones: ["Digital compacto", "Digital con afinador"] },
];

export type Escuela = {
  id: string;
  nombre: string;
  tipo: "Fundación y red oficial" | "Academia pagada" | "Profesor particular";
  ubicacion: string;
  provincia: string;
  corregimiento: string;
  referencia: string;
  planes: string;
  costoMin: number;
  costoMax: number;
  enfoque: string;
  instagram: string;
  maps: string;
  contacto: string;
  foto?: string;
  trayectoria?: string;
  modalidadClases?: string;
  perfilDemostrativo?: boolean;
};

const mapsSearch = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const ESCUELAS: Escuela[] = [
  // ACADEMIAS Y FUNDACIONES: añade `foto: "https://..."` a cada entidad para mostrar su imagen.
  // PROFESORES PRIVADOS: cambia el campo `foto` de los registros p-vla, p-vln, p-cello, etc.
  { id: "e1", nombre: "Red de Orquestas y Coros Juveniles de Panamá", tipo: "Fundación y red oficial", ubicacion: "Antiguo Colegio Abel Bravo, Calle 12 entre Av. Roosevelt y Paseo Gorgas", provincia: "Colón", corregimiento: "Barrio Norte", referencia: "Centro de Arte y Cultura de Colón (CACCO)", planes: "Programa oficial; admisión y cupos según cada módulo", costoMin: 0, costoMax: 0, enfoque: "Orquesta, coros, cuerdas, vientos y formación colectiva", instagram: "https://www.instagram.com/redorquestaspanama/", maps: mapsSearch("Centro de Arte y Cultura de Colón antiguo Colegio Abel Bravo"), contacto: "https://www.instagram.com/redorquestaspanama/" },
  { id: "e2", nombre: "Fundación Danilo Pérez", tipo: "Fundación y red oficial", ubicacion: "Calle 63 A Oeste, casa 12", provincia: "Panamá", corregimiento: "Betania", referencia: "Sede de la Fundación Danilo Pérez", planes: "Talleres, programas sociales y becas; consultar convocatoria", costoMin: 0, costoMax: 0, enfoque: "Jazz, improvisación, ensambles y formación integral", instagram: "https://www.instagram.com/fundaciondaniloperez/", maps: mapsSearch("Fundación Danilo Pérez Calle 63 A Oeste casa 12 Betania"), contacto: "mailto:info@fundaciondaniloperez.org" },
  { id: "e3", nombre: "FUNSINCOPA", tipo: "Fundación y red oficial", ubicacion: "Edificio Galerías Colonial, piso 2, local 26, Boulevard El Dorado y Calle Miguel Brostella", provincia: "Panamá", corregimiento: "Bethania", referencia: "Galerías Colonial, local 26", planes: "Programas de formación orquestal; costos según convocatoria", costoMin: 0, costoMax: 0, enfoque: "Formación sinfónica y música de cámara", instagram: "https://www.instagram.com/funsincopa_oficial/", maps: mapsSearch("FUNSINCOPA Galerías Colonial El Dorado Panamá"), contacto: "https://funsincopa.org/contacto/" },
  { id: "e4", nombre: "Academia de Música Alfaro", tipo: "Academia pagada", ubicacion: "Vía Argentina, El Cangrejo", provincia: "Panamá", corregimiento: "Bella Vista", referencia: "Sede de Compañía Alfaro en Vía Argentina", planes: "Clases pagadas; tarifa disponible por consulta directa", costoMin: 1, costoMax: 100, enfoque: "Instrumentos, canto y educación musical", instagram: "https://www.instagram.com/academiamusicaalfaro/", maps: mapsSearch("Academia de Música Alfaro Vía Argentina Panamá"), contacto: "https://academia.cialfaro.com/" },
  { id: "e5", nombre: "Academia de Música La Nota", tipo: "Academia pagada", ubicacion: "Vía Israel, Ciudad de Panamá", provincia: "Panamá", corregimiento: "San Francisco", referencia: "Sede Vía Israel; confirmar local exacto al contactar", planes: "Programas individuales y grupales; tarifa por consulta", costoMin: 1, costoMax: 100, enfoque: "Piano, guitarra, canto y formación infantil", instagram: "https://www.instagram.com/lanotapanama/", maps: mapsSearch("Academia de Música La Nota Vía Israel Panamá"), contacto: "https://www.academialanota.com/" },
  { id: "e6", nombre: "Academia SonoArte", tipo: "Academia pagada", ubicacion: "Avenida Centenario, Plaza 507, local 18", provincia: "Panamá", corregimiento: "Parque Lefevre", referencia: "Al lado del Super 99, Costa del Este", planes: "Clases pagadas; tarifa disponible por consulta", costoMin: 1, costoMax: 100, enfoque: "Piano, guitarra, batería, canto y estimulación musical", instagram: "https://www.instagram.com/sonoartepanama/", maps: mapsSearch("SonoArte Plaza 507 Avenida Centenario Panamá"), contacto: "https://sonoartepanama.com/contacto.html" },
  { id: "p-vla", nombre: "María Elena Ríos", tipo: "Profesor particular", ubicacion: "Estudio privado en El Cangrejo", provincia: "Panamá", corregimiento: "Bella Vista", referencia: "Ubicación exacta al confirmar la clase", planes: "$30 por hora", costoMin: 30, costoMax: 30, enfoque: "Viola y lectura orquestal", instagram: "https://www.instagram.com/", maps: mapsSearch("El Cangrejo Bella Vista Panamá"), contacto: "mailto:contacto@accordopanama.com?subject=Clase%20de%20viola", foto: PHOTOS.viola, trayectoria: "Licenciada en Música; formación orquestal en Panamá", modalidadClases: "Presencial en estudio / Online", perfilDemostrativo: true },
  { id: "p-vln", nombre: "Carlos Méndez", tipo: "Profesor particular", ubicacion: "Clases en San Francisco", provincia: "Panamá", corregimiento: "San Francisco", referencia: "A domicilio en el área metropolitana", planes: "$25 por hora", costoMin: 25, costoMax: 25, enfoque: "Violín inicial e intermedio", instagram: "https://www.instagram.com/", maps: mapsSearch("San Francisco Ciudad de Panamá"), contacto: "mailto:contacto@accordopanama.com?subject=Clase%20de%20violín", foto: PHOTOS.violin, trayectoria: "Egresado de formación musical superior en Panamá", modalidadClases: "A domicilio / Online", perfilDemostrativo: true },
  { id: "p-cello", nombre: "Andrea Castillo", tipo: "Profesor particular", ubicacion: "Estudio en Clayton", provincia: "Panamá", corregimiento: "Ancón", referencia: "Cerca de Ciudad del Saber; dirección al reservar", planes: "$35 por hora", costoMin: 35, costoMax: 35, enfoque: "Violonchelo, postura y técnica de arco", instagram: "https://www.instagram.com/", maps: mapsSearch("Clayton Ancón Panamá"), contacto: "mailto:contacto@accordopanama.com?subject=Clase%20de%20violonchelo", foto: PHOTOS.cello, trayectoria: "Licenciada en Música con experiencia en ensambles", modalidadClases: "Presencial en estudio / Online", perfilDemostrativo: true },
  { id: "p-piano", nombre: "Javier Morales", tipo: "Profesor particular", ubicacion: "Estudio en Betania", provincia: "Panamá", corregimiento: "Betania", referencia: "Referencia exacta al confirmar matrícula", planes: "$25 por hora", costoMin: 25, costoMax: 25, enfoque: "Piano, armonía y teoría musical", instagram: "https://www.instagram.com/", maps: mapsSearch("Betania Ciudad de Panamá"), contacto: "mailto:contacto@accordopanama.com?subject=Clase%20de%20piano", foto: PHOTOS.piano, trayectoria: "Licenciado en Música, experiencia docente", modalidadClases: "Presencial en estudio / Online", perfilDemostrativo: true },
  { id: "p-trumpet", nombre: "Luis A. Gómez", tipo: "Profesor particular", ubicacion: "Clases en Río Abajo", provincia: "Panamá", corregimiento: "Río Abajo", referencia: "A domicilio con coordinación previa", planes: "$20 por hora", costoMin: 20, costoMax: 20, enfoque: "Trompeta, respiración y repertorio de banda", instagram: "https://www.instagram.com/", maps: mapsSearch("Río Abajo Panamá"), contacto: "mailto:contacto@accordopanama.com?subject=Clase%20de%20trompeta", foto: PHOTOS.trumpet, trayectoria: "Músico de banda y formador juvenil", modalidadClases: "A domicilio / Online", perfilDemostrativo: true },
  { id: "p-flute", nombre: "Sofía Herrera", tipo: "Profesor particular", ubicacion: "Clases en Costa del Este", provincia: "Panamá", corregimiento: "Juan Díaz", referencia: "Estudio privado; dirección al reservar", planes: "$30 por hora", costoMin: 30, costoMax: 30, enfoque: "Flauta traversa, respiración y lectura", instagram: "https://www.instagram.com/", maps: mapsSearch("Costa del Este Panamá"), contacto: "mailto:contacto@accordopanama.com?subject=Clase%20de%20flauta", foto: PHOTOS.flute, trayectoria: "Formación superior en música y experiencia orquestal", modalidadClases: "Presencial en estudio / Online", perfilDemostrativo: true },
];

export const FAQS = [
  { q: "¿Cómo funciona el alquiler de un instrumento?", a: "Eliges el instrumento, seleccionas la medida, reservas y firmas un acuerdo mensual. Pagas el primer mes y un depósito reembolsable." },
  { q: "¿Qué pasa si el instrumento se daña?", a: "El desgaste normal está cubierto. Para daños mayores aplicamos el depósito y coordinamos la revisión con un luthier aliado." },
  { q: "¿Puedo publicar desde el interior?", a: "Sí. Coordinamos recepción en bodega o envío con un transportista aliado." },
  { q: "¿Los libros digitales se descargan al instante?", a: "La vista previa es demostrativa; al habilitar pagos, el enlace autorizado se enviará por correo." },
  { q: "¿Hay opciones gratuitas?", a: "Sí. Hay donaciones y programas de fundaciones o de la Red sujetos a cupos y convocatoria." },
];

export const RANGOS = [
  { id: "todos", label: "Todos los precios", min: 0, max: Infinity },
  { id: "gratis", label: "Gratuitos / Donaciones ($0)", min: 0, max: 0 },
  { id: "economico", label: "Económico ($1 - $50)", min: 1, max: 50 },
  { id: "intermedio", label: "Intermedio ($51 - $100)", min: 51, max: 100 },
] as const;

export const formatPrecio = (p: Producto) =>
  p.precio === 0 ? "Gratis / Donación" : `$${p.precio}${p.unidad ? ` ${p.unidad}` : ""}`;