import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Reproductor discreto de música instrumental de fondo.
 * Usa el MP3 royalty-free de SITE.ambientTrack y, si la red lo bloquea,
 * genera un pad suave con Web Audio para que nunca quede en silencio.
 */
export function AmbientPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const track = SITE.tracks[trackIndex] ?? SITE.tracks[0];

  useEffect(() => {
    return () => {
      synthRef.current?.ctx.close();
    };
  }, []);

  const startSynth = () => {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = synthRef.current?.ctx ?? new Ctx();
    if (!synthRef.current) {
      const gain = ctx.createGain();
      gain.gain.value = 0.06;
      gain.connect(ctx.destination);
      [220, 277.18, 329.63, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.05 + i * 0.03;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.03;
        lfo.connect(lfoGain).connect(gain.gain);
        osc.connect(gain);
        osc.start();
        lfo.start();
      });
      synthRef.current = { ctx, gain };
    }
    void ctx.resume();
  };

  const toggle = async () => {
    if (playing) {
      audioRef.current?.pause();
      void synthRef.current?.ctx.suspend();
      setPlaying(false);
      return;
    }
    try {
      const el = audioRef.current;
      if (!el) throw new Error("sin audio");
      el.volume = 0.25;
      await el.play();
    } catch {
      startSynth();
    }
    setPlaying(true);
  };

  const changeTrack = async (nextIndex: number) => {
    const wasPlaying = playing;
    audioRef.current?.pause();
    setTrackIndex(nextIndex);
    if (wasPlaying) {
      window.setTimeout(() => void audioRef.current?.play().catch(startSynth), 0);
    }
  };

  return (
    <div className="fixed bottom-3 left-3 z-40 flex max-w-[calc(100vw-6rem)] items-center gap-2 sm:bottom-6 sm:left-6">
      <audio ref={audioRef} src={track.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar música de fondo" : "Reproducir música de fondo"}
        className={`group flex shrink-0 items-center gap-3 rounded-full border border-gold/40 bg-card/90 p-2 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-gold)] ${playing ? "pulse-gold" : ""}`}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
          {playing ? (
            <Pause className="h-4 w-4 text-coffee" />
          ) : (
            <Play className="h-4 w-4 text-coffee" />
          )}
        </span>
        {playing && (
          <span className="flex h-4 items-end gap-0.5">
            {[0, 120, 240].map((d) => (
              <span
                key={d}
                className="eq-bar block h-4 w-0.5 rounded bg-gold"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </span>
        )}
      </button>
      <label className="sr-only" htmlFor="ambient-track">Elegir melodía</label>
      <select
        id="ambient-track"
        value={trackIndex}
        onChange={(event) => void changeTrack(Number(event.target.value))}
        className="min-w-0 max-w-[13rem] rounded-md border border-gold/40 bg-card/95 px-2 py-2 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur sm:max-w-none"
        aria-label="Elegir melodía instrumental"
      >
        {SITE.tracks.map((item, index) => (
          <option key={item.title} value={index}>
            {index + 1}. {item.title} ({item.mood})
          </option>
        ))}
      </select>
    </div>
  );
}
