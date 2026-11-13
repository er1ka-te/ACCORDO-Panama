import { createContext, useContext } from "react";
import type { ExperienceContextValue } from "./experience-store";

// Keep context identity outside the provider's Fast Refresh boundary.
export const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("ExperienceProvider is required");
  return value;
}