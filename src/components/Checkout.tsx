import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CreditCard, Smartphone, Landmark, Wallet, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/lib/experience-context";
import { beneficiarySchema, confirmations, totalCart, type CartItem } from "@/lib/experience";

const METHODS = [
  { label: "Tarjeta de crédito", Icon: CreditCard },
  { label: "Yappy", Icon: Smartphone },
  { label: "Transferencia bancaria", Icon: Landmark },
  { label: "PayPal", Icon: Wallet },
];

export function Checkout() {
  const { state, update } = useExperience();
  const [metodo, setMetodo] = useState("");
  const [estudios, setEstudios] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [noReventa, setNoReventa] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CartItem[] | null>(null);

  const donations = state.carrito.some((i) => i.modalidad === "Donación");
  const paid = state.carrito.some((i) => i.modalidad !== "Donación");
  const total = totalCart(state.carrito);

  if (result) {
    return (
      <div className="shell py-14">
        <CheckCircle2 className="h-10 w-10 text-gold-deep" />
        <h1 className="mt-4 text-4xl">Confirmación</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Solicitud registrada · no se ha cobrado ningún importe.
        </p>
        <div role="status" className="my-8 space-y-3">
          {[...new Set(result.map((i) => i.modalidad))].map((m) => (
            <p key={m}>{confirmations[m]}</p>
          ))}
        </div>
        {result.some((i) => i.modalidad === "Donación") && (
          <p className="mb-6 text-sm text-muted-foreground">
            La solicitud educativa queda pendiente de revisión; no certifica ni asigna automáticamente
            el instrumento. Recuerda que para el retiro en bodega, si es menor de edad, debe ir
            acompañado de su padre, madre o adulto responsable debidamente identificado y firmar el
            compromiso de uso exclusivo para estudio (sin venta, empeño ni uso indebido).
          </p>
        )}
        <Button asChild variant="gold">
          <Link to="/catalogo">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="shell py-14">
      <p className="eyebrow">Confirmación y pago</p>
      <h1 className="mt-2 text-4xl">Checkout</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Los pagos en línea aún no están disponibles. Puedes registrar tu solicitud sin ingresar datos
        bancarios.
      </p>

      {!state.carrito.length ? (
        <div className="mt-8">
          <p className="mb-4">No hay artículos pendientes.</p>
          <Button asChild variant="gold">
            <Link to="/catalogo">Ir al catálogo</Link>
          </Button>
        </div>
      ) : (
        <form
          className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            if (paid && !metodo) {
              setError("Selecciona un medio de pago.");
              return;
            }
            if (donations) {
              const parsed = beneficiarySchema.safeParse({ estudios, objetivo, noReventa });
              if (!parsed.success) {
                setError(
                  parsed.error.issues[0]?.message ?? "Completa la verificación educativa.",
                );
                return;
              }
            }
            const items = [...state.carrito];
            update((s) => ({
              ...s,
              carrito: [],
              pedidos: [
                {
                  id: crypto.randomUUID(),
                  fecha: new Date().toISOString(),
                  metodo: paid ? metodo : "Donación gratuita",
                  total,
                  items,
                },
                ...s.pedidos,
              ],
              solicitudes: donations
                ? [
                    ...s.solicitudes,
                    ...items
                      .filter((i) => i.modalidad === "Donación")
                      .map((i) => ({
                        id: crypto.randomUUID(),
                        instrumento: i.titulo,
                        estudios: estudios.trim(),
                        objetivo: objetivo.trim(),
                        estado: "Pendiente" as const,
                      })),
                  ]
                : s.solicitudes,
            }));
            setResult(items);
          }}
        >
          <div className="space-y-6">
            {paid && (
              <section>
                <h2 className="mb-4 text-2xl">Medio de pago</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {METHODS.map(({ label, Icon }) => (
                    <Button
                      key={label}
                      type="button"
                      variant={metodo === label ? "gold" : "outline"}
                      aria-pressed={metodo === label}
                      className="h-auto justify-start whitespace-normal py-4"
                      onClick={() => setMetodo(label)}
                    >
                      <Icon />
                      {label}
                    </Button>
                  ))}
                </div>
                {metodo && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Medio de pago preferido: {metodo}. Esta solicitud no procesa pagos ni recopila
                    datos bancarios.
                  </p>
                )}
              </section>
            )}

            {donations && (
              <section className="space-y-4">
                <h2 className="text-2xl">Verificación educativa obligatoria</h2>

                <div className="rounded-xl border border-gold/40 bg-card p-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                    <div className="space-y-1.5">
                      <p className="font-semibold">
                        Retiro en bodega y compromiso de uso (Donaciones)
                      </p>
                      <p className="text-muted-foreground">
                        Si el solicitante es <strong>menor de edad</strong>, debe ir acompañado de su{" "}
                        <strong>padre, madre o adulto responsable debidamente identificado</strong>{" "}
                        para retirar el instrumento en las bodegas.
                      </p>
                      <p className="text-muted-foreground">
                        Al momento del retiro se firmará un <strong>compromiso sencillo</strong>{" "}
                        indicando que el instrumento se usará{" "}
                        <strong>únicamente para estudio</strong> y que{" "}
                        <strong>no podrá venderse, empeñarse ni usarse para fines indebidos</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <label className="grid gap-2 text-sm font-semibold">
                  ¿Qué estudias o qué te interesa aprender?
                  <textarea
                    required
                    minLength={10}
                    maxLength={500}
                    className="field"
                    value={estudios}
                    onChange={(e) => setEstudios(e.target.value)}
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  ¿Cómo utilizarás el instrumento para practicar?
                  <textarea
                    required
                    minLength={10}
                    maxLength={500}
                    className="field"
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                  />
                </label>

                <label className="flex items-start gap-2 text-sm">
                  <input
                    required
                    type="checkbox"
                    checked={noReventa}
                    onChange={(e) => setNoReventa(e.target.checked)}
                  />
                  <span>
                    Me comprometo a usarlo con fines educativos y de estudio, sin reventa, empeño ni
                    uso indebido, y acepto las condiciones de retiro en bodega (acompañado de padre,
                    madre o adulto responsable identificado si es menor de edad).
                  </span>
                </label>
              </section>
            )}

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="gold">
                Confirmar {paid ? "solicitud" : "solicitud gratuita"}
              </Button>
              <Button asChild variant="outline">
                <Link to="/carrito">Cancelar compra / alquiler</Link>
              </Button>
            </div>
          </div>

          <aside className="h-fit border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pl-6">
            <h2 className="text-2xl">Resumen</h2>
            {state.carrito.map((i) => (
              <div key={`${i.id}-${i.opcion}`} className="mt-4 text-sm">
                <p className="font-semibold">
                  {i.titulo} × {i.cantidad}
                </p>
                <p className="text-muted-foreground">
                  {i.opcion} · {i.modalidad}
                </p>
              </div>
            ))}
            <p className="mt-6 font-display text-2xl">Total: ${total.toFixed(2)}</p>
            {state.carrito.some((i) => i.modalidad === "Alquiler") && (
              <p className="mt-2 text-xs text-muted-foreground">
                Alquileres: importe del primer mes. El depósito y el contrato quedan pendientes de
                coordinación.
              </p>
            )}
          </aside>
        </form>
      )}
    </div>
  );
}
