import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";
import { FAQS } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="surface-coffee mt-24">
      <div className="shell grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-cream/70">{SITE.claim}</p>
          <div className="mt-5 flex gap-3">
            {[
              { href: SITE.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: SITE.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: SITE.social.tiktok, Icon: Music2, label: "TikTok" },
              { href: SITE.social.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-gold/40 p-2.5 text-gold transition-all duration-300 hover:-translate-y-1 hover:bg-gold/15"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow">Navegación</h3>
          <ul className="mt-4 grid gap-2 text-sm text-cream/75">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Preguntas frecuentes</h3>
          <div className="mt-4 grid gap-2">
            {FAQS.slice(0, 4).map((f) => (
              <details
                key={f.q}
                className="rounded-md border border-cream/12 p-3 text-sm text-cream/75 transition-colors hover:border-gold/40"
              >
                <summary className="cursor-pointer font-semibold text-cream">{f.q}</summary>
                <p className="mt-2 text-cream/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/12 py-6 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} {SITE.fullName}. Todos los derechos reservados. · {SITE.city}
      </div>
    </footer>
  );
}
