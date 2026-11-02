import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { z } from "zod";
import { ANNOUNCEMENTS, announcementSchema, cartItemSchema, donationSchema, type CartItem } from "./experience";

const stateSchema = z.object({
  anuncios: z.array(announcementSchema), carrito: z.array(cartItemSchema), donaciones: z.array(donationSchema),
  solicitudes: z.array(z.object({ id: z.string(), instrumento: z.string(), estudios: z.string(), objetivo: z.string(), estado: z.enum(["Pendiente", "Aprobada", "Rechazada"]) })),
  pedidos: z.array(z.object({ id: z.string(), fecha: z.string(), metodo: z.string(), total: z.number(), items: z.array(cartItemSchema) })),
  pruebaRealizada: z.boolean(), modulosCompletos: z.number().int().min(0).max(5),
});
type State = z.infer<typeof stateSchema>;
const initial: State = { anuncios: ANNOUNCEMENTS, carrito: [], donaciones: [], solicitudes: [], pedidos: [], pruebaRealizada: false, modulosCompletos: 0 };
// Datos demostrativos locales; no representan permisos ni cobros reales.
const KEY = "accordo.experience.v1";
type ContextValue = { state: State; update: (updater: (previous: State) => State) => void; addToCart: (item: Omit<CartItem, "cantidad">) => void; ready: boolean };
const ExperienceContext = createContext<ContextValue | null>(null);
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const parsed = stateSchema.safeParse(JSON.parse(raw)); if (parsed.success) setState(parsed.data); }
    } catch { /* Conserva los datos iniciales si el almacenamiento está bloqueado. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* Sigue funcionando en memoria. */ } } }, [state, ready]);
  const update = (updater: (previous: State) => State) => setState(previous => stateSchema.parse(updater(previous)));
  const addToCart = (item: Omit<CartItem, "cantidad">) => update(previous => {
    const existing = previous.carrito.find(i => i.id === item.id && i.opcion === item.opcion);
    return { ...previous, carrito: existing ? previous.carrito.map(i => i === existing ? { ...i, cantidad: Math.min(10, i.cantidad + 1) } : i) : [...previous.carrito, { ...item, cantidad: 1 }] };
  });
  return <ExperienceContext.Provider value={{ state, update, addToCart, ready }}>{children}</ExperienceContext.Provider>;
}
export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("ExperienceProvider is required");
  return value;
}