/**
 * Configuración global de marca.
 * Cambia aquí el nombre del proyecto, slogan y datos de contacto.
 */
export const SITE = {
  name: "ACCORDO",
  fullName: "ACCORDO Panamá",
  slogan: "Tu camino musical",
  communityMessage:
    "El punto de encuentro para la comunidad musical en Panamá. Conectamos instrumentos, libros y accesorios con estudiantes y fundaciones que los necesitan.",
  claim:
    "Alquila, compra o publica instrumentos, libros y partituras a precios accesibles para estudiantes de todo el país.",
  email: "contacto@accordopanama.com",
  supportEmail: "soporte@accordopanama.com",
  phone: "+507 6000-0000",
  city: "Ciudad de Panamá, Panamá",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    whatsapp: "https://wa.me/50760000000",
  },

} as const;

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/directorio", label: "Dónde aprender" },
  { to: "/publicar", label: "Publicar" },
  { to: "/contacto", label: "Contacto" },
  { to: "/admin", label: "Panel" },
] as const;
