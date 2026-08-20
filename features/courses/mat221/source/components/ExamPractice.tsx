'use client';

import { useEffect, useMemo, useState } from "react";
import { typesetWhenMathJaxReady } from "../lib/useMathJax";

type PracticeItem = {
  id: string;
  classification: string;
  prompt: string;
  constraints: string;
  expected_work: string;
  answer: string;
  detailed_solution: string;
  first_wrong_step_diagnostics: string;
  feedback: string;
  difficulty: number;
  marks: number;
  estimated_minutes: number;
  assessment_mapping: { assessment_id: string; status: string };
};

export default function ExamPractice({ slug, items }: { slug: string; items: PracticeItem[] }) {
  const storageKey = "mat221-exam-practice-" + slug;
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(12 * 60);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setAttempted(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(attempted)); } catch {}
  }, [attempted, storageKey]);

  useEffect(() => {
    if (!started || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [started, seconds]);

  useEffect(() => { typesetWhenMathJaxReady(document.querySelector("main")); }, [revealed, started]);

  const attemptedCount = Object.values(attempted).filter(Boolean).length;
  const revealedCount = Object.values(revealed).filter(Boolean).length;
  const timeLabel = useMemo(() => String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0"), [seconds]);

  function reset() {
    setStarted(false);
    setSeconds(12 * 60);
    setRevealed({});
    setAttempted({});
    try { localStorage.removeItem(storageKey); } catch {}
  }

  return (
    <div className="exam-practice">
      <div className="exam-practice-toolbar" aria-label="Exam practice controls">
        <div><strong>{items.length}-item floor</strong><span>{attemptedCount} attempted · {revealedCount} solutions open</span></div>
        <div className="exam-timer" aria-live="polite"><span>Timer</span><strong>{started ? timeLabel : "12:00"}</strong></div>
        {!started ? <button type="button" className="btn sm" onClick={() => setStarted(true)}>Start timed set</button> : <button type="button" className="btn ghost sm" onClick={reset}>Reset session</button>}
      </div>
      <p className="hint">Attempt each prompt before opening its solution. The assessment mapping is provisional because the official item blueprint, marks, tools, and marking scheme were not supplied.</p>
      {items.map((item, index) => {
        const isOpen = Boolean(revealed[item.id]);
        const isAttempted = Boolean(attempted[item.id]);
        return (
          <article className="exam-item" key={item.id}>
            <div className="exam-item-head"><span className="qtag">{index + 1}. {item.id}</span><span className="chip lav">{item.classification}</span><span className="exam-minutes">[{item.marks} marks] · {item.estimated_minutes} min</span></div>
            <h3>{item.prompt}</h3>
            <p><strong>Constraints:</strong> {item.constraints}</p>
            <p><strong>Expected work:</strong> {item.expected_work}</p>
            <div className="exam-item-actions">
              <button type="button" className="btn sm" aria-pressed={isAttempted} onClick={() => setAttempted((old) => ({ ...old, [item.id]: !isAttempted }))}>{isAttempted ? "Attempt recorded" : "Mark attempted"}</button>
              <button type="button" className="btn ghost sm" aria-expanded={isOpen} onClick={() => setRevealed((old) => ({ ...old, [item.id]: !isOpen }))}>{isOpen ? "Hide solution" : "Reveal solution"}</button>
            </div>
            {isOpen ? <div className="exam-solution" role="region" aria-label={"Solution for " + item.id}><p><strong>Answer:</strong> {item.answer}</p><p><strong>Detailed solution:</strong> {item.detailed_solution}</p><p><strong>First-wrong-step diagnostic:</strong> {item.first_wrong_step_diagnostics}</p><p><strong>Feedback:</strong> {item.feedback}</p><p className="hint">{item.assessment_mapping.status}</p></div> : null}
          </article>
        );
      })}
    </div>
  );
}
