const removedIds = new Set(["p9", "a7"]);
const removedTitles = new Set(["afinador digital cromático", "teclado de 61 teclas"]);
export const isAvailableProduct = (item: { id: string; titulo: string }) =>
  !removedIds.has(item.id) && !removedTitles.has(item.titulo.trim().toLocaleLowerCase("es"));