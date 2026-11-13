import { describe, expect, it } from "vitest";
import { ANNOUNCEMENTS, INITIAL_QUIZ, MODULES, canCompleteStep, beneficiarySchema, canOpenModule, cartItemSchema, donationSchema, initialQuizCompleted, totalCart } from "./experience";
import { PRODUCTOS_SEED } from "./data";
import { isAvailableProduct } from "./catalog-policy";
describe("Reglas de ACCORDO", () => {
  it("incluye cinco anuncios iniciales", () => { expect(ANNOUNCEMENTS).toHaveLength(5); });
  it("exige estudios, plan educativo y compromiso de no reventa", () => {
    expect(beneficiarySchema.safeParse({ estudios: "Estudio violín en mi escuela", objetivo: "Practicaré todos los días", noReventa: true }).success).toBe(true);
    expect(beneficiarySchema.safeParse({ estudios: "", objetivo: "", noReventa: true }).success).toBe(false);
    expect(beneficiarySchema.safeParse({ estudios: "Estudio violín en mi escuela", objetivo: "Practicaré todos los días", noReventa: false }).success).toBe(false);
  });
  it("no desbloquea módulos antes de terminar toda la prueba ampliada", () => { expect(canOpenModule(false, 0, 0)).toBe(false); expect(INITIAL_QUIZ.length).toBeGreaterThan(3); expect(initialQuizCompleted(["5", "Velocidad del pulso", "Re"])).toBe(false); expect(initialQuizCompleted(INITIAL_QUIZ.map(q => q.correcta))).toBe(true); expect(canOpenModule(true, 0, 0)).toBe(true); });
  it("exige varios pasos evaluados por nivel sin saltar pasos", () => { expect(MODULES).toHaveLength(5); for (const [i, m] of MODULES.entries()) { expect(m.pasos.length).toBeGreaterThan(1); for (const [j, p] of m.pasos.entries()) { expect(canCompleteStep(true, i, i, j, j, p.correcta)).toBe(true); expect(canCompleteStep(true, i, i, j, j, "incorrecta")).toBe(false); expect(canCompleteStep(true, i, i, j, j - 1, p.correcta)).toBe(false); expect(canCompleteStep(false, i, i, j, j, p.correcta)).toBe(false); } } });
  it("elimina definitivamente el afinador digital cromático", () => { expect(PRODUCTOS_SEED.some(p => p.id === "a7")).toBe(false); expect(isAvailableProduct({ id: "a7", titulo: "Otro título" })).toBe(false); expect(isAvailableProduct({ id: "nuevo", titulo: "Afinador digital cromático" })).toBe(false); expect(isAvailableProduct({ id: "a8", titulo: "Metrónomo digital" })).toBe(true); });
  it("excluye el producto retirado y las familias obsoletas sin borrar publicaciones válidas", () => {
    expect(PRODUCTOS_SEED.some(p => p.id === "p9")).toBe(false);
    expect(isAvailableProduct({ id: "p9", titulo: "Otro título" })).toBe(false);
    expect(isAvailableProduct({ id: "nuevo", titulo: "Modelo de 61 teclas" })).toBe(false);
    expect(isAvailableProduct({ id: "antiguo", titulo: "Artículo anterior", familia: "Obsoleta" })).toBe(false);
    expect(isAvailableProduct({ id: "publicacion", titulo: "Violín publicado", familia: "Cuerda" })).toBe(true);
  });
  it("desbloquea módulos progresivamente", () => { expect(canOpenModule(true, 0, 1)).toBe(false); expect(canOpenModule(true, 1, 1)).toBe(true); });
  it("las donaciones comunitarias son gratuitas en el total", () => { const item = cartItemSchema.parse({ id: "p1", titulo: "Violín", imagen: "/violin.jpg", opcion: "4/4", modalidad: "Donación", precio: 99, cantidad: 1 }); expect(totalCart([item])).toBe(0); });
  it("requiere destinatario para donar a una fundación", () => { const data = { id: "d1", titulo: "Violín", descripcion: "Instrumento en buen estado", destino: "Fundación", fundacion: "", estado: "Pendiente de evaluación" }; expect(donationSchema.safeParse(data).success).toBe(false); expect(donationSchema.safeParse({ ...data, fundacion: "e1" }).success).toBe(true); });
});