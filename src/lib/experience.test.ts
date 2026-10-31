import { describe, expect, it } from "vitest";
import { ANNOUNCEMENTS, beneficiarySchema, canOpenModule, cartItemSchema, donationSchema, initialQuizCompleted, totalCart } from "./experience";
describe("Reglas de ACCORDO", () => {
  it("incluye cinco anuncios iniciales", () => { expect(ANNOUNCEMENTS).toHaveLength(5); });
  it("exige estudios, plan educativo y compromiso de no reventa", () => {
    expect(beneficiarySchema.safeParse({ estudios: "Estudio violín en mi escuela", objetivo: "Practicaré todos los días", noReventa: true }).success).toBe(true);
    expect(beneficiarySchema.safeParse({ estudios: "", objetivo: "", noReventa: true }).success).toBe(false);
    expect(beneficiarySchema.safeParse({ estudios: "Estudio violín en mi escuela", objetivo: "Practicaré todos los días", noReventa: false }).success).toBe(false);
  });
  it("no desbloquea módulos antes de la prueba inicial", () => { expect(canOpenModule(false, 0, 0)).toBe(false); expect(initialQuizCompleted(["5", "", "Re"])).toBe(false); expect(initialQuizCompleted(["5", "Velocidad del pulso", "Re"])).toBe(true); expect(canOpenModule(true, 0, 0)).toBe(true); });
  it("desbloquea módulos progresivamente", () => { expect(canOpenModule(true, 0, 1)).toBe(false); expect(canOpenModule(true, 1, 1)).toBe(true); });
  it("las donaciones comunitarias son gratuitas en el total", () => { const item = cartItemSchema.parse({ id: "p1", titulo: "Violín", imagen: "/violin.jpg", opcion: "4/4", modalidad: "Donación", precio: 99, cantidad: 1 }); expect(totalCart([item])).toBe(0); });
  it("requiere destinatario para donar a una fundación", () => { const data = { id: "d1", titulo: "Violín", descripcion: "Instrumento en buen estado", destino: "Fundación", fundacion: "", estado: "Pendiente de evaluación" }; expect(donationSchema.safeParse(data).success).toBe(false); expect(donationSchema.safeParse({ ...data, fundacion: "e1" }).success).toBe(true); });
});