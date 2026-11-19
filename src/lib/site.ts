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
  phone: "+507 6565-8090",
  city: "Ciudad de Panamá, Panamá",
  social: {
    instagram: "https://instagram/accordopanama.com",
    facebook: "https://facebook/accordopanama.com",
    tiktok: "https://tiktok/accordopanama.com",
    whatsapp: "https://wa.me/5076565-8090",
  },

} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/catalogo", label: "Shop" },
  { to: "/directorio", label: "Dónde aprender" },
  { to: "/publicar", label: "Publicar" },
  { to: "/contacto", label: "Contacto" },
  { to: "/admin", label: "Panel" },
] as const;
