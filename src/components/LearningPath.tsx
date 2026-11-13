import { useState } from "react";
import { LockKeyhole, Check, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExperience } from "@/lib/experience-context";
import { INITIAL_QUIZ, MODULES, canOpenModule, initialQuizCompleted, canCompleteStep } from "@/lib/experience";
export function LearningPath() {
  const { state, update } = useExperience();
  const [answers, setAnswers] = useState<string[]>(INITIAL_QUIZ.map(() => "")); const [score, setScore] = useState<number | null>(null);
  const [selected, setSelected] = useState(0); const [answer, setAnswer] = useState(""); const [error, setError] = useState("");
  const module = MODULES[selected];
  const [reviewStep, setReviewStep] = useState(0);
  const progress = state.pasosCompletos[selected] ?? 0;
  const completed = selected < state.modulosCompletos;
  const stepIndex = completed ? reviewStep : progress;
  const step = module?.pasos[stepIndex];
  return <div className="shell py-14"><p className="eyebrow">Tu camino musical</p><h1 className="mt-2 text-4xl">Módulos de estudio</h1>
    {!state.pruebaRealizada ? <form className="mt-8 max-w-2xl space-y-6" onSubmit={e => { e.preventDefault(); if (!initialQuizCompleted(answers)) return; setScore(answers.filter((a, i) => a === INITIAL_QUIZ[i]?.correcta).length); update(s => ({ ...s, pruebaRealizada: true })); }}><h2 className="text-2xl">Prueba de Conocimiento Musical</h2><p className="text-sm text-muted-foreground">Evaluación inicial para conocer tu punto de partida.</p>{INITIAL_QUIZ.map((q, i) => <fieldset key={q.pregunta} className="space-y-3"><legend className="font-semibold">{i + 1}. {q.pregunta}</legend>{q.opciones.map(o => <label key={o} className="flex items-center gap-3 text-sm"><input required type="radio" name={`quiz-${i}`} checked={answers[i] === o} onChange={() => setAnswers(a => a.map((v, n) => n === i ? o : v))} />{o}</label>)}</fieldset>)}<Button type="submit" variant="gold">Finalizar prueba y acceder</Button></form> : <>
      {score !== null && <p role="status" className="mt-6">Resultado inicial: {score} / {INITIAL_QUIZ.length}. Tu ruta comienza con los fundamentos.</p>}
      <p className="mt-6 text-sm text-muted-foreground">{state.modulosCompletos} de {MODULES.length} módulos completados</p>
      <div className="learning-staff relative my-8 grid grid-cols-5 items-center gap-1 py-12" aria-label="Ruta en pentagrama de cinco líneas">{MODULES.map((m, i) => {
        const unlocked = canOpenModule(state.pruebaRealizada, state.modulosCompletos, i); const completed = i < state.modulosCompletos;
        return <div key={m.titulo} className={`relative flex flex-col items-center gap-3 ${i % 2 ? "translate-y-3" : "-translate-y-3"}`}><Button variant={completed || selected === i ? "gold" : "outline"} size="icon" className="h-12 w-12 rounded-full" disabled={!unlocked} aria-label={`${m.titulo}${completed ? ", completado" : !unlocked ? ", bloqueado" : ""}`} onClick={() => { setSelected(i); setReviewStep(0); setAnswer(""); setError(""); }}>{completed ? <Check /> : unlocked ? <Music2 /> : <LockKeyhole />}</Button><span className="bg-background px-1 text-center text-xs">{i + 1}</span></div>;
      })}</div>
      {module && step && <section className="max-w-3xl space-y-5"><h2 className="text-3xl">{selected + 1}. {module.titulo}</h2>
        <p className="text-sm text-muted-foreground">Paso {stepIndex + 1} de {module.pasos.length}</p><h3 className="text-2xl">{step.titulo}</h3>
        {step.contenido.map(p => <p key={p} className="leading-relaxed">{p}</p>)}<h3 className="text-xl">Práctica</h3><p className="leading-relaxed">{step.practica}</p>
        {completed ? <><p className="font-semibold text-gold-deep">Módulo completado</p><div className="flex flex-wrap gap-2">{module.pasos.map((p, i) => <Button key={p.titulo} variant={reviewStep === i ? "gold" : "outline"} onClick={() => setReviewStep(i)}>Paso {i + 1}</Button>)}</div></> : <form className="space-y-4" onSubmit={e => { e.preventDefault(); if (!canCompleteStep(state.pruebaRealizada, state.modulosCompletos, selected, stepIndex, progress, answer)) { setError("Revisa el contenido y vuelve a intentarlo."); return; } update(s => { const next = (s.pasosCompletos[selected] ?? 0) + 1; return { ...s, pasosCompletos: s.pasosCompletos.map((p, i) => i === selected ? next : p), modulosCompletos: next === module.pasos.length ? s.modulosCompletos + 1 : s.modulosCompletos }; }); setAnswer(""); setError(""); }}>
          <fieldset className="space-y-3"><legend className="font-semibold">{step.pregunta}</legend>{step.opciones.map(o => <label key={`${stepIndex}-${o}`} className="flex items-start gap-3 text-sm"><input required type="radio" name="module-answer" checked={answer === o} onChange={() => setAnswer(o)} />{o}</label>)}</fieldset>{error && <p role="alert" className="text-destructive">{error}</p>}<Button type="submit" variant="gold">{stepIndex === module.pasos.length - 1 ? "Completar módulo" : "Completar paso"}</Button></form>}
        {state.modulosCompletos === MODULES.length && <p role="status" className="text-xl font-semibold text-gold-deep">¡Has completado tu ruta musical!</p>}</section>
      }
    </>}
  </div>;
}