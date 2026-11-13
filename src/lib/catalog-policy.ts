const removedIds = new Set(["p9", "a7"]);
const removedTitles = new Set(["afinador digital cromático"]);
const availableFamilies = new Set(["Cuerda", "Viento", "Percusión", "Libros y Partituras", "Accesorios"]);
export const isAvailableProduct = (item: { id: string; titulo: string; familia?: string }) =>
  !removedIds.has(item.id) && !removedTitles.has(item.titulo.trim().toLocaleLowerCase("es")) &&
  !/\b61\s+teclas\b/i.test(item.titulo) &&
  (item.familia === undefined || availableFamilies.has(item.familia));