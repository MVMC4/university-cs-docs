'use client';
import { useEffect, useRef, useState } from "react";
import type { QuizQ } from "../lib/types";
import { typesetWhenMathJaxReady } from "../lib/useMathJax";

export default function Quiz({ questions }: { questions: QuizQ[] }) {
  const ref = useRef<HTMLDivElement>(null);
  var st = useState<Record<number, number>>({}), pick = st[0], setPick = st[1];
  var answered = Object.keys(pick).length;
  var score = questions.reduce(function (s, q, i) { return s + (pick[i] === q.answer ? 1 : 0); }, 0);

  /* Explanations appear only after an answer: typeset this island only then. */
  useEffect(function () { typesetWhenMathJaxReady(ref.current); }, [pick]);

  return (
    <div ref={ref}>
      {questions.map(function (q, i) {
        var p = pick[i];
        return (
          <div className="quizq" key={i} role="group" aria-label={"Question " + (i + 1)}>
            <p className="qtext"><span className="qtag">Q{i + 1}</span> {q.q}</p>
            <div className="opts">
              {q.options.map(function (o, j) {
                var cls = "opt";
                if (p !== undefined) { if (j === q.answer) cls += " correct"; else if (j === p) cls += " wrong"; }
                return (
                  <button type="button" key={j} className={cls} disabled={p !== undefined} aria-pressed={p === j} onClick={function () { var n = Object.assign({}, pick); n[i] = j; setPick(n); }}>
                    <span className="optkey">{"ABCD"[j]}</span> {o}
                  </button>
                );
              })}
            </div>
            {p !== undefined ? <p className={"explain" + (p === q.answer ? " good" : "")} aria-live="polite">{p === q.answer ? "Correct. " : "Not quite. "}{q.explain}</p> : null}
          </div>
        );
      })}
      <div className="quizscore" aria-live="polite">Score {score} / {questions.length} · {answered} answered</div>
      {answered === questions.length ? <button type="button" className="btn sm" onClick={function () { setPick({}); }}>Retake quiz</button> : null}
    </div>
  );
}
