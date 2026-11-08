import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import outline from "@/lib/panama-outline.json";

const IMPACT = [
  { name: "Panamá Centro", text: "Donación realizada: 35 instrumentos y accesorios (10 violines, 5 violas, 8 flautas traveseras, 4 saxofones y 8 atriles de metal)." },
  { name: "Chiriquí", text: "Donación realizada: 12 equipos musicales (5 violines, 3 flautas traveseras y 4 métodos de teoría musical)." },
  { name: "Coclé", text: "Donación realizada: 8 instrumentos y repuestos (4 violines 3/4, 2 violonchelos y 2 juegos de cuerdas)." },
  { name: "Herrera", text: "Donación realizada: 6 instrumentos de viento (3 flautas traveseras y 3 clarinetes en Si bemol)." },
  { name: "Colón", text: "Donación realizada: 10 piezas musicales (4 violines, 3 saxofones altos y 3 carpetas de partituras)." },
];

function ImpactPoint({ index }: { index: number }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const point = outline.points[index];
  const item = IMPACT[index];
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  if (!point || !item) return null;
  const keepOpen = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };
  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="panama-impact-point"
        style={{ left: `${point.x / 10}%`, top: `${point.y / 4.4}%` }}
        aria-label={item.name}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") keepOpen(); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") closeSoon(); }}
        onFocus={() => {
          clearTimeout(closeTimer.current);
          closeTimer.current = setTimeout(keepOpen, 0);
        }}
        onBlur={closeSoon}
      />
    </PopoverTrigger>
    <PopoverContent
      className="panama-impact-paper w-72 max-w-[calc(100vw-2rem)] p-5"
      side="top"
      sideOffset={8}
      collisionPadding={16}
      aria-label={`Donaciones en ${item.name}`}
      onOpenAutoFocus={(event) => event.preventDefault()}
      onCloseAutoFocus={(event) => event.preventDefault()}
      onPointerEnter={keepOpen}
      onPointerLeave={closeSoon}
      onFocusCapture={keepOpen}
    >
      <h3 className="text-2xl italic leading-tight">{item.name}</h3>
      <p className="mt-3 text-sm leading-relaxed">{item.text}</p>
    </PopoverContent>
  </Popover>;
}

export function PanamaImpact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVisible(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} aria-labelledby="panama-impact-title" className="pb-8 pt-2 md:pb-12">
    <div className="panama-impact-band panama-impact-drop py-5 md:py-6" data-visible={visible}>
      <h2 id="panama-impact-title" className="panama-impact-title shell text-center text-3xl italic leading-tight md:text-4xl">Nuestro impacto en Panamá</h2>
    </div>
    <div className="panama-impact-drop shell pt-8 md:pt-12" data-visible={visible}>
      <div className="relative mx-auto aspect-[1000/440] w-full max-w-5xl">
        <svg viewBox="0 0 1000 440" aria-hidden="true" className="h-full w-full overflow-visible">
          <path d={outline.path} className="panama-impact-outline" />
        </svg>
        {IMPACT.map((item, index) => <ImpactPoint key={item.name} index={index} />)}
      </div>
    </div>
  </section>;
}