/**
 * Configuración global de marca.
 * Cambia aquí el nombre del proyecto, slogan y datos de contacto.
 */
export const SITE = {
  name: "Sonora",
  fullName: "Sonora Panamá",
  slogan: "Conectando la música en Panamá",
  claim:
    "Alquila, compra o publica instrumentos, libros y partituras a precios accesibles para estudiantes de todo el país.",
  email: "hola@sonorapanama.com",
  phone: "+507 6000-0000",
  city: "Ciudad de Panamá, Panamá",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    whatsapp: "https://wa.me/50760000000",
  },
  /** Melodía instrumental de fondo (royalty-free). Cambia la URL cuando quieras. */
  ambientTrack:
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=relaxing-145038.mp3",
} as const;

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/directorio", label: "Dónde aprender" },
  { to: "/publicar", label: "Publicar" },
  { to: "/contacto", label: "Contacto" },
  { to: "/admin", label: "Panel" },
] as const;
