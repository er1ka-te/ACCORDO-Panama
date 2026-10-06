import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { FAQS } from "@/lib/data";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y preguntas frecuentes — ACCORDO Panamá" },
      {
        name: "description",
        content:
          "Escríbenos para alquileres, compras, donaciones o alianzas con escuelas de música en Panamá. Preguntas frecuentes incluidas.",
      },
      { property: "og:title", content: "Contacto — ACCORDO Panamá" },
      { property: "og:description", content: "Estamos para ayudarte con tu instrumento o tus clases." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="shell py-14">
      <p className="eyebrow">Contacto</p>
      <h1 className="mt-2 text-4xl">Hablemos de música</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
          className="grid gap-4 rounded-xl border border-border bg-card p-6"
        >
          <label className="grid gap-1.5 text-sm font-semibold">
            Nombre
            <input required className="field" placeholder="Tu nombre" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Correo
            <input required type="email" className="field" placeholder="tucorreo@correo.com" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Mensaje
            <textarea required className="field min-h-32" placeholder="¿En qué te ayudamos?" />
          </label>
          <button type="submit" className="btn-coffee">
            Enviar mensaje
          </button>
          {enviado && (
            <p className="rounded-md border border-gold/40 bg-secondary p-3 text-sm">
              ¡Mensaje enviado (demostración)! Te responderemos a la brevedad.
            </p>
          )}
        </form>

        <div className="grid gap-4">
          <div className="grid gap-3 rounded-xl border border-border bg-card p-6 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-deep" /> {SITE.email}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-deep" /> {SITE.supportEmail}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-deep" /> {SITE.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-deep" /> {SITE.city}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-2xl">Preguntas frecuentes</h2>
            <div className="mt-4 grid gap-2">
              {FAQS.map((f) => (
                <details key={f.q} className="rounded-md border border-border p-3 text-sm transition-colors hover:border-gold/50">
                  <summary className="cursor-pointer font-semibold">{f.q}</summary>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
