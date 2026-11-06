import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { z } from "zod";
import { ANNOUNCEMENTS, announcementSchema, cartItemSchema, donationSchema, type CartItem } from "./experience";
import { isAvailableProduct } from "./catalog-policy";

const stateSchema = z.object({
  anuncios: z.array(announcementSchema), carrito: z.array(cartItemSchema), donaciones: z.array(donationSchema),
  solicitudes: z.array(z.object({ id: z.string(), instrumento: z.string(), estudios: z.string(), objetivo: z.string(), estado: z.enum(["Pendiente", "Aprobada", "Rechazada"]) })),
  pedidos: z.array(z.object({ id: z.string(), fecha: z.string(), metodo: z.string(), total: z.number(), items: z.array(cartItemSchema) })),
  pruebaRealizada: z.boolean(), modulosCompletos: z.number().int().min(0).max(5),
  pasosCompletos: z.array(z.number().int().min(0).max(3)).length(5).default([0, 0, 0, 0, 0]),
});
type State = z.infer<typeof stateSchema>;
const initial: State = { anuncios: ANNOUNCEMENTS, carrito: [], donaciones: [], solicitudes: [], pedidos: [], pruebaRealizada: false, modulosCompletos: 0, pasosCompletos: [0, 0, 0, 0, 0] };
// Datos demostrativos locales; no representan permisos ni cobros reales.
const KEY = "accordo.experience.v2";
const cleanState = (state: State): State => ({ ...state,
  carrito: state.carrito.filter(isAvailableProduct),
  pedidos: state.pedidos.map(p => { const items = p.items.filter(isAvailableProduct); return { ...p, items, total: items.reduce((sum, i) => sum + (i.modalidad === "Donación" ? 0 : i.precio * i.cantidad), 0) }; }).filter(p => p.items.length > 0),
  donaciones: state.donaciones.filter(isAvailableProduct),
  solicitudes: state.solicitudes.filter(s => isAvailableProduct({ id: s.id, titulo: s.instrumento })),
});
type ContextValue = { state: State; update: (updater: (previous: State) => State) => void; addToCart: (item: Omit<CartItem, "cantidad">) => void; ready: boolean };
const ExperienceContext = createContext<ContextValue | null>(null);
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const current = localStorage.getItem(KEY);
      const raw = current ?? localStorage.getItem("accordo.experience.v1");
      if (raw) { const parsed = stateSchema.safeParse(JSON.parse(raw)); if (parsed.success) setState(cleanState(current ? parsed.data : { ...parsed.data, pruebaRealizada: false, modulosCompletos: 0, pasosCompletos: [0, 0, 0, 0, 0] })); }
      localStorage.removeItem("accordo.experience.v1");
    } catch { /* Conserva los datos iniciales si el almacenamiento está bloqueado. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* Sigue funcionando en memoria. */ } } }, [state, ready]);
  const update = (updater: (previous: State) => State) => setState(previous => cleanState(stateSchema.parse(updater(previous))));
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