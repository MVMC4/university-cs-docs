'use client';
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Maximize2, Pause, Play, RotateCcw, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { ASSESSMENTS } from "../lib/planner";

function pad(n: number) { return n < 10 ? "0" + n : "" + n; }

export function Countdown() {
  /* Date.now() must not run during the initial render: the server and browser
     would produce different countdown text and React would reject hydration. */
  var sn = useState<number | null>(null), now = sn[0], setNow = sn[1];
  useEffect(function () { var id = setInterval(function () { setNow(Date.now()); }, 1000); return function () { clearInterval(id); }; }, []);
  if (now === null) return <div className="card countdown"><p className="hint">Loading assessment clock...</p></div>;
  var upcoming = ASSESSMENTS.map(function (a) { return { a: a, t: new Date(a.date).getTime() }; })
    .filter(function (x) { return Number.isFinite(x.t) && x.t > now; }).sort(function (x, y) { return x.t - y.t; })[0];
  if (!upcoming) return <div className="card countdown"><h4>All scheduled assessments are complete</h4><p className="hint">Add the final exam date in the planner data when it is published.</p></div>;
  var d = upcoming.t - now, days = Math.floor(d / 86400000), hrs = Math.floor(d / 3600000) % 24, min = Math.floor(d / 60000) % 60, sec = Math.floor(d / 1000) % 60;
  return (
    <div className="card countdown">
      <span className="chip bad">Next assessment</span>
      <h4>{upcoming.a.name}</h4><p className="hint">{upcoming.a.time} · {upcoming.a.venue}</p>
      <p className="cd-num" aria-live="polite">{days}d {pad(hrs)}:{pad(min)}:{pad(sec)}</p>
      <p className="hint">{upcoming.a.weight}</p>
    </div>
  );
}

type Phase = { label: string; short: string; seconds: number; kind: "focus" | "break" };
var PHASES: Phase[] = [
  { label: "Focus", short: "Deep work", seconds: 25 * 60, kind: "focus" },
  { label: "Short break", short: "Reset", seconds: 5 * 60, kind: "break" },
  { label: "Long break", short: "Recharge", seconds: 15 * 60, kind: "break" }
];
var POMODORO_KEY = "mat221-pomodoro-v2";

function chime() {
  try {
    var AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return;
    var context = new AudioContextCtor();
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.55);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.6);
    window.setTimeout(function () { context.close(); }, 800);
  } catch {}
}

export function Pomodoro() {
  var sm = useState(0), mode = sm[0], setMode = sm[1];
  var sl = useState(PHASES[0].seconds), left = sl[0], setLeft = sl[1];
  var se = useState<number | null>(null), endsAt = se[0], setEndsAt = se[1];
  var sd = useState(0), done = sd[0], setDone = sd[1];
  var sa = useState(true), autoAdvance = sa[0], setAutoAdvance = sa[1];
  var ss = useState(true), sound = ss[0], setSound = ss[1];
  var sf = useState(false), focusMode = sf[0], setFocusMode = sf[1];
  var statusState = useState("Ready when you are."), status = statusState[0], setStatus = statusState[1];
  var finishing = useRef(false);
  var running = endsAt !== null;
  var phase = PHASES[mode];
  var total = phase.seconds;
  var phaseProgress = total ? Math.min(100, Math.max(0, ((total - left) / total) * 100)) : 0;
  var cyclePosition = done % 4;
  var nextPhase = mode === 0 ? (done > 0 && done % 4 === 0 ? 2 : 1) : 0;

  useEffect(function () {
    try {
      var raw = localStorage.getItem(POMODORO_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (typeof saved.done === "number") setDone(saved.done);
        if (typeof saved.autoAdvance === "boolean") setAutoAdvance(saved.autoAdvance);
        if (typeof saved.sound === "boolean") setSound(saved.sound);
      }
    } catch {}
  }, []);
  useEffect(function () {
    try { localStorage.setItem(POMODORO_KEY, JSON.stringify({ done: done, autoAdvance: autoAdvance, sound: sound })); } catch {}
  }, [done, autoAdvance, sound]);
  useEffect(function () {
    if (endsAt === null) return;
    finishing.current = false;
    function tick() {
      var remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0 && !finishing.current) {
        finishing.current = true;
        finishPhase(true);
      }
    }
    tick();
    var id = setInterval(tick, 250);
    return function () { clearInterval(id); };
  }, [endsAt, mode]);
  useEffect(function () {
    function key(e: KeyboardEvent) {
      if (e.key === "Escape" && focusMode) setFocusMode(false);
      if (focusMode && e.code === "Space" && e.target === document.body) { e.preventDefault(); toggle(); }
    }
    window.addEventListener("keydown", key);
    return function () { window.removeEventListener("keydown", key); };
  });
  useEffect(function () {
    document.body.style.overflow = focusMode ? "hidden" : "";
    return function () { document.body.style.overflow = ""; };
  }, [focusMode]);
  useEffect(function () {
    document.title = running ? pad(Math.floor(left / 60)) + ":" + pad(left % 60) + " · " + phase.label : "MAT 221 Flow Docs";
    return function () { document.title = "MAT 221 Flow Docs"; };
  }, [running, left, phase.label]);

  function start() {
    var duration = left > 0 ? left : phase.seconds;
    setLeft(duration); setEndsAt(Date.now() + duration * 1000); setStatus(phase.label + " is running. Protect this block.");
  }
  function pause() {
    if (endsAt === null) return;
    setLeft(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))); setEndsAt(null); setStatus("Paused. Resume when you are ready.");
  }
  function toggle() { if (running) pause(); else start(); }
  function choosePhase(i: number) { setMode(i); setLeft(PHASES[i].seconds); setEndsAt(null); setStatus(PHASES[i].label + " selected."); }
  function reset() { setLeft(phase.seconds); setEndsAt(null); setStatus(phase.label + " reset."); }
  function advance(autoStart: boolean, countAsComplete: boolean) {
    var nextDone = done + (mode === 0 && countAsComplete ? 1 : 0);
    if (mode === 0 && countAsComplete) setDone(nextDone);
    var next = mode === 0 ? (nextDone > 0 && nextDone % 4 === 0 ? 2 : 1) : 0;
    setMode(next); setLeft(PHASES[next].seconds);
    if (autoStart) { setEndsAt(Date.now() + PHASES[next].seconds * 1000); setStatus(PHASES[mode].label + " complete. " + PHASES[next].label + " started."); }
    else { setEndsAt(null); setStatus(PHASES[mode].label + " complete. Start the next phase when ready."); }
  }
  function finishPhase(countAsComplete: boolean) { if (sound) chime(); advance(autoAdvance, countAsComplete); }
  function skip() { setEndsAt(null); setLeft(0); setStatus(PHASES[mode].label + " skipped."); advance(false, false); }
  function openFocus() { setFocusMode(true); }

  function phaseButtons(full: boolean) {
    return <div className={full ? "pom-phase-tabs full" : "pom-phase-tabs"}>{PHASES.map(function (p, i) { return <button type="button" key={p.label} className={"pom-phase" + (i === mode ? " active " + p.kind : "")} onClick={function () { choosePhase(i); }}><span>{p.label}</span><small>{Math.floor(p.seconds / 60)} min · {p.short}</small></button>; })}</div>;
  }
  function timerFace(full: boolean) {
    return <div className={full ? "pom-timer-face full" : "pom-timer-face"}>
      <div className="pom-phase-label"><span className={"phase-dot " + phase.kind}></span>{phase.label}</div>
      <div className="pom-ring" style={{ background: "conic-gradient(var(--pom-accent, var(--accent)) " + phaseProgress + "%, var(--panel) 0)" }}><div className="pom-ring-inner"><span className="pom-time" aria-live="polite">{pad(Math.floor(left / 60))}:{pad(left % 60)}</span><span className="pom-time-caption">{running ? "in progress" : left === phase.seconds ? "ready to begin" : "paused"}</span></div></div>
      <div className="pom-status" aria-live="polite">{status}</div>
      <div className="pom-main-controls"><button type="button" className="btn pom-primary" onClick={toggle}>{running ? <Pause size={19} /> : <Play size={19} />}{running ? "Pause" : left === 0 ? "Start again" : "Start focus"}</button><button type="button" className="btn ghost" onClick={reset}><RotateCcw size={17} /> Reset</button><button type="button" className="btn ghost" onClick={skip}><SkipForward size={17} /> Skip</button></div>
    </div>;
  }
  function sessionInfo(full: boolean) {
    return <div className={full ? "pom-session-info full" : "pom-session-info"}><div><span className="pom-stat-value">{done}</span><span className="pom-stat-label">focus sessions completed</span></div><div><span className="pom-stat-value">{cyclePosition}/4</span><span className="pom-stat-label">sessions in current cycle</span></div><div className="pom-cycle"><span className="pom-stat-label">Cycle progress</span><div className="pom-dots" aria-label={cyclePosition + " of 4 focus sessions completed in this cycle"}>{[0, 1, 2, 3].map(function (n) { return <i key={n} className={n < cyclePosition ? "done" : ""}></i>; })}</div><small>Next: {PHASES[nextPhase].label}</small></div></div>;
  }

  var compact = <div className="card timerbox"><div className="pom-compact-head"><span className="chip lav">Pomodoro</span><button type="button" className="btn ghost sm pom-expand" onClick={openFocus}><Maximize2 size={15} /> Focus mode</button></div>{timerFace(false)}{phaseButtons(false)}{sessionInfo(false)}<div className="pom-options"><label><input type="checkbox" checked={autoAdvance} onChange={function () { setAutoAdvance(!autoAdvance); }} /> Auto-start the next phase</label><button type="button" className="pom-sound" aria-label={sound ? "Mute completion sound" : "Enable completion sound"} onClick={function () { setSound(!sound); }}>{sound ? <Volume2 size={15} /> : <VolumeX size={15} />} {sound ? "Sound on" : "Sound off"}</button></div><p className="hint timer-note">Clock-based timing stays accurate when you switch tabs. Expand Focus mode for a distraction-free session.</p></div>;
  var overlay = focusMode ? <div className={"pom-overlay " + phase.kind} role="dialog" aria-modal="true" aria-label="Pomodoro focus mode"><header className="pom-overlay-header"><div><span className="eyebrow">MAT 221 · Focus mode</span><h2>Protect the next block.</h2></div><button type="button" className="pom-close" aria-label="Close focus mode" onClick={function () { setFocusMode(false); }}><X size={24} /></button></header><main className="pom-overlay-main">{phaseButtons(true)}{timerFace(true)}{sessionInfo(true)}<div className="pom-overlay-options"><label><input type="checkbox" checked={autoAdvance} onChange={function () { setAutoAdvance(!autoAdvance); }} /> Automatically start the next phase</label><button type="button" className="pom-sound" onClick={function () { setSound(!sound); }}>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />} {sound ? "Completion sound on" : "Completion sound off"}</button></div></main><footer className="pom-overlay-footer"><CheckCircle2 size={16} /> Finish the block, take the break, then return to the next problem.</footer></div> : null;
  return <>{compact}{overlay}</>;
}
