import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/lib/experience-context";
import { totalCart } from "@/lib/experience";

export function Cart() {
  const { state, update } = useExperience();
  const navigate = useNavigate();
  const [aceptaCompromiso, setAceptaCompromiso] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false);

  const tieneDonacion = state.carrito.some((item) => item.modalidad === "Donación");

  const handleContinuar = () => {
    if (tieneDonacion && !aceptaCompromiso) {
      setMostrarAviso(true);
      return;
    }
    void navigate({ to: "/checkout" });
  };

  return (
    <div className="shell py-14">
      <p className="eyebrow">Tu selección</p>
      <h1 className="mt-2 text-4xl">Carrito</h1>

      {!state.carrito.length ? (
        <div className="py-12">
          <ShoppingBag className="h-8 w-8 text-gold-deep" />
          <p className="my-5 text-muted-foreground">Tu carrito está vacío.</p>
          <Button asChild variant="gold">
            <Link to="/catalogo">Explorar catálogo</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8 divide-y divide-border">
            {state.carrito.map((item, index) => (
              <article
                key={`${item.id}-${item.opcion}`}
                className="flex min-w-0 flex-wrap items-center gap-4 py-5"
              >
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1 basis-40">
                  <h2 className="text-xl">{item.titulo}</h2>
                  <p className="text-sm text-muted-foreground">
                    {item.modalidad} · {item.opcion}
                  </p>
                  <p className="font-semibold">
                    ${item.precio.toFixed(2)}
                    {item.modalidad === "Alquiler" ? " / mes" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={item.cantidad === 1 || item.modalidad === "Donación"}
                    aria-label={`Reducir cantidad de ${item.titulo}`}
                    onClick={() =>
                      update((s) => ({
                        ...s,
                        carrito: s.carrito.map((i, n) =>
                          n === index ? { ...i, cantidad: i.cantidad - 1 } : i,
                        ),
                      }))
                    }
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center">{item.cantidad}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={item.cantidad === 10 || item.modalidad === "Donación"}
                    aria-label={`Aumentar cantidad de ${item.titulo}`}
                    onClick={() =>
                      update((s) => ({
                        ...s,
                        carrito: s.carrito.map((i, n) =>
                          n === index ? { ...i, cantidad: i.cantidad + 1 } : i,
                        ),
                      }))
                    }
                  >
                    <Plus />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Quitar ${item.titulo}`}
                    onClick={() =>
                      update((s) => ({
                        ...s,
                        carrito: s.carrito.filter((_, n) => n !== index),
                      }))
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {tieneDonacion && (
            <div className="mt-6 rounded-xl border border-gold/40 bg-card p-5">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                <div className="space-y-2 text-sm">
                  <h3 className="font-semibold text-base">
                    Condiciones para retiro en bodega (Donaciones)
                  </h3>
                  <p className="text-muted-foreground">
                    Si el solicitante es <strong>menor de edad</strong>, deberá acudir
                    acompañado de su <strong>madre, padre o adulto responsable debidamente
                    identificado</strong> para retirar el instrumento o material en bodega.
                  </p>
                  <p className="text-muted-foreground">
                    Al retirar se firmará un <strong>compromiso / contrato sencillo</strong> donde se
                    establece que el recurso se destinará <strong>exclusivamente al estudio y
                    práctica musical</strong>, y que <strong>no podrá venderse, empeñarse ni
                    utilizarse para fines indebidos</strong>.
                  </p>
                  <label className="mt-3 flex cursor-pointer items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      checked={aceptaCompromiso}
                      onChange={(e) => {
                        setAceptaCompromiso(e.target.checked);
                        if (e.target.checked) setMostrarAviso(false);
                      }}
                      className="mt-1 h-4 w-4 accent-gold-deep"
                    />
                    <span>
                      Entiendo y acepto estas condiciones de retiro en bodega y uso exclusivo para
                      estudio.
                    </span>
                  </label>
                  {mostrarAviso && !aceptaCompromiso && (
                    <p className="text-xs font-medium text-destructive">
                      Debes marcar la casilla de aceptación para continuar con tu solicitud de
                      donación.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6">
            <p className="font-display text-2xl">
              Total: ${totalCart(state.carrito).toFixed(2)}
            </p>
            <Button variant="gold" onClick={handleContinuar}>
              Continuar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
