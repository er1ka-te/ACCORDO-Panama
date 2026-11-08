import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative">
      <div className="shell relative grid gap-8 py-24 md:py-32">
        <div className="hero-glow mx-auto max-w-2xl text-center">
          <p className="eyebrow">{SITE.fullName}</p>
          <h1 className="mt-4 text-5xl leading-tight text-cream md:text-7xl">{SITE.name}</h1>
          <p className="mt-3 font-display text-3xl text-gold md:text-4xl">{SITE.slogan}</p>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg text-cream/80 md:text-xl">{SITE.communityMessage}</p>
        </div>
      </div>
    </section>
  );
}
