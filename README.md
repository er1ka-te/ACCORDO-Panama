# ACCORDO

## Arquitectura React actual

- `src/routes/`: navegación y metadatos. Catálogo y panel renderizan componentes separados.
- `src/components/`: `SiteHeader`, `Hero`, `AnnouncementBanner`, `DirectLinks`, `Catalog`, `Cart`, `Checkout`, `Donations`, `LearningPath`, `AIChat`, `AdminPanel` y `ExperienceAdmin`.
- `src/lib/experience-store.tsx`: estado demostrativo validado y versionado del navegador; no es control de acceso ni un servicio de cobros.
- `src/lib/aria.functions.ts` y `aria.server.ts`: validación y conexión de Aria con Lovable AI. La clave permanece únicamente en el servidor.

### Dónde cambiar imágenes

- Logo: `LOGO_HEADER_URL` en `src/lib/image-config.ts`; vacío conserva el SVG.
- Favicon: reemplazar `public/favicon.ico` o cambiar `FAVICON_URL` en el mismo archivo.
- Avatar: `ARIA_AVATAR_URL` en el mismo archivo; vacío conserva el icono.
- Productos: `PHOTOS` y el campo `imagen` de `PRODUCTOS_SEED` en `src/lib/data.ts`.
- Accesorios: campo `imagen` de los registros `a1`–`a8` del mismo archivo.
- Academias, fundaciones y profesores: campo `foto` de `ESCUELAS` en el mismo archivo.
- Anuncios: `imagen` en `ANNOUNCEMENTS`, o edición desde el panel de anuncios.

### Desarrollo y alcance

Compatible con Node.js y el proyecto React/TanStack existente: `npm install` y `npm run dev`; también se admite Bun. Pruebas: `bunx vitest run src/lib/experience.test.ts`.
Los pagos, membresías, solicitudes y anuncios son demostrativos y locales; no se cobran tarjetas ni se envían mensajes automáticamente. Los anuncios iniciales son ejemplos, no eventos confirmados. Aria usa Lovable AI y requiere el servicio de servidor; no funciona en alojamiento exclusivamente estático como GitHub Pages.

---

## Brief original (referencia histórica)

Actúa como un desarrollador Web Full Stack y diseñador UX/UI experto. Necesito que generes el código para mi proyecto final de emprendimiento digital llamado "Sonora Panamá" (o un nombre fácil de cambiar mediante variables CSS/JS).

--- OBJETIVO DEL PROYECTO ---

Plataforma web interactiva en Panamá enfocada en facilitar el acceso a la música para niños, jóvenes y estudiantes. Permite el alquiler y venta de instrumentos musicales (cuerda, viento, percusión, etc.) y libros/partituras físicas o digitales a precios accesibles. También incluye un directorio de academias, fundaciones y escuelas de música en Panamá.

--- REQUISITOS DE DISEÑO Y ESTILOS ---

1. Paleta de colores elegante: Tonos marrón café profundo (#2C1D11, #3D2B1F), acentos en dorado elegante (#D4AF37, #C5A059), tonos beige/crema suave (#FDFBF7) para fondos y blanco para contraste.

2. Arquitectura CSS Modular: Usa variables CSS (:root) al inicio del archivo para colores, fuentes, nombres y tamaños, de modo que cambiar el nombre del proyecto, un color o tamaño sea ultra fácil sin romper la estructura.

3. Interactividad y Animaciones:

   - Hover effects suaves (transición de transform scale, sombras doradas, resplandor) en tarjetas, botones y menús.

   - Microinteracciones responsivas al pasar el cursor sobre los productos.

4. Reproductor de Música de Fondo: Un reproductor discreto en una esquina con botón Play/Pause que reproduzca una melodía instrumental suave y relajante (usa una URL de audio instrumental en royalty-free formato MP3).

5. Diseño 100% Responsivo (Mobile First y Desktop).

--- ESTRUCTURA DE LA PÁGINA Y SECCIONES ---

1. LANDING PAGE / INICIO:

   - Header/Navbar con Logo (diseñado con SVG/CSS fácil de modificar), menú de navegación y nombre "Sonora".

   - Hero Section: Título llamativo, slogan ("Conectando la música en Panamá"), botón de llamado a la acción (CTA) "Explorar Catálogo" y "Ofrecer mi Instrumento".

2. CATÁLOGO CON FILTROS AVANZADOS (Instrumentos y Libros/Partituras):

   - Pestañas/Filtros por Categoría: "Instrumentos" (Violas, Violines, Chelos, Guitarras, etc.), "Libros y Partituras" (Físico y Digital).

   - Filtro por Modalidad: "Venta" o "Alquiler".

   - FILTRO POR PRECIO: Botones o selector por rangos exactos:

     * Gratuitos / Donaciones ($0)

     * Económico ($1 - $50)

     * Intermedio ($51 - $100)

     * Todos los precios

   - Tarjetas de producto interactivas con foto, título, precio, badge (Alquiler/Venta), estado del producto y botón "Ver detalles".

3. SECCIÓN DIRECTORIO: "Dónde Aprender en Panamá"

   - Directorio de escuelas, fundaciones y academias de música.

   - Filtro de precio por planes/costos (Gratis/Fundación, $1 - $100).

   - Tarjeta para cada lugar mostrando: Nombre, Ubicación en Panamá, Redes Sociales, Planes/Costos y botón de contacto.

4. SECCIÓN "PONE TU INSTRUMENTO O LIBRO A LA VENTA / ALQUILER":

   - Formulario de contacto explicativo donde los músicos o propietarios pueden registrar su instrumento o libro.

   - Explicación clara y transparente sobre el proceso de verificación, recepción en bodega física de almacenamiento y logística para demostrar transparencia y confianza.

5. ASISTENTE DE IA INTEGRADO (Widget de Chatbot):

   - Un Chatbot flotante ("Asistente Musical Sonora") en la esquina inferior derecha.

   - Funcionalidades interactivas: Responde preguntas frecuentes, recomienda instrumentos o escuelas según el presupuesto del estudiante y explica cómo alquilar o publicar un instrumento.

6. PANEL DE ADMINISTRACIÓN (Simulado/Frontend):

   - Vista sencilla o modal para gestionar/agregar nuevos productos, cambiar precios o revisar solicitudes de alquiler.

7. CONTACTO Y FOOTER:

   - Formulario directo de contacto, redes sociales, preguntas frecuentes (FAQ) y derechos reservados.

--- ESPECIFICACIONES TÉCNICAS DEL CÓDIGO ---

- Código limpio, bien comentado y estructurado (HTML5 semántico, CSS3 moderno con Grid/Flexbox sin romper maquetación, y JavaScript ES6 puro).

- Fácilmente adaptable para despliegue en GitHub Pages / Netlify.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://accordo-music.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3df24c0-cd77-411f-aabe-603d12b67e35).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
