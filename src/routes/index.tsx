import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Wallet, Music4 } from "lucide-react";
import hero from "@/assets/hero-strings.jpg";
import orchestraPoster from "@/assets/orquesta-poster.jpg";
import catCuerda from "@/assets/cat-cuerda.jpg";
import catViento from "@/assets/cat-viento.jpg";
import catPercusion from "@/assets/cat-percusion.jpg";
import catLibros from "@/assets/cat-libros.jpg";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACCORDO Panamá — Tu camino musical" },
      {
        name: "description",
        content:
          "Alquila, compra o publica instrumentos, libros y partituras en Panamá. Directorio de academias y fundaciones de música.",
      },
      { property: "og:title", content: "ACCORDO Panamá — Tu camino musical" },
      {
        property: "og:description",
        content: "Instrumentos y partituras accesibles para estudiantes panameños.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

const CATEGORIAS = [
  { img: catCuerda, titulo: "Cuerda", detalle: "Violines, violas, chelos y guitarras" },
  { img: catViento, titulo: "Viento", detalle: "Trompetas, clarinetes y flautas" },
  { img: catPercusion, titulo: "Percusión", detalle: "Cajones, djembés y accesorios" },
  { img: catLibros, titulo: "Libros y Partituras", detalle: "Material físico y digital" },
];

const VALORES = [
  { Icon: Wallet, t: "Precios accesibles", d: "Desde $0 en donaciones y alquileres desde $6 al mes." },
  { Icon: ShieldCheck, t: "Instrumentos verificados", d: "Revisión técnica y ficha de estado antes de publicar." },
  { Icon: Truck, t: "Bodega y logística", d: "Recepción, inventario fotográfico y envío a todo el país." },
  { Icon: Music4, t: "Comunidad musical", d: "Directorio de fundaciones y academias en cada provincia." },
];

function Inicio() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={orchestraPoster}
          aria-label="Orquesta tocando en un teatro"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/assets/orquesta.mp4" type="video/mp4" />
        </video>
        <img src={hero} alt="Instrumentos de cuerda" className="absolute inset-0 h-full w-full object-cover motion-safe:hidden" />
        <div className="absolute inset-0 bg-coffee/75" />
        <div className="shell relative grid gap-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow">{SITE.fullName}</p>
            <h1 className="mt-4 text-4xl leading-tight text-cream md:text-6xl">{SITE.name}</h1>
            <p className="mt-3 font-display text-3xl text-gold md:text-4xl">{SITE.slogan}</p>
            <p className="mt-5 max-w-xl text-base text-cream/80">{SITE.claim}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="btn-gold">
                Explorar catálogo
              </Link>
              <Link to="/publicar" className="btn-outline-gold">
                Ofrecer mi instrumento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="shell grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {VALORES.map(({ Icon, t, d }) => (
          <article key={t} className="card-lift rounded-xl border border-border bg-card p-6">
            <Icon className="h-6 w-6 text-gold-deep" />
            <h3 className="mt-4 text-xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </article>
        ))}
      </section>

      {/* CATEGORÍAS */}
      <section className="shell py-8">
        <p className="eyebrow">Catálogo</p>
        <h2 className="mt-2 text-3xl md:text-4xl">Encuentra tu instrumento</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.titulo}
              to="/catalogo"
              className="card-lift group overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={c.img}
                alt={c.titulo}
                loading="lazy"
                width={900}
                height={700}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-xl">{c.titulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.detalle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA DIRECTORIO */}
      <section className="shell py-16">
        <div className="surface-coffee grid gap-6 rounded-2xl p-10 md:grid-cols-[1.4fr_auto] md:items-center">
          <div>
            <p className="eyebrow">Dónde aprender</p>
            <h2 className="mt-2 text-3xl text-cream">Academias, escuelas y fundaciones en Panamá</h2>
            <p className="mt-3 max-w-xl text-sm text-cream/75">
              Filtra por costo, desde programas gratuitos de fundación hasta planes mensuales, y contacta directo al lugar.
            </p>
          </div>
          <Link to="/directorio" className="btn-gold justify-self-start">
            Ver directorio
          </Link>
        </div>
      </section>
    </>
  );
}
