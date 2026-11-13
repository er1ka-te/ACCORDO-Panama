import { useEffect, useRef, useState, type PointerEvent } from "react";

type Position = { x: number; y: number };
export function useDraggableLauncher() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; origin: Position; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const clamp = (next: Position): Position => {
    const box = anchorRef.current?.getBoundingClientRect();
    return {
      x: Math.max(8, Math.min(next.x, window.innerWidth - (box?.width ?? 0) - 8)),
      y: Math.max(16, Math.min(next.y, window.innerHeight - (box?.height ?? 0) - 8)),
    };
  };
  useEffect(() => {
    const resize = () => setPosition(previous => previous ? clamp(previous) : previous);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    const box = anchorRef.current?.getBoundingClientRect();
    if (!box) return;
    suppressClick.current = false;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, origin: { x: box.x, y: box.y }, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.moved && Math.hypot(dx, dy) < 6) return;
    start.moved = true;
    suppressClick.current = true;
    setDragging(true);
    setPosition(clamp({ x: start.origin.x + dx, y: start.origin.y + dy }));
  };
  const finish = (event: PointerEvent<HTMLButtonElement>) => {
    if (gesture.current?.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return {
    anchorRef, position, dragging,
    pointerHandlers: { onPointerDown, onPointerMove, onPointerUp: finish, onPointerCancel: finish, onLostPointerCapture: finish },
    consumeDragClick: () => {
      const suppressed = suppressClick.current;
      suppressClick.current = false;
      return suppressed;
    },
  };
}