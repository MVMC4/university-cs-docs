'use client';
import { useEffect, useState } from "react";
import { DEFAULT_GOALS } from "../lib/planner";
type Goal = { id: number; text: string; done: boolean };
var KEY = "mat221-goals-v1";
export default function Goals() {
  var sg = useState<Goal[] | null>(null), goals = sg[0], setGoals = sg[1];
  var si = useState(""), text = si[0], setText = si[1];
  useEffect(function () {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) setGoals(JSON.parse(raw));
      else setGoals(DEFAULT_GOALS.map(function (t, i) { return { id: i + 1, text: t, done: false }; }));
    } catch { setGoals([]); }
  }, []);
  useEffect(function () { if (goals) try { localStorage.setItem(KEY, JSON.stringify(goals)); } catch {} }, [goals]);
  if (!goals) return <div className="card"><p className="hint">Loading goals…</p></div>;
  var doneN = goals.filter(function (g) { return g.done; }).length;
  var pct = goals.length ? Math.round(100 * doneN / goals.length) : 0;
  function add(e: any) { e.preventDefault(); var value = text.trim(); if (!value) return; setGoals(function (current) { return current.concat([{ id: Date.now(), text: value, done: false }]); }); setText(""); }
  function clearCompleted() { setGoals(function (current) { return current.filter(function (g) { return !g.done; }); }); }
  return (
    <div className="card">
      <span className="chip grn">Goals</span>
      <div className="progress"><i style={{ width: pct + "%" }}></i></div>
      <p className="hint">{doneN}/{goals.length} done ({pct}%)</p>
      {goals.map(function (g) {
        return (
          <div key={g.id} className={"goal" + (g.done ? " done" : "")}>
            <input type="checkbox" checked={g.done} aria-label={"Mark goal complete: " + g.text} onChange={function () { setGoals(function (current) { return current.map(function (x) { return x.id === g.id ? { id: x.id, text: x.text, done: !x.done } : x; }); }); }} />
            <span>{g.text}</span>
            <button type="button" className="goal-x" aria-label={"Remove goal: " + g.text} onClick={function () { setGoals(function (current) { return current.filter(function (x) { return x.id !== g.id; }); }); }}>×</button>
          </div>
        );
      })}
      <form onSubmit={add} className="goal-add"><input value={text} onChange={function (e) { setText(e.target.value); }} placeholder="Add a goal…" aria-label="New study goal" /><button type="submit" className="btn sm">Add</button></form>
      {doneN ? <button type="button" className="btn ghost sm clear-goals" onClick={clearCompleted}>Clear completed</button> : null}
    </div>
  );
}
