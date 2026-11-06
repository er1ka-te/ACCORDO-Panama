import { useEffect, useState } from "react";
import { PRODUCTOS_SEED, type Producto } from "./data";
import { isAvailableProduct } from "./catalog-policy";

/**
 * Catálogo compartido (simulado en el navegador con localStorage).
 * El panel de administración escribe aquí y el catálogo lo refleja.
 */
const KEY = "accordo.catalogo.v3";
const EVENT = "accordo:catalogo";

let cache: Producto[] | null = null;

function read(): Producto[] {
  if (cache) return cache;
  if (typeof window === "undefined") return PRODUCTOS_SEED;
  try {
    const raw = window.localStorage.getItem(KEY) ?? window.localStorage.getItem("accordo.catalogo.v2");
    cache = (raw ? (JSON.parse(raw) as Producto[]) : PRODUCTOS_SEED).filter(isAvailableProduct);
    window.localStorage.setItem(KEY, JSON.stringify(cache));
    window.localStorage.removeItem("accordo.catalogo.v2");
  } catch {
    cache = PRODUCTOS_SEED;
  }
  return cache;
}

function write(next: Producto[]) {
  next = next.filter(isAvailableProduct);
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* almacenamiento no disponible */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useCatalogo() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_SEED);

  useEffect(() => {
    const sync = () => setProductos([...read()]);
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return {
    productos,
    agregar: (p: Omit<Producto, "id">) =>
      write([{ ...p, id: `p${Date.now()}` }, ...read()]),
    actualizarPrecio: (id: string, precio: number) =>
      write(read().map((p) => (p.id === id ? { ...p, precio } : p))),
    eliminar: (id: string) => write(read().filter((p) => p.id !== id)),
    restaurar: () => write(PRODUCTOS_SEED),
  };
}

/** Solicitudes de alquiler simuladas para el panel. */
export const SOLICITUDES = [
  { id: "s1", producto: "Violín 4/4 de estudio", cliente: "María Vergara", plan: "3 meses", estado: "Pendiente" },
  { id: "s2", producto: "Clarinete de estudio", cliente: "Escuela Belisario Porras", plan: "6 meses", estado: "Verificando" },
  { id: "s3", producto: "Chelo 4/4", cliente: "Andrés Quintero", plan: "1 mes", estado: "Aprobada" },
];
