import { useEffect } from "react";

const NOTES = ["♪", "♫", "♩", "♬"];

export function MusicNoteTrail() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let lastNoteAt = 0;
    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastNoteAt < 90) return;
      lastNoteAt = now;

      const note = document.createElement("span");
      note.className = "music-note-trail";
      note.textContent = NOTES[Math.floor(Math.random() * NOTES.length)] ?? "♪";
      note.style.left = `${event.clientX}px`;
      note.style.top = `${event.clientY}px`;
      document.body.appendChild(note);
      window.setTimeout(() => note.remove(), 1050);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}