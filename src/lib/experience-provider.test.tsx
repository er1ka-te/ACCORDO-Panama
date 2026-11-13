import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ExperienceProvider } from "./experience-store";
import { useExperience } from "./experience-context";

describe("Shared experience context", () => {
  it("provides the same initial state to nested route consumers", () => {
    let count: number | undefined;
    let ready: boolean | undefined;
    function Consumer() {
      const value = useExperience();
      count = value.state.anuncios.length;
      ready = value.ready;
      return null;
    }
    renderToString(createElement(ExperienceProvider, {
      children: createElement(Consumer),
    }));
    expect(count).toBe(5);
    expect(ready).toBe(false);
  });
});