import type { ReactNode } from "react";
import { getRepairTopic } from "../lib/content-model";
import { LESSON_EXAMPLES } from "../lib/lesson-examples";
import { LESSON_GUIDES } from "../lib/lesson-structure";
import { IM } from "../lib/mathx";
import Quiz from "./Quiz";

export function Callout({ label = "Note", tone = "why", children }: { label?: string; tone?: "why" | "trap" | "check"; children: ReactNode }) {
  var className = tone === "trap" ? "trap" : tone === "check" ? "solution-check" : "why";
  return <aside className={className}><strong>{label}</strong><div>{children}</div></aside>;
}

export function LessonIntro({ topic }: { topic: string }) {
  var guide = LESSON_GUIDES[topic];
  if (!guide) return null;
  return <div className="lesson-intro"><section><span className="chip grn">Learning objectives</span><ul>{guide.objectives.map(function (item) { return <li key={item}>{item}</li>; })}</ul></section><section><span className="chip lav">Required prior knowledge</span><ul>{guide.prerequisites.map(function (item) { return <li key={item}>{item}</li>; })}</ul></section></div>;
}

export function Concept({ title, what, why, when, prerequisites, children }: { title: string; what: string; why: string; when: string; prerequisites?: string; children?: ReactNode }) {
  return <section className="concept-block"><span className="chip lav">Concept</span><h3>{title}</h3><dl><div><dt>What</dt><dd>{what}</dd></div><div><dt>Why</dt><dd>{why}</dd></div><div><dt>When</dt><dd>{when}</dd></div>{prerequisites ? <div><dt>Needs</dt><dd>{prerequisites}</dd></div> : null}</dl>{children ? <div className="concept-detail">{children}</div> : null}</section>;
}

export function Theorem({ title, statement, conditions, meaning, consequences, children }: { title: string; statement: string; conditions: string; meaning: string; consequences?: string; children?: ReactNode }) {
  return <section className="theorem-block"><span className="chip ink">Property / theorem</span><h3>{title}</h3><div className="theorem-statement">{IM(statement)}</div><p><strong>Conditions:</strong> {conditions}</p><p><strong>Meaning:</strong> {meaning}</p>{consequences ? <p><strong>Consequences:</strong> {consequences}</p> : null}{children ? <div className="theorem-detail">{children}</div> : null}</section>;
}

export function WorkedExample({ number, purpose, difficulty, children }: { number: number | string; purpose?: string; difficulty?: "Foundation" | "Developing" | "Exam-ready"; children: ReactNode }) {
  var numeric = Number(number);
  var level = difficulty || (numeric <= 3 ? "Foundation" : numeric <= 6 ? "Developing" : "Exam-ready");
  return <article className="integrated-example" data-worked-example={number}><div className="integrated-example-head"><span className="chip grn">Worked example {number}</span><strong>{level}</strong></div>{purpose ? <p className="example-purpose"><strong>Purpose:</strong> {purpose}</p> : null}{children}</article>;
}

export function WorkedExampleSet({ topic, from = 0, count = 2, numberStart = 1 }: { topic: string; from?: number; count?: number; numberStart?: number }) {
  var examples = (LESSON_EXAMPLES[topic] || []).slice(from, from + count);
  return (
    <div className="mdx-example-set" aria-label={"Worked examples " + (from + 1) + " to " + (from + examples.length)}>
      {examples.map(function (example, index) {
        var number = numberStart + index;
        return (
          <WorkedExample number={number} purpose={example.purpose || example.method} difficulty={example.difficulty} key={topic + "-" + number}>
            <h4>{IM(example.title)}</h4>
            <p><strong>Why this method:</strong> {example.method}</p>
            <p className="example-rule"><strong>Rule or property:</strong> {IM(example.rule)}</p>
            <ol className="steps">{example.steps.map(function (step, stepIndex) { return <li key={stepIndex}>{IM(step)}</li>; })}</ol>
            <p><strong>Answer:</strong> {IM(example.answer)}</p>
            <div className="solution-check"><strong>Check:</strong> {IM(example.check)}</div>
          </WorkedExample>
        );
      })}
    </div>
  );
}

export function CheckpointQuiz({ topic, from = 0, count = 2 }: { topic: string; from?: number; count?: number }) {
  var model = getRepairTopic(topic);
  var questions = model ? model.quiz.slice(from, from + count) : [];
  if (!questions.length) return null;
  return (
    <section className="inline-checkpoint" aria-label="Inline checkpoint">
      <div className="inline-checkpoint-head">
        <span className="chip lav">Pause and check</span>
        <strong>Can you choose the next move?</strong>
      </div>
      <p className="hint">Answer these before continuing. The explanation appears immediately so the reasoning stays attached to the note.</p>
      <Quiz questions={questions} />
    </section>
  );
}
