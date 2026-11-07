import hero from "@/assets/hero-strings.jpg";
import orchestraPoster from "@/assets/orquesta-poster.jpg";
import { SITE } from "@/lib/site";

export function Hero() { return (
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
          </div>
        </div>
      </section>
); }
