import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
export const askAria = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ question: z.string().trim().min(1).max(1000) }).parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { text: "", error: "Aria necesita que se habilite su conexión con Lovable AI." };
    const { answerAria } = await import("./aria.server");
    return answerAria(data.question, key);
  });