'use client';
import { useEffect, useRef, useState } from "react";
import type { PracticeItem } from "../lib/content-model";
import { typesetWhenMathJaxReady } from "../lib/useMathJax";

export default function WrittenQuestionBank({ items }: { items: PracticeItem[] }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState<Record<string, boolean>>({});
  const ref = useRef<HTMLDivElement>(null);
  const attemptedCount = Object.values(attempted).filter(Boolean).length;

  useEffect(function () { typesetWhenMathJaxReady(ref.current); }, [revealed]);

  return (
    <div ref={ref} className="written-bank">
      <div className="bank-summary" aria-live="polite"><strong>{items.length} prompts</strong><span>{attemptedCount} attempted</span><span>Complete written work expected</span></div>
      <p className="hint practice-instruction">Work on paper first. Record an attempt before opening a solution so you can compare the first wrong line, not only the final answer.</p>
      {items.map(function (item, index) {
        const isOpen = Boolean(revealed[item.id]);
        const isAttempted = Boolean(attempted[item.id]);
        return (
          <article className="practice-question" key={item.id}>
            <div className="practice-head"><span className="qtag">Q{String(index + 1).padStart(2, "0")}</span><span className="chip lav">{item.classification}</span><span className="bank-minutes">[{item.marks} marks] · {item.estimated_minutes} min</span></div>
            <h3>{item.prompt}</h3>
            <p className="practice-rule"><strong>Conditions:</strong> {item.constraints}</p>
            <p className="practice-prompt"><strong>Expected work:</strong> {item.expected_work}</p>
            <div className="exam-item-actions">
              <button type="button" className={"btn sm " + (isAttempted ? "yes" : "") } aria-pressed={isAttempted} onClick={function () { setAttempted(function (old) { return Object.assign({}, old, { [item.id]: !isAttempted }); }); }}>{isAttempted ? "Attempt recorded" : "Mark attempted"}</button>
              <button type="button" className="btn ghost sm" aria-expanded={isOpen} onClick={function () { setRevealed(function (old) { return Object.assign({}, old, { [item.id]: !isOpen }); }); }}>{isOpen ? "Hide solution" : "Reveal solution"}</button>
            </div>
            {isOpen ? <div className="practice-solution" role="region" aria-label={"Solution for " + item.id}>
              <p className="solution-title">Complete written solution</p>
              <p><strong>Answer:</strong> {item.answer}</p>
              <p><strong>Reasoning:</strong> {item.detailed_solution}</p>
              <div className="soft-callout"><strong>First wrong step to inspect:</strong> {item.first_wrong_step_diagnostics}</div>
              <p className="hint"><strong>Transfer:</strong> {item.feedback}</p>
            </div> : null}
          </article>
        );
      })}
    </div>
  );
}
