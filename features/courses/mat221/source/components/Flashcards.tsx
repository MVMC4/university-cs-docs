'use client';
import { useEffect, useRef, useState } from "react";
import type { Card } from "../lib/types";
import type { DeepSection } from "../lib/types";
import { typesetWhenMathJaxReady } from "../lib/useMathJax";

export default function Flashcards({ cards, storageKey = "mat221-flashcards", worked = [] }: { cards: Card[]; storageKey?: string; worked?: DeepSection[] }) {
  var st = useState(0), i = st[0], setI = st[1];
  var sf = useState(false), flip = sf[0], setFlip = sf[1];
  var sk = useState<Record<number, string>>({}), known = sk[0], setKnown = sk[1];
  var so = useState<number[]>(function () { return cards.map(function (_, k) { return k; }); }), order = so[0], setOrder = so[1];
  var ref = useRef<HTMLDivElement>(null);
  var c = cards[order[i]];
  var knownCount = Object.values(known).filter(function (v) { return v === "y"; }).length;
  var reviewedCount = Object.keys(known).length;
  var remainingCount = Math.max(0, order.length - reviewedCount);
  var progress = order.length ? Math.round((reviewedCount / order.length) * 100) : 0;
  var number = String(i + 1).padStart(2, "0");
  function comparable(value: string) { return value.replace(/\\[()[\]]/g, "").replace(/\\[A-Za-z]+/g, "").replace(/\\[,!;:]/g, "").replace(/\s+/g, "").toLowerCase(); }
  var currentWorked = worked.filter(function (section) {
    if (!section.example) return false;
    var a = comparable(c ? c.front : ""), b = comparable(section.example.title);
    return a.length > 7 && b.length > 7 && (a.indexOf(b) !== -1 || b.indexOf(a) !== -1);
  })[0];

  useEffect(function () {
    try {
      var raw = localStorage.getItem(storageKey);
      if (raw) setKnown(JSON.parse(raw));
    } catch {}
  }, [storageKey]);
  useEffect(function () {
    try { localStorage.setItem(storageKey, JSON.stringify(known)); } catch {}
  }, [known, storageKey]);
  /* Both faces stay mounted. Typeset only when the card changes; a flip is a
     visual state change and must not clear/rebuild mathematics or layout. */
  useEffect(function () { typesetWhenMathJaxReady(ref.current); }, [i, order]);
  useEffect(function () {
    var active = ref.current ? ref.current.querySelector<HTMLElement>(".fc-face.is-active") : null;
    if (active) active.scrollTop = 0;
  }, [i, flip]);

  function mark(k: string) {
    if (!order.length) return;
    var n = Object.assign({}, known); n[order[i]] = k;
    setKnown(n); setFlip(false); setI((i + 1) % order.length);
  }
  function next() { if (order.length) { setFlip(false); setI((i + 1) % order.length); } }
  function prev() { if (order.length) { setFlip(false); setI((i - 1 + order.length) % order.length); } }
  function shuffle() { setOrder(order.slice().sort(function () { return Math.random() - 0.5; })); setI(0); setFlip(false); }
  function reset() { setKnown({}); setI(0); setFlip(false); setOrder(cards.map(function (_, k) { return k; })); }
  function toggle() { setFlip(function (v) { return !v; }); }

  useEffect(function () {
    function h(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", h);
    return function () { window.removeEventListener("keydown", h); };
  });

  if (!c) return <div ref={ref} className="card"><p className="hint">No flashcards have been added for this topic yet.</p></div>;

  return (
    <div ref={ref} className="fc-deck">
      <div className="fc-tracker" aria-live="polite">
        <div className="fc-number"><span className="fc-current">{number}</span><span className="fc-total">/ {String(order.length).padStart(2, "0")}</span></div>
        <div className="fc-tracker-copy"><strong>Card {i + 1} of {order.length}</strong><span>{reviewedCount} reviewed · {knownCount} known · {remainingCount} remaining</span></div>
        <div className="fc-progress" role="progressbar" aria-label="Flashcard review progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><i style={{ width: progress + "%" }}></i></div>
      </div>
      <div className="fc-scene" role="button" tabIndex={0}
        aria-label={flip ? "Answer side showing. Activate to flip back to the prompt." : "Prompt side showing. Activate to reveal the answer."}
        onClick={toggle}
        onKeyDown={function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}>
        <div key={order[i] + "-" + i} className={"fc-card" + (flip ? " flipped" : "")}>
          <div className={"fc-face fc-front" + (!flip ? " is-active" : "")} aria-hidden={flip} inert={flip ? true : undefined}>
            <span className="chip">Prompt</span><div className="fc-text">{c.front}</div><span className="fc-hint">Click or press Enter to reveal the answer.</span>
          </div>
          <div className={"fc-face fc-back" + (flip ? " is-active" : "")} aria-hidden={!flip} inert={!flip ? true : undefined}>
            <span className="chip">Answer</span><div className="fc-text">{c.back}</div>{c.note ? <p className="fc-hint">{c.note}</p> : null}{currentWorked && currentWorked.example ? <div className="fc-working"><p className="fc-working-title">Full working</p><ol className="steps">{currentWorked.example.items.map(function (item, j) { return <li key={j}>{item}</li>; })}</ol><p className="fc-hint">Reproduce each line before marking this card “Got it”.</p></div> : <p className="fc-hint">If this answer is not immediate, open Questions for a complete written derivation of the closest worked problem.</p>}
          </div>
        </div>
      </div>
      <div className="fc-controls">
        <div className="fc-navigation"><button type="button" className="btn ghost sm" onClick={prev}>← Previous</button><button type="button" className="btn ghost sm" onClick={next}>Next →</button><button type="button" className="btn ghost sm" onClick={shuffle}>Shuffle</button></div>
        <div className="fc-assessment"><button type="button" className="btn no sm" onClick={function () { mark("n"); }}>Review again</button><button type="button" className="btn yes sm" onClick={function () { mark("y"); }}>Got it</button></div>
        <button type="button" className="btn ghost sm fc-reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
