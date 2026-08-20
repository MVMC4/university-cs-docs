'use client';
import { useEffect, useState } from "react";
import { Countdown, Pomodoro } from "../../components/Timers";
import Goals from "../../components/Goals";
import { TIMELINE, SEMESTER_START } from "../../lib/planner";

export default function Planner() {
  var sm = useState(0), now = sm[0], setNow = sm[1];
  useEffect(function () { setNow(Date.now()); }, []);
  var week = now ? Math.floor((now - new Date(SEMESTER_START).getTime()) / (7 * 86400000)) + 1 : -1;
  return (
    <div>
      <p className="eyebrow">Tool · goals, timeline, timers</p>
      <h1>Study <span className="it">planner</span></h1>
      <p className="lead">The semester at a glance: what to cover each week, live countdowns to every test, a pomodoro for the sessions, and goals that persist in your browser.</p>
      <div className="grid">
        <Countdown />
        <Pomodoro />
      </div>
      <h2>Week-by-week timeline</h2>
      <ol className="timeline">
        {TIMELINE.map(function (w, i) {
          var here = week > 0 && i + 1 === week;
          return (
            <li key={w.week} className={"tl-item" + (here ? " now" : "")}>
              <div className="tl-dates">{w.week} · {w.dates}{here ? <span className="tl-mile">you are here</span> : null}</div>
              <strong>{w.focus}</strong>
              <div className="hint">Topics {w.topics}</div>
              {w.milestone ? <span className="tl-mile">{w.milestone}</span> : null}
            </li>
          );
        })}
      </ol>
      <h2>Goals</h2>
      <Goals />
    </div>
  );
}
